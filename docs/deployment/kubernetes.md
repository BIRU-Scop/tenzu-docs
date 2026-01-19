---
sidebar_position: 4
hide_table_of_contents: true
sidebar_label: Kubernetes
---

# Kubernetes

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ExternalMarkdown from '/src/components/ExternalMarkdown';
import styles from '/src/css/kubernetes.module.css';

We provide some ready-made Helm charts to easily deploy Tenzu in a k8s cluster.

First, you'll need to install our Helm chart repository:

```bash
helm repo add biru https://biru-scop.github.io/helm-charts/
```

With it, you'll have access to the following charts:

1. [tenzu-back](https://github.com/BIRU-Scop/helm-charts/tree/main/charts/tenzu-back): Chart for the backend.
2. [tenzu-front](https://github.com/BIRU-Scop/helm-charts/tree/main/charts/tenzu-front): Chart for the frontend.

For documentation of the values, please refer to the READMEs of the charts:

<Tabs groupId="chart-type">
  <TabItem value="tenzu-back" label="tenzu-back" default>
    <ExternalMarkdown reference="https://github.com/BIRU-Scop/helm-charts/blob/main/charts/tenzu-back/README.md" startLine="## Values" />
  </TabItem>
  <TabItem value="tenzu-front" label="tenzu-front">
    <ExternalMarkdown reference="https://github.com/BIRU-Scop/helm-charts/blob/main/charts/tenzu-front/README.md" startLine="## Values" />
 </TabItem>
</Tabs>

To deploy Tenzu, at a minimum, you'll need to provide the following values:
- `tenzu-back.email`
- `tenzu-back.secretKey`
- `tenzu-back.tokenSigningKey`
- `global.backendUrl.host`
- `global.frontendUrl.host`
- `tenzu-back.redis`: provide `host` as well as the password either through a secret or raw string value
- `tenzu-back.postgresql`: provide `host` as well as the password, username and database name either through a secret or raw string values

:::tip
You can use [djecrety](https://djecrety.ir/) to generate a secret key.
:::

You might also need to setup an `Ingress`, each chart provides an `ingress` value for that.

You also have a `sentry` value to configure connexion to a sentry/glitchtip error tracker.

## Example files

<Tabs groupId="chart-type">
  <TabItem value="tenzu-back" label="tenzu-back" default>

```yaml tenzu-back/example-values.yml
ingress:
  enabled: true
  annotations: 
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-production-dns01"
  hosts:
    - "tenzu-api.mycompany.com"
  tls:
    - hosts:
        - "tenzu-api.mycompany.com"
      secretName: "tenzu-api.mycompany.com-tls"
postgresql:
  host: "$APP_NAME-postgres.$NAMESPACE.svc.cluster.local"
  # Load postgresql credentials from a secret
  auth:
    existingSecret: "tenzu-postgresql"
    usernameKey: "username"
    passwordKey: "password"
    databaseKey: "database"
redis:
  host: "$APP_NAME-redis-headless.$NAMESPACE.svc.cluster.local"
  # Load redis credentials from a raw value
  password: "redisPassword"
env:
  - name: TENZU_USER_EMAIL_ALLOWED_DOMAINS
    value: '["mycompany.com","mycompany.org"]'
email:
  defaultFrom: "from@mycompany.com"
  host: "ssl0.ovh.net"
  user: "my-user@mycompany.com"
  password: "verySecurePassword"
  supportEmail: "contact@mycompany.com"
sentry:
  enabled: true
  dsn: "backend-dsn"
  environment: "test"
secretKey: "secret-key"
tokensSigningKey: "jwt-secret-key"

global:
  frontendUrl:
    host: "tenzu.mycompany.com"
  backendUrl:
    host: "tenzu-api.mycompany.com"
```

  </TabItem>
  <TabItem value="tenzu-front" label="tenzu-front">

```yaml tenzu-front/example-values.yml
ingress:
  enabled: true
  annotations: 
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-production-dns01"
  hosts:
    - "tenzu.mycompany.com"
  tls:
    - hosts:
        - "tenzu.mycompany.com"
      secretName: "tenzu.mycompany.com-tls"
sentry:
  enabled: true
  dsn: "frontend-dsn"
  environment: "test"

global:
  backendUrl:
    host: "tenzu-api.mycompany.com"
```

  </TabItem>
</Tabs>

## SSO

If you want to configure your Tenzu instance with SSO, you can do that using the `env` and `secretEnv` values in 
the tenzu-back chart in order to configure the variables you need.

Example configurations:

<Tabs groupId="chart-type">
  <TabItem value="ldap" label="LDAP">

```yaml tenzu-back/example-values.yml
env:
  TENZU_LDAP__ACTIVATION: "strict"
  TENZU_LDAP__SERVER_URI: "ldap://ldap.mycompany.com"
  TENZU_LDAP__USER_ATTR_MAP: '{"full_name": "cn","email": "mail","username": "uid"}'
  TENZU_LDAP__USER_QUERY_FIELD: "username"
  TENZU_LDAP__USER_FLAGS_BY_GROUP: '{"is_active": "cn=users,ou=groups,dc=mycompany,dc=com"}'
  TENZU_LDAP__USER_SEARCH: '[{"base_dn": "ou=users,dc=mycompany,dc=com", "scope": 2, "filterstr": "(|(mail=%(user)s)(uid=%(user)s))"}]'
  TENZU_LDAP__REQUIRE_GROUP: 'cn=users,ou=groups,dc=mycompany,dc=com'
  TENZU_LDAP__CONNECTION_OPTIONS: '{"8": 0, "24579": "/etc/ssl/certs", "24582": 2, "24591": 0}'
  TENZU_LDAP__START_TLS: "True"
  TENZU_LDAP__BIND_DN: 'cn=readonly,dc=mycompany,dc=com'
  TENZU_LDAP__GROUP_SEARCH: '{"base_dn": "ou=groups,dc=mycompany,dc=com", "scope": 2, "filterstr": "(objectClass=groupOfUniqueNames)"}'
  TENZU_LDAP__GROUP_TYPE: '{"class_name": "django_auth_ldap.config.NestedGroupOfUniqueNamesType"}'
secretEnv:
  TENZU_LDAP__BIND_PASSWORD: "Cr53VwAK58eyGr42jH"
```

  </TabItem>
  <TabItem value="allauth" label="Others SSO protocols" default>

```yaml tenzu-back/example-values.yml
env:
  TENZU_ACCOUNT__SOCIALAPPS_PROVIDERS: '["allauth.socialaccount.providers.openid_connect"]'
secretEnv:
  TENZU_ACCOUNT__SOCIALACCOUNT_PROVIDERS: '{
    "openid_connect": {
      "APPS": [
        {
          "provider_id": "my-server",
          "name": "My Login Server",
          "client_id": "your.service.id",
          "secret": "your.service.secret",
          "settings": {
            "fetch_userinfo": True,
            "oauth_pkce_enabled": True,
            "server_url": "https://my.server.example.com",
        }
      ]
    }
  }'
```

  </TabItem>
</Tabs>