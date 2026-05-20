# Production Deployment Guide (Docker + Nginx + Ngrok)

## Final architecture
Internet -> Ngrok -> Nginx -> Node.js app

## Ports
- Node app: `2022` (internal Docker network only)
- Nginx: `80` (HTTP) and `443` (HTTPS-ready)
- Ngrok: public URL forwards to `http://localhost:80`

## Final folder structure
```
/path/to/project
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── DEPLOYMENT.md
├── index.js
├── package.json
├── package-lock.json
├── nginx/
│   ├── nginx.conf
│   └── certs/                # add fullchain.pem + privkey.pem for SSL
├── public/
├── views/
└── ...
```

## Production commands
```bash
cd /path/to/project
npm ci
npm run build

docker compose build --no-cache
docker compose up -d

docker compose ps
docker compose logs -f app
docker compose logs -f nginx
curl -fsS http://localhost/health
curl -fsS http://localhost/nginx-health
```

## Ngrok commands
```bash
# install ngrok once (Ubuntu)
sudo snap install ngrok

# authenticate once
ngrok config add-authtoken YOUR_NGROK_TOKEN

# expose nginx (port 80)
ngrok http http://localhost:80
```

## Ubuntu/Linux VPS deployment steps
1. Install Docker + Compose plugin.
2. Open ports `80` and `443` in firewall/security group.
3. Clone/copy project into server.
4. Run:
   ```bash
   cd /path/to/project
   docker compose build
   docker compose up -d
   docker compose ps
   ```
5. Verify:
   ```bash
   curl -I http://localhost
   curl -fsS http://localhost/health
   curl -fsS http://localhost/nginx-health
   ```
6. Start Ngrok:
   ```bash
   ngrok http http://localhost:80
   ```
7. Use the generated `https://xxxx.ngrok-free.app` URL publicly.

## Railway / Render notes
- Keep Dockerfile-based deployment enabled.
- Expose container HTTP on platform-assigned port at Nginx layer (80 internally).
- Set environment variables if needed:
  - `NODE_ENV=production`
  - `PORT=2022`
- For these platforms, Ngrok is usually not required because they provide public URLs.

## Route refresh behavior
- Nginx forwards all routes to Node.
- Node serves known routes (`/`, `/work`, `/about`, `/playground`, `/contact`).
- Unknown routes redirect to `/` to avoid 404 on refresh.

## SSL ready
1. Put cert files in `/path/to/project/nginx/certs`:
   - `fullchain.pem`
   - `privkey.pem`
2. Uncomment SSL server block in `nginx/nginx.conf`.
3. Reload:
   ```bash
   docker compose restart nginx
   ```

## Auto-restart + health checks
- `restart: unless-stopped` enabled for `app` and `nginx`.
- App health: `GET /health`
- Nginx health: `GET /nginx-health`

## Troubleshooting
- Containers not starting:
  ```bash
  docker compose logs --tail=200 app
  docker compose logs --tail=200 nginx
  ```
- Port already in use:
  ```bash
  sudo ss -lntp | grep -E ':80|:443'
  ```
- Ngrok URL not loading:
  - Ensure `docker compose ps` shows both containers healthy.
  - Ensure ngrok forwards to `http://localhost:80`.
- Static files missing:
  ```bash
  docker compose exec app ls -lah /app/public
  ```
- After config change:
  ```bash
  docker compose up -d --build
  ```
