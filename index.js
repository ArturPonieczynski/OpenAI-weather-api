const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: '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',
});

const getSentiment = async (text, model = 'gpt-3.5-turbo') => {
    console.log('Pytam AI...');

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user', content: `Napisz jaki jest sentyment poniższego tekstu. Odpowiedz, że jest pozytywny, neutralny lub negatywny. Oto tekst:\n\n---\n\n${text}`,
            },
        ],
    });

    return completion?.choices?.[0]?.message?.content ?? 'Brak odpowiedzi!';
}

(async () => {

    console.log(await getSentiment('Bardzo podoba mi się kurs mistrz.ai!'));
    console.log(await getSentiment('Kurs mistrz.ai trwa do ok. kwietnia 2024.'));

    /**
     * Zadanie domowe:
     * - Napisać funkcję, która zwraca odpowiedź z OpenAI - jako tekst.
     * - Funkcja ma zwracać sentyment (pozytywne, neutralne, negatywne) na podstawie tekstu użytkownika.
     * - Zrób eksperyment - który model językowy od OpenAI nadaje się do tego najlepiej biorąc pod uwagę cena/jakość.
     */

})();