import themes from '@/assets/gogh.json';

const { theme } = JSON.parse(document.body.dataset.env);

export function getTheme() {
  let json = undefined;

  if (theme === 'random') {
    json = themes[Math.floor(Math.random() * themes.length)];
  } else {
    json = themes.find(
      (name) => theme.replaceAll(' ', '-').toLowerCase() === name.id
    );
  }

  return json;
}

export function setCSS(colors) {
  const outline = [
    colors.blue,
    colors.cyan,
    colors.green,
    colors.magenta,
    colors.red,
    colors.yellow,
  ];
  const root = document.querySelector(':root');

  root.style.setProperty('--theme-background', colors.background);
  root.style.setProperty('--theme-foreground', colors.foreground);
  root.style.setProperty(
    '--theme-outline',
    outline[Math.floor(Math.random() * outline.length)]
  );
}
