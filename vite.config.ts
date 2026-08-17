import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Dev-only plugin: Vite's dev server does not execute the Vercel serverless
 * functions in `api/`, so `/api/analyze-bill` 404s locally. This middleware
 * runs the SAME handler file in-process during `vite dev`, adapting Node's
 * req/res to the Vercel handler signature. On Vercel the function is served
 * natively and this plugin never runs, so deployed behavior is unchanged.
 */
function devServerlessApi(env: Record<string, string>): Plugin {
  return {
    name: 'dev-serverless-api',
    apply: 'serve',
    configureServer(server) {
      // Ensure the handler can read GEMINI_API_KEY from process.env locally.
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value;
      }

      server.middlewares.use(
        '/api/analyze-bill',
        async (req, res) => {
          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(chunk as Buffer);
            const raw = Buffer.concat(chunks).toString('utf-8');
            (req as any).body = raw ? JSON.parse(raw) : {};

            const shim = res as any;
            shim.status = (code: number) => {
              res.statusCode = code;
              return shim;
            };
            shim.json = (data: unknown) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return shim;
            };

            const mod = await server.ssrLoadModule('/api/analyze-bill.ts');
            await mod.default(req, res);
          } catch (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error:
                  error instanceof Error
                    ? error.message
                    : 'Dev API middleware error.',
              })
            );
          }
        }
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), devServerlessApi(env)],
    server: {
      port: 3000,
      open: true,
    },
  };
});
