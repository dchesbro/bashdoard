import themes from '@/assets/gogh.json';

export function findTheme(name) {
  let theme = undefined;

  if (name === 'random') {
    theme = themes[Math.floor(Math.random() * themes.length)];
  } else {
    theme = themes.find(
      (theme) => name.replaceAll(' ', '-').toLowerCase() === theme.id
    );
  }

  return theme;
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
