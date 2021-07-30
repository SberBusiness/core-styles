const fs = require('fs');
const path = require('path');

function copyFile(source, target) {
    let targetFile = target;

    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

/**
 * Копирует исходную папку внутрь целевой с сохранением имени.
 */
function copyDir(source, target) {
    let files = [];

    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyDir(curSource, targetFolder);
            } else {
                copyFile(curSource, targetFolder);
            }
        });
    }
}

/**
 * Создает папку в случае ее отутствия.
 */
function createFolderIfNotExists(folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }
}

createFolderIfNotExists(path.resolve(__dirname, '../out'));
copyDir(path.resolve(__dirname, '../src/@sberbusiness'), path.resolve(__dirname, '../out'));
