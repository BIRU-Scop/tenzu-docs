---
sidebar_position: 1
sidebar_label: Quickstart
---


# Quickstart

This guide provides an easy Docker Compose setup to help you try Tenzu locally in under two minutes.

## Prerequisite

Make sure you have **[Docker Desktop](https://www.docker.com/get-started/)** installed (yes, even for Linux).

## Setup Environment

[Download](https://github.com/BIRU-Scop/tenzu-docs/releases/download/archive/quickstart.tgz) and extract the Quickstart package:

```bash
# Download the Quickstart package
curl -L -o quickstart.tgz https://github.com/BIRU-Scop/tenzu-docs/releases/download/archive/quickstart.tgz

# Extract the downloaded file
tar -xvzf quickstart.tgz
```

## Start Tenzu

Run the Tenzu application locally:

```bash
cd quickstart

# Install with minimal data
docker compose run --remove-orphans migrate-job # apply the database migration
docker compose run --remove-orphans collectstatic # deploy the assets files
docker compose run --remove-orphans load-init-fixtures

# kill with th
# Install with sample data (demo mode)
# Note: Wait until the demo fixture has finished loading before accessing the app.
docker compose run --remove-orphans load-demo-data 

# Run again after first installation
docker compose --profile start up
```

### Access Tenzu

Once running, open [localhost:8000](http://localhost:8000/) in your browser.

### User Accounts

#### Default admin user
- **Username:** `admin`
- **Password:** `123123`

#### Demo users accounts
These account are only available if you have used the provided sample data.
- **Usernames:** from `1user` to `1003user`
- **Password:** `123123`

**Enjoy exploring Tenzu!**

