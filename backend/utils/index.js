import OpenAI from "openai";

const generateRandomPassword = (studentID) => {
    return `${studentID}admin${Math.floor(Math.random() * 10)}`;
}

const checkMessage = async (message) => {
    try {
        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        

        const response = await client.chat.completions.create({
            messages: [{ role: 'user', content: `Is this message appropriate for a college club. Message: ${message}. Give answer in Yes or No` }],
            model: 'gpt-4o',
        });
    
        return response.choices[0].message.content === 'Yes' ? false : true;
    } catch (error) {
        console.log(error?.message);
    }
}

export { generateRandomPassword, checkMessage };