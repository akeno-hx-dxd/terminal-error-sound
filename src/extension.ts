import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

let isEnabled = true;
let extensionContext: vscode.ExtensionContext;
let currentSoundFile: string = '';
let isRandomMode: boolean = false;
let lastPlayedSound: string = '';

function getConfig(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration('terminalErrorSound');
}

function getAudiosDir(): string {
    return path.join(extensionContext.extensionPath, 'audios');
}

function getAudioFiles(): string[] {
    const audiosDir = getAudiosDir();
    if (!fs.existsSync(audiosDir)) {
        return [];
    }
    return fs.readdirSync(audiosDir)
        .filter(file => /\.(mp3|wav|ogg)$/i.test(file))
        .sort();
}

function getDefaultSound(): string {
    const config = getConfig();
    const savedSound = config.get<string>('defaultSound', 'teri-gand-mari.mp3');
    const audioFiles = getAudioFiles();
    
    if (savedSound === 'random') {
        isRandomMode = true;
        return getRandomSound(audioFiles);
    }
    
    isRandomMode = false;
    
    if (savedSound && audioFiles.includes(savedSound)) {
        return savedSound;
    }
    
    if (audioFiles.length > 0) {
        return audioFiles[0];
    }
    
    return '';
}

function getRandomSound(audioFiles: string[]): string {
    if (audioFiles.length === 0) {
        return '';
    }
    
    const availableSounds = audioFiles.filter(sound => sound !== lastPlayedSound);
    const pool = availableSounds.length > 0 ? availableSounds : audioFiles;
    
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

function updateDefaultSound(soundFile: string): void {
    const config = getConfig();
    config.update('defaultSound', soundFile, vscode.ConfigurationTarget.Global);
    currentSoundFile = soundFile;
    
    if (soundFile === 'random') {
        isRandomMode = true;
    } else {
        isRandomMode = false;
    }
}

async function selectSound(): Promise<string | undefined> {
    const audioFiles = getAudioFiles();
    
    if (audioFiles.length === 0) {
        vscode.window.showWarningMessage('No audio files found in the audios folder.');
        return undefined;
    }

    const items: vscode.QuickPickItem[] = [
        { label: '🎲 Random', description: 'Play a different random sound on each error' },
        ...audioFiles.map(file => ({
            label: file,
            description: file === currentSoundFile ? '(current)' : ''
        }))
    ];

    const selected = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select a sound file to play on terminal errors',
        ignoreFocusOut: true
    });

    if (!selected) {
        return undefined;
    }

    if (selected.label === '🎲 Random') {
        return 'random';
    }

    return selected.label;
}

async function uploadAndSelectSound(): Promise<string | undefined> {
    const audiosDir = getAudiosDir();
    
    if (!fs.existsSync(audiosDir)) {
        fs.mkdirSync(audiosDir, { recursive: true });
    }

    const selected = await vscode.window.showOpenDialog({
        title: 'Select Audio File',
        filters: {
            'Audio Files': ['mp3', 'wav', 'ogg']
        },
        canSelectMany: false
    });

    if (!selected || selected.length === 0) {
        return undefined;
    }

    const sourcePath = selected[0].fsPath;
    const fileName = path.basename(sourcePath);
    const destPath = path.join(audiosDir, fileName);

    try {
        if (fs.existsSync(destPath)) {
            const overwrite = await vscode.window.showQuickPick(['Yes', 'No'], {
                placeHolder: 'File already exists. Overwrite?'
            });
            if (overwrite !== 'Yes') {
                return undefined;
            }
        }

        fs.copyFileSync(sourcePath, destPath);
        updateDefaultSound(fileName);
        vscode.window.showInformationMessage(`Sound uploaded and set as default: ${fileName}`);
        return fileName;
    } catch (error) {
        console.error('Error uploading sound:', error);
        vscode.window.showErrorMessage('Failed to upload sound file.');
        return undefined;
    }
}

