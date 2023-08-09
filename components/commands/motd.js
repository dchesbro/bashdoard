import figlet from 'figlet';
import font from '../../node_modules/figlet/importable-fonts/Electronic.js';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const motd = () => {
  figlet.parseFont('ParseFont', font);

  const banner = figlet.textSync(publicRuntimeConfig.title, {
    font: 'ParseFont',
    whitespaceBreak: true,
  });

  return banner + '\r\n' + 'Last login: ' + new Date().toString() + '\r\n';
};
