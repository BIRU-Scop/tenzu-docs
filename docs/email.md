---
sidebar_position: 2.5
---

# Email delivery

Tenzu sends an email when someone signs up, resets their password, or is invited to a project or workspace.
New users can't finish signing up without the verification email.

By default, the backend writes emails to files inside its container instead of sending them.
This is fine for the [quickstart](quickstart.md). Any other instance needs an SMTP server.

## Configure SMTP

Set these variables in the backend environment. With Docker Compose, they go in `tenzu.env`.

```bash
TENZU_EMAIL__EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
TENZU_EMAIL__DEFAULT_FROM_EMAIL='tenzu@example.domain.name'
TENZU_EMAIL__EMAIL_HOST='smtp.example.domain.name'
TENZU_EMAIL__EMAIL_PORT='587'
TENZU_EMAIL__EMAIL_HOST_USER='smtp-user'
TENZU_EMAIL__EMAIL_HOST_PASSWORD='a-strong-smtp-password'
TENZU_EMAIL__EMAIL_USE_TLS='true'
TENZU_EMAIL__EMAIL_USE_SSL='false'
```

Use the port and encryption that your email provider gives you:

| Provider setting   | `TENZU_EMAIL__EMAIL_PORT` | `TENZU_EMAIL__EMAIL_USE_TLS` | `TENZU_EMAIL__EMAIL_USE_SSL` |
|:-------------------|:--------------------------|:-----------------------------|:-----------------------------|
| STARTTLS           | `587`                     | `true`                       | `false`                      |
| SSL/TLS            | `465`                     | `false`                      | `true`                       |

Only one of `TENZU_EMAIL__EMAIL_USE_TLS` and `TENZU_EMAIL__EMAIL_USE_SSL` can be `true`.

`TENZU_EMAIL__DEFAULT_FROM_EMAIL` must be an address your SMTP server allows you to send from.
Many providers reject emails from other addresses, or mark them as spam.

With the Kubernetes charts, set the `email` values of the `tenzu-back` chart instead.
See the [Kubernetes guide](deployment/kubernetes.md).

All email variables are listed in the [configuration reference](configuration.md#configure-tenzu-backend).

## Check that emails arrive

1. Recreate the containers so the backend and the worker load the new values.
   With Docker Compose, run `docker compose --profile start up --remove-orphans --wait -d`. `docker compose restart` does not load them.
   With Kubernetes, run `helm upgrade` with the changed values.
2. Open `https://example.domain.name/signup`, using your domain, and create an account with an address you can read.
3. Wait for the verification email, open its link, and sign in.

The worker sends the emails, not the API. If the SMTP server returns an error, the worker tries again up to 4 times. If no email arrives, check the worker logs:

- With Docker Compose, run `docker compose logs tenzu-worker`.
- With Kubernetes, check the logs of the `<release-name>-worker` deployment.

A failed email shows as a job that `ended with status: Error`. The last line of the error says what went wrong, for example `Connection refused` when Tenzu cannot reach the SMTP server.
