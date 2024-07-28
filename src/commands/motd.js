import figlet from 'figlet';
import font from 'figlet/importable-fonts/Bloody';

const { title } = JSON.parse(document.body.dataset.env);

export function motd() {
  figlet.parseFont('ParseFont', font);

  const banner = figlet.textSync(title, {
    font: 'ParseFont',
    whitespaceBreak: true,
  });

  return `${banner}\r\nLast login: ${new Date().toUTCString()}\r\n`;
}
