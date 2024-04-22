const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

describe('generate-release-notes.sh', () => {
  let projectDir;
  let repoDir;

  beforeEach(() => {
    // Store the original working directory
    projectDir = process.cwd();

    // Create a new temporary directory and copy the script into it
    repoDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jest-'));
    execSync('cp generate-release-notes.sh ' + repoDir);
    process.chdir(repoDir);

    // Initialize a new Git repository
    // Use init.defaultBranch=main configuration to avoid warning about the default branch name
    execSync('git -c init.defaultBranch=main init');

    // Make some commits
    execSync('echo "First commit" > file.txt');
    execSync('git add file.txt');
    execSync('git commit -m "First commit"');
    execSync('echo "Second commit" > file.txt');
    execSync('git commit -am "Second commit"');
    execSync('echo "Third commit" > file.txt');
    execSync('git commit -am "Third commit"');

    // Set the environment variables that the script expects
    process.env.INPUT_BEGIN_SHA = 'HEAD~2'; // Two commits back
    process.env.INPUT_END_SHA = 'HEAD';
    process.env.GITHUB_OUTPUT = path.join(repoDir, 'output.txt');
  });

  it('outputs release notes to GITHUB_OUTPUT', () => {
    // Act
    try {
        execSync('./generate-release-notes.sh', { 
            encoding: 'utf8', 
            env: process.env 
        });
    } catch (error) {
        // Log the error and the output for easier debugging
        console.error('Error executing script:', error);
        console.error('Stdout:', error.stdout);
        console.error('Stderr:', error.stderr);

        // Fail the test
        expect(error).toBeUndefined();
    }

    // Assert
    const output = fs.readFileSync(process.env.GITHUB_OUTPUT, 'utf8');
    const expectedOutputRegex = /release-notes<<[a-f0-9]+\n- Third commit\n- Second commit\n[a-f0-9]+/;
    expect(output).toMatch(expectedOutputRegex);
  });

  it('outputs release notes to file', () => {
    // Arrange
    process.env.RELEASE_NOTES_FILE = path.join(repoDir, 'release-notes.txt');

    // Act
    try {
        execSync('./generate-release-notes.sh', { 
            encoding: 'utf8', 
            env: process.env 
        });
    } catch (error) {
        // Log the error and the output for easier debugging
        console.error('Error executing script:', error);
        console.error('Stdout:', error.stdout);
        console.error('Stderr:', error.stderr);

        // Fail the test
        expect(error).toBeUndefined();
    }

    // Assert
    const output = fs.readFileSync('release-notes.txt', 'utf8');
    const expectedOutputRegex = /- Third commit\n- Second commit/;
    expect(output).toMatch(expectedOutputRegex);
  });

  afterEach(() => {
    // Clean up the temporary directory
    process.chdir(os.tmpdir());
    fs.rm(repoDir, { recursive: true }, (err) => {
        if (err) {
            console.error("Error removing temporary directory: " + err);
        }
    });

    // Reset the working directory back to the original one after each test
    process.chdir(projectDir);
  });
});