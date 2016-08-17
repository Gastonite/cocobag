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

  if (values.paths) {
    console.log(Pellmell.patch(values.paths));
    Nconf.overrides(Pellmell.patch(values.paths));
  }

  Nconf.env().argv();

  if (values.defaults) {
    console.log(Pellmell.patch(values.defaults));
    Nconf.defaults(Pellmell.patch(values.defaults));
  }

  return Nconf;
};

exports.register = (server, options, next) => {
  let result = Joi.validate(options, internals.schema);
  server.decorate('server', 'bag', internals.buildBag(result.value));
  next(result.error);
};

exports.register.attributes = {
  pkg: require('../package.json')
};
