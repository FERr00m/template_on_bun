import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import chokidar from 'chokidar';

const srcDir = './src/assets/';
const publicDir = './public/assets/img/';
const allowedExtensions = ['.jpg', '.png'];

const sharpOptions = {
  jpg: [
    'jpg',
    {
      quality: 80,
      progressive: true,
    },
  ],
  png: [
    'png',
    {
      quality: 80,
    },
  ],
};

const replaceFilePath = (beforeDir, afterDir, filePath) =>
  path.join(afterDir, path.relative(beforeDir, filePath));

const replaceWebpFilePath = (filePath) =>
  filePath.replace(/\.(jpg|png)$/i, '.webp');

const optimizeImage = (srcPath, destPath) => {
  const extname = path.extname(srcPath).toLowerCase();

  if (allowedExtensions.includes(extname)) {
    const convertFormat = /\.png$/i.test(srcPath)
      ? sharpOptions.png
      : sharpOptions.jpg;
    sharp(srcPath)
      .toFormat(convertFormat[0])
      .toFile(destPath, (err) => {
        if (err) {
          console.error('Error processing image:', err);
        } else {
          console.log('Convert image:', srcPath);
        }
      });
  } else {
    fs.copyFile(srcPath, destPath, (err) => {
      if (err) {
        console.error('Error copying image:', err);
      } else {
        console.log('Copied image:', srcPath);
      }
    });
  }
};

const convertToWebp = (destPath) => {
  const replaceExtension = replaceWebpFilePath(destPath);
  const webpFilePath = path.join(
    publicDir,
    path.relative(publicDir, replaceExtension)
  );
  sharp(destPath)
    .webp({ quality: 85 })
    .toFile(webpFilePath, (err) => {
      if (err) {
        console.error('Error processing convert to webp:', err);
      } else {
        console.log('Convert to webp:', webpFilePath);
      }
    });
};

const startSrcWatch = () => {
  const watcher = chokidar.watch(srcDir, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  });

  watcher.on('all', (event, filePath) => {
    const targetFilePath = replaceFilePath(srcDir, publicDir, filePath);
    if (event === 'add' || event === 'change') {
      optimizeImage(filePath, targetFilePath);
    } else if (event === 'addDir') {
      fsExtra.ensureDirSync(targetFilePath);
    } else if (event === 'unlinkDir') {
      fsExtra.removeSync(targetFilePath);
    } else if (event === 'unlink') {
      fsExtra.removeSync(targetFilePath);
    }
  });
};

const startPublicWatch = () => {
  const watcher = chokidar.watch(publicDir, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  });

  watcher.on('all', (event, filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    if (allowedExtensions.includes(extension)) {
      if (event === 'add' || event === 'change') {
        setTimeout(() => {
          convertToWebp(filePath);
        }, 1000);
      } else if (event === 'unlink') {
        const removeFilePath = replaceWebpFilePath(filePath);
        if (!fs.existsSync(removeFilePath)) return;
        fs.unlink(removeFilePath, (err) => {
          if (err) throw err;
          console.log('remove:', removeFilePath);
        });
      }
    }
  });
};

const convertImages = async () => {
  //startSrcWatch();
  startPublicWatch();
};

convertImages();
