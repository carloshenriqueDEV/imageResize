const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const args = process.argv;

const filePath = args[2].replace(/\\/g, "/");

const sizes = args.length > 0 ? args.slice(3) : [128, 48, 32, 24, 16];

const dirName = path.dirname(filePath);

const [fileName, extension] = path.basename(filePath).split('.');

const destination = `${dirName}/imgResize`

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination)
}

sizes.forEach(size => {
  const intSize = parseInt(size)
  sharp(filePath)
    .clone()
    .resize({ width: intSize })
    .toFile(`${destination}/${fileName}-${intSize}.${extension}`)
    .then(info => console.log(info))
    .catch(err => console.log(err));
});



