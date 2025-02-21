---
sidebar_position: 2
---

# Docker Compose

Examples and usage of Docker Compose.


## Services Overview

Here's an overview of the services used in the quickstart docker-compose:

- **tenzu-back**: The backend of the app.
- **tenzu-db**: Postgres 15 database.
- **tenzu-redis**: Redis 7 database.
- **tenzu-front**: The frontend of the app.
- **caddy**: Reverse proxy to expose the front and back parts.

Some jobs useful for using the app:
- **migrate-job**: Performs the migration at the start of the app.
- **load-init-fixture**: Installs all the fixtures for a first install.
- **load-demo-data**: Loads sample data to test the app.

You can change the version of Tenzu by editing the values for `BACKEND_IMAGE_TAG` and `FRONTEND_IMAGE_TAG` in the compose env file (`.env`).

If you upgrade the image tag of the backend, you'll need to run the update profile of the docker compose
```bash
docker compose --profile update up
```

## Configure with HTTPS

You can configure the app to accept HTTPS in different ways.

In our development environment, we use the `ACME DNS challenge`.

To achieve that, we build the Caddy image with [`caddy-dns`](https://github.com/caddy-dns/ovh).

Here is our example Dockerfile:

```docker reference title="caddy-dockerfile"
https://github.com/BIRU-Scop/tenzu-back/blob/main/buildrun/docker/caddy/Dockerfile
```

## Troubleshooting 

### Volume Mount Issues

If you want to change the volume of the Docker Compose, please note that we're copying the code with the permission `default-user:default-group`.

This can be the source of your error. More details below:

```docker reference title="tenzu-dockerfile"
https://github.com/BIRU-Scop/tenzu-back/blob/main/buildrun/docker/tenzu/Dockerfile
```