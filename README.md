![cocobag Logo](https://raw.github.com/hapipip/cocobag/master/images/cocobag.png)

# Cocobag

[![Build Status](https://travis-ci.org/hapipip/cocobag.svg)](https://travis-ci.org/hapipip/cocobag)

### Cocobag aggregate all config files.

Cocobag expose "bag" variable who is a [nconf object](https://github.com/indexzero/nconf) into hapi server. It supports YAML, JSON, JS modules and folder.

### Installation

```js
npm install cocobag --save
```

### Initialization

```js
const Hapi = require('hapi');
const Path = require('path');

server = new Hapi.Server();
server.connection();

server.register({
  register: require('cocobag'),
  options: {
    defaults: [ // the defaults configurations
      Path.join(__dirname, 'default'),
      Path.join(__dirname, 'default2')
    ],
    overrides: [ // your environment configurations
      Path.join(__dirname, 'environment')
    ]
  }
}, (err) => {
  if (err) {
    throw err
  }
  // now you can access to the bag variable.
  server.bag.get('my:config:variable')
})
```

### Interface

See nconf's [API](https://github.com/indexzero/nconf#example).
