import {OpenAiChat} from "./open-ai-chat";
import {handleCalledFunction} from "./callable-functions";

(async () => {

    const chat = new OpenAiChat('Jesteś świetnym klasyfikatorem tekstów, który zawsze zwraca odpowiedzi w formacie json, wywołując funkcje.');

    const ans = await chat.say('Zwróć analizę tego tekstu:\n\nBardzo nie lubię takiej pogody!');

    console.log(ans);

    if (ans.functionCall) {
        const res = handleCalledFunction(ans.functionCall);
        await chat.say(res, 'function', ans.functionCall.name);
    }

    // console.log(await chat.say('A teraz zwróć temat tego tekstu (jako `subject`).'));
    // console.log(await chat.say('A teraz zwróć najważniejsze słowo w tym tekście(jako `mostImportantWord`).'));

})();