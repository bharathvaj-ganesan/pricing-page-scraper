import { ChatMessage, OpenAIStream } from '../../utils/OpenAIStream';
import { convert } from 'html-to-text';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const { url, apiToken } = (await req.json()) as {
    url?: string;
    apiToken?: string;
  };

  if (!url || !apiToken) {
    return new Response('No prompt in the request', { status: 500 });
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    const html = await response.text();

    const options = {
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: 'a', format: 'skip' },
        { selector: 'footer', format: 'skip' },
        { selector: 'header', format: 'skip' },
      ],
      leadingLineBreaks: 1,
    };
    let text = convert(html, options).replace(/^\s*[\r\n]/gm, '\n');
    const format = `Put this pricing plans into a JSON with keys "plan_name", "plan_amount", "currency_code", "frequency" and "features". Freqency should be either 'monthly' or 'yearly'. Currency code should be in ISO 4217 format. Features should be array of strings.`;

    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: `Can you format this input text unstructured pricing plan text into structured format. ${format}. Input text: ${text}`,
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
