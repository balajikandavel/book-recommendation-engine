import getBookRecommendations from '../src/index.js';


async function testRecommendations() {
    const userDetails = "Interested in epic fantasy and science fiction.";
    const ownedBookTitles = ["Dune", "The Lord of the Rings", "Foundation"];

    try {
        const recommendations = await getBookRecommendations(userDetails, ownedBookTitles, 5);
        console.log("Book Recommendations from OpenAI:");
        recommendations.forEach(book => console.log(`- ${book}`));
    } catch (error) {
        console.error("Error getting book recommendations from OpenAI:", error.message);
    }
}

testRecommendations(); 