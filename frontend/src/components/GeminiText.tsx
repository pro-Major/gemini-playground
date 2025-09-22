import { GoogleGenAI } from '@google/genai';
import { useEffect, useState } from 'react';

const GeminiText = () => {
  const [details, setDetails] = useState<string | undefined>('');
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const getDetails = async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Which is the largest country in the world by area?',
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking // the response will be immediate
        },
      },
    });
    setDetails(response.text);

    console.log(response);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div>{details}</div>
    </>
  );
};

export default GeminiText;
