import axios from 'axios';
import columnify from 'columnify';

export const docker = async (argv, globals) => {
  const { c } = globals;

  function getNames(container) {
    let names = container.Names[0].replace('/', '');
    let url = '';

    if (Object.keys(container.Labels).length !== 0) {

      // If port label found, set to hostname and port...
      if ('bashdoard.port' in container.Labels)  {
        const port = container.Labels['bashdoard.port'];

        url = `http://${process.env.NEXT_PUBLIC_HOSTNAME}:${port}`;

      // ...else, if URL label found, set to URL.
      } else if ('bashdoard.url' in container.Labels) {
        url = container.Labels['bashdoard.url'];
      }
    }

    if (url) {
      names = '\x1b]8;;' + url + '\x07' + names + '\x1b]8;;\x07';
    }

    return names;
  };

  function getStatus(container) {
    let color = '';
    
    switch (container.State) {
      case 'running':
        color = 'greenBright';
        break;
      case 'created':
      case 'paused':
      case 'removing':
      case 'restarting':
        color = 'yellowBright';
        break;
      case 'dead':
      case 'exited':
        color = 'redBright';
        break;
      default:
        color = 'unstyle';
        break;
    }

    return `${c[color]('✱')} ${container.Status}`;
  };

  try {
    const { data } = await axios.get(`api/containers`);
    const containers = data
      .filter((container) => (
        !container.Labels['bashdoard.hide']
      )).sort((a, b) => (
        (a['Names'][0] > b['Names'][0]) ? 1 : -1
      )).map((container) => (
        {
          container_id: container.Id,
          image: container.Image,
          status: getStatus(container),
          names: getNames(container),
        }
      ));
    const options = {
      columns: [
        'container_id',
        'image',
        'status',
        'names',
      ],
      columnSplitter: '   ',
      config: {
        container_id: {
          maxWidth: 12,
        },
        image: {
          maxWidth: 24,
        },
      },
      headingTransform: (heading) => (
        heading.replace('_', ' ').toUpperCase()
      ),
      truncate: true,
    };
  
    return columnify(containers, options);
  } catch (error) {
    return `Docker API error: ${error}`;
  }
}
