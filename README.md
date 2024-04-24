# Commit Messages Between Commits Action

[![GitHub Super-Linter](https://github.com/tylermilner/commit-messages-between-commits-action/actions/workflows/linter.yml/badge.svg)](https://github.com/tylermilner/commit-messages-between-commits-action/actions/workflows/linter.yml)
[![CI](https://github.com/tylermilner/commit-messages-between-commits-action/actions/workflows/ci.yml/badge.svg)](https://github.com/tylermilner/commit-messages-between-commits-action/actions/workflows/ci.yml)

A GitHub Action to generate the list of commit messages between two commits.

## Inputs

### `begin-sha`

**Optional** SHA hash for the commit that should be used as the starting commit.
Defaults to the initial commit of the repository.

### `end-sha`

**Optional** SHA hash for the commit that should be used as the ending commit.
Defaults to the current commit (i.e. `${{ github.sha }}`).

### `release-notes-file`

**Optional** Path to the file to save the release notes to, including file
extension. Instead of using the `release-notes` output, this option can be
useful if there is a need to preserve the contents of the commit message
_exactly_, so that single quotes `'` and double quotes `"` are not evaluated or
removed from the output when expanded by the GitHub Actions `${{ }}` variable
syntax.

## Outputs

### `release-notes`

The release notes generated from the commit messages between `begin-sha` and
`end-sha`.

## Example usage

```yaml
steps:
  - name: Generate release notes
    id: release-notes
    uses: tylermilner/commit-messages-between-commits-action@v1
    with:
      begin-sha: begin_sha_here
      release-notes-file: release-notes.txt
  - name: Use release notes
    run: |
      echo "Contents of release notes file:"
      cat release-notes.txt
```

This produces something like the following output:

```console
Contents of release notes file:
- Latest commit message here.
- Message for commit HEAD~1 here.
```

## Contributing

See [Contributing](CONTRIBUTING.md) for more information about how this action
is setup and how to contribute.

## License

[MIT](LICENSE)
