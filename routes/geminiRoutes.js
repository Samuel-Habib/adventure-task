const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

async function run() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a short poem about a cat.";

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    const complexPrompt = `Summarize the following article in three bullet points:

    [Article Text Here]`;

    const generationConfig = {
      temperature: 0.4,
    };

    const complexResult = await model.generateContent(complexPrompt, {
        generationConfig,
    });
    const complexResponse = await complexResult.response;
    const complexText = complexResponse.text();
    console.log(complexText);

    const chat = model.startChat({
        history: [],
    });
    const chatResponse1 = await chat.sendMessage("Hello, I'm trying to learn about large language models.");
    console.log(chatResponse1.response.text());

    const chatResponse2 = await chat.sendMessage("Can you explain transformers in simple terms?");
    console.log(chatResponse2.response.text());

  } catch (error) {
    console.error("Error:", error);
  }
}

run();

async function runVision() {
    const { GoogleGenerativeAI, Part } = require("@google/generative-ai");
    const fs = require("fs").promises; // Use promises version of fs

    const API_KEY = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const imagePath = "your_image.jpg"; // Replace with your image path.

    try {
        const imageBuffer = await fs.readFile(imagePath);
        const imageParts = [{
            inlineData: {
                mimeType: "image/jpeg", // Adjust mime type if needed
                data: imageBuffer.toString("base64"),
            },
        }];

        const result = await model.generateContent(imageParts);
        const response = await result.response;
        const text = response.text();
        console.log(text);

    } catch (error) {
        console.error("Error:", error);
    }
}

runVision();