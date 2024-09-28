const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

exports.getGemini = async (req, res) => {
    try {
        // Use Gemini 1.5 model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
        {
            "question": ["내가", "지금", "하고싶은 건", "너무", "졸려서", "자고 싶다"],
            "index": "[0, 2, 3, 4]",
            "answer": 2
        } 이런식으로 예시 데이터를 몇개 만들어줘. index는 question의 index이고 answer는 맞춤법이 틀린 곳의 index야
        `;

        // Send the prompt to the generative model
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Send the response back to the client
        res.json({ success: true, result: responseText });
        
        // Optionally, log the result to the console for debugging
        console.log(responseText);
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ success: false, message: "Failed to generate content", error });
    }
};