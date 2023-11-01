import { CanvasAddon } from 'xterm-addon-canvas';
import { findTheme, setCSS } from './commands/theme';
import { FitAddon } from 'xterm-addon-fit';
import { Terminal } from 'xterm';
import { useEffect, useRef } from 'react';
import { WebLinksAddon } from 'xterm-addon-web-links';
import * as commands from './commands';
import c from 'ansi-colors';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default () => {
  const colors = findTheme(publicRuntimeConfig.theme).colors;
  const fit = useRef(new FitAddon());

  useEffect(() => {
    const terminal = new Terminal({
      convertEol: true,
      disableStdin: true,
      fontSize: 13,
      linkHandler: {
        activate: (e, uri) => {
          const newWindow = window.open();
          
          if (newWindow) {
            try {
              newWindow.opener = null;
            } catch {}

            newWindow.location.href = uri;
          }
        }
      },
      scrollOnUserInput: false,
      theme: {
        ...colors,
        cursor: colors.background,
      },
    });

    const exec = async (input = null) => {
      if (!input) {
        return;
      }

      const [command, ...argv] = input.split(' ');

      if (commands[command]) {
        const output = await commands[command](argv, {
          c: c,
          terminal: terminal,
        });

        if (output) {
          terminal.writeln(output);
        }
      } else {
        terminal.writeln(c.bold.red(`Command not found: ${command}`));
      }
    };

    /**
     * ANSI colors
     * 
     * @see https://github.com/doowb/ansi-colors
     */

    // Toggle color support on.
    c.enabled = true;
    
    /**
     * XTerm
     * 
     * @see https://github.com/xtermjs/xterm.js
     */

    // Load addons.
    terminal.loadAddon(fit.current);
    terminal.loadAddon(new CanvasAddon());
    terminal.loadAddon(new WebLinksAddon());

    // Initialize terminal.
    terminal.open(document.getElementById('bterm'));
    terminal.write('\x1b[?25l');

    // Resize to fit.
    fit.current.fit();

    // Set theme color CSS variables.
    setCSS(terminal.options.theme);
    
    // Display message of the day and docker containers.
    (async () => {
      await exec('motd');
      await exec('docker');
    })();

    // Scroll to top of terminal buffer.
    setTimeout(() => {
      terminal.scrollToTop();
    }, 0);

    return () => {
      terminal.dispose();
    };
  }, []);

  window.addEventListener('resize', () => {
    fit.current.fit();
  });
  
  return (
    <div id="bterm" />
  );
};
