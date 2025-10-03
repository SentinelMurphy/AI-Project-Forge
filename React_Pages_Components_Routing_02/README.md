# React 19 + Pages + Components + Routing

This guide will help you understand the basics of working with a React project. You’ll also learn about npm packages, SCSS modules, .gitignore, .nvmrc.

---

## 1. What are Pages, Components, and Routing?

### Components

- **What:** Components are reusable pieces of UI (User Interface) in React. For example, a `Button`, `Header`, or `Footer` can each be components.
- **Why:** They make your code easier to manage and reuse.
- **How:** Components go in the `src/components/` folder.

**Example:**

```jsx
// src/components/Header/Header.jsx

export default function Header() {
  return <h1 className="text-2xl font-bold text-center">Welcome! Home</h1>;
}
```

---

### Pages

- **What:** Pages are special components that represent different screens in your app (like "Home", "About", "Contact").
- **Where:** Place them in the `src/pages/` folder.
- **How:** Each page is usually a component.

**Example:**

```jsx
// src/pages/Home.jsx
import Header from '../components/Header/Header';
function Home() {
  return (
    <div>
      <Header />
      <p>Hello, this is your Home page!</p>
    </div>
  );
}
export default Home;
```

---

**Create a About Page.**

Now do the same code as Home Page for About Page. 

   - Create a About page called `About.jsx`
   - Same code as `Home.jsx` but change the function name & export name.
   - Import the Header
   - Update the `<p>` Text with Hello, this is your About page!

---

## 2. Best Practices

- **Keep components small and reusable.**
- **Use folders:** `components/` for reusable UI, `pages/` for screens.
- **Use `.jsx` or `.tsx` (for TypeScript) file extensions for React components.**
- **Use Tailwind classes for consistent styling.**
- **Write meaningful commit messages and keep your code clean.**
- **Prefer functional components and hooks (like `useState`, `useEffect`).**

---

## 3. What is an npm Package? How to Install?

- **npm package:** A reusable piece of code (library or tool) published to the npm registry. Examples: React, Tailwind, React Router.
- **How to install:** Use the terminal in your project folder.

**Example:**
```bash
npm install <package-name>
# Example:
npm install react-router-dom
```
- **To remove a package:**
```bash
npm uninstall <package-name>
```
- **All installed packages are listed in `package.json` and actually downloaded into the `node_modules/` folder.**

---

## 4.  Routing

