# @technician/env-config-source

[![npm version](https://img.shields.io/npm/v/@technician/env-config-source.svg)](https://www.npmjs.com/package/@technician/env-config-source) [![npm downloads](https://img.shields.io/npm/dt/@technician/env-config-source)](https://www.npmjs.com/package/@technician/env-config-source) [![npm license](https://img.shields.io/npm/l/@technician/env-config-source.svg)](https://www.npmjs.com/package/@technician/env-config-source)

[![dependencies](https://img.shields.io/david/carriejv/technician-env-config-source.svg)](https://david-dm.org/carriejv/technician-env-config-source) [![Build Status](https://img.shields.io/travis/com/carriejv/technician-env-config-source.svg)](https://travis-ci.com/carriejv/technician-env-config-source) [![GitKraken](https://img.shields.io/badge/<3-GitKraken-green.svg)](https://www.gitkraken.com/invite/om4Du5zG)

A config source for accessing environment variables.

This package provides the `EnvConfigSource` for use with the [Technician](https://www.npmjs.com/package/technician) config manager.

[![Technician](https://img.shields.io/npm/v/technician?label=technician)](https://www.npmjs.com/package/technician)

## Installation

`npm i @technician/env-config-source`

This package is compatible with Node 10 LTS and up.

## Usage Examples

### The Basics
```ts
import {Technician, DefaultInterpreters} from 'technician';
import {EnvConfigSource} from '@technician/env-config-source'

const technician = new Technician(DefaultInterpreters.asText('utf8'));
technician.addSource(new EnvConfigSource());

await technician.read('MY_ENV_VAR');
```

### Overriding Another Source With Environment Variables
```ts
import {Technician, DefaultInterpreters} from 'technician';
import {EnvConfigSource} from '@technician/env-config-source';
import {FSConfigSource} from '@technician/fs-config-source';

const technician = new Technician(DefaultInterperters.asBuffer(), {
    // Higher priority sources are checked, even if a value is cached.
    cacheRespectsPriority: true,
    // Set a default cache length. By default, the cache lasts forever.
    defaultCacheLength: 1000 * 60 * 60;
});
const envSource = new EnvConfigSource();
const filesystemSource = new FSConfigSource('/etc/ssl/certs');

// Sources with higher priority will be used over those with lower priority.
// By default, sources have a priority of 0 and cache forever.
technician.addSource([
    {
        source: envSource,
        priority: 1,
        cacheFor: -1 // Disable caching for envSource
    },
    filesystemSource // Just use the default config for FS.
]);

// Create an alias that links both config sources to a single key.
technician.alias('ssl_cert', ['SSL_CERT', 'mysite.crt']);

// This alias will return the filesystem value and cache it for an hour --
// unless SSL_CERT is set, which overrides it and disables caching.
const value = await technician.read('ssl_cert');
```

## Contributions

Contributions and pull requests are always welcome. Please be sure your code passes all existing tests and linting.

Pull requests with full code coverage are strongly encouraged.

## License

[Apache-2.0](https://github.com/carriejv/technician/blob/master/LICENSE)