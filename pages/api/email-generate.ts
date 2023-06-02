import { ChatMessage, OpenAIStream } from '../../utils/OpenAIStream';
import { convert } from 'html-to-text';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const { prompt, apiToken } = (await req.json()) as {
    prompt?: string;
    apiToken?: string;
  };

  if (!prompt || !apiToken) {
    return new Response('No token in the request', { status: 500 });
  }

  try {
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: prompt,
      },
    ];

    const payload = {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 2000,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload, apiToken);
    return new Response(stream);
  } catch (e: any) {
    console.log({ e });
    return new Response(e, { status: 500 });
  }
}
