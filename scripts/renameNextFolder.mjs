import { promises as fs } from 'node:fs';
import path from 'node:path';

async function exists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

async function renameNextFolder(outDir) {
  const from = path.join(outDir, '_next');
  const to = path.join(outDir, 'next');
  if (!(await exists(from))) {
    console.log(`[info] No _next folder found in ${outDir}; skipping rename.`);
    return false;
  }
  if (await exists(to)) {
    console.log(`[warn] Target folder ${to} already exists; will overwrite content if needed.`);
  }
  await fs.rename(from, to);
  console.log(`[done] Renamed ${from} -> ${to}`);
  return true;
}

const TEXT_EXTS = new Set(['.html', '.js', '.css', '.json', '.map', '.txt']);

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function replacePaths(content) {
  // Replace occurrences of "/_next/" with "/next/" and trailing "/_next" with "/next"
  let replaced = content.replace(/\/_next\//g, '/next/');
  replaced = replaced.replace(/\/_next(\b)/g, '/next$1');
  return replaced;
}

async function updateReferences(outDir) {
  let filesProcessed = 0;
  let filesChanged = 0;
  for await (const file of walk(outDir)) {
    const ext = path.extname(file).toLowerCase();
    if (!TEXT_EXTS.has(ext)) continue;
    const content = await fs.readFile(file, 'utf8');
    if (content.includes('/_next')) {
      const updated = replacePaths(content);
      if (updated !== content) {
        await fs.writeFile(file, updated, 'utf8');
        filesChanged++;
      }
    }
    filesProcessed++;
  }
  console.log(`[done] Updated references in ${filesChanged}/${filesProcessed} text files.`);
}

async function main() {
  const outDirArg = process.argv[2];
  const outDir = path.resolve(process.cwd(), outDirArg || 'out');
  if (!(await exists(outDir))) {
    console.error(`[error] Output directory not found: ${outDir}`);
    process.exit(1);
  }
  const renamed = await renameNextFolder(outDir);
  await updateReferences(outDir);
  console.log(`[success] Completed renaming and reference updates in ${outDir}.`);
}

main().catch((err) => {
  console.error('[error] renameNextFolder failed:', err);
  process.exit(1);
});
