import getBookRecommendations from './src/index.js'; // Importing the function, name kept consistent

async function testRecommendations() {
    const userDetails = "Interested in epic fantasy and science fiction.";
    const ownedBookTitles = ["Dune", "The Lord of the Rings", "Foundation"];

    try {
        const recommendations = await getBookRecommendations(userDetails, ownedBookTitles, 5); // Function name kept consistent
        console.log("Book Recommendations from OpenAI:"); // Updated log message
        recommendations.forEach(book => console.log(`- ${book}`));
    } catch (error) {
        console.error("Error getting book recommendations from OpenAI:", error.message); // Updated error log
    }
}

testRecommendations(); 