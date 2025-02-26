---
sidebar_position: 2
---



# Introduction 
Le guide suivant explique comment installer tenzu en mode production en HTTPS pour un usage trés simple (évaluation, petit moyen, etc)


:::warning

Cet exemple ne gére pas :
- la redondance de la base de donnée, ni sa sauvegarde
- la sauvegarde des fichiers des utilisateurs

:::

# Prerequis

- un server avec une distribution linux
- docker (version >= 24)
- Les ports 80 et 443 ouverts
- Un domaine name pointant sur l'ip du serveur : example.domain.name

Le port 80 sert au renouvellement du certificat HTTPS. Les requetes http sont redirigées automatiquement sur le https à l'exception de la procédure automatique du renouvellement du certificat

## Setup Environment

[Download](https://github.com/BIRU-Scop/tenzu-docs/releases/download/archive/production.tgz) and extract the production package:

```bash
# Download the Production package
curl -L -o production.tgz https://github.com/BIRU-Scop/tenzu-docs/releases/download/archive/production.tgz

# Extract the downloaded file
tar -xvzf production.tgz

# go into the directory
cd production
```

## Configuration

into the initial-configurations directory, 
edit the generate.env file

import CodeBlock from '@theme/CodeBlock';
import GenerateEnv from '!!raw-loader!../../examples/production/initial-configurations/generate.env';

<CodeBlock language="bash" title="examples/quickstart/demo.env">{GenerateEnv}</CodeBlock>


You can use [djcrety](https://djecrety.ir/) to generate the two key

run the command to generate configuration files:

```bash
 docker compose run --remove-orphans generate-config
```
:::warning
La command remplace les fichiers existants, une fois l'installation fini et fonctionnelle ne plus lancer cette commande
:::



# Configuration
## tenzu.env
Le fichier sert à définir les variables d'environnement de tenzu.

[Configuration](../configuration.md#configure-tenzu-backend)


## config-front.json
Le fichier sert à définir les variables de configuration du client front.

[Configuration](../configuration.md#configure-tenzu-frontend)

## caddy/caddy.env
Le fichier sert à définir le domaine name. Une fois l'installation fini ne pas le changer sans le changer partout dans les autres fichiers

## db.env
Le fichier sert à définir les variables d'environment pour configurer la base de donnée. 

[Documentation](https://hub.docker.com/_/postgres)

# install 

Run

```bash
docker compose run --remove-orphans migrate-job # apply the database migration
docker compose run --remove-orphans collectstatic # deploy the assets files
docker compose run --remove-orphans load-init-fixtures # load some needed data
```

If you want to try with the demo set data

```bash
docker compose run --remove-orphans load-demo-data # load some needed data
```

If you want to fix the version of tenzu edit the .env file and replace  latest by the tag of the version

```bash
BACKEND_IMAGE_TAG="latest"
FRONTEND_IMAGE_TAG="latest"
```

:::warning
When everything are ok, delete the initial-configuration directory 
:::

# Update

If you had fixe the version of tenzu, change for the new version

Run

```
docker compose pull tenzu-back
docker compose pull tenzu-front
docker compose stop
docker compose run --remove-orphans migrate-job 
docker compose run --remove-orphans collectstatic
```


# Start

```bash
docker compose --profile start up --wait -d
```

The service will started with the server 

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



## Troubleshooting 

### Volume Mount Issues

If you want to change the volume of the Docker Compose, please note that we're copying the code with the permission `default-user:default-group`.

This can be the source of your error. More details below:
<details>
  <summary>Toggle me!</summary>
```docker reference title="tenzu-dockerfile"
https://github.com/BIRU-Scop/tenzu-back/blob/main/buildrun/docker/tenzu/Dockerfile
```
</details>
