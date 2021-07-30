const fs = require('fs');
const path = require('path');
const {
    name,
    version,
    description,
    author,
    license,
    peerDependencies,
    dependencies,
    repository,
    bugs,
    homepage
} = require('../package');

/**
 * Создаём package.json для публикуемой библиотеки.
 */
fs.writeFileSync(path.resolve(__dirname, '../out/' + name + '/package.json'), JSON.stringify({
    name,
    version,
    description,
    author,
    license,
    peerDependencies,
    dependencies,
    repository,
    bugs,
    homepage
}, null, 4));
