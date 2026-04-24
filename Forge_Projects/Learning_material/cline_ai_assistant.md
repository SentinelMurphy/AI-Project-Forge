# Using Cline with Ollama Cloud Models

> **Prerequisites:** Cline is already installed and configured in VS Code.  
> See your setup & config document before proceeding.

---

## Table of Contents

1. [What Is an Ollama Cloud Model?](#1-what-is-an-ollama-cloud-model)
2. [Steps to Switch to an Ollama Cloud Model](#2-steps-to-switch-to-an-ollama-cloud-model)
3. [Understanding Plan Mode vs Act Mode](#3-understanding-plan-mode-vs-act-mode)
4. [Exercise: Ask Cline to Create a Markdown File](#4-exercise-ask-cline-to-create-a-markdown-file)
5. [How to Create Files in VS Code with Cline](#5-how-to-create-files-in-vs-code-with-cline)
6. [Comparing 4 Ollama Cloud Models](#6-comparing-4-ollama-cloud-models)
7. [MCP Servers with Cline](#7-mcp-servers-with-cline)

---

## 1. What Is an Ollama Cloud Model?

Ollama can serve models either **locally** (on your machine at `http://localhost:11434`)
or via a **hosted/cloud endpoint** (e.g., a remote server or [ollama.com](https://ollama.com)
cloud inference). This guide covers switching Cline to use a cloud-hosted Ollama model.

---

## 2. Steps to Switch to an Ollama Cloud Model

### Step 1 : Open the Cline API Settings

1. In VS Code, click the **Cline icon** in the Activity Bar (or press `Ctrl+Shift+P` / `Cmd+Shift+P` and type `Cline: Open In New Tab`).
2. In the Cline panel, click the **Settings/gear icon** (⚙️)  typically in the top-right of the Cline pane.
3. Navigate to the **API Configuration** or **Provider** section.

---

### Step 2 : Select Ollama as the Provider

1. In the **API Provider** dropdown, select **Ollama**.
2. If you do not see Ollama in the list, ensure your Cline extension is up to date.

---

### Step 3 : Set the Cloud Base URL

Replace the default local URL with your cloud endpoint:

| Setting      | Local (default)          | Cloud                           |
|--------------|--------------------------|---------------------------------|
| **Base URL** | `http://localhost:11434` | `https://ollama.com` |

- Enter your hosted Ollama URL in the **Base URL** field.
- If using [ollama.com](https://ollama.com) hosted inference, use the URL from your Ollama account dashboard.

> **Note:** API key support for hosted Ollama is an active area of development in Cline.  
> If prompted, enter the API key from your Ollama cloud account.

---

### Step 4 : Select Your Cloud Model

1. After setting the base URL, Cline will query the endpoint for available models.
2. Choose your desired model from the **Model** dropdown (e.g., `qwen3-coder-next`, `gemma4`, `deepseek-v3.2`, `ministral`).
3. If the model list is empty, verify your cloud endpoint is reachable and running.

---

### Step 5 : Save and Apply

1. Click **Save** (or equivalent confirm button).
2. If prompted, **restart VS Code** to apply the changes.
3. Start a **new Cline task** : changing models mid-task may not take effect immediately.

---

## 3. Understanding Plan Mode vs Act Mode

Cline operates in two distinct modes: **Plan** and **Act**. Knowing when to use each
makes you significantly more productive and helps prevent unintended changes to your codebase.

---

### Plan Mode

**What it does:**  
Plan Mode is a **read-only thinking and strategy phase**. Cline can explore your codebase,
read files, search for patterns, and analyse architecture but it **cannot modify any files
or execute any commands**.

**What Cline can do in Plan Mode:**
- Read and search your codebase
- Analyse code structure and architecture
- Identify potential bugs or edge cases
- Discuss implementation approaches with you
- Break down complex tasks into smaller steps
- Ask clarifying questions before doing any work

**Best used for:**

| Scenario | Why Plan Mode? |
|---|---|
| Planning a new feature | Map out the approach before touching code |
| Exploring an unfamiliar codebase | Understand structure without risk |
| Debugging a complex issue | Diagnose root cause before making changes |
| Architecture decisions | Discuss trade-offs safely |
| Reviewing a workflow | Understand existing logic first |
| Onboarding to a new project | Learn how things work |

> 💡 **Tip:** Always start complex tasks in Plan Mode. Let Cline read your code
> and propose an approach : only switch to Act once you are happy with the plan.

---

### Act Mode

**What it does:**  
Act Mode is the **implementation phase**. Cline has full capability to modify files,
run terminal commands, install packages, and execute your agreed plan. Every action
still requires **your explicit approval** before it happens.

**What Cline can do in Act Mode:**
- Create, edit, and delete files
- Run terminal commands (e.g., `npm install`, `git commit`)
- Execute scripts and tests
- Implement the strategy discussed in Plan Mode
- Make iterative changes based on your feedback

**Best used for:**

| Scenario | Why Act Mode? |
|---|---|
| Implementing a planned feature | Carry out the agreed approach |
| Routine code changes | Simple, well-understood edits |
| Running tests or builds | Execute and see results immediately |
| Creating new files/projects | Generate scaffolding and boilerplate |
| Quick bug fixes | Small, targeted changes |

> ⚠️ **Caution:** Act Mode makes real changes. Always review each proposed action
> before approving it, especially file deletions or terminal commands.

---

### Plan vs Act : Side-by-Side Comparison

| Feature | Plan Mode                       | Act Mode                            |
|---|-----------------------------------|-------------------------------------|
| **Read files** | ✅ Yes                             | ✅ Yes                               |
| **Modify files** | ❌ No                              | ✅ Yes                               |
| **Run commands** | ❌ No                              | ✅ Yes                               |
| **Best for** | Thinking, exploring, strategising | Implementing, building, executing   |
| **Risk level** | 🟢 None : read-only               | 🟡 Moderate : requires your approval |
| **Typical use** | Before coding begins              | After a plan is agreed              |
| **Recommended model** | Powerful reasoning model          | Faster, efficient model             |

---

### Recommended Workflow: Plan → Act → Iterate

```
1. Switch to PLAN MODE
   └─ Describe your goal to Cline
   └─ Let Cline analyse your codebase
   └─ Agree on the implementation approach

2. Switch to ACT MODE
   └─ Cline implements the plan step-by-step
   └─ Approve each action before it executes
   └─ Review changes as they happen

3. ITERATE as needed
   └─ Hit unexpected complexity? Switch back to Plan Mode
   └─ Discuss the new situation, then return to Act Mode
```

---

### How to Switch Between Modes

Toggle between Plan and Act using the **mode toggle button** at the bottom of the
Cline panel in VS Code.

>  **Pro Tip : Use Different Models per Mode:**  
> In Cline's settings you can assign a **different AI model** to each mode:
> - **Plan Mode** → `deepseek-v3.2` (deep reasoning, thorough analysis)
> - **Act Mode** → `qwen3-coder-next` (fast, code-focused execution)

### Plan & Act with Ollama Cloud Models

> ⚠️ Changing the **Base URL** in one mode (Plan or Act) currently updates **both** modes.  
> Running a different Ollama cloud server for Plan vs. Act is not yet supported.  
> You can, however, assign **different model names** on the same cloud endpoint per mode.

---

## 4. Exercise: Ask Cline to Create a Markdown File

This exercise walks you through using Cline with an Ollama cloud model to generate
a markdown file from scratch using a well-structured prompt.

---

### Exercise Goal

Ask Cline to create a markdown file called `my-notes.md` containing a structured
set of notes on a topic of your choice.

---

### Step 1 : Ensure You Are in Act Mode

Confirm the mode toggle at the bottom of the Cline panel shows **Act**.  
This is required since you want Cline to actually **create the file** : not just discuss it.

---

### Step 2 : Open the Cline Chat Panel

Click the Cline icon in the Activity Bar or press `Ctrl+Shift+P` / `Cmd+Shift+P`
and run `Cline: Focus on Chat View`.

---

### Step 3 : Write Your Prompt

Type the following prompt into the Cline chat input:

```
Create a new markdown file called my-notes.md in the root of this project.

The file should contain:
- A top-level heading: "My Learning Notes"
- A section called "What I Learned Today" with 3 bullet points as placeholders
- A section called "Key Terms" with a small table (Term | Definition) with 2 example rows
- A section called "Next Steps" with a numbered list of 3 action items
- A footer with today's date

Use proper markdown formatting throughout.
```

---

### Step 4 : Review Cline's Plan

Before Cline creates the file it will show you:
- The **file path** it intends to write to
- A **preview of the content** it will create

Read this carefully to confirm it matches your expectations.

---

### Step 5 : Approve the Action

Click **Approve** (or **Run**) to let Cline create the file.

> If the content is not quite right, type a follow-up instruction such as:  
> `"Change the heading to 'Daily Dev Notes' and add a code block example under Key Terms."`

---

### Step 6 : Verify the File Was Created

1. In VS Code, open the **Explorer panel** (`Ctrl+Shift+E` / `Cmd+Shift+E`).
2. You should see `my-notes.md` in the file tree.
3. Click it to open and review the content.

---

### Example Output

Cline should produce something similar to:

```markdown
# My Learning Notes

## What I Learned Today
- Placeholder bullet point one
- Placeholder bullet point two
- Placeholder bullet point three

## Key Terms

| Term       | Definition                        |
|------------|-----------------------------------|
| Markdown   | A lightweight markup language     |
| Cline      | An AI coding assistant in VS Code |

## Next Steps
1. Complete the setup of my development environment
2. Review the Cline documentation
3. Practice writing prompts for common tasks

---
*Last updated: 2026-04-24*
```

---

### Tips for Better Prompts

| Tip | Example |
|---|---|
| Be specific about the file path | `"Create the file at docs/my-notes.md"` |
| Specify the structure clearly | `"Include h2 headings for each section"` |
| Ask for placeholders | `"Use placeholder text I can fill in later"` |
| Request a specific style | `"Use a professional, concise tone"` |
| Iterate freely | `"Add a section called Resources with 3 links"` |

---

## 5. How to Create Files in VS Code with Cline

Beyond the exercise above, here are all the ways Cline can create and manage files
for you inside VS Code.

---

### Method 1 : Ask Cline Directly (Natural Language)

The simplest approach : just tell Cline what you need:

```
Create a new file called README.md with a project description, installation 
instructions, and a usage section.
```

```
Create a folder called src and inside it create three files: index.js, 
app.js, and config.js with basic boilerplate content in each.
```

Cline will show you a preview of each file before writing it. Approve each one.

---

### Method 2 : Ask Cline to Create Multiple Files at Once

```
Scaffold a basic Node.js project with the following files:
- package.json with name "my-app" and version "1.0.0"
- src/index.js with a hello world console log
- .gitignore ignoring node_modules and .env
- README.md with a project title and description
```

Cline will create all files in sequence, asking for your approval at each step.

---

### Method 3 : Create Files via VS Code Explorer (Manual)

If you prefer to create the file yourself and then have Cline fill it:

1. In the **Explorer panel** (`Ctrl+Shift+E`), right-click a folder.
2. Select **New File**.
3. Type the filename (e.g., `notes.md`) and press `Enter`.
4. Open the Cline panel and type:
   ```
   Fill in the currently open file notes.md with a structured template 
   for meeting notes including date, attendees, agenda, and actions.
   ```

---

### Method 4 : Use the VS Code Command Palette

1. Press `Ctrl+Shift+P` / `Cmd+Shift+P`.
2. Type `New File` and select **File: New File**.
3. Name and save your file.
4. Then ask Cline to populate it via the chat panel.

---

### Method 5 : Ask Cline to Refactor Existing Files

Cline can also modify files that already exist:

```
Open the file src/config.js and add a default export object 
containing database host, port, and name settings.
```

> ⚠️ Always review Cline's proposed edits using the **diff view** before approving.  
> Cline highlights additions in green and removals in red.

---

### File Creation : Quick Reference

| What you want | What to say to Cline |
|---|---|
| New empty file | `"Create a new file called X at path Y"` |
| File with content | `"Create X and fill it with..."` |
| Multiple files | `"Create the following files: ..."` |
| Folder + files | `"Create a folder called X with files A, B, C inside"` |
| Fill an existing file | `"Open file X and populate it with..."` |
| Edit a section | `"In file X, update the section Y to..."` |

---

## 6. Comparing 4 Ollama Cloud Models

The four models below represent some of the strongest options available on Ollama. Each has a distinct personality and excels in different areas.

---

### Model Overview

| Model | Parameters | Context Window | Architecture | Release |
|---|---|---|---|---|
| **qwen3-coder-next** | 235B (22B active, MoE) | 256K tokens | Mixture of Experts | Early 2026 |
| **gemma4** | 26B (3.8B active, MoE) | 256K tokens | Mixture of Experts | March 2026 |
| **deepseek-v3.2** | 671B (37B active, MoE) | 128–160K tokens | Mixture of Experts | Dec 2025 |
| **ministral** | 3B / 8B / 14B (Dense) | 256K tokens | Dense Transformer | 2025 |

---

### 🟦 qwen3-coder-next

**Made by:** Alibaba Cloud (Qwen Team)  
**Ollama tag:** `ollama run qwen3-coder-next`

**What it excels at:**
- The **highest-performing open coding model** available locally as of 2026
- Advanced agentic coding tasks (multi-step reasoning + code generation)
- Long-context codebases : up to 256K token context window
- "Think-before-answer" reasoning mode for complex problems
- Repository-scale code understanding and refactoring

**Benchmark highlights:**

| Benchmark | Score |
|---|---|
| HumanEval (code) | 94.1% |
| SWE-bench Verified | 58.7% |

**Best used for:**
- Writing, reviewing, and refactoring large amounts of code
- Autonomous coding agents (e.g., Cline Act Mode on complex tasks)
- Projects requiring deep code comprehension across many files
- Debugging hard-to-trace bugs

**Hardware needs:** ~24 GB VRAM (Q4 quantized) | **Licence:** Apache 2.0

> ✅ **Recommended Cline mode:** Act Mode for implementation, Plan Mode for architecture review

---

### 🟩 gemma4

**Made by:** Google DeepMind  
**Ollama tag:** `ollama run gemma4`

**What it excels at:**
- **Multimodal understanding** : text, images, audio, and video inputs
- Advanced mathematics and competition-level reasoning
- Runs efficiently on consumer hardware (~85 tokens/sec)
- General-purpose reasoning, summarisation, and Q&A
- Multilingual tasks across many languages

**Benchmark highlights:**

| Benchmark | Score |
|---|---|
| HumanEval (code) | 84.9% |
| SWE-bench Verified | 38.6% |
| AIME (maths competition) | 89.2% |
| MMLU (general knowledge) | 88.4% |

**Best used for:**
- Tasks that involve images, diagrams, or visual context
- Mathematical problem solving and data analysis
- Writing and editing long documents
- General assistant tasks where speed matters

**Hardware needs:** ~8–12 GB VRAM | **Licence:** Gemma Terms of Use

> ✅ **Recommended Cline mode:** Plan Mode for discussion and analysis

---

### 🟥 deepseek-v3.2

**Made by:** DeepSeek AI  
**Ollama tag:** `ollama run deepseek-v3.2`

**What it excels at:**
- **Balanced performance** across coding, reasoning, and logic
- Highly efficient for its size due to MoE architecture (only 37B active params)
- Strong at system design, software architecture planning, and code review
- Excellent at structured output (JSON, API schemas, technical specs)

**Benchmark highlights:**

| Benchmark | Score |
|---|---|
| HumanEval (code) | 93.4% |
| SWE-bench Verified | 56.1% |

**Best used for:**
- Balanced coding + reasoning tasks
- Planning and designing software architecture
- Code review and explaining complex logic
- Generating technical documentation

**Hardware needs:** ~24–32 GB VRAM (Q4 quantized) | **Licence:** MIT

> ✅ **Recommended Cline mode:** Plan Mode for architecture; Act Mode for implementation

---

### 🟨 ministral

**Made by:** Mistral AI  
**Ollama tag:** `ollama run ministral` (3B, 8B, or 14B variants)

**What it excels at:**
- **Edge and resource-constrained deployment** : runs well on laptops
- Native function calling and structured JSON output
- Multilingual support across 40+ languages
- Vision input support (14B variant)
- Fast inference on Apple Silicon
- Great for MCP server integration and tool-calling workflows

**Hardware needs:** ~2–8 GB VRAM depending on variant | **Licence:** Apache 2.0

> ✅ **Recommended Cline mode:** Act Mode for fast, targeted file and code changes

---

### Model Comparison at a Glance

| | qwen3-coder-next | gemma4                       | deepseek-v3.2               | ministral              |
|---|---|------------------------------|-----------------------------|------------------------|
| **Best for** | Pure coding & agents | Multimodal & maths           | Balanced coding + reasoning | Edge/lightweight tasks |
| **Code quality** | 🥇 Highest | 🥉 Good                      | 🥈 Very high                | ✅ Solid                |
| **Speed** | Moderate | 🥇 Fast                      | Moderate                    | 🥇 Fastest             |
| **VRAM needed** | ~24 GB | ~8 – 12 GB                   | ~24 – 32 GB                 | ~2 – 8 GB              |
| **Multimodal** | Text only | Text + Image + Audio + Video | Text only                   | Text + Image (14B)     |
| **Tool calling** | ✅ Yes | ✅ Yes                        | ✅ Yes                       | 🥇 Native              |
| **Licence** | Apache 2.0 | Gemma ToU                    | MIT                         | Apache 2.0             |

---

### Which Model Should I Choose?

```
Are you doing heavy coding or running Cline agents on large codebases?
  └─ YES → qwen3-coder-next

Do you need to process images, diagrams, or run on modest hardware quickly?
  └─ YES → gemma4

Do you need a balance of coding + deep reasoning + system design?
  └─ YES → deepseek-v3.2

Are you on a laptop, low VRAM machine, or need tool-calling for MCP servers?
  └─ YES → ministral
```

---

## 7. MCP Servers with Cline

### What Is MCP?

**Model Context Protocol (MCP)** is an open standard that allows AI models like
Cline to connect to external tools, data sources, and APIs through a standardised
interface. Think of MCP servers as **plugins** that give Cline new superpowers :
the ability to look up live data, query APIs, and return real-world information
directly into your conversation.

```
┌─────────────┐        MCP Protocol        ┌──────────────────┐
│    Cline    │  ◄─────────────────────►   │   MCP Server     │
│  (VS Code)  │   Tools / Resources /      │  (your custom    │
│             │   Prompts                  │   Node.js app)   │
└─────────────┘                            └──────────────────┘
                                                    │
                                           ┌────────▼────────┐
                                           │  External API /  │
                                           │  Database /      │
                                           │  Web Service     │
                                           └─────────────────┘
```

**What MCP servers can do:**
- Expose **tools** : functions Cline can call (e.g., "search for a car")
- Expose **resources** : data Cline can read (e.g., a live price list)
- Expose **prompts** : reusable prompt templates

---

### Prerequisites

Before building any MCP server, ensure you have the following installed:

```bash
# Check Node.js version (18+ required)
node --version

# Check npm
npm --version
```

Install the official MCP SDK:

```bash
npm install @modelcontextprotocol/sdk
```

---

### How Cline Uses MCP Servers

Once an MCP server is registered, Cline automatically detects its tools and
can call them during any conversation. You simply ask Cline naturally:

> *"Look up the specs for a 2024 Ford Mustang"*  
> *"What were the football results for the Premier League this weekend?"*  
> *"How much does an RTX 5090 cost and where can I buy one?"*

Cline will identify the right MCP tool, call it, and present the results to you.

---

### Registering an MCP Server with Cline

All MCP servers are registered in Cline's MCP settings file:

**Location:**
- **Windows:** `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
- **macOS:** `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- **Linux:** `~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

**Base configuration format:**

```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "node",
      "args": ["/absolute/path/to/your/server/build/index.js"],
      "env": {
        "YOUR_API_KEY": "your-key-here"
      },
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

> 💡 You can also open the MCP settings directly from Cline's panel by clicking  
> **MCP Servers** → **Edit Config**.

---

### Asking Cline to Build the MCP Server for You

One of the most powerful workflows is simply **asking Cline to create the MCP server
for you**. Switch to **Act Mode** and use a prompt like:

```
Create a new MCP server project in a folder called mcp-car-lookup.

The server should:
- Use the @modelcontextprotocol/sdk package
- Expose a tool called "search_car" that accepts make, model, and year
- Fetch data from the NHTSA public API (https://api.nhtsa.gov)
- Return vehicle specs including safety ratings
- Use TypeScript and include a build script

Also create a package.json, tsconfig.json, and a README explaining how to run it.
```

Cline will scaffold the entire server, install dependencies, and guide you through
registering it. This is the recommended approach for getting started quickly.

---

## MCP Server 1 : Car Information Lookup

### Overview

This MCP server connects Cline to the **NHTSA (National Highway Traffic Safety
Administration) public API** to look up vehicle information, safety ratings,
recalls, and complaints : all completely free with no API key required.

---

### Project Setup

```bash
# Create the project folder
mkdir mcp-car-lookup
cd mcp-car-lookup
npm init -y

# Install dependencies
npm install @modelcontextprotocol/sdk node-fetch

# Install dev dependencies
npm install --save-dev typescript @types/node ts-node

# Initialise TypeScript config
npx tsc --init
```

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

Update `package.json` scripts:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js"
  }
}
```

---

### Server Code

Create `src/index.ts`:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const BASE_URL = "https://api.nhtsa.gov";

const server = new Server(
  { name: "mcp-car-lookup", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_car_makes",
      description: "Get all available vehicle makes (manufacturers) for a given model year.",
      inputSchema: {
        type: "object",
        properties: {
          year: {
            type: "string",
            description: "The model year to search (e.g. '2024')",
          },
        },
        required: ["year"],
      },
    },
    {
      name: "search_car_models",
      description: "Get all models for a specific make and year.",
      inputSchema: {
        type: "object",
        properties: {
          make: { type: "string", description: "Vehicle manufacturer (e.g. 'Ford')" },
          year: { type: "string", description: "Model year (e.g. '2024')" },
        },
        required: ["make", "year"],
      },
    },
    {
      name: "get_safety_ratings",
      description: "Get NHTSA safety ratings for a specific vehicle.",
      inputSchema: {
        type: "object",
        properties: {
          make:  { type: "string", description: "Vehicle manufacturer (e.g. 'Toyota')" },
          model: { type: "string", description: "Vehicle model (e.g. 'Camry')" },
          year:  { type: "string", description: "Model year (e.g. '2024')" },
        },
        required: ["make", "model", "year"],
      },
    },
    {
      name: "get_recalls",
      description: "Get recall information for a specific vehicle make and model.",
      inputSchema: {
        type: "object",
        properties: {
          make:  { type: "string", description: "Vehicle manufacturer" },
          model: { type: "string", description: "Vehicle model" },
          year:  { type: "string", description: "Model year" },
        },
        required: ["make", "model", "year"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {

      // Get all makes for a model year
      case "search_car_makes": {
        const url = `${BASE_URL}/vehicles/GetMakesForVehicleType/car?modelYear=${args.year}&format=json`;
        const res  = await fetch(url);
        const data = await res.json() as { Results: Array<{ MakeName: string; MakeId: number }> };
        const makes = data.Results.map((m) => `${m.MakeName} (ID: ${m.MakeId})`).slice(0, 30);
        return {
          content: [{
            type: "text",
            text: `**Vehicle makes available for ${args.year}:**\n\n${makes.join("\n")}`,
          }],
        };
      }

      // Get all models for a make + year
      case "search_car_models": {
        const url = `${BASE_URL}/vehicles/GetModelsForMakeYear/make/${args.make}/modelyear/${args.year}?format=json`;
        const res  = await fetch(url);
        const data = await res.json() as { Results: Array<{ Model_Name: string }> };
        if (!data.Results.length) {
          return { content: [{ type: "text", text: `No models found for ${args.make} ${args.year}.` }] };
        }
        const models = data.Results.map((m) => `• ${m.Model_Name}`).join("\n");
        return {
          content: [{
            type: "text",
            text: `**${args.make} models for ${args.year}:**\n\n${models}`,
          }],
        };
      }

      // Get safety ratings
      case "get_safety_ratings": {
        const url = `${BASE_URL}/SafetyRatings/modelyear/${args.year}/make/${args.make}/model/${args.model}?format=json`;
        const res  = await fetch(url);
        const data = await res.json() as { Results: Array<Record<string, unknown>> };
        if (!data.Results.length) {
          return { content: [{ type: "text", text: `No safety ratings found for ${args.year} ${args.make} ${args.model}.` }] };
        }
        const vehicle = data.Results[0];
        const output = [
          `**Safety Ratings : ${args.year} ${args.make} ${args.model}**`,
          "",
          `Overall Rating      : ${vehicle.OverallRating       ?? "N/A"} / 5`,
          `Overall Front Crash : ${vehicle.OverallFrontCrashRating ?? "N/A"} / 5`,
          `Overall Side Crash  : ${vehicle.OverallSideCrashRating  ?? "N/A"} / 5`,
          `Rollover Rating     : ${vehicle.RolloverRating       ?? "N/A"} / 5`,
          "",
          `Vehicle ID : ${vehicle.VehicleId ?? "N/A"}`,
          `More info  : ${vehicle.VehicleDescription ?? ""}`,
        ].join("\n");
        return { content: [{ type: "text", text: output }] };
      }

      // Get recall information
      case "get_recalls": {
        const url = `${BASE_URL}/complaints/complaintsByVehicle/make/${args.make}/model/${args.model}/modelYear/${args.year}?format=json`;
        const res  = await fetch(url);
        const data = await res.json() as { results: Array<{ components: string; summary: string; dateOfIncident: string }> };
        if (!data.results?.length) {
          return { content: [{ type: "text", text: `No recalls or complaints found for ${args.year} ${args.make} ${args.model}.` }] };
        }
        const top5 = data.results.slice(0, 5).map((r, i) =>
          `**${i + 1}. ${r.components}**\n${r.summary}\nDate: ${r.dateOfIncident}`
        ).join("\n\n");
        return {
          content: [{
            type: "text",
            text: `**Top complaints for ${args.year} ${args.make} ${args.model}:**\n\n${top5}`,
          }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${(err as Error).message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✅ Car Lookup MCP server running");
}

main().catch(console.error);
```

---

### Build and Register

```bash
# Build the TypeScript
npm run build

# Test it runs without errors
node build/index.js
```

Add to `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "car-lookup": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-car-lookup/build/index.js"],
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

---

### Using the Car Lookup Server in Cline

Once registered, try these prompts in Cline:

```
What car models did Ford make in 2024?
```
```
What are the NHTSA safety ratings for the 2023 Toyota RAV4?
```
```
Are there any complaints about the 2022 Chevrolet Silverado?
```

---

## MCP Server 2 : Football Results Lookup

### Overview

This MCP server connects Cline to the **football-data.org API** to look up live
and historical football match results, league standings, and upcoming fixtures.
A free API key is available at [football-data.org](https://www.football-data.org/client/register).

---

### Project Setup

```bash
mkdir mcp-football-results
cd mcp-football-results
npm init -y
npm install @modelcontextprotocol/sdk node-fetch
npm install --save-dev typescript @types/node ts-node
npx tsc --init
```

Use the same `tsconfig.json` and `package.json` scripts as the car server above.

---

### Server Code

Create `src/index.ts`:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_KEY  = process.env.FOOTBALL_API_KEY ?? "";
const BASE_URL = "https://api.football-data.org/v4";

const HEADERS = {
  "X-Auth-Token": API_KEY,
  "Content-Type": "application/json",
};

// Common competition codes
const COMPETITIONS: Record<string, string> = {
  "Premier League":       "PL",
  "La Liga":              "PD",
  "Bundesliga":           "BL1",
  "Serie A":              "SA",
  "Ligue 1":              "FL1",
  "Champions League":     "CL",
  "World Cup":            "WC",
  "European Championship":"EC",
};

const server = new Server(
  { name: "mcp-football-results", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_recent_results",
      description: "Get the most recent match results for a football competition.",
      inputSchema: {
        type: "object",
        properties: {
          competition: {
            type: "string",
            description: `Competition name. Options: ${Object.keys(COMPETITIONS).join(", ")}`,
          },
          limit: {
            type: "number",
            description: "Number of results to return (default: 10, max: 20)",
          },
        },
        required: ["competition"],
      },
    },
    {
      name: "get_league_standings",
      description: "Get the current league table / standings for a competition.",
      inputSchema: {
        type: "object",
        properties: {
          competition: {
            type: "string",
            description: `Competition name. Options: ${Object.keys(COMPETITIONS).join(", ")}`,
          },
        },
        required: ["competition"],
      },
    },
    {
      name: "get_upcoming_fixtures",
      description: "Get upcoming scheduled fixtures for a football competition.",
      inputSchema: {
        type: "object",
        properties: {
          competition: {
            type: "string",
            description: "Competition name (e.g. 'Premier League')",
          },
          limit: {
            type: "number",
            description: "Number of upcoming fixtures to return (default: 10)",
          },
        },
        required: ["competition"],
      },
    },
    {
      name: "search_team_matches",
      description: "Get recent match results for a specific team by their team ID.",
      inputSchema: {
        type: "object",
        properties: {
          team_id: {
            type: "number",
            description: "The football-data.org team ID (e.g. 64 for Liverpool)",
          },
          limit: {
            type: "number",
            description: "Number of matches to return (default: 5)",
          },
        },
        required: ["team_id"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {

      // Recent results for a competition
      case "get_recent_results": {
        const code  = COMPETITIONS[args.competition as string];
        if (!code) throw new Error(`Unknown competition: ${args.competition}. Valid options: ${Object.keys(COMPETITIONS).join(", ")}`);

        const limit = Math.min(Number(args.limit) || 10, 20);
        const url   = `${BASE_URL}/competitions/${code}/matches?status=FINISHED`;
        const res   = await fetch(url, { headers: HEADERS });
        const data  = await res.json() as {
          matches: Array<{
            utcDate: string;
            homeTeam: { name: string };
            awayTeam: { name: string };
            score: { fullTime: { home: number; away: number } };
            matchday: number;
          }>;
        };

        const matches = data.matches
          .slice(-limit)
          .reverse()
          .map((m) => {
            const date  = new Date(m.utcDate).toLocaleDateString("en-GB");
            const score = `${m.score.fullTime.home} - ${m.score.fullTime.away}`;
            return `• **${m.homeTeam.name}** ${score} **${m.awayTeam.name}**  (${date}, Matchday ${m.matchday})`;
          })
          .join("\n");

        return {
          content: [{
            type: "text",
            text: `**Recent Results : ${args.competition}**\n\n${matches}`,
          }],
        };
      }

      // League standings
      case "get_league_standings": {
        const code = COMPETITIONS[args.competition as string];
        if (!code) throw new Error(`Unknown competition: ${args.competition}`);

        const url  = `${BASE_URL}/competitions/${code}/standings`;
        const res  = await fetch(url, { headers: HEADERS });
        const data = await res.json() as {
          standings: Array<{
            type: string;
            table: Array<{
              position: number;
              team: { name: string };
              playedGames: number;
              won: number;
              draw: number;
              lost: number;
              points: number;
              goalsFor: number;
              goalsAgainst: number;
            }>;
          }>;
        };

        const table = data.standings.find((s) => s.type === "TOTAL")?.table ?? [];
        const rows  = table.slice(0, 20).map((t) =>
          `${String(t.position).padStart(2)}. ${t.team.name.padEnd(28)} ` +
          `P:${t.playedGames} W:${t.won} D:${t.draw} L:${t.lost} ` +
          `GF:${t.goalsFor} GA:${t.goalsAgainst} Pts:${t.points}`
        ).join("\n");

        return {
          content: [{
            type: "text",
            text: `**${args.competition} Standings**\n\n\`\`\`\n${rows}\n\`\`\``,
          }],
        };
      }

      // Upcoming fixtures
      case "get_upcoming_fixtures": {
        const code  = COMPETITIONS[args.competition as string];
        if (!code) throw new Error(`Unknown competition: ${args.competition}`);

        const limit = Math.min(Number(args.limit) || 10, 20);
        const url   = `${BASE_URL}/competitions/${code}/matches?status=SCHEDULED`;
        const res   = await fetch(url, { headers: HEADERS });
        const data  = await res.json() as {
          matches: Array<{
            utcDate: string;
            homeTeam: { name: string };
            awayTeam: { name: string };
            matchday: number;
          }>;
        };

        const fixtures = data.matches.slice(0, limit).map((m) => {
          const date = new Date(m.utcDate).toLocaleString("en-GB", {
            weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
          });
          return `• **${m.homeTeam.name}** vs **${m.awayTeam.name}**  :  ${date}  (Matchday ${m.matchday})`;
        }).join("\n");

        return {
          content: [{
            type: "text",
            text: `**Upcoming Fixtures : ${args.competition}**\n\n${fixtures}`,
          }],
        };
      }

      // Team matches
      case "search_team_matches": {
        const limit = Math.min(Number(args.limit) || 5, 10);
        const url   = `${BASE_URL}/teams/${args.team_id}/matches?status=FINISHED&limit=${limit}`;
        const res   = await fetch(url, { headers: HEADERS });
        const data  = await res.json() as {
          matches: Array<{
            utcDate: string;
            competition: { name: string };
            homeTeam: { name: string };
            awayTeam: { name: string };
            score: { fullTime: { home: number; away: number } };
          }>;
        };

        if (!data.matches?.length) {
          return { content: [{ type: "text", text: "No recent matches found for that team ID." }] };
        }

        const matches = data.matches.reverse().map((m) => {
          const date  = new Date(m.utcDate).toLocaleDateString("en-GB");
          const score = `${m.score.fullTime.home} - ${m.score.fullTime.away}`;
          return `• **${m.homeTeam.name}** ${score} **${m.awayTeam.name}**  (${m.competition.name}, ${date})`;
        }).join("\n");

        return {
          content: [{
            type: "text",
            text: `**Recent Matches for Team ${args.team_id}:**\n\n${matches}`,
          }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${(err as Error).message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✅ Football Results MCP server running");
}

main().catch(console.error);
```

---

### Build and Register

```bash
npm run build
```

Add to `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "football-results": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-football-results/build/index.js"],
      "env": {
        "FOOTBALL_API_KEY": "your-football-data-api-key-here"
      },
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

>  **Get your free API key at:** [football-data.org/client/register](https://www.football-data.org/client/register)

---

### Using the Football Results Server in Cline

```
What were the Premier League results this weekend?
```
```
Show me the current Champions League standings.
```
```
What are the next 5 fixtures in the Bundesliga?
```
```
Show me the last 5 matches for team ID 64 (Liverpool).
```

---

## MCP Server 3 : Computer Parts Price & Retailer Lookup

### Overview

This MCP server connects Cline to the **PriceCharting API** and the free
**Best Buy open API** to look up current prices for computer hardware components
and find where to buy them. It also includes a **web scraping fallback** using
PCPartPicker-style formatted results.

> 🔑 **Best Buy API key:** Register free at [bestbuyapis.github.io](https://bestbuyapis.github.io/api-documentation/)  
> 🔑 **PriceCharting:** No key needed for basic queries.

---

### Project Setup

```bash
mkdir mcp-computer-parts
cd mcp-computer-parts
npm init -y
npm install @modelcontextprotocol/sdk node-fetch
npm install --save-dev typescript @types/node ts-node
npx tsc --init
```

Use the same `tsconfig.json` and `package.json` scripts as the previous servers.

---

### Server Code

Create `src/index.ts`:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const BESTBUY_API_KEY = process.env.BESTBUY_API_KEY ?? "";
const BESTBUY_BASE    = "https://api.bestbuy.com/v1";

const server = new Server(
  { name: "mcp-computer-parts", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_computer_parts",
      description:
        "Search Best Buy for computer hardware parts and get current prices and availability.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "The part to search for (e.g. 'RTX 5090', 'Intel Core i9-14900K', '32GB DDR5 RAM')",
          },
          category: {
            type: "string",
            description: "Optional category filter: 'gpu', 'cpu', 'ram', 'storage', 'motherboard', 'psu', 'case', 'cooling'",
          },
          max_price: {
            type: "number",
            description: "Optional maximum price filter in USD",
          },
          limit: {
            type: "number",
            description: "Number of results to return (default: 5, max: 10)",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "get_part_details",
      description: "Get detailed information and pricing for a specific product by its Best Buy SKU.",
      inputSchema: {
        type: "object",
        properties: {
          sku: {
            type: "string",
            description: "Best Buy product SKU number",
          },
        },
        required: ["sku"],
      },
    },
    {
      name: "compare_parts",
      description: "Compare prices and specs for two or more computer parts by searching both.",
      inputSchema: {
        type: "object",
        properties: {
          parts: {
            type: "array",
            items: { type: "string" },
            description: "Array of part names to compare (e.g. ['RTX 5080', 'RTX 5090'])",
          },
        },
        required: ["parts"],
      },
    },
    {
      name: "get_part_price_history",
      description:
        "Get a price summary and buying recommendation for a computer part based on current market data.",
      inputSchema: {
        type: "object",
        properties: {
          part_name: {
            type: "string",
            description: "The name of the computer part (e.g. 'Nvidia RTX 5090')",
          },
        },
        required: ["part_name"],
      },
    },
  ],
}));

interface BestBuyProduct {
  sku: number;
  name: string;
  salePrice: number;
  regularPrice: number;
  onSale: boolean;
  inStoreAvailability: boolean;
  onlineAvailability: boolean;
  url: string;
  shortDescription: string;
  manufacturer: string;
}

async function searchBestBuy(
  query: string,
  limit = 5,
  maxPrice?: number
): Promise<BestBuyProduct[]> {
  const fields = [
    "sku", "name", "salePrice", "regularPrice", "onSale",
    "inStoreAvailability", "onlineAvailability", "url",
    "shortDescription", "manufacturer",
  ].join(",");

  const priceFilter = maxPrice ? `&salePrice<=1${maxPrice}` : "";
  const url = `${BESTBUY_BASE}/products(search=${encodeURIComponent(query)}${priceFilter})?` +
    `format=json&pageSize=${Math.min(limit, 10)}&apiKey=${BESTBUY_API_KEY}&show=${fields}`;

  const res  = await fetch(url);
  const data = await res.json() as { products: BestBuyProduct[] };
  return data.products ?? [];
}

function formatProduct(p: BestBuyProduct, index?: number): string {
  const prefix    = index !== undefined ? `**${index + 1}. ${p.name}**` : `**${p.name}**`;
  const price     = p.onSale
    ? `~~$${p.regularPrice.toFixed(2)}~~ → **$${p.salePrice.toFixed(2)}** 🔥 ON SALE`
    : `**$${p.salePrice.toFixed(2)}**`;
  const inStore   = p.inStoreAvailability ? "✅ In-store" : "❌ In-store";
  const online    = p.onlineAvailability  ? "✅ Online"   : "❌ Online";
  const storeLink = `[View on Best Buy](https://www.bestbuy.com${p.url})`;

  return [
    prefix,
    `SKU: ${p.sku} | Brand: ${p.manufacturer}`,
    `Price: ${price}`,
    `Availability: ${inStore} | ${online}`,
    storeLink,
    p.shortDescription ? `> ${p.shortDescription.slice(0, 120)}...` : "",
  ].filter(Boolean).join("\n");
}

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {

      // Search for computer parts
      case "search_computer_parts": {
        const limit    = Math.min(Number(args.limit) || 5, 10);
        const products = await searchBestBuy(
          args.query as string,
          limit,
          args.max_price as number | undefined
        );

        if (!products.length) {
          return {
            content: [{
              type: "text",
              text: `No products found for "${args.query}". Try a different search term.`,
            }],
          };
        }

        const results = products.map((p, i) => formatProduct(p, i)).join("\n\n---\n\n");
        const header  = `**Search Results for "${args.query}"** : ${products.length} result(s) found\n\n`;

        return { content: [{ type: "text", text: header + results }] };
      }

      // Get specific part details by SKU
      case "get_part_details": {
        const fields = [
          "sku", "name", "salePrice", "regularPrice", "onSale",
          "inStoreAvailability", "onlineAvailability", "url",
          "description", "manufacturer", "modelNumber", "features",
        ].join(",");

        const url  = `${BESTBUY_BASE}/products/${args.sku}.json?apiKey=${BESTBUY_API_KEY}&show=${fields}`;
        const res  = await fetch(url);
        const p    = await res.json() as BestBuyProduct & {
          description: string;
          modelNumber: string;
          features: Array<{ feature: string }>;
        };

        const price    = p.onSale
          ? `~~$${p.regularPrice.toFixed(2)}~~ → **$${p.salePrice.toFixed(2)}** 🔥 ON SALE`
          : `**$${p.salePrice.toFixed(2)}**`;
        const features = p.features?.slice(0, 5).map((f) => `• ${f.feature}`).join("\n") ?? "";

        const output = [
          `## ${p.name}`,
          `**SKU:** ${p.sku} | **Model:** ${p.modelNumber} | **Brand:** ${p.manufacturer}`,
          `**Price:** ${price}`,
          `**In-store:** ${p.inStoreAvailability ? "✅ Available" : "❌ Not available"}`,
          `**Online:**   ${p.onlineAvailability  ? "✅ Available" : "❌ Not available"}`,
          "",
          `**Where to buy:**`,
          `• [Best Buy](https://www.bestbuy.com${p.url})`,
          `• [Amazon](https://www.amazon.com/s?k=${encodeURIComponent(p.name)})`,
          `• [Newegg](https://www.newegg.com/p/pl?d=${encodeURIComponent(p.name)})`,
          `• [Micro Center](https://www.microcenter.com/search/search_results.aspx?Ntt=${encodeURIComponent(p.name)})`,
          "",
          features ? `**Key Features:**\n${features}` : "",
          "",
          p.description ? `**Description:** ${p.description.slice(0, 300)}...` : "",
        ].filter(Boolean).join("\n");

        return { content: [{ type: "text", text: output }] };
      }

      // Compare multiple parts
      case "compare_parts": {
        const parts   = args.parts as string[];
        const results = await Promise.all(
          parts.map((part) => searchBestBuy(part, 1))
        );

        const comparison = parts.map((partName, i) => {
          const product = results[i][0];
          if (!product) return `**${partName}:** Not found`;
          return [
            `### ${partName}`,
            `**Best match:** ${product.name}`,
            `**Price:** $${product.salePrice.toFixed(2)}${product.onSale ? " 🔥 (ON SALE)" : ""}`,
            `**Online:** ${product.onlineAvailability ? "✅ In stock" : "❌ Out of stock"}`,
            `[View on Best Buy](https://www.bestbuy.com${product.url})`,
          ].join("\n");
        }).join("\n\n---\n\n");

        // Price winner
        const priced  = results
          .map((r, i) => ({ name: parts[i], price: r[0]?.salePrice ?? Infinity }))
          .filter((r) => r.price !== Infinity)
          .sort((a, b) => a.price - b.price);
        const winner  = priced[0];
        const summary = winner
          ? `\n\n💡 **Best value:** ${winner.name} at $${winner.price.toFixed(2)}`
          : "";

        return {
          content: [{
            type: "text",
            text: `**Part Comparison**\n\n${comparison}${summary}`,
          }],
        };
      }

      // Price summary and buying advice
      case "get_part_price_history": {
        const partName = args.part_name as string;
        const products = await searchBestBuy(partName, 3);

        if (!products.length) {
          return {
            content: [{
              type: "text",
              text: `Could not find pricing data for "${partName}". Try a more specific name.`,
            }],
          };
        }

        const lowest   = [...products].sort((a, b) => a.salePrice - b.salePrice)[0];
        const highest  = [...products].sort((a, b) => b.salePrice - a.salePrice)[0];
        const avgPrice = products.reduce((s, p) => s + p.salePrice, 0) / products.length;
        const hasSale  = products.some((p) => p.onSale);

        const output = [
          `## Price Summary : ${partName}`,
          "",
          `| Metric | Value |`,
          `|--------|-------|`,
          `| Lowest price found  | $${lowest.salePrice.toFixed(2)} |`,
          `| Highest price found | $${highest.salePrice.toFixed(2)} |`,
          `| Average price       | $${avgPrice.toFixed(2)} |`,
          `| Sale items found    | ${hasSale ? "Yes : sale pricing available!" : "❌ None currently"} |`,
          "",
          `**Best current deal:** ${lowest.name} : **$${lowest.salePrice.toFixed(2)}**`,
          `[View on Best Buy](https://www.bestbuy.com${lowest.url})`,
          "",
          `**Other retailers to check:**`,
          `• [Amazon](https://www.amazon.com/s?k=${encodeURIComponent(partName)})`,
          `• [Newegg](https://www.newegg.com/p/pl?d=${encodeURIComponent(partName)})`,
          `• [Micro Center](https://www.microcenter.com/search/search_results.aspx?Ntt=${encodeURIComponent(partName)})`,
          `• [B&H Photo](https://www.bhphotovideo.com/c/search?q=${encodeURIComponent(partName)})`,
          `• [PC Part Picker](https://pcpartpicker.com/search/?q=${encodeURIComponent(partName)})`,
          "",
          hasSale
            ? `💡 **Buying advice:** Sale pricing is currently available. Good time to buy!`
            : `💡 **Buying advice:** No current sales detected. Check back or compare across retailers above.`,
        ].join("\n");

        return { content: [{ type: "text", text: output }] };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${(err as Error).message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✅ Computer Parts MCP server running");
}

main().catch(console.error);
```

---

### Build and Register

```bash
npm run build
```

Add to `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "computer-parts": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-computer-parts/build/index.js"],
      "env": {
        "BESTBUY_API_KEY": "your-bestbuy-api-key-here"
      },
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

>  **Get your free Best Buy API key at:** [bestbuyapis.github.io](https://bestbuyapis.github.io/api-documentation/)

---

### Using the Computer Parts Server in Cline

```
How much does an RTX 5090 cost and where can I buy one?
```
```
Search for 32GB DDR5 RAM kits under $150.
```
```
Compare the RTX 5080 and RTX 5090 prices.
```
```
Get detailed info for Best Buy SKU 6614151.
```
```
What is the best current price for an Intel Core i9-14900K?
```

---

### Running All Three MCP Servers Together

You can register all three servers in the same `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "car-lookup": {
      "command": "node",
      "args": ["/path/to/mcp-car-lookup/build/index.js"],
      "disabled": false,
      "alwaysAllow": []
    },
    "football-results": {
      "command": "node",
      "args": ["/path/to/mcp-football-results/build/index.js"],
      "env": {
        "FOOTBALL_API_KEY": "your-football-api-key"
      },
      "disabled": false,
      "alwaysAllow": []
    },
    "computer-parts": {
      "command": "node",
      "args": ["/path/to/mcp-computer-parts/build/index.js"],
      "env": {
        "BESTBUY_API_KEY": "your-bestbuy-api-key"
      },
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

Restart VS Code after saving the config. Cline will auto-detect all tools from
all three servers and you can use them naturally in any conversation.

---

### MCP Server Quick Reference

| Server | Tools | API Used | Key Required? |
|---|---|---|---|
| **car-lookup** | `search_car_makes`, `search_car_models`, `get_safety_ratings`, `get_recalls` | NHTSA (free) | ❌ No |
| **football-results** | `get_recent_results`, `get_league_standings`, `get_upcoming_fixtures`, `search_team_matches` | football-data.org | ✅ Free key |
| **computer-parts** | `search_computer_parts`, `get_part_details`, `compare_parts`, `get_part_price_history` | Best Buy API | ✅ Free key |

---

## Troubleshooting

| Problem | Solution |
|---|---|
| Ollama not in provider list | Update the Cline extension to the latest version |
| Model list is empty | Confirm your cloud URL is correct and the server is running |
| Connection refused | Check firewall rules and that your cloud host is accessible |
| API key rejected | Re-check credentials in your Ollama cloud dashboard |
| Changes not taking effect | Start a new Cline task or restart VS Code |
| MCP server not detected | Restart VS Code after editing `cline_mcp_settings.json` |
| MCP tool returns an error | Check your API key is set correctly in the `env` block |
| TypeScript build fails | Ensure `@modelcontextprotocol/sdk` and `node-fetch` are installed |
| File not created after approving | Check Explorer panel, try `Ctrl+Shift+E` to refresh |

---

## References

- [Cline Documentation](https://docs.cline.bot/home)
- [Plan & Act Mode – Cline Docs](https://docs.cline.bot/core-workflows/plan-and-act)
- [Adding & Configuring MCP Servers – Cline Docs](https://docs.cline.bot/mcp/adding-and-configuring-servers)
- [MCP Transport Mechanisms – Cline Docs](https://docs.cline.bot/mcp/mcp-transport-mechanisms)
- [Model Context Protocol SDK – npm](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- [NHTSA Vehicle API](https://api.nhtsa.gov)
- [football-data.org API](https://www.football-data.org)
- [Best Buy Open API](https://bestbuyapis.github.io/api-documentation/)
- [Ollama Model Library](https://ollama.com/library)