#!/usr/bin/env node

var worker = require('island-worker');
var request = require('request');
var util = require('util');
var Step = require('step');
var _ = require('underscore');
_.mixin(require('underscore.string'));
var pack = require('./package.json');
var config = require('./config.json');
var Instagram = require('instagram-node-lib');

Instagram.set('client_id', config.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', config.INSTAGRAM_CLIENT_SECRET);
Instagram.set('callback_url', config.INSTAGRAM_CALLBACK_URL);
Instagram.set('verify_token', config.INSTAGRAM_VERIFY_TOKEN);

// Start a worker.
worker.start({
  port: process.env.PORT || pack.port,
  onReady: function () {

    // Subscribe to authorized users' media.
    Instagram.subscriptions.subscribe({object: 'user', aspect: 'media'});

    util.log('Ready for instagrams.');
  },
}, function (err) { if (err) throw err; });
