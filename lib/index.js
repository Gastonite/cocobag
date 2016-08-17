
const internals = {};

internals.bag = {};


internals.buildBag = (values) => {
  internals.bag = values;
};

exports.register = (server, options, next) => {
  internals.buildBag(options);

  server.expose('bag', {
    get (key, placeholder) {
      return internals.bag[key] || placeholder;
    },

    set (key, value) {
      internals.bag[key] = value;
    },

    unset (key) {
      internals.bag[key] = null;
    },

    isset (key) {
      return internals.bag[key] ? true : false;
    }
  });
};

exports.register.attributes = {
  pkg: require('../package.json')
};
