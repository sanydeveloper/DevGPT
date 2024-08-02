const { GoogleGenerativeAI } = require("@google/generative-ai");


// Access your API key as an environment variable
// console.log(`process.env.REACT_APP_API_KEY: ${process.env.APP_API_KEY}`)
// const genAI = new GoogleGenerativeAI(process.env.APP_API_KEY);
const genAI = new GoogleGenerativeAI('AIzaSyAdUlBkGJ5XuNX_RBnNf94ok7TwJk6lKXE');

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

module.exports = {
  generateContent,
};