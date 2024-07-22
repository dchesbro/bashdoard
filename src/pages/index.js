import dynamic from 'next/dynamic';
import getConfig from 'next/config';
import Head from 'next/head';

const { publicRuntimeConfig } = getConfig();
const Terminal = dynamic(() => import('@/components/Terminal'), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <Head>
        <link href='/favicon.ico' rel='icon' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <title>{publicRuntimeConfig.title}</title>
      </Head>
      <Terminal />
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
