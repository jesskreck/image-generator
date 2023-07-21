import { OpenAIApi, Configuration } from "openai"


export async function generateDalleImage(AImode, age, sex, actionText) {
    if (AImode === false) {
        return "images/hippiebarbie.png"

    } else {
        const configuration = new Configuration({
            apiKey: import.meta.env.VITE_REACT_OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);
        const res = await openai.createImage({
            prompt: `sharp photo of ${age} year old ${sex} who likes to ${actionText}, shot on Polaroid BigShot`,
            n: 1,
            size: "512x512",
        });

        return res.data.data[0].url;
    }
}