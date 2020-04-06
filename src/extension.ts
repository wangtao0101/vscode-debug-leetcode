import * as vscode from 'vscode';
import { codeLensController } from './codelens/CodeLensController';
import { extensionState } from './extensionState';
import { leetCodeChannel } from './leetCodeChannel';
import { DialogType, promptForOpenOutputChannel } from './utils/uiUtils';
import { checkCachePath } from './utils/workspaceUtils';
import { debugSolution } from './commands/debug';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    try {
        extensionState.context = context;
        extensionState.cachePath = context.globalStoragePath;
        checkCachePath(extensionState.cachePath);

        context.subscriptions.push(
            leetCodeChannel,
            codeLensController,
            vscode.commands.registerCommand(
                'debug-leetcode.debugSolution',
                (uri: vscode.Uri, input: boolean) => debugSolution(uri, input),
            ),
        );
    } catch (error) {
        leetCodeChannel.appendLine(error.toString());
        promptForOpenOutputChannel(
            'Extension initialization failed. Please open output channel for details.',
            DialogType.error,
        );
    }
}

export function deactivate(): void {
    // Do nothing.
}
