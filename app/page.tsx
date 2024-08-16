import { Suspense } from 'react';
import Loading from './components/Loading';
import Posts from './components/Posts';

export default function Home() {
  return (
    <>
      <h1 className="mt-10 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text pb-8 pt-4 text-center text-3xl font-medium tracking-tight text-transparent md:text-7xl dark:from-black dark:via-[#575757] dark:to-[#171717]">
        Blogtify
      </h1>
      <Suspense fallback={<Loading />}>
        <Posts />
      </Suspense>
    </>
  );
}
