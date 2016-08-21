'use strict';

const Nconf = require('nconf');
const Joi = require('joi');
const Pellmell = require('pellmell');

const internals = {};

internals.schema = Joi.object({
  overrides: Joi.array().items(Joi.string()),
  defaults: Joi.array().items(Joi.string()),
  excludes: Joi.array().items(Joi.string())
});

internals.buildBag = options => {

  const bag = new Nconf.Provider();

  if (options.overrides) {
    bag.overrides(Pellmell.patch(options.overrides));
  }

  bag.env().argv();

  if (options.defaults) {
    bag.defaults(Pellmell.patch(options.defaults));
  }

  return bag;
};

exports.register = (server, options, next) => {

  options = options || {};

  server.decorate('server', 'bag', internals.buildBag(options));

  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
