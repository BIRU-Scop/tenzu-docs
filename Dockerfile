# Step 1: Build the dev environment
ARG NODE_VERSION=20
FROM node:${NODE_VERSION} AS dev-env
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .

# Step 2: Build the production environment
FROM dev-env AS builder
WORKDIR /app
## build the app in configuration passed
RUN npx npm run build --configuration=production

# Step 3: Serve the app with Caddy
FROM caddy:2-alpine
ARG APP="tenzu"
COPY --from=builder /app/build/ /usr/share/caddy
COPY ./Caddyfile /etc/caddy/Caddyfile
EXPOSE 80
