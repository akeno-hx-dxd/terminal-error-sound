
# 🎛️ How to Change the Sound

## Available Sounds

The extension comes with 16 built-in sounds in the `audios/` folder:

| # | Sound File |
|---|------------|
| 1 | anime-ahh.mp3 |
| 2 | cid-le-mdc.mp3 |
| 3 | ch-t-maari-ja-rahi-hai_HLSJ3G3.mp3 |
| 4 | eh-eh-ehhhh.mp3 |
| 5 | fahhh_KcgAXfs.mp3 |
| 6 | faah.mp3 |
| 7 | gopgopgop.mp3 |
| 8 | indian-song.mp3 |
| 9 | kyu-re-madarchod-cid.mp3 |
| 10 | ladle-meoww-ghop-ghop-ghop.mp3 |
| 11 | meri-jung-emotional.mp3 |
| 12 | sad-meow-song.mp3 |
| 13 | teri-gand-mari.mp3 *(Default)* |
| 14 | vine-boom.mp3 |
| 15 | ye-le-la-e.mp3 |
| 16 | lekin-ye-sala.mp3 |

---

## Option 1: Command Palette (Recommended)

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type **"Terminal Error Sound: Select Sound"**
3. Choose your sound from the list:
   - Select any specific sound file
   - Or select **"🎲 Random"** to play a random sound on each error

---

## Option 2: VS Code Settings

1. Open Settings (`Ctrl+,` or `Cmd+,`)
2. Search for `terminalErrorSound.defaultSound`
3. Enter the sound filename (e.g., `teri-gand-mari.mp3`)
4. For random mode, enter: `random`

---

## Option 3: Upload Your Own Sound

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type **"Terminal Error Sound: Upload Sound"**
3. Select an audio file (`.mp3`, `.wav`, `.ogg`) from your computer
4. The file will be copied to the `audios/` folder and set as default automatically

---

## Option 4: Manual (For Development)

1. Drop audio files (`.mp3`, `.wav`, `.ogg`) into the `audios/` folder
2. Run `Terminal Error Sound: Select Sound` from Command Palette
3. Pick your weapon of choice 🎧

---

# 🎲 Random Mode

When you select **"🎲 Random"** as your sound option, the extension will:
- Pick a different random sound from the `audios/` folder each time an error occurs
- Never play the same sound twice in a row (when possible)

To enable Random Mode:
- **Command Palette**: Select "🎲 Random" from the sound selection list
- **Settings**: Set `terminalErrorSound.defaultSound` to `random`

---

## 🚀 Quick Start

### Install

```
ext install akeno-hx-dxd.terminal-error-sound
```

Or search "Terminal Error Sound" in VS Code Extensions.

### Add Your Sound

**Option 1: Use built-in files**
1. Drop audio files (`.mp3`, `.wav`, `.ogg`) into the `audios/` folder
2. Run `Terminal Error Sound: Select Sound` from Command Palette
3. Pick your weapon of choice 🎧

**Option 2: Upload your own**
1. Run `Terminal Error Sound: Upload Sound` from Command Palette
2. Select an audio file from your computer
3. It will be copied to `audios/` and set as default automatically

## ⚙️ Configuration

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enabled` | `boolean` | `true` | Turn alerts on/off |
| `volume` | `number` | `0.5` | Volume level (0.0 - 1.0) |
| `defaultSound` | `string` | First file | Sound to play |
| `errorPatterns` | `array` | *(see below)* | Patterns that trigger sound |

### Default Error Patterns

```
error:, Error:, ERROR:, fail:, FAIL:, Failed,
fatal:, FATAL:, Exception, Traceback,
command not found, No such file
```

## 📖 Usage

### Commands

| Command | Description |
|---------|-------------|
| `Terminal Error Sound: Select Sound` | Choose from existing audio files |
| `Terminal Error Sound: Upload Sound` | Upload and set a local audio file |
| `Terminal Error Sound: Test Sound` | Preview the sound |
| `Terminal Error Sound: Toggle` | Enable/disable alerts |

### Keyboard Shortcuts

1. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type the command name

# 🔊 Terminal Error Sound

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/akeno-hx-dxd.terminal-error-sound)](https://marketplace.visualstudio.com/items?itemName=akeno-hx-dxd.terminal-error-sound)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/akeno-hx-dxd.terminal-error-sound)](https://marketplace.visualstudio.com/items?itemName=akeno-hx-dxd.terminal-error-sound)
[![Rating](https://img.shields.io/visual-studio-marketplace/rating/stars/akeno-hx-dxd.terminal-error-sound)](https://marketplace.visualstudio.com/items?itemName=akeno-hx-dxd.terminal-error-sound)

A VS Code extension that plays a custom sound whenever your terminal throws an error. Because sometimes you're multitasking, debugging in a different window, or just not staring at the terminal 24/7.

## ✨ Features

- 🔔 **Audio Alerts** - Hear when commands fail, build breaks, or errors occur
- 🎵 **Your Sound, Your Rules** - Pick any audio file from the `audios` folder
- 🎲 **Random Mode** - Play a random sound on each error
- 📁 **Upload Your Own** - Import local audio files directly
- 🎚️ **Volume Control** - Adjust loudness to your liking
- 🚦 **Easy Toggle** - Enable/disable with a single command
- 🧪 **Test Mode** - Preview your sound before the next error

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Debug (F5)
npm run watch

# Package as VSIX
npm run package
```

## 🤝 Contributing

Found a bug? Have a feature request? Here's how to help:

1. **Fork** the repo
2. **Clone** your fork
3. **Create** a feature branch
4. **Code** your changes
5. **Test** with `npm run compile` + F5
6. **Lint** with `npm run lint`
7. **Submit** a PR

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📋 Requirements

- VS Code 1.93+
- Node.js 18+

### Audio Players

| OS | Required |
|----|----------|
| Windows | PowerShell (built-in) |
| macOS | `afplay` (built-in) |
| Linux | `ffplay`, `paplay`, or `aplay` |

## 📝 License

MIT - Do whatever you want with this.

---

*Built with ☕ and frustration tolerance by [@akeno-hx-dxd](https://github.com/akeno-hx-dxd)*
