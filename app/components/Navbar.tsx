import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  let navbarLeft = (
    <Link href={'/'}>
      <h1 className="bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text pb-8 pt-4 text-center text-xl font-medium tracking-tight text-transparent sm:text-2xl md:text-4xl dark:from-black dark:via-[#575757] dark:to-[#171717]">
        Blogtify
      </h1>
    </Link>
  );

  let navbarRight = null;

  if (!session) {
    navbarRight = (
      <Link href={'/api/auth/signin'} className="btn btn-ghost rounded-md">
        Sign in
      </Link>
    );
  }

  if (session) {
    navbarRight = (
      <>
        <p className="my-auto text-sm text-gray-500 sm:inline">
          {session.user?.name}
        </p>
        <div className="divider divider-horizontal"></div>
        <button onClick={() => signOut()} className="btn btn-ghost">
          Log out
        </button>
      </>
    );
  }

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      {navbarLeft}
      <div className="fixed bottom-1 left-0 flex h-auto w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:size-auto lg:bg-none dark:from-black dark:via-black">
        {navbarRight}
      </div>
    </div>
  );
};

export default Navbar;
