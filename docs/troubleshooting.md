---
sidebar_position: 4
slug: /troubleshooting
---

# Troubleshooting

Here are some common issues that can occur:

## Frontend Displays a Blank Page

The frontend configuration is validated at the start of the app by the [zod](https://zod.dev/) package.

If the configuration is incorrect due to an improperly set JSON schema, the app will crash.

To see the error details, open your browser's console; the error should be displayed there.


## Specific

You have some specifics troubleshooting to the method of installation :

1. **[docker-compose](docker/docker-compose.md#troubleshooting)**
2. **[argocd](helm-chart/argocd.md#troubleshooting)**
