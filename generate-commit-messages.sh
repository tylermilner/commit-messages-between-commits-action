#!/bin/bash -l

# TODO: Look into adding ability to trim the commit messages (see https://stackoverflow.com/q/66769953/4343618)

# Validate environment variable inputs
if [[ -z "$INPUT_END_SHA" ]]; then
	# In theory, this should never happen since `action.yml` sets the default value of `end-sha` to the current commit
	echo "Error: Unable to generate commit messages. Missing 'end-sha' input."
	exit 1
fi

# Determine the SHA to start from
INITIAL_SHA="$INPUT_BEGIN_SHA"

if [[ -z "$INPUT_BEGIN_SHA" ]]; then
	echo "Missing 'begin-sha' input. Defaulting to initial commit."
	INITIAL_SHA=$(git rev-list --max-parents=0 HEAD)
fi

# Get the commit history between begin and end SHAs
echo "Generating commit messages between $INITIAL_SHA and $INPUT_END_SHA..."
COMMIT_MESSAGES=$(git log --oneline --no-decorate "$INITIAL_SHA".."$INPUT_END_SHA")

# Remove the commit hash at the beginning of each line
COMMIT_MESSAGES=$(echo "$COMMIT_MESSAGES" | cut -d ' ' -f2-)

# Add a dash at the beginning of each line
COMMIT_MESSAGES="- ${COMMIT_MESSAGES//$'\n'/$'\n'- }"

echo "Generated commit messages:"
echo "$COMMIT_MESSAGES"

# Check if a filename is provided as input
if [[ -n "$INPUT_COMMIT_MESSAGES_FILE" ]]; then
	# Save the commit messages to the specified file
	echo "$COMMIT_MESSAGES" >"$INPUT_COMMIT_MESSAGES_FILE"
	echo "Saved commit messages to $INPUT_COMMIT_MESSAGES_FILE"
fi

# Output multiline string. See https://github.com/orgs/community/discussions/26288#discussioncomment-3876281
echo "Saving to GitHub output..."
delimiter="$(openssl rand -hex 8)"
{
	echo "commit-messages<<${delimiter}"
	echo "$COMMIT_MESSAGES"
	echo "${delimiter}"
} >>"${GITHUB_OUTPUT}"
