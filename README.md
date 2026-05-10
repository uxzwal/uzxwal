# Ujjwal Kumar — DevOps Portfolio

**Live Deployment:** [https://uxzwal.github.io/uzxwal/](https://uxzwal.github.io/uzxwal/)

> *"6 months in. Shipping like a senior. The graph doesn't lie."*

A premium, mobile-optimized portfolio demonstrating the capabilities, projects, and professional timeline of **Ujjwal Kumar**, DevOps Engineer. The design philosophy merges a "Neural Control Dashboard" aesthetic with top-tier, modern UI principles inspired by Stripe and Linear.

---

## 🚀 Features

* **3D Cloud Node Cluster:** An interactive canvas featuring floating nodes with dynamic bezier connections.
* **Neural Dashboard:** A centralized control panel displaying a GitHub contribution graph and live system status cards.
* **Zero Trust Pipeline Visualization:** An interactive deployment flow representation traversing CODE → SAST → SBOM → SIGN → OPA → DEPLOY.
* **Tech Stack Array:** A responsive icon grid showcasing technical proficiency with hover-induced glow effects.
* **3D Project Cards:** Glassmorphism-styled, tilt-responsive cards detailing key projects like Overdrive and High Availability architecture.
* **Dynamic Background:** A connected particle network canvas providing a cohesive cyber-minimalist aesthetic.
* **UI/UX Enhancements:** Seamless Dark/Light mode theme toggling and a custom neon cursor (desktop optimized).

---

## 📦 Local Development

This portfolio is built as a **zero-dependency** static site, ensuring maximum performance and minimal setup overhead.

```bash
# Option 1: Open directly in your browser
open index.html

# Option 2: Serve locally using Node.js
npx serve .

# Option 3: Serve locally using Python
python3 -m http.server 8080

```

---

## 🌐 Deployment Guide

Because this is a static HTML/CSS/JS project, it can be hosted on nearly any modern cloud platform. Below are step-by-step guides for deploying to popular platforms.

### 1. GitHub Pages (Recommended for Static Sites)

This is the simplest method for repositories hosted on GitHub.

1. Push your repository to GitHub.
2. Navigate to your repository on GitHub and click on **Settings**.
3. On the left sidebar, click on **Pages**.
4. Under **Build and deployment**, set the **Source** to **Deploy from a branch**.
5. Under **Branch**, select `main` (or your default branch) and `/ (root)` folder.
6. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repository-name>/` within a few minutes.

### 2. Vercel

Vercel offers an excellent global edge network for static assets.
**Via Vercel CLI:**

```bash
# Install the Vercel CLI globally
npm i -g vercel

# Deploy the current directory
vercel --prod

```

**Via Vercel Dashboard:**

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. Leave all build settings as default (since it's a static site) and click **Deploy**.

### 3. Railway

Railway builds and deploys your code directly from GitHub.

1. Log in to [Railway](https://railway.app/).
2. Click **New Project** > **Deploy from GitHub repo**.
3. Select your portfolio repository.
4. *Note:* For static sites, Railway automatically uses Nixpacks. It is recommended to add a simple `package.json` with a start script (e.g., `"start": "npx serve -p $PORT"`) or a simple `Dockerfile` using Nginx to serve the static files, as Railway expects a running service.

### 4. Koyeb

Koyeb is a developer-friendly serverless platform.

1. Log in to the [Koyeb Control Panel](https://app.koyeb.com/).
2. Click **Create Web Service**.
3. Select **GitHub** as the deployment method and choose your repository.
4. *Configuration:* Similar to Railway, Koyeb expects a web server. The most robust professional method is to include a simple `Dockerfile` in your repository root:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80

```


5. Set the exposed port to `80` in the Koyeb dashboard.
6. Click **Deploy**.

---

## 📁 File Structure

```text
ujjwal-portfolio/
├── index.html      # Full portfolio structure and semantic markup
├── style.css       # Cyber-minimalism design system and CSS variables
├── app.js          # Three.js-inspired canvas, animations, and interactive logic
└── README.md       # Project documentation

```

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Structure** | HTML5 Semantic Markup |
| **Styling** | CSS3, Custom Properties (Variables), Glassmorphism |
| **Animations** | Canvas 2D API, Native CSS Animations |
| **Typography** | Inter, JetBrains Mono |
| **Assets** | Inline SVG Icons |

---

## ✏️ Customization & Theming

The design system is heavily tokenized. To alter the global color scheme, modify the CSS custom properties located at the top of `style.css`:

```css
:root {
  --accent: #3b82f6;   /* Primary Neon Blue */
  --accent2: #a855f7;  /* Secondary Neon Purple */
  --bg: #050505;       /* Deep Space Black Background */
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
}

```

---

## 📄 License

MIT License — Copyright (c) 2025 Ujjwal Kumar

```

```
