const pug = require('pug');
const fs = require('fs');
const path = require('path');
const preloadables = require('./preloadables');

const viewsDir = path.join(__dirname, 'views', 'pages');
const publicDir = path.join(__dirname, 'public');
const getBasePath = () => {
  const configuredBasePath = process.env.BASE_PATH || process.env.STATIC_BASE_PATH;
  if (configuredBasePath) {
    return configuredBasePath.endsWith('/') ? configuredBasePath : `${configuredBasePath}/`;
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  if (!repoName || repoName.endsWith('.github.io')) return '/';

  return `/${repoName}/`;
};
const basePath = getBasePath();

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Pages to compile
const pages = ['home', 'work', 'about', 'projects', 'contact'];

console.log('Compiling Pug templates to static HTML...');

pages.forEach(page => {
  try {
    const html = pug.renderFile(path.join(viewsDir, `${page}.pug`), {
      preloadables,
      basedir: path.join(__dirname, 'views'),
      staticExport: true,
      basePath
    });
    
    const outPath = page === 'home' ? 'index.html' : `${page}.html`;
    fs.writeFileSync(path.join(publicDir, outPath), html);
    console.log(`✅ Compiled ${page}.pug -> public/${outPath}`);
  } catch (err) {
    console.error(`❌ Error compiling ${page}.pug:`, err.message);
  }
});

console.log('Static export complete! You can now deploy the /public folder to GitHub Pages, Cloudflare Pages, or Netlify.');