- **What:** Routing lets users navigate between pages (e.g. `/home`, `/about`).
- **How:** Use [React Router](https://reactrouter.com/) (a popular npm package).

**Install React Router:**
```bash
npm install react-router-dom
```

**Example Setup:**

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
```
---

## 5. What is a .gitignore File? What to Put in It?

- **What:** A `.gitignore` file tells Git which files or folders should NOT be tracked or uploaded to your repository (e.g., build files, dependencies, environment variables).
- **Why:** Keeps your repository clean and avoids committing files that are large, auto-generated, or contain sensitive information.

**Typical .gitignore for React/Vite/Tailwind:**

```gitignore
# Node modules
node_modules/

# Build output
dist/
build/

# Vite cache
.vite/

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Local env files
.env
.env.local
.env.*.local

# OS files
.DS_Store

# IDE files
.vscode/
.idea/
```

- **Where:** Place `.gitignore` in the root of your project.
- **More info:** [gitignore documentation](https://git-scm.com/docs/gitignore)

---

## 6. .nvmrc File for Node 22

- **What:** `.nvmrc` is a file that tells [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) which Node.js version your project uses.
- **How:** Put the Node version number in `.nvmrc`

**Example for Node 22:**

```text
22
```

## 7. How to Set Up nvm (Node Version Manager)

Managing Node.js versions with nvm ensures everyone on your team uses the same Node version.  
Here’s how to set it up for both Linux/macOS and Windows, and how to test it with VS Code.

---

### **A. On Linux/macOS**

1. **Install nvm:**

Open your terminal and run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

2. **Activate nvm:**

Add the following to your `~/.bashrc`, `~/.profile`, or `~/.zshrc` (the installer usually does this for you):

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Then restart your terminal or run `source ~/.bashrc` (or the relevant file).

3. **Install Node.js (using .nvmrc):**

Navigate to your project folder and run:

```bash
nvm install
```
This reads the Node version from `.nvmrc` and installs it.

4. **Use the correct Node.js version:**

```bash
nvm use
```

5. **Check Node version:**

```bash
node -v
# Should print: v22.x.x (if your .nvmrc is '22')
```

---

### **B. On Windows**

For Windows, use [nvm-windows](https://github.com/coreybutler/nvm-windows):

1. **Download nvm-windows:**

Go to [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)  
Download and run the latest `nvm-setup.zip` installer.

2. **Install Node.js version:**

Open Command Prompt or PowerShell and run (from your project directory):

```bash
nvm install 22
nvm use 22
```

3. **Check Node version:**

```bash
node -v
```

---

### **C. How to Test Node Version with VS Code**

1. **Open the project folder in VS Code.**
2. Open a new integrated terminal in VS Code (`Terminal → New Terminal`).
3. Run:

   ```bash
   node -v
   ```

    - If you see the right version (e.g. `v22.0.0`), nvm is working.
    - If not, ensure the terminal is using the right shell (for Windows, use a new Command Prompt or PowerShell window after running `nvm use 22`).

4. **Tip:**  
   Some VS Code extensions (like the built-in terminal or Node.js extension) may need a terminal restart after switching Node versions.

---

**Summary Table**

| Platform     | Install Command                                                    | Use Node Version            |
|--------------|--------------------------------------------------------------------|-----------------------------|
| Linux/macOS  | `curl ... | bash` (see above)                                      | `nvm install`, `nvm use`    |
| Windows      | Download installer (see above)                                     | `nvm install 22`, `nvm use` |

---

- **Usage:** Run `nvm use` in your project to switch to the right Node version (if you use nvm).

---

## 8. Setting Up SCSS Modules

**SCSS modules** allow you to write scoped styles for components.

**Install required packages:**
```bash
npm install --save-dev sass
```

Create a folder for each component. Keep the component file and its SCSS module together:

```
src/
  components/
    Button/
      Button.jsx
      Button.module.scss
  pages/
    Home.jsx
    About.jsx
```

---

**Usage Example:**

- Add your Style also in the same folder as your component and call it the same name.

```jsx
// src/components/Button/Button.jsx
import styles from './Button.module.scss';

function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}
export default Button;
```

```scss
/* src/components/Button/Button.module.scss */
.button {
  background-color: #3490dc;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}
```

- **Tip:** The `.module.scss` naming tells Vite/React to treat these styles as modules (scoped to this component).


---

## 9. Passing a Prop to a component.

### 8.3 Create the Button Component action and pass prop.

The button:
- Uses a SCSS module for its base styling.
- Uses a small function to take in a prop of string name.
- Shows an alert with the page name when clicked.

```jsx
// src/components/Button/Button.jsx

import styles from './Button.module.scss';

export default function Button({page}) {
  function handleClick() {
    alert(`Page Name : ${page}`);
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      Click Me
    </button>
  );
}

```

```scss
/* src/components/Button/Button.module.scss */
.button {
  background: #0ea5e9;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.12s ease;
}

.button:hover {
  background: #0284c7;
}

.button:active {
  transform: translateY(1px);
}
```


---

### 8.4 Use the Button in the Home Page

```jsx
// src/pages/Home.jsx
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <Header />
      <h1 className="text-3xl font-bold text-sky-600">Home</h1>
      <p className="text-gray-700">This is your home page.</p>
      <Button page='Home'/>
    </main>
  );
}
```

### 8.5 Use the Button in the About Page

```jsx
// src/pages/About.jsx
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';

export default function About() {
  return (
    <main className="p-6 space-y-4">
      <Header />
      <h1 className="text-3xl font-bold text-sky-600">About</h1>
      <p className="text-gray-700">This page tells users about the app.</p>
      <Button page='About'/>
    </main>
  );
}
```

Clicking the button on each page will alert either “Home” or “About” based on the current props required.



---

## Project Structure Example

```
forge/
├── .gitignore
├── .nvmrc
├── package.json
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.scss
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── vite.config.js
```

---

If you have questions, ask your mentor or check the official docs:
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/guide/)
- [Tailwind Docs](https://tailwindcss.com/docs/installation)
- [React Router Docs](https://reactrouter.com/en/main)