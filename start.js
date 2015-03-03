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

// Start a worker.
worker.start({
  port: process.env.PORT || pack.port,
  onReady: function () {

    // Subscribe to authorized users' media.
    Instagram.subscriptions.subscribe({
      object: 'user',
      aspect: 'media',
      callback_url: config.INSTAGRAM_USER_CALLBACK_URL,
      verify_token: config.INSTAGRAM_VERIFY_TOKEN
    });

    // Subscribe to our tags.
    // _.each(config.INSTAGRAM_TAGS, function (tag) {
    //   Instagram.subscriptions.subscribe({
    //     object: 'tag',
    //     object_id: tag,
    //     aspect: 'media',
    //     callback_url: config.INSTAGRAM_TAG_CALLBACK_URL,
    //     verify_token: config.INSTAGRAM_VERIFY_TOKEN
    //   });
    // });

    util.log('Ready for instagrams.');
  },
}, function (err) { if (err) throw err; });
