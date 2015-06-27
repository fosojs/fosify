# fosify

A util for creating/registering foso plugins.

[![Dependency Status](https://david-dm.org/fosojs/fosify/status.svg?style=flat)](https://david-dm.org/fosojs/fosify)
[![Build Status](https://travis-ci.org/fosojs/fosify.svg)](https://travis-ci.org/fosojs/fosify)
[![npm version](https://badge.fury.io/js/fosify.svg)](http://badge.fury.io/js/fosify)


## Installation

```
npm install --save fosify
```


## How to register foso plugins

Just add this two hooks to the `package.json` of your plugin after you've added fosify as a dependency:

```json
"scripts": {
  "postinstall": "register",
  "preuninstall": "deregister"
}
```


## License

The MIT License (MIT)
