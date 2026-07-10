// Stamped at build time; the scheduled-build workflow polls this file on the
// live site to verify Netlify actually redeployed (deploy-outage detection).
export const prerender = true;

export function GET() {
  return new Response(JSON.stringify({ builtAt: new Date().toISOString() }), {
    headers: { "Content-Type": "application/json" },
  });
}
