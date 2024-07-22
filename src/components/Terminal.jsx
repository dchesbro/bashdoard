'use client';

import { docker } from '@/commands/docker';
import { findTheme, setCSS } from '@/commands/theme';
import { FitAddon } from '@xterm/addon-fit';
import { motd } from '@/commands/motd';
import { Terminal as XTerm } from '@xterm/xterm';
import { useEffect } from 'react';
import { WebglAddon } from '@xterm/addon-webgl';
import { WebLinksAddon } from '@xterm/addon-web-links';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default function Terminal() {
  useEffect(() => {
    // variables
    const { colors } = findTheme(publicRuntimeConfig.theme);
    const fitAddon = new FitAddon();
    const isMobile = window.matchMedia('(max-width: 768px)');
    const terminal = new XTerm({
      altClickMovesCursor: false,
      cols: 0,
      convertEol: true,
      disableStdin: true,
      fontSize: getFontSize(isMobile.matches),
      lineHeight: 1.2,
      linkHandler: {
        activate: (e, uri) => {
          const newWindow = window.open();

          if (newWindow) {
            try {
              newWindow.opener = null;
            } catch {}

            newWindow.location.href = uri;
          }
        },
      },
      scrollOnUserInput: false,
      theme: {
        ...colors,
        cursor: colors.background,
      },
    });

    // functions
    async function exec() {
      terminal.writeln(motd());
      terminal.writeln(await docker(isMobile.matches));
      fitAddon.fit();
    }

    function getFontSize(bool) {
      return bool ? 11 : 13;
    }

    // events
    isMobile.addEventListener('change', ({ matches }) => {
      terminal.clear();
      terminal.options.fontSize = getFontSize(matches);
      exec();
    });
    window.addEventListener('resize', () => fitAddon.fit());

    /**
     * XTerm.js
     */

    // set CSS theme variables
    setCSS(colors);

    // load addons
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new WebglAddon());
    terminal.loadAddon(new WebLinksAddon());

    // initialize terminal
    terminal.open(document.querySelector('.wrapper'));
    exec();

    return () => {
      terminal.dispose();
    };
  }, []);

  return (
    <div id='b-term'>
      <div className='wrapper'></div>
    </div>
  );
}
