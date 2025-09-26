# Getting Started with Node.js 22, React 19, Tailwind CSS (Latest), Vite, and Visual Studio Code

## Learning Outcomes

This guide, will cover:
- Install and verify Node.js 22 on Windows and Linux
- Troubleshoot Node.js setup on Windows (PATH issues)
- Create and configure a React 19 project with Vite and Tailwind CSS
- Install and set up Visual Studio Code (VSC) for modern JavaScript/React development
- Connect VSC to GitHub, clone repositories, and manage branches
- Perform Git operations (branching, checkout, commit, push, pull) from within VSC
- Know where to find official docs and further learning

---

## 1. Understanding the Stack

- **Node.js**: JavaScript runtime for running tooling and servers.
- **React 19**: Latest version of the popular UI framework.
- **Vite**: Fast dev and build tool for React.
- **Tailwind CSS**: Utility-first CSS framework.
- **Visual Studio Code (VSC)**: Free, powerful code editor with Git and extension support.
- **GitHub**: The world’s leading platform for code hosting and collaboration.

---

## 2. Install Node.js 22

### Windows

1. Download from [https://nodejs.org/](https://nodejs.org/).
2. Choose the LTS 22.x.x Windows installer.
3. Run the installer (accept defaults, include npm).
4. Check installation:
   ```sh
   node -v
   npm -v
   ```
   Output should show version 22.x.x.

---

### **Troubleshooting npm**

If npm -v shows the following error
"cannot be loaded because running scripts is disabled on this system."

Use the following command to change your users Execution policy from Restricted to RemoteSigned
```sh
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

RemoteSigned policy allows you use of tools like npm in Powershell and execute local scripts.

### **Troubleshooting Node.js Not Found**

If you get an error like `'node' is not recognized as an internal or external command`:

- **Close and reopen your terminal/VS Code** (the PATH variable may not update until you do).
- If it still fails:
    1. Open the Start menu, search for "Environment Variables" and select “Edit the system environment variables.”
    2. In the System Properties window, click “Environment Variables.”
    3. Under “System variables”, find `Path` and click “Edit.”
    4. Click “New”, add the path to your Node.js installation folder (usually `C:\Program Files\nodejs\`).
    5. Click OK to save all dialogs.
    6. Open a **new** terminal and run `node -v` again.

---

### Linux (Ubuntu/Debian)

```sh
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```
---

## 3. Install Visual Studio Code (VSC) & Extensions

- Download and install from [https://code.visualstudio.com/](https://code.visualstudio.com/)
- **Recommended Extensions** (search and install via Extensions panel `Ctrl+Shift+X`):
    - Prettier - Code Formatter
    - ESLint
    - Tailwind CSS IntelliSense
    - GitHub Pull Requests and Issues
    - GitLens – Git supercharged

**Optional:**  
Enable format on save (`Ctrl+,` then search "format on save", check the box).

---

## 4. GitHub Setup in VSC

### 4.1 Sign In to GitHub

1. Open the Source Control panel (`Ctrl+Shift+G`).
2. Click "Sign in to GitHub" or open Command Palette (`Ctrl+Shift+P`) and run `GitHub: Sign in`.
3. Follow the prompts to authenticate.

### 4.2 Clone a Repository

- Command Palette (`Ctrl+Shift+P`) → `Git: Clone`
- Paste the repository URL (e.g. `https://github.com/your-username/your-repo.git`)
- Choose folder, open in new window

### 4.3 Initialize a Local Repository and Push to GitHub

If starting a new project:
- In Source Control panel, click "Initialize Repository"
- Add your files, then:
    - **Commit:** Enter a message, press `Ctrl+Enter` (or click checkmark)
    - **Publish Branch:** Click "Publish to GitHub" or use Command Palette: `Git: Publish to GitHub`
- Follow prompts to create and link GitHub repo.

---

## 5. Creating a New React 19 + Vite Project

1. Open a new terminal in VSC (`Ctrl+``)
2. Run:
   ```sh
   npm create vite@latest my-app -- --template react
   cd my-app
   npm install
   ```
3. Upgrade to React 19 (if not already):
   ```sh
   npm install react@latest react-dom@latest
   ```
4. Open the folder in VSC (`File > Open Folder...`)

---

## 6. Add Tailwind CSS (Vite-managed, Tailwind v4+)

Vite works with Tailwind through PostCSS—no extra Vite config needed.

1. Make sure you’re in your project root
    - The folder containing `package.json` (and `vite.config.ts/js`).
    - If `vite.config.ts/js` is not there create it.  
    - In VS Code, open this folder and open a terminal (`Ctrl+\``). Run `dir` (Windows) or `ls` (macOS/Linux) and confirm you see `package.json`.

2. Install Tailwind, PostCSS, and Autoprefixer
   ```sh
   npm install -D tailwindcss postcss autoprefixer
   ```

3. Add PostCSS config (Vite auto-detects this)
    - If your `package.json` has `"type": "module"`:
      ```js
      // postcss.config.js
      export default {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      }
      ```

4. Add Tailwind to your CSS
    - Create `src/index.css` (or `src/main.css`) and add:
      ```css
      @import "tailwindcss";
      ```
      (Classic directives also work if you prefer:)
      ```css
      /* @tailwind base;
      @tailwind components;
      @tailwind utilities; */
      ```

5. Import the CSS in your app entry point
    - In `src/main.jsx` (or `src/main.tsx`):
      ```js
      import "./index.css";
      ```

6. Start your development server
   ```sh
   npm run dev
   ```
   Open the URL shown in the terminal (usually http://localhost:5173).

---

## 7. Try Tailwind & React

Edit `src/App.jsx`:

```jsx
function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">
        React 19 + Vite + Tailwind CSS
      </h1>
      <p className="text-lg text-indigo-900">
        Edit <code>src/App.jsx</code> and save to reload.
      </p>
    </div>
  );
}
export default App;
```

---

## 8. GitHub Branching and Version Control in VSC

### 8.1 Creating & Switching Branches

- **Create Branch:**
    - Source Control panel → … (More Actions) → `Create Branch`
    - Or Command Palette: `Git: Create Branch`
- **Switch Branch:**
    - Click branch name in VSC status bar (bottom left), select branch

### 8.2 Making Commits

- Make your changes
- Go to Source Control panel, stage files (plus icon), type commit message, press `Ctrl+Enter` or click checkmark

### 8.3 Pushing and Pulling

- **Push:**
    - Click sync icon in status bar or use Command Palette: `Git: Push`
- **Pull:**
    - Click sync icon or use Command Palette: `Git: Pull`

### 8.4 Viewing History and Changes

- Use GitLens panel or right-click a file → `Open Timeline`
- Use Source Control panel for file diffs

### 8.5 Resolving Merge Conflicts

- VSC will highlight conflicts and provide inline editors to resolve them

---

## 9. Useful Links

- [Node.js Official Site](https://nodejs.org/)
- [React Documentation](https://react.dev/)
- [Vite Getting Started](https://vitejs.dev/guide/)
- [Tailwind CSS Installation](https://tailwindcss.com/docs/installation)
- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-v19.0.0)
- [Visual Studio Code Download](https://code.visualstudio.com/)
- [VSC GitHub Docs](https://code.visualstudio.com/docs/sourcecontrol/github)
- [freeCodeCamp React Tutorial](https://www.freecodecamp.org/news/learn-react-js-in-5-minutes/)
- [Vite + React + Tailwind Setup Video](https://www.youtube.com/watch?v=6zIuAyLZPH0)
- [Tailwind CSS Crash Course (YouTube)](https://www.youtube.com/watch?v=UBOj6rqRUME)

---