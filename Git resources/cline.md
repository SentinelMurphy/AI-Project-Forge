# Cline AI Assistant Setup Guide for VSCode

This guide provides step-by-step instructions for setting up Cline, a powerful AI coding assistant, in Visual Studio Code with Ollama Cloud integration using an API key.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Ollama Cloud Setup](#ollama-cloud-setup)
- [Cline Extension Configuration](#cline-extension-configuration)
- [API Key Integration](#api-key-integration)
- [Using Cline in VSCode](#using-cline-in-vscode)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

## Prerequisites

Before you begin, ensure you have the following:

- **Visual Studio Code** (latest version recommended)
- **Ollama Cloud account** (free tier available)
- **Internet Connection** for downloading extensions and accessing cloud models

### System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Internet Connection**: Required for cloud model access

## Installation

### Step 1: Install VSCode

If you don't have Visual Studio Code installed:

1. Visit [code.visualstudio.com](https://code.visualstudio.com)
2. Download the installer for your operating system
3. Run the installer and follow the prompts

### Step 2: Install Cline Extension

1. Open Visual Studio Code
2. Click on the **Extensions** icon in the left sidebar 
3. In the search bar, type "Cline"
4. Find the **Cline AI Assistant** extension
5. Click **Install**
6. Wait for the installation to complete
7. Click **Reload Required** if prompted

### Step 3: Verify Installation

1. Look for the Cline icon in the Activity Bar (left sidebar)
2. You should see a small robot icon or Cline logo
3. Move cline icon to the right of the search bar 

## Ollama Cloud Setup

### Step 1: Create Ollama Cloud Account

1. Visit [ollama.com](https://ollama.com)
2. Click on **Sign Up** or **Get Started**
3. Create an account using your email address
4. Verify your email address
5. Log in to your Ollama Cloud dashboard

### Step 2: Generate API Key

1. After logging in, navigate to your **Account Settings**
2. Click on **API Keys** in the left sidebar
3. Click **Create New API Key**
4. Give your key a descriptive name (e.g., "Cline Integration")
5. Copy the generated API key and save it securely
6. **Note**: This key will only be shown once, so make sure to copy it

## API Key Integration

### Step 1: Configure Ollama Cloud API Key

1. In VSCode, click the Cline extension
2. Click the settings icon
3. In the **API Configuration**, select Ollama as the provider
4. Find, and enable **Use custom base URL** and Enter: `https://ollama.com`
5. Paste your Ollama Cloud API key into the field
6. Click **Done** or press `Ctrl+S` / `Cmd+S`

### Step 3: Select Default Model

1. In Cline settings, find **Default Model** or **Model Selection**
2. Select **codellama:latest** from the dropdown (or type it manually)
3. Click **Save**

### Step 4: Verify Configuration

1. Click the **Cline icon** in the Activity Bar
2. The Cline panel should open
3. Look for a status indicator showing "Connected to Ollama Cloud" or "Ready"
4. You can also type a test message in the chat area

## Using Cline in VSCode

### Opening the Cline Interface

1. Click the **Cline icon** if not opened 
2. The Cline panel will open on the left side
3. You can drag it to the right side or make it a separate panel if preferred

### Basic Chat Interface

1. In the Cline chat input, type your question or request
2. Press **Enter** or click the **Send** button
3. Wait for Cline to generate a response
4. The response will appear in the chat area

### Code Generation

1. Open a file in the editor
2. In the Cline chat, type: "Generate a function that [your requirements]"
3. Cline will generate code directly in the chat
4. Click the **Copy** button to copy the code
5. Paste it into your file

### Code Review

1. Select the code you want to review
2. In the Cline chat, type: "Review this code" or "What can be improved?"
3. Cline will analyze the selected code and provide suggestions

### Documentation Generation

1. Select a function or class
2. In the Cline chat, type: "Generate documentation for this"
3. Cline will create comprehensive documentation

### Quick Commands

Cline provides quick commands you can access:

1. Click the **Commands** button in the Cline panel (or type `/` in chat)
2. Select from available commands:
   - `/explain` - Explain selected code
   - `/refactor` - Suggest refactoring
   - `/test` - Generate tests
   - `/debug` - Help debug issues
   - `/optimize` - Optimize performance

### Context Menu Integration

1. Right-click on selected code in the editor
2. Look for **Cline** in the context menu
3. Choose from options like:
   - **Explain Code**
   - **Generate Tests**
   - **Add Comments**
   - **Refactor**

## Advanced Configuration

### Custom Prompts

1. Go to **File** → **Preferences** → **Settings**
2. Search for "Cline Prompts"
3. Click **Edit in settings.json**
4. Add custom prompts:

```json
"cline.prompts": {
  "code-review": "Please review this code for best practices, security issues, and performance improvements.",
  "documentation": "Generate comprehensive documentation including parameters, return values, and examples.",
  "test-generation": "Create unit tests covering edge cases and error conditions."
}
```

## Troubleshooting

### Common Issues

#### Cline Panel Not Appearing

1. Check if the extension is installed:

   - Go to __Extensions__ (`Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Search for "Cline"
   - Ensure it's enabled

2. Reload VSCode:

   - Press `Ctrl+Shift+P` / `Cmd+Shift+P`
   - Type "Reload Window"
   - Select __Developer: Reload Window__

#### Ollama Cloud Connection Failed

1. Verify your internet connection

2. Check your API key:

   - Go to Ollama Cloud dashboard
   - Verify the API key is active
   - Regenerate if needed

3. Check endpoint configuration:

   - Go to Cline settings
   - Verify endpoint is `https://api.ollama.ai`

#### API Key Authentication Error

1. Regenerate API key:

   - Visit Ollama Cloud dashboard
   - Go to API Keys
   - Generate a new key
   - Update in VSCode settings

## Security Best Practices

1. __API Key Security__: Never share your API key
2. __Environment Variables__: Use VSCode settings for sensitive configuration
3. __Account Security__: Enable 2FA on your Ollama Cloud account
4. __Monitor Usage__: Keep track of your API usage in the dashboard

## Support

### Documentation

- [Cline Documentation](https://docs.cline.ai)
- [Ollama Cloud Documentation](https://docs.ollama.ai)
- [VSCode Documentation](https://code.visualstudio.com/docs)

### Community

- [Cline Discord](https://discord.cline.ai)
- [GitHub Issues](https://github.com/cline/ai-assistant/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/cline)
