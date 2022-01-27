const tracker = {
    filename: './src/manifest.json',
    updater: require('./scripts/manifest-version-updater')
};

const packageJson = {
    filename: './package.json',
    type: 'json'
};

module.exports = {
    bumpFiles: [tracker, packageJson],
    packageFiles: [tracker, packageJson]
};
