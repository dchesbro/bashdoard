import dynamic from 'next/dynamic';
import getConfig from 'next/config';
import Head from 'next/head';

const { publicRuntimeConfig } = getConfig();
const Terminal = dynamic(() => import('../components/Terminal'), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="terminal-wrapper">
        <Terminal />
      </div>
    </>
  )
}
