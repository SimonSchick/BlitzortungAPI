# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.0.1](https://github.com/SimonSchick/BlitzortungAPI/compare/v4.0.0...v4.0.1) (2020-08-17)


### Bug Fixes

* **client:** add missing initial client message required to receive data (apparently) ([80488bf](https://github.com/SimonSchick/BlitzortungAPI/commit/80488bfaad1a9c4c775204149dc27ef5e74599e0))

## [4.0.0](https://github.com/SimonSchick/BlitzortungAPI/compare/v1.0.3...v4.0.0) (2020-08-17)


### ⚠ BREAKING CHANGES

* `setArea` is no longer available
* Only node >=v10 supported
* Removed `Client.setIncludeDetectors` as it has become a noop, detectors are always received
* **example:** `setArea` now takes a `GeoArea` object instead of 2 arguments

### Features

* **client:** update interfaces and documentation with useful info ([5965a24](https://github.com/SimonSchick/BlitzortungAPI/commit/5965a24741faca425eb262a79c5fb763cbde3d27))
* **example:** add global location range ([0ff0afa](https://github.com/SimonSchick/BlitzortungAPI/commit/0ff0afa900a555d4f9a238cdedc0fa2f9c216c81))


### Bug Fixes

* **example:** assert non null on socket get ([d57ed1a](https://github.com/SimonSchick/BlitzortungAPI/commit/d57ed1aed8d8cc53aad75f2d997c8eb7140f0ac3))


* Update to latest API changes ([dece566](https://github.com/SimonSchick/BlitzortungAPI/commit/dece56683e435a1d8e6bf98066b146ae4e94f5cd))


### client

* Remove removed setArea and related interfaces as no longer supported by server ([d3400e3](https://github.com/SimonSchick/BlitzortungAPI/commit/d3400e323f3d8418bc417daf088bf204528a2b07))

## [3.0.0](https://github.com/SimonSchick/BlitzortungAPI/compare/v1.0.3...v3.0.0) (2020-07-31)


### ⚠ BREAKING CHANGES

* Only node >=v10 supported
* Removed `Client.setIncludeDetectors` as it has become a noop, detectors are always received

### Features

* **client:** Add `region` to `Strike`. ([dece566](https://github.com/SimonSchick/BlitzortungAPI/commit/dece56683e435a1d8e6bf98066b146ae4e94f5cd))
* **client:** Update default url generation to use random wss server. ([dece566](https://github.com/SimonSchick/BlitzortungAPI/commit/dece56683e435a1d8e6bf98066b146ae4e94f5cd))

<a name="2.0.0"></a>
# [2.0.0](https://github.com/SimonSchick/BlitzortungAPI/compare/v1.0.3...v2.0.0) (2018-04-21)


### Bug Fixes

* **example:** assert non null on socket get ([d57ed1a](https://github.com/SimonSchick/BlitzortungAPI/commit/d57ed1a))


### Features

* **client:** update interfaces and documentation with useful info ([5965a24](https://github.com/SimonSchick/BlitzortungAPI/commit/5965a24))
* **example:** add global location range ([0ff0afa](https://github.com/SimonSchick/BlitzortungAPI/commit/0ff0afa))


### BREAKING CHANGES

* **example:** `setArea` now takes a `GeoArea` object instead of 2 arguments



<a name="1.0.3"></a>
## [1.0.3](https://github.com/SimonSchick/BlitzortungAPI/compare/v1.0.2...v1.0.3) (2017-07-31)


### Bug Fixes

* **exports:** export all things from client ([fbd2e77](https://github.com/SimonSchick/BlitzortungAPI/commit/fbd2e77))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/SimonSchick/BlitzortungAPI/compare/v1.0.1...v1.0.2) (2017-07-30)


### Bug Fixes

* **client:** make it clear the socket can be undefined, add custom error for unconnected state ([ba89ac1](https://github.com/SimonSchick/BlitzortungAPI/commit/ba89ac1))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/SimonSchick/BlitzortungAPI/compare/v1.0.0...v1.0.1) (2017-07-30)



<a name="1.0.0"></a>
# 1.0.0 (2017-07-30)


### Features

* initial implementation ([f7d4e76](https://github.com/SimonSchick/BlitzortungAPI/commit/f7d4e76))
