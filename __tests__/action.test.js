const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

describe('generate-release-notes.sh', () => {
  let repoDir;

  beforeEach(() => {
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
  });

  it('generates the expected release notes', () => {
    // Run the GitHub Action script
    process.env.INPUT_BEGIN_SHA = 'HEAD~2'; // Two commits back
    process.env.INPUT_END_SHA = 'HEAD';
    process.env.GITHUB_OUTPUT = path.join(repoDir, 'output.txt');
    
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

    // Verify the output
    const output = fs.readFileSync(process.env.GITHUB_OUTPUT, 'utf8');
    
    // Use regex to verify the output
    const regex = /release-notes<<[a-f0-9]+\n- Third commit\n- Second commit\n[a-f0-9]+/;
    expect(output).toMatch(regex);
  });

  afterEach(() => {
    // Clean up the temporary directory
    process.chdir(os.tmpdir());
    fs.rm(repoDir, { recursive: true }, (err) => {
        if (err) {
            console.error("Error removing temporary directory: " + err);
        }
    });
  });
});