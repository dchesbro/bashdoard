import dynamic from 'next/dynamic';
import Head from 'next/head';

const Terminal = dynamic(() => import('../components/Terminal'), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="terminal-wrapper">
        <Terminal />
      </div>
    </>
  )
}
