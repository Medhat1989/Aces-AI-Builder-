import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Explicitly handle SPA routing in dev too if Vite middleware fails
    app.use('*', (req, res, next) => {
      // If the request is for an asset, let it be handled by standard error handling or next
      if (req.originalUrl.includes('.')) {
        return next();
      }
      // For route paths, serve index.html
      const indexHtml = path.resolve(__dirname, 'index.html');
      res.status(200).set({ 'Content-Type': 'text/html' }).sendFile(indexHtml);
    });
  } else {
    // Production: serve static files from dist/client
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Explicitly handle SPA routing for any non-asset route
    app.get('*', (req, res) => {
      console.log(`SPA Fallback: ${req.url}`);
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
