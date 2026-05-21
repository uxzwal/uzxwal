const pug = require('pug');
const fs = require('fs');
const path = require('path');
const preloadables = require('./preloadables');

const viewsDir = path.join(__dirname, 'views', 'pages');
const publicDir = path.join(__dirname, 'public');
const pageOutputs = [
  { template: 'home', output: 'index.html', route: '/' },
  { template: 'work', output: path.join('work', 'index.html'), route: '/work/' },
  { template: 'about', output: path.join('about', 'index.html'), route: '/about/' },
  { template: 'projects', output: path.join('projects', 'index.html'), route: '/projects/' },
  { template: 'contact', output: path.join('contact', 'index.html'), route: '/contact/' }
];
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
const writePublicFile = (relativePath, contents) => {
  const outputPath = path.join(publicDir, relativePath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, contents);
};
const staticRedirects = [
  '/playground /projects/ 301',
  '/work /work/ 301',
  '/about /about/ 301',
  '/projects /projects/ 301',
  '/contact /contact/ 301'
].join('\n');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Compiling Pug templates to static HTML...');

pageOutputs.forEach(({ template, output }) => {
  try {
    const html = pug.renderFile(path.join(viewsDir, `${template}.pug`), {
      preloadables,
      basedir: path.join(__dirname, 'views'),
      staticExport: true,
      basePath
    });

    writePublicFile(output, html);
    console.log(`✅ Compiled ${template}.pug -> public/${output}`);
  } catch (err) {
    console.error(`❌ Error compiling ${template}.pug:`, err.message);
  }
});

const indexHtmlPath = path.join(publicDir, 'index.html');
const manifestPath = path.join(publicDir, 'site.webmanifest');

if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.start_url = basePath;
  manifest.scope = basePath;
  manifest.icons = (manifest.icons || []).map(icon => ({
    ...icon,
    src: icon.src?.startsWith('/') ? `${basePath}${icon.src.slice(1)}` : icon.src
  }));
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Updated public/site.webmanifest for static deployment');
}

if (fs.existsSync(indexHtmlPath)) {
  const redirectRoutes = ['work', 'about', 'projects', 'contact', 'playground'];
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <script>
      (function () {
        var basePath = ${JSON.stringify(basePath)};
        var routes = ${JSON.stringify(redirectRoutes)};
        var pathname = window.location.pathname;
        var normalizedBasePath = basePath.endsWith('/') ? basePath : basePath + '/';
        var relativePath = pathname.startsWith(normalizedBasePath)
          ? pathname.slice(normalizedBasePath.length)
          : pathname.replace(/^\\//, '');
        var cleanPath = relativePath.replace(/^\\/+|\\/+$/g, '');

        if (!cleanPath) {
          window.location.replace(normalizedBasePath);
          return;
        }

        if (cleanPath === 'playground') {
          window.location.replace(normalizedBasePath + 'projects/');
          return;
        }

        if (routes.indexOf(cleanPath) !== -1) {
          window.location.replace(normalizedBasePath + cleanPath + '/');
          return;
        }

        window.location.replace(normalizedBasePath);
      })();
    </script>
  </head>
  <body></body>
</html>
`;

  writePublicFile('404.html', redirectHtml);
}

writePublicFile('_redirects', `${staticRedirects}\n`);
writePublicFile('.nojekyll', '');

console.log('Static export complete! You can now deploy the /public folder to GitHub Pages, Cloudflare Pages, or Netlify.');
