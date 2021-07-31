<!--
README about the GitHub repository template.
Once the template is used, this README should be
deleted and only ../README.md should be kept
-->

# Node ESM package template

This repository is meant to serve as a general template for how to set up GitHub repositories publishing a node package on npm.

The npm package is visible at https://www.npmjs.com/package/@jsenv/template-node-package.

Use this repository as a way of finding example files and use the checklist to setup the repository.

# What's in it?

All the features are pre-enabled in the template. Steps to use or remove each feature are described in the [checklist](#Checklist).

- Formatting with prettier
- Linting with ESLint
- Running tests with jsenv
- Code coverage with codecov
- A GitHub workflow checking lint and tests on every push
- A GitHub workflow tracking performance metrics variation on every pull request
- Ability to write code specific to production or development
- Ability to publish a package compatible with CommonJS

# Things to know

- Node.js Long Term Support version should be used while coding and to use the package published on npm. At the time of writing this documentation it means version 14.17.0.

- Default branch of the repository is named _main_. It can be renamed in repository settings on GitHub.

- There is 2 type of js files: Files meant to be published on npm and the others. To help recognize which are which, files published on npm have _.js_ extension while the others have the _.mjs_ extension. This pattern is subjective and you are free to change it.

# Checklist

Go through this checklist after creating a repository with this template.

- [ ] Update fields in [package.json](../package.json), especially `"name"`, `"description"`, `"version"` and `"author".`
- [ ] Check the available features and see how use or remove them.

  - [Formatting](../docs/formatting/formatting.md#formatting)
  - [Linting](../docs/linting/linting.md#linting)
  - [import resolution](../docs/import_resolution/import_resolution.md#import-resolution)
  - [Production mode](../docs/production_mode/production_mode.md#production-mode)
  - [Testing](../docs/testing/testing.md#testing)
  - [Code coverage](../docs/coverage/coverage.md#coverage)
  - [CommonJS compatibility](../docs/commonjs_compat/commonjs_compat.md#commonjs-compatibility)
  - [Publishing](../docs/publishing/publishing.md#publishing)
  - [Pull request impacts](../docs/pr_impacts/pr_impacts.md#pull-request-impacts)

- [ ] Update [README.md](../README.md)
- [ ] Delete `.github/README.md`
- [ ] Review [LICENSE](../LICENSE) and `"license"` in [package.json](../package.json#L6)
- [ ] Remove `"private": true` in [package.json](../package.json#L4)
