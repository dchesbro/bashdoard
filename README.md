# Bashdoard

A faux terminal dashboard for servers running Docker.

## What does Bashdoard do?

Bashdoard displays the server name, time, and an alphabetical list of Docker
containers including their ID, image, status, and name. That's it.

## Why did you build Bashdoard?

Because I wanted a simple dashboard for my home server and was not completely
satisfied with other projects. I also think terminal interfaces look cool.

## How can I use Bashdoard?

The easiest way to deploy Bashdoard is by using Docker:

```
docker run --name bashdoard -e BSHDRD_HOSTNAME=localhost -e BSHDRD_THEME=random -e BSHDRD_TITLE=BSHDRD -p 80:3000 -v /var/run/docker.sock:/var/run/docker.sock:ro ghcr.io/dchesbro/bashdoard:main
```

Or Docker Compose:

```
bashdoard:
  container_name: bashdoard
  environment:
    - BSHDRD_HOSTNAME=localhost
    - BSHDRD_THEME=random
    - BSHDRD_TITLE=BSHDRD
  image: ghcr.io/dchesbro/bashdoard:main
  ports:
    - 80:3000
  restart: unless-stopped
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
```

Bashdoard is configured using environment variables and includes the following
options:

```
BSHDRD_HOSTNAME // The server hostname for containers with defined ports.
BSHDRD_THEME    // The name of a valid color theme ID, or `random` for a random theme each time.
BSHDRD_TITLE    // The server name used in the page title and MOTD.
```

Color themes are provided by [Gogh](https://github.com/Gogh-Co/Gogh) and can be
previewed [here](https://gogh-co.github.io/Gogh/).

By default all containers will be displayed, and individual containers can be
configured using the following labels:

```
example_container:
  labels:
    - bashdoard.hide=true                     // Hide the container from Bashdoard list.
    - bashdoard.port=3000                     // The container port, uses the defined hostname as base URL.
    - bashdoard.url=http://container.host.tld // The container URL or any other URL, overrides port label if also defined.
```
