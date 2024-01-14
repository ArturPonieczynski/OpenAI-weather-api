const OpenAI = require('openai');

const countPriceUsd = (usage) => {
    return usage.prompt_tokens / 1000 * 0.001 + usage.completion_tokens / 1000 * 0.002;
}

(async () => {

    const openai = new OpenAI({
        apiKey: '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',
    });

    console.log('Pytam AI...');

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user', content: 'Powiedz jakiś krótki żart. Ma być zabawny!',
            },
        ],
    });

    console.log(completion?.choices?.[0]?.message?.content ?? 'Brak odpowiedzi!');
    console.log('$', countPriceUsd(completion.usage));

    /**
     * Zadanie domowe:
     * - Napisać funkcję, która zwraca odpowiedź z OpenAI - jako tekst.
     * - Funkcja ma zwracać sentyment (pozytywne, neutralne, negatywne) na podstawie tekstu użytkownika.
     * - Zrób eksperyment - który model językowy od OpenAI nadaje się do tego najlepiej biorąc pod uwagę cena/jakość.
     */

})();