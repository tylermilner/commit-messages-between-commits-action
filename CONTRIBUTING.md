# Contributing

[fork]: https://github.com/tylermilner/commit-messages-between-commits-action/fork
[pr]: https://github.com/tylermilner/commit-messages-between-commits-action/compare
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

## Making Code Changes

Since this is a composite action, modifying it is as simple as opening
`generate-release-notes.sh` and making the necessary changes.
Don't forget to update the action's metadata in `action.yaml` if necessary.

## Linting

Several linters are setup in the CI pipeline. If you want to lint locally,
install the following tools:

- [markdownlint](https://github.com/DavidAnson/markdownlint) or
[markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli) if using
]Homebrew](<https://brew.sh>) on macOS.

Run the following command to run the linters locally:

```Shell
./lint.sh
```

## Submitting a pull request

1. [Fork][fork] and clone the repository
2. Create a new branch: `git checkout -b my-branch-name`
3. Make your changes
4. Push to your fork and [submit a pull request][pr]
5. Pat your self on the back and wait for your pull request to be reviewed and
   merged.

Here are a few things you can do that will increase the likelihood of your pull
request being accepted:

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
3. Create a pull request from the `release/*` branch to `main`.
4. Once the pull request is merged, create a new release targeted on `main` in
   the GitHub UI. Make sure to set it to create the corresponding tag on publish
   (e.g. `v1.0.1`) and keep the "Publish this Action to the GitHub Marketplace"
   option checked.
5. Once the release has been published on GitHub, switch back to the `main`
   branch and pull down any changes.
6. Update the major version tag to point the latest release, which should look
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
