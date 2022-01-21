const stringifyPackage = require('stringify-package');
const detectIndent = require('detect-indent');
const detectNewline = require('detect-newline');

module.exports.readVersion = contents => JSON.parse(contents).version;

module.exports.writeVersion = (contents, version) => {
    const manifest = JSON.parse(contents);
    const indent = detectIndent(contents).indent;
    const newline = detectNewline(contents);
    manifest.version = version;
    return stringifyPackage(manifest, indent, newline);
};
