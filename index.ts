import {WeatherService} from "./lib/weather";
import {handleCalledFunction} from "./callable-functions";
import {ChatResponse, OpenAiChat} from "./open-ai-chat";
import {ChatCompletionAssistantMessageParam} from "openai/src/resources/chat/completions";

(async () => {

    const chat = new OpenAiChat('You are helpful AI assistant.');

    const firstAnswer = await chat.say('Jestem w Katowicach. Chcę wyjść właśnie na dwór. Jak się ubrać?');

    const functionCallLoop = async (ans: ChatResponse) => {
        console.log(ans);

        if (ans.functionCall) {
            const res = await handleCalledFunction(ans.functionCall);
            const ans2 = await chat.say(res, 'function', ans.functionCall.name);

            await functionCallLoop(ans2);
        }
    }

    await functionCallLoop(firstAnswer);

    // const weather = new WeatherService();
    // const geo = await weather.geocode('Katowice');
    // const weatherInKatowice = await weather.getCurrentWeather(geo);
    // console.log({geo, weatherInKatowice});

})();