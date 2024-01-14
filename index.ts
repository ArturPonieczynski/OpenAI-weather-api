import {OpenAiChat} from "./open-ai-chat";

(async () => {

    const chat = new OpenAiChat('Jesteś świetnym klasyfikatorem tekstów, który zawsze zwraca odpowiedzi w formacie json.');

    console.log(await chat.say('Zwróć sentyment tego tekstu (jako `sentiment`):\n\nBardzo nie lubię takiej pogody!'));
    console.log(await chat.say('A teraz zwróć temat tego tekstu (jako `subject`).'));
    console.log(await chat.say('A teraz zwróć najważniejsze słowo w tym tekście(jako `mostImportantWord`).'));

    console.log(chat.history);

})();