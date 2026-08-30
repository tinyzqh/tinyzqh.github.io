import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

// The PDFs used to live under /paper/ and now live in /papers/. Search engines
// still hand out the old URLs, and GitHub Pages cannot redirect a .pdf, so the
// legacy names are rebuilt here from the same files.
const legacy: Record<string, string> = {
  mspp: 'mspp.pdf',
  marlodoa: 'marlodoa.pdf',
  erlang: 'erlang.pdf',
  DiPerceiveNet: 'DiPerceiveNet.pdf',
  TMM_R1: 'pamoe-tmm-rebuttal-r1.pdf',
  TMM_R2: 'pamoe-tmm-rebuttal-r2.pdf',
};

export function getStaticPaths() {
  return Object.keys(legacy).map((slug) => ({ params: { slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const file = new URL(`../../../public/papers/${legacy[params.slug!]}`, import.meta.url);
  const body = await fs.readFile(path.normalize(file.pathname));
  return new Response(body, { headers: { 'Content-Type': 'application/pdf' } });
};
