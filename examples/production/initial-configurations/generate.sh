envsubst < ./templates/config-front.json.template > ../config-front.json
envsubst < ./templates/caddy.env.template > ../caddy/caddy.env
envsubst < ./templates/tenzu.env.template > ../tenzu.env
envsubst < ./templates/db.env.template > ../db.env
