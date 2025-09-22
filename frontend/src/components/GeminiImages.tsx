import { GoogleGenAI } from '@google/genai';
import { Buffer } from 'buffer';
import fs from 'fs';

const GeminiImages = () => {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const getImages = async () => {
    const response = await ai.models.generateImages({
      model: 'imagen-2.0-flash',
      prompt: 'Indian national flag',
      config: {
        numberOfImages: 1,
      },
    });
    console.log(response);

    //buffer
    let idx = 1;
    if (response.generatedImages) {
      for (const generatedImage of response.generatedImages) {
        let imgBytes = generatedImage.image?.imageBytes;
        const buffer = Buffer.from(imgBytes || '', 'base64');
        fs.writeFileSync(`imagen-${idx}.png`, buffer);
        idx++;
      }
    }
  };

  return (
    <>
      <div>GeminiImages</div>
    </>
  );
};

export default GeminiImages;
