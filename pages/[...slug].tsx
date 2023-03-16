import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SquigglyLines from '../components/SquigglyLines';
import StartGithub from '../components/StartGithub';
import Code from '../components/Code';
import CollectAPITokenModal from '../components/CollectAPITokenModal';
import useLocalStorage from '../utils/hooks/useLocalStorage';

export const Home: NextPage = () => {
  const router = useRouter();
  const urlState = router.query.slug;
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [curArticle, setCurArticle] = useState<string>('');
  const [apiToken, setApiToken] = useLocalStorage<string>('api_token', '');
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (urlState && router.isReady && !curArticle && typeof urlState !== 'string' && urlState.every((subslug: string) => typeof subslug === 'string')) {
      generateSummary((urlState as string[]).join('/'));
    }
  }, [router.isReady, urlState]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    generateSummary();
  };

  const generateSummary = async (url?: string) => {
    setSummary('');
    if (url) {
      setCurArticle(url);
    } else {
      router.replace(window.location.origin + '/' + curArticle);
    }

    if (!curArticle && !url) {
      toast.error('Url is mandatory');
      return;
    }

    if (!apiToken) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    const response = await fetch('/api/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url ? url : curArticle, apiToken }),
    });

    if (!response.ok) {
      toast.error('Sorry something went wrong');
      return;
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setSummary((prev) => prev + chunkValue);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col pt-8 sm:pt-12">
      <Head>
        <title>SaaS Pricing Page Scraper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto mt-10 flex max-w-5xl flex-1 flex-col items-center justify-center px-2 sm:mt-20">
        <StartGithub />
        <h1 className="max-w-5xl text-4xl font-bold sm:text-7xl">
          Scrape{' '}
          <span className="relative whitespace-nowrap text-[#3290EE]">
            <SquigglyLines />
            <span className="relative text-rose-500">SaaS Pricing</span>
          </span>{' '}
          with AI
        </h1>
        <p className="mt-10 text-center text-lg text-gray-500 sm:text-2xl">
          Copy and paste any product's <span className="text-rose-500">pricing link </span>
          below.
        </p>
        <form className="flex w-full flex-col justify-center sm:w-3/4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="https://www.chargebee.com/pricing/"
            value={curArticle}
            onChange={(e) => setCurArticle(e.target.value)}
            className="mx-auto mt-10 w-full rounded-lg border border-gray-500 bg-black p-3 outline-1 outline-white sm:mt-7"
          />
          {!loading && (
            <button type="submit" className="z-10 mx-auto mt-7 w-3/4 rounded-2xl border-gray-500 bg-rose-500 p-3 text-lg font-medium transition hover:bg-rose-400 sm:mt-10 sm:w-1/3">
              Scrape →
            </button>
          )}
        </form>
        {loading && (
          <button className="z-10 mx-auto mt-7 w-3/4 cursor-not-allowed rounded-2xl border-gray-500 bg-rose-500 p-3 text-lg font-medium transition hover:bg-rose-400 sm:mt-10 sm:w-1/3" disabled>
            <div className="flex items-center justify-center text-white">
              <Image src="/loading.svg" alt="Loading..." width={28} height={28} />
            </div>
          </button>
        )}
        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        {summary && (
          <div className="mb-10 w-full px-4 sm:w-3/4">
            <h2 className="mx-auto mt-16 max-w-3xl border-t border-gray-600 pt-8 text-center text-3xl font-bold sm:text-5xl">Result</h2>
            <div className="mx-auto mt-6 max-w-3xl text-lg leading-7">
              <Code content={summary} />
            </div>
          </div>
        )}
      </main>
      <Footer />
      <CollectAPITokenModal showModal={showModal} setShowModal={setShowModal} apiToken={apiToken} setApiToken={setApiToken} />
    </div>
  );
};

export default Home;
