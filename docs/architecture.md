---
sidebar_position: 1
sidebar_label: Architecture
---

# Tenzu Architecture

## Introduction

This section describes the architecture of Tenzu and its main components. It provides an overview for system administrators to facilitate the deployment and management of the platform.

## Components

Tenzu is based on a modular architecture composed of the following elements:

- **Frontend**: Web application that interacts with users (provided as a Docker image).
- **Backend**: API and WebSocket (provided as a Docker image).
- **PostgreSQL**: Database.
- **Redis**: Broker for WebSockets.
- **Reverse Proxy**: Manages routing and security of incoming requests.
- **Task Queue**: Manages asynchronous tasks.

## Prerequisites
Before deploying Tenzu, ensure that your environment meets the following conditions:
- A container engine such as Docker or containerd.
- A PostgreSQL database (minimum required version: 14).
- A Redis instance (minimum required version: 7.1).
- A reverse proxy (caddy, traefik, nginx, apache ) responsible for proxying API/Websocket requests to the backend and Managing SSL certificates


## Diagramme de l'architecture

```mermaid
flowchart TD
    db@{ shape: database, label: "fa:fa-database Postgresql" }
    redis@{ shape: database, label: "fa:fa-database Redis" }
    frontend(["`**Frontend service**
    Angular SPA
    `"])
    backend(["`**API/websocket service**
    Python process
    `"])
    reverse_proxy([fa:fa-sitemap Reverse Proxy])
    procrastinate(["`fa:fa-gears **Tasks queue service**
    Procrastinate`" ])
    data@{ shape: lin-cyl, label: "fa:fa-folder User files data" }
    reverse_proxy --- frontend
    reverse_proxy --- backend
    backend --> redis
    backend --> data
    backend --> db  
    procrastinate --> db
    
```
