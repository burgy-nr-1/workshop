import { spawnSync } from 'node:child_process';
import { cpSync, copyFileSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = fileURLToPath(new URL('..', import.meta.url));
const temporaryParent = join(repositoryRoot, 'tmp');
mkdirSync(temporaryParent, { recursive: true });
const temporaryRoot = mkdtempSync(join(temporaryParent, 'solution-check-'));
const angularCli = join(repositoryRoot, 'node_modules', '@angular', 'cli', 'bin', 'ng.js');

function runAngular(arguments_) {
  const result = spawnSync(process.execPath, [angularCli, ...arguments_], {
    cwd: temporaryRoot,
    stdio: 'inherit',
  });

  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Angular CLI endete mit Status ${result.status}.`);
}

try {
  for (const file of [
    'angular.json',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.spec.json',
  ]) {
    copyFileSync(join(repositoryRoot, file), join(temporaryRoot, file));
  }

  cpSync(join(repositoryRoot, 'src'), join(temporaryRoot, 'src'), { recursive: true });
  cpSync(join(repositoryRoot, 'public'), join(temporaryRoot, 'public'), { recursive: true });

  const solutionsRoot = join(repositoryRoot, 'solutions');
  for (const entry of readdirSync(solutionsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith('task-')) continue;
    cpSync(
      join(solutionsRoot, entry.name),
      join(temporaryRoot, 'src', 'app', 'tasks', entry.name),
      {
        recursive: true,
        force: true,
      },
    );
  }

  copyFileSync(
    join(repositoryRoot, 'scripts', 'solutions.acceptance.spec.txt'),
    join(temporaryRoot, 'src', 'app', 'solutions.acceptance.spec.ts'),
  );

  runAngular(['build']);
  runAngular(['test', '--watch=false', '--include', 'src/app/solutions.acceptance.spec.ts']);
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}
