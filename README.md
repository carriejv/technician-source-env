# @technician/source-env

[![npm version](https://img.shields.io/npm/v/@technician/source-env.svg)](https://www.npmjs.com/package/@technician/source-env) [![npm downloads](https://img.shields.io/npm/dt/@technician/source-env)](https://www.npmjs.com/package/@technician/source-env) [![npm license](https://img.shields.io/npm/l/@technician/source-env.svg)](https://www.npmjs.com/package/@technician/source-env)

[![dependencies](https://img.shields.io/david/carriejv/technician-source-env.svg)](https://david-dm.org/carriejv/technician-source-env) [![Build Status](https://github.com/carriejv/technician-source-env/workflows/ci-build/badge.svg?branch=master)](https://github.com/carriejv/technician-source-env/actions?query=workflow%3Aci-build) [![GitKraken](https://img.shields.io/badge/<3-GitKraken-green.svg)](https://www.gitkraken.com/invite/om4Du5zG)

A config source for accessing environment variables.

This package provides the `EnvConfigSource` for use with the [Technician](https://www.npmjs.com/package/technician) config manager.

[![Technician](https://img.shields.io/npm/v/technician?label=technician)](https://www.npmjs.com/package/technician)

## Installation

`npm i @technician/source-env`

This package is compatible with Node 10 LTS and up.

## Basic Examples

`EnvConfigSource` returns `string` data by default.

```ts
import {Technician} from 'technician';
import {EnvConfigSource} from '@technician/source-env'

const technician = new Technician(new EnvConfigSource());

await technician.read('MY_ENV_VAR');
```

## Contributions

Contributions and pull requests are always welcome. Please be sure your code passes all existing tests and linting.

Pull requests with full code coverage are strongly encouraged.

## License

[Apache-2.0](https://github.com/carriejv/technician/blob/master/LICENSE)