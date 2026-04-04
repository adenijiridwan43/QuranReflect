const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Allows metro to resolve .db files
config.resolver.assetExts.push('db');

module.exports = withNativeWind(config, {
  input: path.resolve(__dirname, 'global.css'),
});
