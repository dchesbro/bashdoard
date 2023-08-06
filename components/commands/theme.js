import themes from '/assets/gogh.json';

export const findTheme = (name) => {
  let theme = false;

  if (name === 'random') {
    theme = themes[Math.floor(Math.random() * themes.length)];
  } else {
    theme = themes.find((theme) => (
      name.replaceAll(' ', '-').toLowerCase() === theme.id
    ));
  }

  console.log('Found theme:', theme.id);

  return theme;
};

export const setCSS = (colors) => {
  const root = document.documentElement;

  root.style.setProperty('--theme-background', colors.background);
  root.style.setProperty('--theme-foreground', colors.foreground);
  root.style.setProperty('--theme-outline', colors.red);
};
