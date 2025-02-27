---
sidebar_position: 2
sidebar_label: Docker Compose
---

# Docker Compose for Production

:::danger
Tenzu is not yet ready to be used in production environment.
We have some more updates incoming before then.
:::

## Introduction 
This guide will explain how to install Tenzu in production mode using HTTPS
for very simple use cases (evaluate, small volumes, *etc*)

:::warning
This recipe does not manage:
- Database high availability and backup
- Backup of user files
:::

## Prerequisites

You'll need the following environment.

- A server running a Linux distribution
- Docker (version >= 24)
- Ports 80 and 443 to be opened
- A domain name pointing to the server IP: example.domain.name

:::info
The port 80 is used to renew the HTTPS certificate.
HTTP request are all automatically redirected to HTTPS except for the automatic certificate renewal process.
:::

You'll then need to run some setup tasks before being able to run Tenzu itself.

### Setup Environment

[Download](https://github.com/BIRU-Scop/tenzu-docs/releases/download/archive/production.tgz) and extract the production package:

```bash
# Download the Production package
curl -L -o production.tgz https://github.com/BIRU-Scop/tenzu-docs/releases/download/archive/production.tgz

# Extract the downloaded file
tar -xvzf production.tgz

# go into the directory
cd production
```

### Configuration

You need to edit the file `initial-configurations/generate.env` and replace every values with what you want to use.

:::warning
Keep the values in between single quotes if you don't want any problem with shell interpretation of symbols like `$`.
:::

:::tip
You can use [djcrety](https://djecrety.ir/) to generate the two keys.
:::

import CodeBlock from '@theme/CodeBlock';
import GenerateEnv from '!!raw-loader!../../examples/production/initial-configurations/generate.env';

<CodeBlock language="bash" title="production/initial-configurations/generate.env">{GenerateEnv}</CodeBlock>

After changing every values, you need to run the following command that will create all 
the needed configuration files
:::danger
This command replace existing configuration files each time.
Once you're done and satisfied with your installation, you shouldn't run it anymore.
:::

```bash
docker compose run --remove-orphans generate-config
```


#### Configuration files

The previous command will automatically generate the following configuration files that you can further edit if you need to.
:::warning
If you change one of the value that was previously set using `initial-configurations/generate.env`,
take care to change it everywhere it is used either using the `generate-config` command again or
manually if you've already made some changes you want to keep to the configurations files.
:::

##### tenzu.env
This file is used to define Tenzu environment variables used by the backend, see the [documentation about them](../configuration.md#configure-tenzu-backend).

##### config-front.json
This file is used to define Tenzu configuration variables used by the frontend, see the [documentation about them](../configuration.md#configure-tenzu-frontend).

##### caddy/caddy.env
This file will be used to set the domain name used by the reverse proxy configuration (in `production/caddy/Caddyfile`)
It should not be edited except if you're changing the domain name everywhere without using `generate-config`.

##### db.env
This file is used to define Postgresql environment variables used by the database, see the [documentation about them](https://hub.docker.com/_/postgres).

## How to run

### Install
Run:

```bash
# apply the database migration
docker compose run --remove-orphans migrate-job
# deploy the assets files
docker compose run --remove-orphans collectstatic
# load required data
docker compose run --remove-orphans load-init-fixtures
```

If you want to try out the demo sample data:

```bash
docker compose run --remove-orphans load-demo-data # load some dummy data
```

If you want to lock the version of Tenzu, edit the `.env` file and replace "latest" with the image tag 
of the version you want to use.

```bash
BACKEND_IMAGE_TAG="latest"
FRONTEND_IMAGE_TAG="latest"
```

### Start

```bash
docker compose --profile start up --wait -d
```

This command is used to run Tenzu in a background task. If there is a crash, they will restart automatically.

:::note
When everything run as you want it to, delete the `initial-configuration` directory to prevent from using it again.
:::

### Update

If you have locked the version of Tenzu, change the tag to use the new version that you want.

In any case, run the following:

```bash
# download the new images
docker compose pull tenzu-back
docker compose pull tenzu-front
# stop all services
docker compose --profile start stop
# apply change from new version
docker compose run --remove-orphans migrate-job 
docker compose run --remove-orphans collectstatic
# start Tenzu again
docker compose --profile start up --wait -d
```

:::danger
Once you run the `stop` command and until you run `up` again, Tenzu will be inaccessible.
:::

### Services Overview

Here's an overview of the services used in the docker-compose:

- **`tenzu-back`**: The API server backend of the app.
- **`tenzu-worker`**: The task queue worker of the app.
- **`tenzu-db`**: Postgres database.
- **`tenzu-redis`**: Redis database used by websockets (take care of the licence if you change the version)
- **`tenzu-front`**: The frontend of the app.
- **`caddy`**: Reverse proxy to expose the frontend and backend endpoints as well as serve public files.

Some useful jobs to interact with the app:
- **`migrate-job`**: Run the migration that have not been applied yet.
- **`collectstatic`**: Build the assets files.
- **`load-init-fixture`**: Load all required data before you can use the app.
- **`load-demo-data`**: Loads sample data to test the app.
- **`generate-config`**: **Replace** config files with their initial values using provided environment.


## Troubleshooting 

### Permission access error

Please note that in the image we set the user to `default-user:default-group` and that only the following paths are owned by this user:
- `/tenzu`
- `/public`

If you get permission error about some path, this can be the root cause.
<details>
  <summary>See Dockerfile</summary>
```docker reference title="tenzu/Dockerfile"
https://github.com/BIRU-Scop/tenzu-back/blob/main/buildrun/docker/tenzu/Dockerfile
```
</details>
