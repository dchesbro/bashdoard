# Bashdoard

A simple, faux terminal dashboard for servers running Docker.

## What does Bashdoard do?

Bashdoard displays the server name, time, and an alphabetical list of Docker 
containers including their ID, image, status, and name. That's it.

## Why did you build Bashdoard?

Because I wanted a simple dashboard and was not completely satisfied with other 
similar projects. I also think terminal interfaces look really cool.

## How can I use Bashdoard?

Bashdoard is configured using a `.env` file and includes the following options:

```
NEXT_PUBLIC_BSHDRD_HOSTNAME // The server hostname for containers with defined ports.
NEXT_PUBLIC_BSHDRD_THEME    // The name of a valid color theme, or `random` for a random theme.
NEXT_PUBLIC_BSHDRD_TITLE    // The server name used in the page title and MOTD.
```
