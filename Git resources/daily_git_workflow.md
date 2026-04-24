# Daily Git Best Practices for Beginners (VS Code UI Guide)

This guide outlines the essential daily workflow for managing changes using the built-in Git tools in Visual Studio Code, focusing on pulling updates and creating clean Pull Requests (PRs).

## 🔑 Requesting Repository Access

Before you can pull code or push changes, you must have the appropriate permissions for the repository.

### How to Request Access
1. **Identify the Project Owner:** The project's primary maintainer.
2. **Provide Your Credentials:** Send them your GitHub username or the email address associated with your account.
3. **Specify Access Level:** If you are unsure, request "Write" access (this allows you to push your feature branches and create Pull Requests).

### Verifying Access
Once you've been granted access:
1. Navigate to the repository URL in your browser.
2. If you can see the code and have a "Clone" button available, you are ready to proceed to the **Starting Your Day** section.

---

## 🌅 Starting Your Day: Pulling Changes

Before you start writing any new code, ensure your local project is up-to-date to avoid conflicts.

### 1. Update your Main Branch
Stay synced with the source of truth.
1. Click on the **Branch Name** in the bottom-left corner of the VS Code status bar.
2. Select `main` (or `master`) from the dropdown list.
3. Click the **Sync icon** (circular arrows) in the bottom-left status bar, or go to the **Source Control** tab (Ctrl+Shift+G) and click the **... (More Actions)** menu $\rightarrow$ **Pull**.

### 2. Update your Feature Branch
If you are working on a feature branch, you should bring in the latest changes from `main`.

#### Option A: The Standard Merge (Recommended for absolute beginners)
1. Use the branch picker in the status bar to switch back to your `feature` branch.
2. Open the **Command Palette** (Ctrl+Shift+P / Cmd+Shift+P).
3. Type `Git: Merge Branch...` and select `main`.
4. If conflicts appear, VS Code will highlight them. Use the "Accept Current Change" or "Accept Incoming Change" buttons to resolve them, then commit the result.

#### Option B: The Rebase (Optional - For a cleaner history)
Rebasing "moves" your work to the top of the latest main branch, avoiding a "merge commit" and keeping the history linear.
1. Use the branch picker to ensure you are on your `feature` branch.
2. Open the **Command Palette** (Ctrl+Shift+P / Cmd+Shift+P).
3. Type `Git: Rebase Current Branch onto...` and select `main`.
4. **Note:** If conflicts occur during a rebase, you resolve them one by one. After resolving a conflict, use the **Source Control** tab to continue the rebase process.
5. *Warning:* If you have already pushed your branch to the server, you will need to "Force Push" after a rebase (using the **...** menu in Source Control $\rightarrow$ **Push (Force)**) because the commit history has changed.

> ### 💡 Merge vs. Rebase: What's the difference?
>
> #### 🟢 Merge (The "History Preserver")
> Creates a new "Merge Commit" that ties the two branches together. It preserves the exact history of when things happened.
>
> ```mermaid
> gitGraph
>   commit id: "Initial"
>   commit id: "Main 1"
>   branch feature
>   checkout feature
>   commit id: "Feat 1"
>   commit id: "Feat 2"
>   checkout main
>   commit id: "Main 2"
>   merge feature id: "Merge Commit"
> ```
> *Visual: Notice how the branches diverge and then come back together at a single merge point.*
>
> #### 🔵 Rebase (The "History Cleaner")
> Rewrites your branch's history by placing your commits *on top* of the current main branch. It results in a perfectly straight line.
>
> ```mermaid
> gitGraph
>   commit id: "Initial"
>   commit id: "Main 1"
>   commit id: "Main 2"
>   commit id: "Feat 1 (Rebased)"
>   commit id: "Feat 2 (Rebased)"
> ```
> *Visual: Notice how the history is a straight line; your feature commits now appear as if they were written after the latest main update.*
>
> **Rule of thumb:** Use **Merge** if you want a complete record of every event. Use **Rebase** if you want a clean, linear story of how the feature evolved.

---

## 🛠 Working on Changes

