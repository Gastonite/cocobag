'use strict';

const Nconf = require('nconf');
const Joi = require('joi');
const Pellmell = require('pellmell');

const internals = {};

internals.schema = Joi.object({
  paths: Joi.array().items(Joi.string()),
  defaults: Joi.array().items(Joi.string()),
  excludes: Joi.array().items(Joi.string())
});

internals.buildBag = (values) => {

  const bag = new Nconf.Provider();

  if (values.paths) {
    bag.overrides(Pellmell.patch(values.paths));
  }

  bag.env().argv();

  if (values.defaults) {
    bag.defaults(Pellmell.patch(values.defaults));
  }

  return bag;
};

exports.register = (server, options, next) => {
  let result = Joi.validate(options, internals.schema);
  server.decorate('server', 'bag', internals.buildBag(result.value));
  next(result.error);
};

exports.register.attributes = {
  pkg: require('../package.json')
};
