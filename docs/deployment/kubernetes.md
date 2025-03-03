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

:::danger
Tenzu is not yet ready to be used in production environment.
We have some more updates incoming before then.
:::

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
  <TabItem value="tenzu-front" label="tenzu-front" default>
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

<Tabs groupId="chart-type">
  <TabItem value="tenzu-back" label="tenzu-back" default>

```yaml tenzu-back/example-values.yml
ingress:
  enabled: true
  annotations: 
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-production-dns01"
  hosts:
    - "tenzu-api-test.biru.sh"
  tls:
    - hosts:
        - "tenzu-api-test.biru.sh"
      secretName: "tenzu-api-test.biru.sh-tls"
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
    host: "demo.tenzu.app"
  backendUrl:
    host: "demo-api.tenzu.app"
```

  </TabItem>
  <TabItem value="tenzu-front" label="tenzu-front" default>

```yaml tenzu-front/example-values.yml
ingress:
  enabled: true
  annotations: 
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-production-dns01"
  hosts:
    - "tenzu-test.biru.sh"
  tls:
    - hosts:
        - "tenzu-test.biru.sh"
      secretName: "tenzu-front-test.biru.sh-tls"
sentry:
  enabled: true
  dsn: "frontend-dsn"
  environment: "test"

global:
  backendUrl:
    host: "demo-api.tenzu.app"
```

  </TabItem>
</Tabs>
