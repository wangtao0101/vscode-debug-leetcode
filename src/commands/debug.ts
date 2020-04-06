import * as fs from 'fs';
import * as vscode from 'vscode';
import { debugExecutor } from '../debug/debugExecutor';
import problemTypes from '../problems/problemTypes';
import { fileMeta, canDebug, ProblemMeta } from '../utils/problemUtils';
import { DialogType, promptForOpenOutputChannel } from '../utils/uiUtils';
import { getActiveFilePath } from '../utils/workspaceUtils';

export async function debugSolution(uri?: vscode.Uri): Promise<void> {
    try {
        const filePath: string | undefined = await getActiveFilePath(uri);
        if (!filePath) {
            return;
        }
        const fileContent: Buffer = fs.readFileSync(filePath);
        const meta: ProblemMeta | null = fileMeta(fileContent.toString());

        if (!canDebug(meta)) {
            return;
        }

        const result = await debugExecutor.execute(
            filePath,
            problemTypes[meta!.id]!.testCase.replace(/"/g, '\\"'),
            meta!.lang,
        );

        // const ts: string | undefined = await vscode.window.showInputBox({
        //     prompt: 'Enter the test cases.',
        //     validateInput: (s: string): string | undefined =>
        //         s && s.trim() ? undefined : 'Test case must not be empty.',
        //     placeHolder: 'Example: [1,2,3]\\n4',
        //     ignoreFocusOut: true,
        // });
        // if (ts) {
        //     result = await debugExecutor.execute(
        //         filePath,
        //         ts.replace(/"/g, '\\"'),
        //         meta!.lang,
        //     );
        // }

        if (!result) {
            return;
        }
    } catch (error) {
        await promptForOpenOutputChannel(
            'Failed to debug the solution. Please open the output channel for details.',
            DialogType.error,
        );
    }
}
