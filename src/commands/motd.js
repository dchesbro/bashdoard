import figlet from 'figlet';
import font from 'figlet/importable-fonts/Bloody';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export function motd() {
  figlet.parseFont('ParseFont', font);

  const banner = figlet.textSync(publicRuntimeConfig.title, {
    font: 'ParseFont',
    whitespaceBreak: true,
  });

  return `${banner}\r\nLast login: ${new Date().toUTCString()}\r\n`;
}
