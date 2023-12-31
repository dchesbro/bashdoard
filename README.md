# Bashdoard

A simple faux terminal dashboard for servers running Docker.

<img width="100%" alt="258669310-6d908e02-a18c-47dc-91e9-bedced159600" src="https://github.com/dchesbro/bashdoard/assets/18583653/38e3e375-8c60-41b6-ab6d-5c4580817096">

## What does Bashdoard do?

Bashdoard displays the server name, time, and an alphabetical list of Docker 
containers including their ID, image, status, and name. That's all, folks!

## Why did you build Bashdoard?

Because I wanted a simple dashboard for my home server and was not completely 
satisfied with other projects. I also think terminal interfaces look cool.

## How can I use Bashdoard?

The easiest way to deploy Bashdoard is by using Docker:

```
docker run --name bashdoard -e BASHDOARD_HOSTNAME=localhost -e BASHDOARD_THEME=random -e BASHDOARD_TITLE=BSHDRD -p 80:3300 -v /var/run/docker.sock:/var/run/docker.sock:ro ghcr.io/dchesbro/bashdoard:main
```

Or Docker Compose:

```
bashdoard:
  container_name: bashdoard
  environment:
    - BASHDOARD_HOSTNAME=localhost
    - BASHDOARD_THEME=random
    - BASHDOARD_TITLE=BSHDRD
  image: ghcr.io/dchesbro/bashdoard:main
  ports:
    - 80:3300
  restart: unless-stopped
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
```

Bashdoard is configured using environment variables and includes the following 
options:

```
BASHDOARD_HOSTNAME // The server hostname for containers with defined ports.
BASHDOARD_THEME    // The name of a valid color theme, or `random` for a random theme each time.
BASHDOARD_TITLE    // The server name used in the page title and MOTD.
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
