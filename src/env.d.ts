/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare global {
  /** Loaded client-side via the inline Google tag (gtag.js) snippet in BaseLayout. */
  function gtag(...args: unknown[]): void;
  /** Loaded client-side via the Plausible analytics script. */
  function plausible(eventName: string, options?: { props?: Record<string, unknown> }): void;
}

export {};
