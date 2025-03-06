---
sidebar_position: 1
sidebar_label: Quickstart
---


# Quickstart

This guide provides an easy Docker Compose setup to help you try Tenzu locally in under two minutes.
:::danger
Do not use this setup to deploy
:::

## Prerequisite

Make sure you have **[Docker Desktop](https://www.docker.com/get-started/)** installed (yes, even for Linux).

## Setup Environment

[Download](https://github.com/BIRU-Scop/tenzu-docs/releases/download/archive/quickstart.tar.gz) and extract the Quickstart package:

```bash
# Download the Quickstart package
curl -L -o quickstart.tar.gz https://github.com/BIRU-Scop/tenzu-docs/releases/download/archive/quickstart.tar.gz

# Extract the downloaded file
tar -xvzf quickstart.tar.gz

# go into the directory
cd quickstart
```

## Start Tenzu

Run the Tenzu application locally:

```bash
# Install with minimal data
# apply the database migration
docker compose run --remove-orphans migrate-job
# deploy the assets files
docker compose run --remove-orphans collectstatic
# load required data
docker compose run --remove-orphans load-init-fixtures

# Install with sample data (demo mode)
# Note: Wait until the demo fixture has finished loading before accessing the app.
docker compose run --remove-orphans load-demo-data 

# Run again after first installation
docker compose --profile start up
```

### Access Tenzu

Once running, open [localhost:8001](http://localhost:8001/) in your browser.

#### Change the local port number

If you need to change the local port that is used because `8001` is not accessible on your machine, you need to update the port number in several places:
- `.env`: the `LOCAL_PORT` value
- `tenzu.env`: the `TENZU_BACKEND_URL` and `TENZU_FRONTEND_URL` values
- `config-front.json`: the `baseDomain` and `wsUrl` values
:::tip
A find and replace of `8001` to whatever you want inside the quickstart folder will also do the trick.
:::

### User Accounts

#### Default admin user
- **Username:** `admin`
- **Password:** `123123`

#### Demo users accounts
These account are only available if you have used the provided sample data.
- **Usernames:** from `1user` to `1003user`
- **Password:** `123123`

**Enjoy exploring Tenzu!**