function playSound(soundFile?: string): void {
    let fileToPlay = soundFile || currentSoundFile;
    const audioFiles = getAudioFiles();
    
    if (isRandomMode) {
        fileToPlay = getRandomSound(audioFiles);
    }
    
    if (!fileToPlay) {
        vscode.window.showWarningMessage('No sound file configured. Please select a default sound.');
        return;
    }

    lastPlayedSound = fileToPlay;
    const soundPath = path.join(getAudiosDir(), fileToPlay);

    if (!fs.existsSync(soundPath)) {
        vscode.window.showWarningMessage(`Sound file not found: ${fileToPlay}`);
        return;
    }

    const config = getConfig();
    const volume = config.get<number>('volume', 0.5);

    const platform = process.platform;
    
    let command: string;
    if (platform === 'linux') {
        command = `ffplay -nodisp -autoexit -volume ${Math.round(volume * 100)} "${soundPath}" 2>/dev/null || paplay "${soundPath}" 2>/dev/null || aplay "${soundPath}" 2>/dev/null`;
    } else if (platform === 'darwin') {
        command = `afplay "${soundPath}" -v ${volume}`;
    } else if (platform === 'win32') {
        command = `powershell -c "(New-Object Media.SoundPlayer '${soundPath}').PlaySync()"`;
    } else {
        console.error('Unsupported platform:', platform);
        return;
    }

    exec(command, (error) => {
        if (error) {
            console.error('Error playing sound:', error);
        }
    });
}

function activate(context: vscode.ExtensionContext): void {
    extensionContext = context;
    
    try {
        console.log('Terminal Error Sound extension is now active!');
        
        const config = getConfig();
        isEnabled = config.get<boolean>('enabled', true);
        
        const savedSound = config.get<string>('defaultSound', 'teri-gand-mari.mp3');
        isRandomMode = savedSound === 'random';
        
        currentSoundFile = getDefaultSound();

        if (!currentSoundFile) {
            const audioFiles = getAudioFiles();
            if (audioFiles.length > 0) {
                currentSoundFile = audioFiles[0];
                updateDefaultSound(currentSoundFile);
            }
        }

        if (vscode.window.onDidEndTerminalShellExecution) {
            console.log('Using stable onDidEndTerminalShellExecution API');
            context.subscriptions.push(
                vscode.window.onDidEndTerminalShellExecution(event => {
                    if (!isEnabled) {
                        return;
                    }
                    if (event.exitCode !== undefined && event.exitCode !== 0) {
                        console.log('Command failed with exit code:', event.exitCode);
                        playSound();
                    }
                })
            );
        } else {
            vscode.window.showWarningMessage('Terminal Error Sound: Terminal monitoring API not available. Please update VS Code to 1.93+.');
        }

        context.subscriptions.push(
            vscode.commands.registerCommand('terminalErrorSound.selectSound', async () => {
                const selected = await selectSound();
                if (selected) {
                    updateDefaultSound(selected);
                    if (selected === 'random') {
                        vscode.window.showInformationMessage('Random mode enabled! A random sound will play on each error.');
                    } else {
                        vscode.window.showInformationMessage(`Default sound set to: ${selected}`);
                    }
                }
            })
        );

        context.subscriptions.push(
            vscode.commands.registerCommand('terminalErrorSound.uploadSound', async () => {
                await uploadAndSelectSound();
            })
        );

        context.subscriptions.push(
            vscode.commands.registerCommand('terminalErrorSound.testSound', () => {
                if (!currentSoundFile) {
                    vscode.window.showWarningMessage('No sound configured. Please select a sound first.');
                    return;
                }
                playSound();
                vscode.window.showInformationMessage(`Playing: ${currentSoundFile}...`);
            })
        );

        context.subscriptions.push(
            vscode.commands.registerCommand('terminalErrorSound.toggle', () => {
                isEnabled = !isEnabled;
                getConfig().update('enabled', isEnabled, vscode.ConfigurationTarget.Global);
                vscode.window.showInformationMessage(
                    `Terminal error sound ${isEnabled ? 'enabled' : 'disabled'}`
                );
            })
        );

        context.subscriptions.push(
            vscode.workspace.onDidChangeConfiguration(event => {
                if (event.affectsConfiguration('terminalErrorSound.enabled')) {
                    isEnabled = getConfig().get<boolean>('enabled', true);
                }
                if (event.affectsConfiguration('terminalErrorSound.defaultSound')) {
                    const savedSound = getConfig().get<string>('defaultSound', 'teri-gand-mari.mp3');
                    isRandomMode = savedSound === 'random';
                    currentSoundFile = getDefaultSound();
                }
            })
        );

        vscode.window.showInformationMessage('Terminal Error Sound extension activated!');
        console.log('Activation complete!');
    } catch (error) {
        console.error('Error activating extension:', error);
        vscode.window.showErrorMessage('Terminal Error Sound failed to activate: ' + (error as Error).message);
    }
}

function deactivate(): void {
    console.log('Terminal Error Sound extension deactivated');
}

export { activate, deactivate };
