import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Fetches book recommendations from OpenAI's ChatGPT API based on user preferences and a list of book titles.
 *
 * @param {string} userDetails - Details about the user's preferences (e.g., genres, authors).
 * @param {string[]} ownedBookTitles - An array of book titles the user currently owns or likes.
 * @param {number} [numRecommendations=5] - Number of book recommendations to fetch.
 * @returns {Promise<string[]>} - A promise that resolves to an array of book recommendation titles.
 * @throws {Error} - If there is an error communicating with the OpenAI API.
 */
async function getDeepSeekBookRecommendations(userDetails, ownedBookTitles, numRecommendations = 5) {
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
        throw new Error('OpenAI API key is missing. Set OPENAI_API_KEY environment variable.');
    }

    // Format the book titles into a string for the prompt
    const bookListString = ownedBookTitles.map(title => `'${title}'`).join(', ');
    const prompt = `Recommend ${numRecommendations} book titles similar to these books: ${bookListString}. User preferences: "${userDetails}". Please provide only book titles in the response, each on a new line.`;


    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Or another suitable model like "gpt-4" if you have access
            messages: [{ role: "user", content: prompt }],
            n: 1, // Number of completions to generate
        });

        const responseText = chatCompletion.choices[0].message.content;


        if (!responseText) {
            throw new Error('Could not extract book recommendations from OpenAI API response.');
        }

        const recommendationsArray = responseText.split('\n').filter(line => line.trim() !== '').map(line => line.trim());

        return recommendationsArray.slice(0, numRecommendations); // Ensure we return at most numRecommendations
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}

export default getDeepSeekBookRecommendations; 