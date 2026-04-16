april 18th 2026

# Guide: Creating a Pull Request with Git and GitHub

  

This guide outlines the process of contributing changes to a project using a Pull Request (PR), covering both the command line and the Visual Studio Code (VS Code) user interface.

  

## 📋 Prerequisites

- A GitHub account.

- Git installed on your local machine.

- The project cloned locally.

- (Optional) The [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) extension installed in VS Code.

  

---

  

## 🚀 Step-by-Step Process

  

### 1. Create a Feature Branch

Never work directly on the `main` or `master` branch. Always create a new branch for your changes.

  

#### Using VS Code UI:

1. Click on the **branch name** in the bottom-left corner of the status bar (e.g., `main`).

2. Select **+ Create new branch...** from the dropdown menu.

3. Enter a descriptive name for your branch (e.g., `feature/add-user-login` or `fix/header-styling`) and press `Enter`.

  

---

  

### 2. Make Changes and Commit

Once on your new branch, make your code changes.

  

#### Using VS Code UI:

1. Open the **Source Control** tab (`Ctrl+Shift+G` or the branch icon on the left sidebar).

2. You will see a list of "Changes". Click the **+ (plus)** icon next to the files you want to stage.

3. Enter a clear, concise commit message in the text box at the top.

4. Click the **Commit** button (or the checkmark icon).

  

---

  

### 3. Push Your Branch to GitHub

Your commits are currently only on your local machine. You need to upload them to the remote server.

  

#### Using VS Code UI:

1. In the **Source Control** tab, click the **Publish Branch** button.

2. If the branch already exists on remote, click the **Sync Changes** (circular arrows) icon in the status bar.

  

---

  

### 4. Create the Pull Request (PR)

  

#### Via GitHub Website:

1. Navigate to the project repository on GitHub.

2. You will often see a yellow banner saying **"Your branch was recently pushed..."**. Click the **Compare & pull request** button.

3. **Base branch:** Ensure this is set to `main` (the branch you want to merge *into*).

4. **Compare branch:** Ensure this is your feature branch.

5. Add a title and a detailed description of what you changed and why.

6. Click **Create pull request**.

  

---

  

## 🛠 Summary Checklist

- [ ] Create a new branch.

- [ ] Stage and commit changes.

- [ ] Push branch to GitHub.

- [ ] Open a Pull Request on GitHub.

- [ ] Address any review comments.

- [ ] Merge PR once approved.

  

## 💡 Best Practices

- **Small PRs:** Keep your changes focused. It's easier to review one small feature than one giant overhaul.

- **Descriptive Messages:** Use prefixes like `feat:`, `fix:`, `docs:`, or `chore:` in your commit messages.

- **Test Your Code:** Always run the project locally to ensure your changes don't break existing functionality before pushing.