#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const WebStore = require('chrome-webstore-upload');

require('dotenv').config();

const fetchFromEnv = (key) => {
  if (!Object.keys(process.env).includes(key)) {
    throw new Error(`Missing required value fork key: ${key}`);
  }
  return process.env[key];
}

const extensionId = fetchFromEnv('CHROME_EXTENSION_ID');
const clientId = fetchFromEnv('GOOGLE_API_CLIENT_ID');
const clientSecret = fetchFromEnv('GOOGLE_API_CLIENT_SECRET');
const refreshToken = fetchFromEnv('GOOGLE_API_REFRESH_TOKEN');

const webStore = WebStore({
  extensionId,
  clientId,
  clientSecret,
  refreshToken,
});

const chromeExtensionManifestPath = path.resolve(__dirname, '..', 'src', 'manifest.json');
const chromeExtensionManifest = require(chromeExtensionManifestPath);
const VERSION = chromeExtensionManifest.version;

const releasesDir = path.join(__dirname, '..', 'releases');
const releasePath = path.join(releasesDir, `release-${VERSION}.zip`);

const releaseFileStream = fs.createReadStream(releasePath);
webStore.publish().then(response => {
  console.log(response);
});
