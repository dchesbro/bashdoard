import figlet from 'figlet';
import font from '../../node_modules/figlet/importable-fonts/Electronic.js';

export const motd = () => {
  figlet.parseFont('ParseFont', font);

  const banner = figlet.textSync(process.env.NEXT_PUBLIC_TITLE, {
    font: 'ParseFont',
    whitespaceBreak: true,
    width: 80,
  });

  return banner + '\r\n' + 'Last login: ' + new Date().toString() + '\r\n';
};
