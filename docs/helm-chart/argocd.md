---
sidebar_position: 3
---

# ArgoCD

Let's see how to install through ArgoCD

## Install Tenzu as an application

### Prerequisites 

Add our repository into ArgoCD repositories via UI or by adding a secret:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: biru-helm-repo
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repository
stringData:
  url: https://biru-scop.github.io/helm-charts/
  # We choose to put the url as name to see directly which repo we will use
  name: https://biru-scop.github.io/helm-charts/
  type: helm
```

Don't hesitate to add any other repositories that could be useful, like Bitnami:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: bitnami-helm-repo
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repository
stringData:
  url: https://charts.bitnami.com/bitnami
  # We choose to put the url as name to see directly which repo we will use
  name: https://charts.bitnami.com/bitnami
  type: helm
```

### Install the application 

Here's an example of a Tenzu global chart application :

You can change the valuesObject to adapt the chart as explain in **[configuration](./configuration.md)** page.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  namespace: argocd
  name: tenzu
  labels:
    # Put the labels you want
    biru.sh/product: tenzu
spec:
  project: default
  source:
    repoURL: https://biru-scop.github.io/helm-charts/
    targetRevision: 0.1.3
    chart: tenzu
    helm:
      # Please adapt the values here
      valuesObject:
        tenzu-back:
          # Define the ingress value for the backend
          ingress:
            enabled: true
            annotations: 
              kubernetes.io/ingress.class: "nginx"
              cert-manager.io/cluster-issuer: letsencrypt-production-dns01
            hosts:
              - tenzu-api-test.biru.sh
            tls:
              - hosts:
                  - tenzu-api-test.biru.sh
                secretName: tenzu-api-test.biru.sh-tls
          postgresql:
            host: "$APP_NAME-postgres.$NAMESPACE.svc.cluster.local"
          redis:
            host: "$APP_NAME-redis-headless.$NAMESPACE.svc.cluster.local"
          # Email configuration
          email:
            # The default from email
            defaultFrom: "from@mycompany.com"
            # The host of the email server
            host: "ssl0.ovh.net"
            # The user of the email server
            user: "myUser@mycompany.com"
            # The password of the email server
            password: "verySecurePassword"
            # If the email server uses tls
            tls: True
            # If the email server uses ssl
            ssl: False
          # The email for the support
          supportEmail: "ask@tenzu.net"
          # Enable sentry for the backend
          sentry:
            enabled: True
            dsn: "BackendDSNSentry"
            environment: "production"
          # Define the secret key for Django
          secretKey: "qjiqjhnqijqisjosqjdçj"
          # Define the Token SigninKey
          tokensSigningKey: "sjisjisjs,silqjdqj"

        tenzu-front:
          # Define the ingress value for the frontend
          ingress:
            enabled: true
            annotations: 
              kubernetes.io/ingress.class: "nginx"
              cert-manager.io/cluster-issuer: letsencrypt-production-dns01
            hosts:
              - host: tenzu-test.biru.sh
                paths:
                  - path: /
                    pathType: Prefix
                    backend:
                      serviceName: tenzu-front-test
                      servicePort: 80
            tls:
              - hosts:
                  - tenzu-test.biru.sh
                secretName: tenzu-front-test.biru.sh-tls
          # Enable sentry for the frontend
          sentry:
            enabled: True
            dsn: "FrontendDSNSentry"
            environment: "production"

        global:
          # Define the tenzu domains
          tenzu:
            frontendDomain: tenzu-test.biru.sh
            backendDomain: tenzu-api-test.biru.sh
          # Define the postgressql credentials in global (will be used by bitnami/postgresql)
          postgresql:
            auth:
              username: "tenzu"
              database: "tenzu"
              password: "DUApA!KV6baWixBCNVoce7x*ktZercmF9pbKH^^9yiX"
          # Define the redis password in global (will be used by bitnami/redis)
          redis:
            password: "ova8iP9Gesh@6P8fNqDg$4hhEfhpUyXak8Qac84fkUZ"
  destination:
    # We install it on the same cluster
    server: https://kubernetes.default.svc
    # Choose the namespace you want
    namespace: tenzu
  # We apply the autoSync
  syncPolicy:
    automated: # automated sync by default retries failed attempts 5 times with following delays between attempts ( 5s, 10s, 20s, 40s, 80s ); retry controlled using `retry` field.
      prune: true # Specifies if resources should be pruned during auto-syncing ( false by default ).
      selfHeal: false # Specifies if partial app sync should be executed when resources are changed only in target Kubernetes cluster and no git change detected ( false by default ).
      allowEmpty: false # Allows deleting all application resources during automatic syncing ( false by default ).
    syncOptions:
       - CreateNamespace=true
       - ServerSideApply=true
```

### Load the initial fixtures 

To load the initial fixtures, you need to connect to the `tenzu-back` pod without the `-caddy` or `-worker` suffixes and launch these commands :

```bash
# In the pod load the initial fixtures (admin / 123123 user)
python manage.py loaddata initial_user initial_project_templates 

# Compile mails langage
python ./__main__.py i18n compile-catalog

```


## Troubleshooting

Here are some common issues that can occur:

### Sync Trouble

In ArgoCD, hooks do not work the same way as Helm hooks. They are more limited, as described in [their documentation](https://argo-cd.readthedocs.io/en/stable/user-guide/helm/#helm-hooks).

Our charts normally use `post-install` and `pre-upgrade` Helm hooks for job migration and collectstatic.

However, in ArgoCD, we are forced to use only `PostSync` because the normal hooks conversion will use `PreSync` as well.

This is problematic because the `PreSync` hook will be launched before any first Kubernetes creation, causing the job to try to launch with half of the resources not synced.

Thus, the job will only be launched after all the objects have been updated or installed.

If you see that the jobs are trying to be launched with the `PreSync` hook, you can stop the sync and launch a [selective sync](https://argo-cd.readthedocs.io/en/stable/user-guide/selective_sync/) with only the configmaps, secrets, and volumes, and then resync.
