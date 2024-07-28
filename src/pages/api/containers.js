import axios from 'axios';

export async function GET() {
  const { data } = await axios.get(
    `http://${process.env.PUBLIC_HOSTNAME}/containers/json`,
    {
      params: { all: 1 },
      socketPath: '/var/run/docker.sock',
    }
  );

  return new Response(JSON.stringify(data));
}
