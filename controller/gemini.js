exports.getGemini = async (req, res) => {
    try {
        // Use Gemini 1.5 model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
        {
            "question": ["내가", "지금", "하고싶은 건", "너무", "졸려서", "자고 싶다"],
            "index": "[0, 2, 3, 4]",
            "answer": 2
        } 이런식으로 예시 데이터를 몇개 만들어줘, 맞춤법이 틀린 부분이 한곳 있도록. index는 question의 index이고 4개있어야 해, answer는 맞춤법이 틀린 곳의 index야
        `;

        // Send the prompt to the generative model
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        // Find the JSON string within the response
        const jsonString = responseText.match(/```json\n([\s\S]*?)\n```/)[1];

        // Parse the extracted JSON string
        const parsedData = JSON.parse(jsonString);

        // Log and return the parsed data
        console.log(parsedData);  // For debugging
        res.json({ success: true, data: parsedData });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ success: false, message: "Failed to generate content", error });
    }
};