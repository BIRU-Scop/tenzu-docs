---
sidebar_position: 2
---

# Install

Let's see how to install Tenzu charts.
:::danger
Tenzu is not yet ready to be used in production environment.
We have some more updates incoming before then.
:::
## Prerequisites

Prepare the charts you want to use with values adapted to your case.
You can find more details on the **[configuration](./configuration.md)** page.

## Install Tenzu with a Single Chart

To install Tenzu using a single chart, it is recommended to use the global chart.

If you're unsure how to build the values, refer to [this example](./configuration.md#example-with-databases-included).

```bash
# Add our Helm chart repository
helm repo add biru https://biru-scop.github.io/helm-charts/

# Install the chart with the correct values and desired namespace
helm install tenzu biru/tenzu -f <values-file.yaml> -n <desired-namespace> --create-namespace

# You can check the install
helm status tenzu -n <desired-namespace>
```

## Install Tenzu by Components

You can install Tenzu by components if you prefer to split the installation.

Assuming you have already installed Postgres and Redis:

```bash
# Add our Helm chart repository
helm repo add biru https://biru-scop.github.io/helm-charts/

# Install the backend chart
helm install tenzu-back biru/tenzu-back -f <backend-values-file.yaml> -n <desired-namespace> --create-namespace

# You can check the install
helm status tenzu-back -n <desired-namespace>

# Install the frontend chart
helm install tenzu-front biru/tenzu-front -f <frontend-values-file.yaml> -n <desired-namespace> --create-namespace

# You can check the frontend chart
helm status tenzu-front -n <desired-namespace>
```

## Load the Initial Fixtures

To load the initial fixtures, you need to connect to the `tenzu-back` pod without the `-caddy` or `-worker` suffixes. 

Here are some example `kubectl` commands:

```bash
# List all the pods with tenzu-back and choose the one without any -caddy or -worker suffix
kubectl get pods -n tenzu | grep tenzu-back

# Connect to the chosen pod via kubectl
kubectl exec -i -t -n tenzu $POD_NAME -- bash
```

Once connected to the pod, run the following commands:

```bash
# Load the initial fixtures (admin / 123123 user)
python manage.py loaddata initial_user initial_project_templates 

# Compile mail languages
python ./__main__.py i18n compile-catalog
```