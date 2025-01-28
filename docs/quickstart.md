---
sidebar_position: 1
slug: /
---

# Quickstart

Get started with Tenzu quickly using either a Helm chart or Docker Compose.

This guide provides an easy Docker Compose setup to help you try Tenzu in under two minutes.

## Requirements

Make sure you have the following installed:

- **Docker**
- **Docker Compose**

## Setup Environment

Download and extract the Quickstart package:

You can downlaod the zipped example [here](../static/examples/quickstart.tgz).

```bash
# Extract the downloaded file
tar -xvzf quickstart.tgz
```

## Start Tenzu

Run the Tenzu application on `localhost:8000`:

```bash
cd quickstart

# Fresh install
docker compose --profile install up -d --wait

# Install with sample data (demo mode)
# Note: Wait until the demo fixture loading is complete before accessing the app.
docker compose --profile install --profile demo up -d --wait
```

### Access Tenzu

Once running, open [localhost:8000](http://localhost:8000/) in your browser.

## User Accounts

### Default Admin User
- **Username:** `admin`
- **Password:** `123123`

### Demo Accounts (if using sample data)
- **Usernames:** `1user` to `1003user`
- **Password:** `123123`

Enjoy exploring Tenzu!

