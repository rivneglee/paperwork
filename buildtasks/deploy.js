const fs = require('fs');
const OSS = require('aliyun-oss');

const option = {
  accessKeyId: 'LTAI4GFNwzZcW6pvpZ4Xwj72',
  accessKeySecret: 'l35KyejFT8Fjkg2l0uFoDs1hcNhSXC',
  host: 'oss-cn-beijing.aliyuncs.com'
};

const oss = OSS.createClient(option);

const subFolders = ['', 'static/css/', 'static/js/', 'static/media/'];

const ignoreFileExtensions = ['.map'];

const deployToOss = (bucket, root) => {
  subFolders.forEach((folder) => {
    const folderPath = `${root}${folder}`;
    fs.readdirSync(folderPath).forEach(file => {
      const source = `${folderPath}${file}`;
      const object = `${folder}${file}`;
      const isDir = fs.lstatSync(source).isDirectory();
      const shouldSkip = ignoreFileExtensions.some(ext => source.endsWith(ext));
      if (!isDir && !shouldSkip) {
        console.log(`Start uploading ${source} to ${object}`);
        oss.putObject({
          bucket,
          object,
          source,
          headers: {}
        }, (err) => {
          if (err) {
            console.log(`Deployment failed:`, err);
            process.exit(1);
          } else {
            console.log(`Finished uploading ${source}`);
          }
        });
      }
    });
  });
};

const [node, script, env, app] = process.argv;

console.log(process.argv);

deployToOss(`paperwork-${env}`, app);



