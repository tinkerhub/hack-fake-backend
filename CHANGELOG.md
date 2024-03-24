# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.1.0 (2024-03-24)


### Features

* add generic error obj for disabled routes ([83075f4](https://github.com/tinkerhub/hack-fake-server/commit/83075f4ae1456e250616f322aa3a95d60457ae1c))
* **api:** disable sending welcome email on /auth/signup api ([ca500c7](https://github.com/tinkerhub/hack-fake-server/commit/ca500c7f0f32c625cf7c88ef8009f1ed082903e5))
* **api:** implement annotate news api without db integration ([866258d](https://github.com/tinkerhub/hack-fake-server/commit/866258da489c2856d6ad169a7e8022e580217862))
* **api:** implement db integration for /news/annotate api with user id as null ([bb50737](https://github.com/tinkerhub/hack-fake-server/commit/bb50737c1166d1dccb2bc610b4f44b9c9e94c567))
* **api:** implement db integration for get all annotation options api ([502238d](https://github.com/tinkerhub/hack-fake-server/commit/502238de62a7caca20be2db04b8e73eed16a86cb))
* **api:** implement fetch annotation options api without db integration ([6032c3f](https://github.com/tinkerhub/hack-fake-server/commit/6032c3f07754c0397f02b9eb38de33cfc7708178))
* **api:** implement news prediction api with mock ml function ([a447fd2](https://github.com/tinkerhub/hack-fake-server/commit/a447fd2ef3100edf2be0163e586ac02bbe7ec31f))
* **api:** implement news submission api (without date min validation) ([b31bcd1](https://github.com/tinkerhub/hack-fake-server/commit/b31bcd1fc09ab69141ae46507a2b3f0cd93f5b35))
* disable auth on /annotations and /news routes ([ed7d91b](https://github.com/tinkerhub/hack-fake-server/commit/ed7d91b5deae6763968a4805ecebb330773c3192))
* disable signup and reset password endpoints in authRoute ([ff8f37d](https://github.com/tinkerhub/hack-fake-server/commit/ff8f37dd51f0cee1d6be2483fc9b64c82eb01e4b))
* enable authorization for /annotations route ([24254ee](https://github.com/tinkerhub/hack-fake-server/commit/24254ee4ded48891034895748b54ca86777f4572))
* enable authorization for /news and /annotations routes ([03ad5a6](https://github.com/tinkerhub/hack-fake-server/commit/03ad5a62f6d934456540a1be54a45caef6529a99))
* enable authorization for /news route ([b83e9e4](https://github.com/tinkerhub/hack-fake-server/commit/b83e9e4878dc5f20a0178f1ab7c2f0d92eff4ad1))
* impelement inserting userId to news annotation map table on /news/annotate api ([4ca4eea](https://github.com/tinkerhub/hack-fake-server/commit/4ca4eead7bdd521a84d7e2a19ed6f029f7587b34))
* implement middleware to disable specific endpoints in specific routes ([575f284](https://github.com/tinkerhub/hack-fake-server/commit/575f28426bfdfb7daa324d88fe48eb2fd7fa1d51))
* implement request body validation for /news/annotate api ([c770ccc](https://github.com/tinkerhub/hack-fake-server/commit/c770cccd259429ca55d95412cec5135979b427d8))
* integrate ml model to predict fake news ([7804449](https://github.com/tinkerhub/hack-fake-server/commit/7804449581091e119d995290cc6afca53d6f2ac4))
