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

This produces something like the following output:

```console
Contents of commit messages file:
- Message for ending commit here (HEAD/latest commit by default).
- Message for previous commit here (e.g. HEAD~1).
- Message for beginning commit here (initial commit by default).
```

## Contributing

See [Contributing](CONTRIBUTING.md) for more information about how this action
is setup and how to contribute.

## License

[MIT](LICENSE)
