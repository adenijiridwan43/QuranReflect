const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Allows metro to resolve .db files
config.resolver.assetExts.push('db');

module.exports = config;
