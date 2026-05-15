# Ujjwal Kumar - 3D DevOps Portfolio

Welcome to my 3D DevOps Engineer portfolio! This project showcases my skills in Containers, CI/CD, Cloud Infrastructure, and Linux, presented through a premium, cursor-reactive 3D interface inspired by Spline.

## Features
- **Interactive 3D Scene**: A custom WebGL particle network that reacts to your cursor movements.
- **Modern Design System**: Strict adherence to semantic design tokens, providing a dark, high-contrast, professional aesthetic.
- **Accessible & Responsive**: Fully responsive layout with keyboard navigation support and reduced motion fallbacks.
- **Zero-Dependency Core**: Built with modern semantic HTML, CSS, and vanilla JavaScript (using Three.js via ES modules) for maximum performance and easy deployment to GitHub Pages.

## Local Development
Since this project uses ES modules for Three.js, you need to serve the files over HTTP rather than opening the HTML file directly (to avoid CORS issues).
You can use any local web server. For example:
```bash
# Using Python 3
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

## Generating the Resume PDF
The resume content is maintained in LaTeX (`resume.tex`). To generate the downloadable `resume.pdf`:
1. Ensure you have a LaTeX distribution installed (like TeX Live or MiKTeX).
2. Run the following command:
   ```bash
   pdflatex resume.tex
   ```
3. This will generate `resume.pdf`. A placeholder file is currently provided so the download button works out-of-the-box.

## Technologies Used
- HTML5 / CSS3
- JavaScript (ES6 Modules)
- Three.js (WebGL rendering)
- LaTeX (Resume Generation)
