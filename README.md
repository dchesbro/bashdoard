# Bashdoard

A simple, faux terminal dashboard for servers running Docker.

<img width="792" alt="Screenshot 2023-08-06 at 3 30 00 PM" src="https://github.com/dchesbro/bashdoard/assets/18583653/7d0a6329-ae27-485b-8e9b-4dcf31ef24b5">

## What does Bashdoard do?

Bashdoard displays the server name, time, and an alphabetical list of Docker 
containers including their ID, image, status, and name. That's it.

## Why did you build Bashdoard?

Because I wanted a simple dashboard and was not completely satisfied with other 
similar projects. I also think terminal interfaces look really cool.

## How can I use Bashdoard?

Bashdoard is configured using a `.env` file and includes the following options:

```
NEXT_PUBLIC_HOSTNAME      // The default base URL for containers with defined ports.
NEXT_PUBLIC_THEME_DEFAULT // The name of a valid color theme, or `random` for a random theme.
NEXT_PUBLIC_TITLE         // The server name used in the page title and MOTD.
```
