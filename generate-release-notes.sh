#!/bin/bash -l

# TODO: Look into adding ability to trim the release notes (see https://stackoverflow.com/q/66769953/4343618)

# Validate environment variable inputs
if [[ -z "$INPUT_END_SHA" ]]; then
    # In theory, this should never happen since `action.yml` sets the default value of `end-sha` to the current commit
    echo 'Error: Unable to generate release notes. Missing `end-sha` input.'
    exit 1
fi

# Determine the SHA to start from
INITIAL_SHA="$INPUT_BEGIN_SHA"

if [[ -z "$INPUT_BEGIN_SHA" ]]; then
    echo 'Missing `begin-sha` input. Defaulting to initial commit.'
    INITIAL_SHA=$(git rev-list --max-parents=0 HEAD)
fi

# Get the commit history between begin and end SHAs
echo "Generating release notes between $INITIAL_SHA and $INPUT_END_SHA..."
RELEASE_NOTES=$(git log --oneline --no-decorate $INITIAL_SHA..$INPUT_END_SHA)

# Remove the commit hash at the beginning of each line
RELEASE_NOTES=$(echo "$RELEASE_NOTES" | cut -d ' ' -f2-)

# Add a dash at the beginning of each line
RELEASE_NOTES=$(echo "$RELEASE_NOTES" | sed 's/^/- /')

echo "Generated release notes:"
echo "$RELEASE_NOTES"

# Check if a filename is provided as input
if [[ -n "$RELEASE_NOTES_FILE" ]]; then
    # Save the release notes to the specified file
    echo "$RELEASE_NOTES" > "$RELEASE_NOTES_FILE"
    echo "Saved release notes to $RELEASE_NOTES_FILE"
fi

# Output multiline string. See https://github.com/orgs/community/discussions/26288#discussioncomment-3876281
echo "Saving to GitHub output..."
delimiter="$(openssl rand -hex 8)"
echo "release-notes<<${delimiter}" >> "${GITHUB_OUTPUT}"
echo "$RELEASE_NOTES" >> "${GITHUB_OUTPUT}"
echo "${delimiter}" >> "${GITHUB_OUTPUT}"
