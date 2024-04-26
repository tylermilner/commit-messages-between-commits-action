# Commit Messages Between Commits Action

[![GitHub Super-Linter](https://github.com/tylermilner/commit-messages-between-commits-action/actions/workflows/linter.yml/badge.svg)](https://github.com/tylermilner/commit-messages-between-commits-action/actions/workflows/linter.yml)
[![CI](https://github.com/tylermilner/commit-messages-between-commits-action/actions/workflows/ci.yml/badge.svg)](https://github.com/tylermilner/commit-messages-between-commits-action/actions/workflows/ci.yml)

A GitHub Action to generate the list of commit messages between two commits. For
instance, this can be used to generate very basic changelogs or release notes
between builds.

## Why?

My aim with this is to replicate what I'm used to with one of my previous
[Jenkins](https://www.jenkins.io) setups, where the entire list of commits since
the last build was easily visible, and served as a very crude changelog that QA
could use to help validate builds. If you're looking for something fancy to
intelligently parse commit messages and generate release notes, then look
elsewhere!

## Inputs

### `begin-sha`

**Optional** SHA hash for the commit that should be used as the starting commit.
Defaults to the initial commit of the repository.

### `end-sha`

**Optional** SHA hash for the commit that should be used as the ending commit.
Defaults to the current commit (i.e. `${{ github.sha }}`).

### `commit-messages-file`

**Optional** Path to the file to save the commit messages to, including file
extension. Instead of using the `commit-messages` output, this option can be
useful if there is a need to preserve the contents of the commit message
_exactly_, so that single quotes `'` and double quotes `"` are not evaluated or
removed from the output when expanded by the GitHub Actions `${{ }}` variable
syntax.

## Outputs

### `commit-messages`

The commit messages generated from the commit messages between `begin-sha` and
`end-sha`.

## Example usage

```yaml
steps:
  - name: Generate commit messages
    id: commit-messages
    uses: tylermilner/commit-messages-between-commits-action@v1
    with:
      begin-sha: begin_sha_here
      commit-messages-file: commit-messages.txt
  - name: Use commit messages
    run: |
      echo "Commit messages:"
      cat commit-messages.txt
```

For the output, each commit message is prefixed with a `- ` and separated by a
newline.

An example output might look something like:

```console
Contents of commit messages file:
- Here is the commit message for the ending commit, which is the latest commit (i.e. `HEAD`) by default.
- Here is the commit message for the previous commit (e.g. `HEAD~1`).
- Here is the commit message for the beginning commit, which is the initial commit by default.
```

## Contributing

See [Contributing](CONTRIBUTING.md) for more information about how this action
is setup and how to contribute.

## License

[MIT](LICENSE)
