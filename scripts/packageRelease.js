#! /usr/bin/env node

const archiver = require('archiver');
const fs = require('fs');
const rimraf = require('rimraf').sync;
const path = require('path');

const chromeExtensionManifestPath = path.resolve(__dirname, '..', 'src', 'manifest.json');
const chromeExtensionManifest = require(chromeExtensionManifestPath);
const VERSION = chromeExtensionManifest.version;
const releasesDir = path.join(__dirname, '..', 'releases');
const buildDir = path.join(__dirname, '..', 'build');

// Create releases directory if it does not exist
rimraf(releasesDir);
fs.mkdirSync(releasesDir);

const releaseFileName = `release-${VERSION}.zip`;
const output = fs.createWriteStream(path.join(releasesDir, releaseFileName));
var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function() {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);

// pipe archive data to the file
const buildGlob = path.join(buildDir, '**', '*');

archive.glob(buildGlob);

// finalize the archive (ie we are done appending files but streams have to finish yet)
// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
archive.finalize();