import axios from 'axios';
import Cors from 'cors';

/**
 * Initialize the cors middleware.
 * 
 * @see https://github.com/expressjs/cors#configuration-options
 */
const cors = Cors({
  methods: ['GET'],
});

/**
 * Helper function to wait for a middleware to execute before continuing, and 
 * to throw an error if any errors occur in a middleware callback.
 */
const runMiddleware = (req, res, callback) => {
  return new Promise((resolve, reject) => {
    callback(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    });
  });
}

export default async function handler(req, res) {

  // Run middleware(s).
  await runMiddleware(req, res, cors);

  // Rest of the API logic.
  const { data } = await axios.get(
    `http://localhost/containers/json`,
    {
      params: {
        all: 1,
      },
      socketPath: '/var/run/docker.sock',
    }
  );

  res.json(data);
}
