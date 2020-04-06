import * as vscode from 'vscode';
import { fileMeta, canDebug } from '../utils/problemUtils';

export class CustomCodeLensProvider implements vscode.CodeLensProvider {
    private onDidChangeCodeLensesEmitter: vscode.EventEmitter<void> = new vscode.EventEmitter<
        void
    >();

    get onDidChangeCodeLenses(): vscode.Event<void> {
        return this.onDidChangeCodeLensesEmitter.event;
    }

    public provideCodeLenses(
        document: vscode.TextDocument,
    ): vscode.ProviderResult<vscode.CodeLens[]> {
        const content: string = document.getText();
        console.log(fileMeta(content));
        if (!canDebug(fileMeta(content))) {
            return undefined;
        }

        let codeLensLine: number = document.lineCount - 1;
        for (let i: number = document.lineCount - 1; i >= 0; i--) {
            const lineContent: string = document.lineAt(i).text;
            if (lineContent.indexOf('@lc code=end') >= 0) {
                codeLensLine = i;
                break;
            }
        }

        const range: vscode.Range = new vscode.Range(codeLensLine, 0, codeLensLine, 0);
        const codeLens: vscode.CodeLens[] = [];

        codeLens.push(
            new vscode.CodeLens(range, {
                title: 'Debug',
                command: 'debug-leetcode.debugSolution',
                arguments: [document.uri, false],
            }),
        );
        codeLens.push(
            new vscode.CodeLens(range, {
                title: 'Debug Input',
                command: 'debug-leetcode.debugSolution',
                arguments: [document.uri, true],
            }),
        );

        return codeLens;
    }
}
