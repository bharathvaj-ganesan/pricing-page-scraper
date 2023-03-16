import { Poppins } from '@next/font/google';
import clsx from 'clsx';
import Image from 'next/image';
import Github from '../components/GitHub';

const poppins = Poppins({ weight: '800', subsets: ['latin'] });

export default function Header() {
  return (
    <div className="flex items-center justify-between px-3 sm:px-3">
      <a className="flex items-center space-x-3" href="https://pricing-page-scraper.vercel.app/">
        <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          ></path>
        </svg>
        <h2 className={clsx('text-lg sm:text-3xl', poppins.className)}>
          <span className="text-rose-500">Pricing</span> Scraper
        </h2>
      </a>
      <a href="https://github.com/bharathvaj-ganesan/pricing-page-scraper" rel="noreferrer noopener" target="_blank" className="">
        <Github width="33" height="33" />
      </a>
    </div>
  );
}
