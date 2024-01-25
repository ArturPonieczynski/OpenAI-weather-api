import OpenAI, {} from "openai";
import {API_KEY} from './config';
import {
    ChatCompletionAssistantMessageParam,
    ChatCompletionCreateParamsBase,
    ChatCompletionMessageParam
} from "openai/src/resources/chat/completions";
import {Chat} from "openai/resources";
import ChatCompletion = Chat.ChatCompletion;
import {ChatCompletionRole} from "openai/resources/chat/completions";

const parameters: ChatCompletionCreateParamsBase = {
    n: 1,
    // top_p: 1,
    temperature: 1,
    max_tokens: 1000,
    stream: false,
    model: 'gpt-4-1106-preview',
    messages: [],
    functions: [
        {
            name: 'geocode',
            description: 'Change name or zip code of the city to latitude and longitude.',
            parameters: {
                type: 'object',
                properties: {
                    cityNameOrZipCode: {
                        type: 'string',
                        description: 'City name or zip code.',
                    },
                },
            },
        },

        {
            name: 'getWeather',
            description: 'Get weather information based on latitude and longitude.',
            parameters: {
                type: 'object',
                properties: {
                    latitude: {
                        type: 'number',
                        description: 'City latitude.',
                    },
                    longitude: {
                        type: 'number',
                        description: 'City longitude.',
                    },
                },
            },
        },
    ],
};

export type ChatResponse = null | {
    content: null | string;
    functionCall: null | ChatCompletionAssistantMessageParam.FunctionCall;
};

const extractFirstChoice = (msg: OpenAI.Chat.Completions.ChatCompletion): ChatResponse => {
    const firstChoice = msg?.choices?.[0]?.message;

    if (!firstChoice) {
        return null;
    }

    return {
        content: firstChoice.content ?? null,
        functionCall: firstChoice.function_call ?? null,
    };
}

export class OpenAiChat {
    private readonly openai = new OpenAI({
        apiKey: API_KEY,
    });
    private readonly messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];

    constructor(system: string) {
        this.messages = [
            {
                role: 'system',
                content: system,
            },
        ];
    }

    async say(
        prompt: string,
        role: ChatCompletionRole = 'user',
        functionName?: string,
    ): Promise<ChatResponse> {
        this.messages.push({
            role,
            content: prompt,
            name: functionName,
        } as ChatCompletionMessageParam);

        const data = await this.openai.chat.completions.create({
            ...parameters,
            messages: this.messages,
        });

        const msg = extractFirstChoice(data as ChatCompletion);

        if (msg.content) {
            this.messages.push({
                role: 'assistant',
                content: msg.content,
            });
        }

        return msg;
    }

    clear() {
        this.messages.splice(1);
    }

    get history() {
        return this.messages;
    }
}