import axios from 'axios';

export default async function handler(req, res) {
  const { data } = await axios.get(`http://localhost/containers/json`, {
    params: { all: 1 },
    socketPath: '/var/run/docker.sock',
  });

  return res.json(data);
}
