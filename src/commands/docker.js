import axios from 'axios';
import c from 'ansi-colors';
import columnify from 'columnify';

const { hostname } = JSON.parse(document.body.dataset.env);

c.enabled = true;

function formatName(container) {
  let name = container.Names[0].replace('/', '');
  let url;

  if (Object.keys(container.Labels).length) {
    if (container.Labels['bashdoard.port']) {
      url = `http://${hostname}:${container.Labels['bashdoard.port']}`;
    } else if (container.Labels['bashdoard.url']) {
      url = container.Labels['bashdoard.url'];
    }
  }

  if (url) {
    name = '\x1b]8;;' + url + '\x07' + name + '\x1b]8;;\x07';
  }

  return name;
}

function formatStatus(container) {
  let color;

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
}

export async function docker(mobile) {
  try {
    const { data } = await axios.get('api/containers');
    const containers = data
      .filter((a) => !a.Labels['bashdoard.hide'])
      .sort((a, b) => (a['Names'][0] > b['Names'][0] ? 1 : -1))
      .map((a) => ({
        ...(mobile ? {} : { container_id: a.Id, image: a.Image }),
        ...{ status: formatStatus(a), names: formatName(a) },
      }));
    const options = {
      columns: [
        ...(mobile ? [] : ['container_id', 'image']),
        ...['status', 'names'],
      ],
      columnSplitter: '   ',
      config: {
        container_id: { maxWidth: 12 },
        image: { maxWidth: 24 },
      },
      headingTransform: (a) => c.bold(a.replace('_', ' ').toUpperCase()),
      truncate: true,
    };

    return columnify(containers, options);
  } catch (error) {
    return `Docker API error: ${error}`;
  }
}
