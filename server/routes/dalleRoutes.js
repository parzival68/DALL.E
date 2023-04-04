import express from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";


dotenv.config();


const router = express.Router();

const configuration = new Configuration ({
    apiKey: process.env.OpenAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/')
    .get((req, res) =>
    {
        res.send('Hello from DALL-E!')
    })

router.route('/')
    .post(async (req, res) =>
    {
        try
        {
            const { prompt } = req.body;

            const aiResponse = await openai.createImage(
            {
                prompt, // input text
                n: 1, // number of images
                size: '1024x1024', // size of image
                response_format : 'b64_json',
            });

            const image = aiResponse.data.data[0].b64_json;

            res.status(200).json({ photo : image });
        }
        catch (err)
        {
            console.log(err);
            res.status(500).send(err?.response.data.error.message || 'Something went wrong');
        }
    });



export default router