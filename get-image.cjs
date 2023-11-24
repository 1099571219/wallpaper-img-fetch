const fs = require('fs');
const path = require('path');
const imageType = ['jpg', 'png']

const copyImage = (filePath, fileName) => {
    const file = fs.readFileSync(filePath)
    console.log('来源', filePath);
    const targetPath = path.resolve(__dirname, './images/' + Math.random().toString(36).slice(-6) + fileName)
    console.log('目标地址', targetPath);
    fs.writeFileSync(targetPath, file)

    const log = `---
来源: ${filePath}
目标地址: ${targetPath} 
---`
    fs.appendFileSync(path.resolve(__dirname, './copy-log'), log)
}

const getImages = (root = __dirname) => {
    const dirs = fs.readdirSync(root)
    for (let i of dirs) {
        const curPath = path.resolve(root, './' + i)
        const isDir = fs.statSync(curPath)
        if (isDir.isDirectory()) {
            !isNaN(Number(i)) && getImages(curPath)
        } else if (imageType.includes(i.split('.').pop())) {
            copyImage(curPath, i)
        }
    }
}
getImages()