import { cp, mkdir, rm } from 'node:fs/promises';

const files = [
  'index.html',
  'script.js',
  'styles.css',
  'additions.css',
  'more.css',
  'tune.css',
  'research.css',
  'proposal.css',
  'community.css',
  'cv-final.css',
  'responsive.css',
  'wide-refine.css',
  'academic-focus.css',
  'live-badge-fix.css',
  'portrait.css',
  'portrait-responsive.css',
  'mobile-alignment.css',
  'project-status.css',
  'navigation-motion.css',
  'Ahmad_Arshad_Academic_CV_v6.pdf',
  'Ahmad_Arshad_AI_Safety_Research_Proposal.pdf'
];

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await Promise.all(files.map((file) => cp(file, `dist/${file}`)));
await cp('assets', 'dist/assets', { recursive: true });

console.log('Static portfolio ready in dist/.');
