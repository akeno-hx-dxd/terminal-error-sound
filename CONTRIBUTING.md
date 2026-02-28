# Contributing to Terminal Error Sound

Thank you for your interest in contributing! This guide will help you get started.

## Code of Conduct

Be respectful and inclusive. We're all here to help each other.

## How Can I Contribute?

### 🐛 Reporting Bugs

- Check if the issue already exists
- Include VS Code version, OS, and steps to reproduce
- Screenshots help!

### 💡 Suggesting Features

- Describe the feature and its use case
- Explain why it would be beneficial
- Be open to discussion

### 🛠️ Pull Requests

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/terminal-error-sound.git
   cd terminal-error-sound
   ```

3. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Make your changes in `src/extension.ts`

6. Compile and test:
   ```bash
   npm run compile
   # Press F5 to debug
   ```

7. Run linting:
   ```bash
   npm run lint
   ```

8. Commit with a clear message:
   ```bash
   git add .
   git commit -m "Add: brief description of changes"
   ```

9. Push and create PR:
   ```bash
   git push origin your-branch-name
   ```

## Development Setup

### Prerequisites

- Node.js 18+
- VS Code 1.93+
- Git

### Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run compile` | Build the extension |
| `npm run watch` | Watch mode for development |
| `npm run lint` | Run ESLint |
| `npm run package` | Create VSIX file |

### Debugging

1. Run `npm run compile`
2. Press `F5` in VS Code
3. A new window opens with your extension loaded
4. Add breakpoints in `src/extension.ts`

## Coding Standards

- Use TypeScript with strict mode
- 4-space indentation
- Single quotes for strings
- Always use semicolons
- Add JSDoc comments for functions
- Use meaningful variable names

### Example Function

```typescript
/**
 * Gets the path to the audios directory.
 * @returns The absolute path to the audios folder
 */
function getAudiosDir(): string {
    return path.join(extensionContext.extensionPath, 'audios');
}
```

## Testing

Test your changes by:
1. Running `npm run compile`
2. Pressing `F5` to open Extension Development Host
3. Trigger terminal errors or use the Test Sound command

## Pull Request Guidelines

- Keep PRs focused and atomic
- Update documentation if needed
- Ensure linting passes
- Describe what changed and why
- Link related issues

## Recognition

Contributors will be added to the README (with permission).

---

Questions? Open an issue or reach out. Happy coding! 🚀
