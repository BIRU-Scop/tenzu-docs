---
sidebar_position: 1
---

# Configuration

Configure Tenzu application Docker images via the following methods.

## Configure Tenzu Backend

To configure the backend of Tenzu, modify the following environment variables:

| Name                              | Type    | Description                                                                 | Required | Default                                           |
|-----------------------------------|---------|-----------------------------------------------------------------------------|----------|:--------------------------------------------------|
| `TENZU_SECRET_KEY`                | String  | The [secret key](https://docs.djangoproject.com/fr/5.1/ref/settings/#secret-key) of the app | Yes      |                                                   |
| `TENZU_TOKENS__SIGNING_KEY`       | String  | The signing key for the tokens                                              | Yes      |                                                   |
| `TENZU_BACKEND_URL`               | String  | URL of the backend of Tenzu                                                 | Yes      | `http://localhost:8000`                           |
| `TENZU_FRONTEND_URL`              | String  | URL of the frontend of Tenzu                                                | Yes      | `http://localhost:4200`                           |
| `TENZU_DB__NAME`                  | String  | Database name                                                               | Yes      |                                                   |
| `TENZU_DB__USER`                  | String  | Database user name                                                          | Yes      |                                                   |
| `TENZU_DB__PASSWORD`              | String  | Database user password                                                      | Yes      |                                                   |
| `TENZU_DB__HOST`                  | String  | Database host                                                               | Yes      |                                                   |
| `TENZU_STATIC_ROOT`               | String  | Static root                                                                 | No       | `public/static`                                   |
| `TENZU_MEDIA_ROOT`                | String  | Media root                                                                  | No       | `public/media`                                    |
| `EXTRA_CORS`                      | Array   | Extra CORS URLs to add                                                      | No       | `[]`                                              |
| `TENZU_SUPORT_EMAIL`              | String  | Email for support                                                           | No       | `support@example.com`                             |
| `TENZU_EMAIL__EMAIL_BACKEND`      | String  | The backend system used to send email, recommended to change to `django.core.mail.backends.smtp.EmailBackend` | No       | `django.core.mail.backends.filebased.EmailBackend`|
| `TENZU_EMAIL__EMAIL_FILE_PATH`    | String  | Directory where the emails will be stored for file-based backend            | No       | `file_emails`                                     |
| `TENZU_EMAIL__DEFAULT_FROM_EMAIL` | String  | Default "from" email address                                                | No       | `username@domain.name`                            |
| `TENZU_EMAIL__EMAIL_HOST`         | String  | Host of your email server                                                   | No       | `localhost`                                       |
| `TENZU_EMAIL__EMAIL_PORT`         | Number  | Port of your email server                                                   | No       | `25`                                              |
| `TENZU_EMAIL__EMAIL_HOST_USER`    | String  | Username of the email host                                                  | No       | `""`                                              |
| `TENZU_EMAIL__EMAIL_HOST_PASSWORD`| String  | Password of the email host                                                  | No       | `""`                                              |
| `TENZU_EMAIL__EMAIL_USE_TLS`      | Boolean | Use TLS for email                                                           | No       | `False`                                           |
| `TENZU_EMAIL__EMAIL_USE_SSL`      | Boolean | Use SSL for email                                                           | No       | `False`                                           |
| `TENZU_EMAIL__EMAIL_SSL_CERTFILE` | String  | Path to a PEM-formatted certificate chain file for SSL connection           | No       | `None`                                            |
| `TENZU_EMAIL__EMAIL_SSL_KEYFILE`  | String  | Path to a PEM-formatted private key file for SSL connection                 | No       | `None`                                            |
| `TENZU_EMAIL__PORT`               | Number  | Port of your email server                                                   | No       | `25`                                              |
| `TENZU_EVENTS__REDIS_HOST`        | String  | Redis host                                                                  | No       | `tenzu-redis`                                     |
| `TENZU_EVENTS__REDIS_PORT`        | Number  | Redis port                                                                  | No       | `6379`                                            |
| `TENZU_EVENTS__REDIS_USERNAME`    | String  | Redis username                                                              | No       | `""`                                              |
| `TENZU_EVENTS__REDIS_PASSWORD`    | String  | Redis password                                                              | No       | `""`                                              |
| `TENZU_EVENTS__REDIS_DATABASE`    | Number  | Redis database                                                              | No       | `0`                                               |
| `TENZU_SENTRY_DSN`                | String  | DSN value for Sentry                                                        | No       |                                                   |
| `TENZU_SENTRY_ENVIRONMENT`        | String  | Sentry environment to push the errors                                       | No       |                                                   |

Please note that emails are by default stored in files. It's recommended to change `TENZU_EMAIL__EMAIL_BACKEND` to `django.core.mail.backends.smtp.EmailBackend` to send emails.

Here's the minimun value that we set for our quickstart example.

```bash
# Secret key + Tokens TO CHANGE
TENZU_SECRET_KEY=secret
TENZU_TOKENS__SIGNING_KEY=secret2

# The URL of the backend and frontend part (everything passed by the caddy service)
TENZU_BACKEND_URL="http://localhost:8000/"
TENZU_FRONTEND_URL="http://localhost:8000/"

# DB informations
TENZU_DB__NAME="tenzu"
TENZU_DB__USER="tenzu"
TENZU_DB__PASSWORD="tenzu"
TENZU_DB__HOST="tenzu-db"

# MEDIA and STATIC directory
TENZU_STATIC_ROOT="/public/static"
TENZU_MEDIA_ROOT="/public/media"
```

## Configure Tenzu Frontend

To configure the frontend, create this json config file: `/usr/share/caddy/assets/configs/config.json`.

| Name                              | Type              | Description                                                                 | Required |
|-----------------------------------|-------------------|-----------------------------------------------------------------------------|----------|
| `api.baseDomain`                  | String            | The base domain of the backend                                              | Yes      |
| `api.scheme`                      | `"http","https"`  | The scheme of the backend                                                   | Yes      |
| `wsUrl`                           | String            | The URL of the websocket                                                    | Yes      |
| `sentry.dsn`                      | String            | DSN value for Sentry                                                        | No       |
| `sentry.environment`              | String            | Environment value for Sentry                                                | No       |
| `sentry.release`                  | String            | Release version value for Sentry                                            | No       |

In the quickstart example, you can modify it in the `config-front.json` file.

Here's the minimun value that we've set for the quickstart example:

```json
{
  "api": {
    "baseDomain": "localhost:8000",
    "scheme": "http"
  },
  "wsUrl": "ws://localhost:8000/events/"
}
```