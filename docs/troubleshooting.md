---
sidebar_position: 5
slug: /troubleshooting
---

# Troubleshooting

Here are some common issues that can occur:

## Frontend displays a blank page

The frontend configuration is validated at the start of the app by the [zod](https://zod.dev/) package.

If the configuration is incorrect due to an improperly set JSON schema, the app will crash.

To see the error details, open your browser's console; the error will be displayed there.


## Specific

See dedicated section for issues that are dependant on the method of installation:

1. **[docker-compose](deployment/docker-compose.md#troubleshooting)**
