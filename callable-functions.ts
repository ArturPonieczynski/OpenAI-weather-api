import {ChatCompletionAssistantMessageParam} from "openai/src/resources/chat/completions";

enum CallableFunctions {
    AnswerTextAnalysis = 'answerTextAnalysis',
}

enum Sentiment {
    Positive = 'positive',
    Neutral = 'neutral',
    Negative = 'negative',
}

interface AnswerSentimentArgs {
    sentiment: Sentiment;
    subject: string;
    mostImportantWord: string;
}

const answerTextAnalysis = (data: AnswerSentimentArgs) => {
    console.log('Text analysis result is', data);
    return 'Ok.';
}

export const handleCalledFunction = (call: ChatCompletionAssistantMessageParam.FunctionCall): string => {
    try {

        switch (call.name as CallableFunctions) {
            case CallableFunctions.AnswerTextAnalysis:
                return answerTextAnalysis(JSON.parse(call.arguments));

            default:
                throw new Error('Unknown function name.');
        }

    } catch(e) {
        return (e as Error).message;
    }
}