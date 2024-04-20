#!/bin/bash

echo "Linting Markdown files..."
markdownlint . --config .github/linters/.markdown-lint.yml --fix

echo "Finished linting."
