const fs = require('fs');
const OSS = require('aliyun-oss');
const manifest = require('../builds/paperwork-web/asset-manifest.json');

const cssBundle = manifest['main.css'];
const jsBundle = manifest['main.js'];

const option = {
  accessKeyId: 'LTAI4GFNwzZcW6pvpZ4Xwj72',
  accessKeySecret: 'l35KyejFT8Fjkg2l0uFoDs1hcNhSXC',
  host: 'oss-cn-beijing.aliyuncs.com'
};

const oss = OSS.createClient(option);

const ignoreFileExtensions = ['.map'];
const ignoreFiles = [cssBundle, jsBundle];

const shouldIgnore = (source) => (
  ignoreFileExtensions.some(ext => source.endsWith(ext)) || ignoreFiles.some(f => source.endsWith(f))
);

const deployToOss = async (folder, bucket, root) => {
  const folderPath = `${root}${folder}`;
  const files = fs.readdirSync(folderPath);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const isBundleGz = `${cssBundle}.gz`.indexOf(file) !== -1 || `${jsBundle}.gz`.indexOf(file) !== -1;
    const source = `${folderPath}${file}`;
    const object = isBundleGz ? `${folder}${file.replace('.gz', '')}` : `${folder}${file}`;
    const isDir = fs.lstatSync(source).isDirectory();
    const shouldSkip = shouldIgnore(source);
    const headers = isBundleGz ? { 'Content-Encoding': 'gzip' } : {};
    if (!isDir && !shouldSkip) {
      console.log(`Start uploading ${source} to ${object}`);
      try {
        await oss.putObject({
          bucket,
          object,
          source,
          headers
        });
        console.log(`Finished uploading ${source}`);
      } catch {
        console.log(`Failed uploading ${source}`);
      }
    }
  }
};

const [node, script, env, app] = process.argv;

console.log(process.argv);

const deploy = async () => {
  await deployToOss('',`paperwork-prod`, './builds/paperwork-web/');
  await deployToOss('static/css/',`paperwork-prod`, './builds/paperwork-web/');
  await deployToOss('static/js/',`paperwork-prod`, './builds/paperwork-web/');
  await deployToOss('static/media/',`paperwork-prod`, './builds/paperwork-web/');
}

deploy();





