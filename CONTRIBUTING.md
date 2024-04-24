# Contributing

[fork]:
  https://github.com/tylermilner/commit-messages-between-commits-action/fork
[pr]:
  https://github.com/tylermilner/commit-messages-between-commits-action/compare
[code-of-conduct]: CODE_OF_CONDUCT.md

Hi there! We're thrilled that you'd like to contribute to this project. Your
help is essential for keeping it great.

Contributions to this project are
[released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license)
to the public under the [project's open source license](LICENSE).

Please note that this project is released with a [Contributor Code of
Conduct][code-of-conduct]. By participating in this project you agree to abide
by its terms.

## Source Code Overview

The following files make up this action:

- `action.yaml` - action metadata
- `generate-release-notes.sh` - main action logic. Changes to the action's
  functionality should be made here.
- `package.json` / `package-lock.json` - defines the development JavaScript
  dependencies that are used for testing this action.
- `__tests__` - contains the unit tests for the action.

## Making Code Changes

### Development Environment Setup

Although this is a composite action, we do make use of JavaScript for unit
testing. As such, you will need to have [Node.js](https://nodejs.org/en)
installed on your system, ideally through a version manager like
[nvm](https://github.com/nvm-sh/nvm).

Once Node is installed, `cd` into the action folder and install the project
dependencies via [npm](https://www.npmjs.com):

```Shell
cd commit-messages-between-commits-action
npm install
```

This will install the only development dependency, which is Jest.

### Updating Functionality

Since this is a composite action, all logic is contained within the
`generate-release-notes.sh` script. Make changes to this file to update the
action's functionality.

If you want to run the action locally to test things out, make sure you have the
necessary environment variables set:

```Shell
export INPUT_BEGIN_SHA=begin_sha_here
export INPUT_END_SHA=end_sha_here
export RELEASE_NOTES_FILE=release-notes.txt
```

Then run the action by executing the script:

```Shell
./generate-release-notes.sh
```

Once satisfied, don't forget to update the action's metadata in `action.yaml` if
necessary.

### Running Tests

This action uses [jest](https://jestjs.io/) for testing. Run tests using:

```Shell
npm test
```

## Linting

Several linters are setup in the CI pipeline as well as `npm` scripts. Run all
linters, formatters, and tests at once with:

```Shell
npm run all
```

## Submitting a pull request

1. [Fork][fork] and clone the repository
2. Configure and install the dependencies: `npm i`
3. Make sure the tests pass on your machine: `npm test`
4. Create a new branch: `git checkout -b my-branch-name`
5. Make your change, add tests, and make sure the tests still pass
6. Do one final check to ensure all tests, linter, and compilation steps pass:
   `npm run all`
7. Push to your fork and [submit a pull request][pr]
8. Pat your self on the back and wait for your pull request to be reviewed and
   merged.

Here are a few things you can do that will increase the likelihood of your pull
request being accepted:

- Follow the style guide style by running the linter `npm run lint`.
- Write tests.
- Keep your change as focused as possible. If there are multiple changes you
  would like to make that are not dependent upon each other, consider submitting
  them as separate pull requests.
- Write a
  [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

## Creating a Release

When it comes time to create a new release, repository maintainers should follow
the steps below to create and publish a new release.

### Versioning

For versioning, we are following the
[recommended versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
available in GitHub's [actions/toolkit](https://github.com/actions/toolkit)
repository.

### Automated Release

[ ] **TODO**: Add automated release instructions

### Manual Release

Perform the following steps to create a manual release:

1. Make sure all desired changes have been pushed to the `main` branch.
2. Create a `release/*` branch off of `main` (e.g. `release/v1.0.1`).
3. Update the `version` in `package.json` to the desired version.
4. Run `npm install` to update the `package-lock.json` file.
5. Run `npm run all` one last time to make sure all tests, linters, etc. pass.
6. Create a pull request from the `release/*` branch to `main`.
7. Once the pull request is merged, create a new release targeted on `main` in
   the GitHub UI. Make sure to set it to create the corresponding tag on publish
   (e.g. `v1.0.1`) and keep the "Publish this Action to the GitHub Marketplace"
   option checked.
8. Once the release has been published on GitHub, switch back to the `main`
   branch and pull down any changes.
9. Update the major version tag to point the latest release, which should look
   something like the following (replacing "v1" if publishing a different major
   version tag):

```Shell
git tag -fa v1 -m "Update v1 tag"
git push origin v1 --force
```

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
- [Creating a composite action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)
- [Action Versioning](https://github.com/actions/toolkit/blob/main/docs/action-versioning.md)
- [Releasing and maintaining actions](https://docs.github.com/en/actions/creating-actions/releasing-and-maintaining-actions)
- [`javascript-action` template repository](https://github.com/actions/javascript-action)
