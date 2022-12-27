import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs';
import glob from 'glob';
import path from 'path';
import tmp from 'tmp';
import spawn from 'cross-spawn';
import * as del from 'del';

tmp.setGracefulCleanup();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = glob.sync(resolve(__dirname, 'src/**/*.html'));

const viteConfig = readFileSync('./vite.config.js', { encoding: 'utf-8' });

function cleanBuildDirectory() {
    del.deleteSync("dist/**");
}

function createTempConfig(filePath) {
    const file = path.parse(filePath);
    const newConfigFileName = `vite-config-${file.name}.ts`;
    del.deleteSync(newConfigFileName);

    const fileRelativePath = filePath.split("src")[1];
    const configCopy = viteConfig.toString().replace('index.html', fileRelativePath);
    
    const tempConfigFile = tmp.fileSync({
        tmpdir: '.',
        name: newConfigFileName,
    });

    writeFileSync(tempConfigFile.fd, configCopy);
    return tempConfigFile.name;
}

function build(filePath) {
    const file = path.parse(filePath);
    console.log(`processing ${file.base} ...`);
    const tempConfigFilePath = createTempConfig(filePath);
    
    try {
        spawn.sync('vite', ['--config', tempConfigFilePath, 'build'], { stdio: 'inherit' });
    } catch (e) {
        console.log("Got exception during build");
    }
}

console.log('Cleaning build dir...');
cleanBuildDirectory();

console.log('Building...');

files.forEach((filePath) => {
    build(filePath);
});

console.log('Done');
