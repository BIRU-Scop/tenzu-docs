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


## CORS errors

The application use some specific headers like "correlation-id" or "tus-resumable".
If you have an error in console about CORS rules and requests failing, 
your installation might add rules that restricts those headers.

You can display the CORS rules used by the app with:
```bash
# launch in app console
./manage.py shell_plus
```
```python
# launch in resulting python console
print(settings.CORS_ALLOW_HEADERS)
print(settings.CORS_EXPOSE_HEADERS)
```
Those commands will give you the content expected by the app for, respectively, the
[Access-Control-Allow-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Headers) 
and the [Access-Control-Expose-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Expose-Headers).

## Specific

See dedicated section for issues that are dependent on the method of installation:

1. **[docker-compose](deployment/docker-compose.md#troubleshooting)**
