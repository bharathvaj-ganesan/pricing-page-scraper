import { toast } from 'react-hot-toast';

async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

export default function Code({ content }: { content: string }) {
  const handleCopy = () => {
    copyTextToClipboard(content)
      .then(() => {
        toast.success('Copied successfully');
      })
      .catch(() => {
        toast.error('Failed to copy');
      });
  };

  return (
    <pre className="relative rounded-lg border border-gray-500 px-7 pb-7 text-gray-300 outline-1 outline-white">
      <svg
        onClick={handleCopy}
        className="absolute right-2 top-2 h-8 w-8 cursor-pointer"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        data-tooltip-target="tooltip-default"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
        ></path>
      </svg>
      <code>{content}</code>
    </pre>
  );
}