### 1. Branching Strategy
**Never commit directly to the main branch.** 
- To create a new branch: Click the **Branch Name** in the status bar $\rightarrow$ **Create new branch...** $\rightarrow$ Enter a descriptive name (e.g., `feature/add-user-login`).

### 2. Atomic Commits
Make small, frequent commits. Each commit should do **one thing**.
- In the **Source Control** tab, you will see your changed files.
- Click the **+ (Plus)** icon next to a file to "Stage" it.
- Type a short, descriptive message in the commit box and click **Commit**.
- ❌ *Avoid staging all files at once if they relate to different features.*

### 3. Meaningful Commit Messages
Use clear, imperative language.
- **Good:** `feat: add password strength meter`
- **Bad:** `updated some stuff` or `fixed bug`

---

## 🚀 Creating a Pull Request (PR)

### 1. Publishing the Branch
Once you have committed your changes locally, you need to upload them to the server.
- In the **Source Control** tab, click the **Publish Branch** button (or the cloud icon in the status bar).

### 2. Opening the PR
While you can use the GitHub/GitLab web interface, if you have the **GitHub Pull Requests and Issues** extension installed:
1. Go to the **GitHub** icon in the side activity bar.
2. Click the **+** icon to create a new Pull Request.
3. Select the base branch (usually `main`) and your feature branch.

### 3. The PR Description
A great PR description makes the reviewer's job easier. Include:
- **Summary:** What does this change do?
- **Why:** Why is this change necessary?
- **How to Test:** Step-by-step instructions to verify the feature.
- **Visuals:** Attach screenshots or GIFs of UI changes directly in the PR comments.

### 4. Selecting Reviewers
After creating your PR, you need to request a review from your teammates.

**How to do it (GitHub):**
1. Open your Pull Request on the GitHub website.
2. On the right-hand sidebar, find the **Reviewers** section.
3. Click the **gear icon (⚙️)** next to "Reviewers".
4. Type the username of the person you want to review your code and select them from the list.

**Who to choose?**
- **Subject Matter Experts:** People who work closely with the files you changed.
- **Team Leads:** To ensure the change aligns with the overall project architecture.
- **Peer Reviewers:** A fellow developer for a fresh perspective and a "sanity check".
- **Tip:** Avoid "review fatigue" by selecting 1-3 key people rather than tagging the entire team.

---

## ⚔️ Dealing with Merge Conflicts
A merge conflict happens when two people change the same line of a file, or one person deletes a file that another person is modifying. Git doesn't know which version to keep and asks you to decide.

### How to Resolve Conflicts in VS Code
When a conflict occurs, VS Code will highlight the affected files in the **Source Control** tab with a **C (Conflict)** icon.

1. **Open the Conflicted File:** You will see the conflicting changes highlighted in different colors.
2. **Choose Your Version:** Above the highlighted block, VS Code provides quick-action buttons:
   - **Accept Current Change:** Keeps your changes (on your current branch).
   - **Accept Incoming Change:** Keeps the changes from the branch you are merging in.
   - **Accept Both Changes:** Keeps both versions, one after the other.
3. **Manual Edit:** You can also simply edit the text directly in the editor to create a custom hybrid solution.
4. **Finalize the Resolution:**
   - Once you've resolved all conflicts in a file, click the **+ (Plus)** icon in the Source Control tab to "Stage" the file.
   - After staging all conflicted files, enter a commit message (e.g., `chore: resolve merge conflicts`) and click **Commit**.

---

## 🔄 The "Golden Cycle" Summary (UI Version)
1. **Status Bar** $\rightarrow$ Switch to `main` $\rightarrow$ **Sync** (Update local main)
2. **Status Bar** $\rightarrow$ **Create new branch** (Start feature)
3. **Source Control Tab** $\rightarrow$ **Stage (+)** $\rightarrow$ **Commit** (Atomic changes)
4. **Source Control Tab** $\rightarrow$ **Publish Branch** (Upload)
5. **GitHub Extension/Web** $\rightarrow$ **Create PR** $\rightarrow$ **Select Reviewers** $\rightarrow$ **Review** $\rightarrow$ **Merge** (Collaborate)
