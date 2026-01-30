---
sidebar_position: 7
---

# Changelog

## v2.0.0 - 2026-30-01

- **Live collaboration on description of stories**
- Logs basic configuration

:::danger
### Breaking changes

#### Frontend
In configuration file `assets/configs/config.json`, the setting `config.wsUrl` does not expect an url ending with "/events/" anymore.

-> e.g. in your file, replace `"wsUrl": "wss://$DOMAIN_NAME/events/"` with `""wsUrl": wss://$DOMAIN_NAME"`

- The provided quickstart and **docker recipes** have been updated but if you already have a deployed instance you'll need 
to update the file manually.
- Those using our **Helm-chart** needs to update it to version>2.0.1

In the meantime, you'll get an error on all your socket connexions which means 
you won't be able to receive any more event trigerring real time UI changes

#### Backend
The following environment variable have been renamed:
- `TENZU_USER_EMAIL_ALLOWED_DOMAINS` ->  `TENZU_ACCOUNT__TENZU_USER_EMAIL_ALLOWED_DOMAINS`
- `TENZU_VERIFY_USER_TOKEN_LIFETIME` ->  `TENZU_ACCOUNT__TENZU_VERIFY_USER_TOKEN_LIFETIME`
- `TENZU_RESET_PASSWORD_TOKEN_LIFETIME` ->  `TENZU_ACCOUNT__TENZU_RESET_PASSWORD_TOKEN_LIFETIME`
:::

## v1.0.2 - 2026-01-01

- **SSO (Single Sign-On)**: integrate with django-allauth django-auth-ldap to support OIDC, LDAP, etc for authentication
- "Mark all as read" for notifications
- Start using Angular Signal forms

## v1.0.1 - 2025-04-11

- **Comments**
- Cmd/Ctrl+Enter to trigger save
- Language choice on signup
- Retry policy on network requests

## v1.0.0 - 2025-30-09

First production-ready, stable release

- Final tests and polish

## v0.0.2/v0.1.1/v0.1.2 - 2025-23-09

Last alpha release

- Add configurable constraints to attachments
- Background work on CI/CD stuff

## v0.0.1 - 2025-08-29

First alpha release

First preview released on 2024-30-10

- Workspaces & projects
- Kanban (multiple) & stories
- WYSIWYG editor
- Attachment files
- User account
- Notifications
- Role & Permission system
- Membership & invitations
- Multiple view modes & Visual identity
- Dark theme & translation in 3 languages (English, Spanish, French)
- Realtime UI update in reaction to actions done in other sessions
- S3 storage compatible
- Deployment recipes & documentation
- Standardised REST API
