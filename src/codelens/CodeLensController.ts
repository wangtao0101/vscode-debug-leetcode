import { Disposable, languages } from 'vscode';
import { CustomCodeLensProvider } from './CustomCodeLensProvider';

class CodeLensController implements Disposable {
    private internalProvider: CustomCodeLensProvider;
    private registeredProvider: Disposable | undefined;

    constructor() {
        this.internalProvider = new CustomCodeLensProvider();

        this.registeredProvider = languages.registerCodeLensProvider(
            { scheme: 'file' },
            this.internalProvider,
        );
    }

    public dispose(): void {
        if (this.registeredProvider) {
            this.registeredProvider.dispose();
        }
    }
}

export const codeLensController: CodeLensController = new CodeLensController();
