# Ujjwal | 3D DevOps Portfolio

Welcome to the source code of my immersive, 3D-animated professional portfolio. This project was built to showcase not only my professional experience as a DevOps Engineer, but also a premium, high-performance web experience leveraging WebGL and modern animation libraries.

## ✨ Features
- **Immersive 3D Graphics**: Powered by `Three.js` with custom WebGL shaders and post-processing.
- **Fluid Micro-Animations**: Smooth page transitions, staggered text reveals, and cursor-reactive elements using `GSAP`.
- **Production-Ready Architecture**: Multi-stage Dockerized builds optimized for low-resource VPS environments.
- **Dynamic Routing**: Client-side routing with an Express backend serving pre-compiled `Pug` templates.
- **Universal Deployment**: Pre-configured for Docker, Nginx, Ngrok, Render, Railway, Vercel, Netlify, and static hosts (GitHub/Cloudflare Pages).

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla JavaScript, SCSS, Pug
- **3D & Animation**: Three.js, GSAP
- **Backend**: Node.js, Express
- **Build Tools**: Webpack, concurrently
- **Infrastructure & Deployment**: Docker, Docker Compose, Nginx, Webhook/CI/CD ready

---

## 💻 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/uxzwal/uzxwal.git
   cd uzxwal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   *This concurrently starts the Webpack dev server for assets and Nodemon for the Express backend. The app will be running on `http://localhost:2022`.*

---

## 🐳 Docker Deployment (Recommended)

This project is fully dockerized and ready for production on any VPS or local machine.

1. **Build and Run**
   ```bash
   docker-compose up -d --build
   ```
   *This fires up two containers: a Node.js production server, and an Nginx reverse proxy serving the app lightning-fast on port `80`.*

2. **Expose with Ngrok (Optional)**
   ```bash
   ngrok http 80
   ```

3. **Stop the Containers**
   ```bash
   docker-compose down
   ```

---

## 🌩️ Cloud & PaaS Deployments

We've included all the necessary configuration files to deploy this project literally anywhere:

- **Render / Railway / Koyeb**: Simply connect your GitHub repository. The included `render.yaml`, `railway.json`, and `Procfile` will automatically build the Docker environment.
- **Vercel**: The `vercel.json` file automatically routes the Express backend into Vercel's serverless environment.
- **Netlify / Cloudflare Pages / GitHub Pages**: We included a custom export script. Run `npm run build` which will compile the dynamic Pug templates into static HTML inside the `/public` folder, which can be deployed to any static host!

---

## 📬 Let's Work Together
Feel free to reach out to me regarding DevOps opportunities, CI/CD automation, or cloud infrastructure.

- **Email**: [iamkashyup@gmail.com](mailto:iamkashyup@gmail.com)
- **LinkedIn**: [Ujjwal Kumar](https://www.linkedin.com/in/uxzwal)
- **GitHub**: [@uxzwal](https://github.com/uxzwal)
