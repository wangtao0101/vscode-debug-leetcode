import * as fse from 'fs-extra';
import * as path from 'path';
import * as vscode from 'vscode';
import problemTypes from '../problems/problemTypes';
import { extensionState } from '../extensionState';
import { langExt, supportDebugLanguages } from '../shared';
import { isWindows, usingCmd } from './osUtils';
import { useWsl } from './wslUtils';

const fileMateReg: RegExp = /@lc\s+(?:[\s\S]*?)\s+id=(\d+)\s+lang=([\S]+)/;

const beforeStubReg: RegExp = /@before-stub-for-debug-begin([\s\S]*?)@before-stub-for-debug-end/;
const afterStubReg: RegExp = /@after-stub-for-debug-begin([\s\S]*?)@after-stub-for-debug-end/;

export interface ProblemMeta {
    id: string;
    lang: string;
}

export function genFileExt(language: string): string {
    const ext: string | undefined = langExt.get(language);
    if (!ext) {
        throw new Error(`The language "${language}" is not supported.`);
    }
    return ext;
}

export function canDebug(meta: ProblemMeta | null) {
    if (
        meta == null ||
        supportDebugLanguages.indexOf(meta.lang) === -1 ||
        problemTypes[meta.id] == null
    ) {
        return false;
    }
    return true;
}

export function fileMeta(content: string): ProblemMeta | null {
    const result: RegExpExecArray | null = fileMateReg.exec(content);
    if (result != null) {
        return {
            id: result[1],
            lang: result[2],
        };
    }
    return null;
}

export async function getUnstubedFile(filePath: string): Promise<string> {
    const content: string = (await fse.readFile(filePath)).toString();
    const stripped: string = content.replace(beforeStubReg, '').replace(afterStubReg, '');

    if (content.length === stripped.length) {
        // no stub, return original filePath
        return filePath;
    }

    const meta: { id: string; lang: string } | null = fileMeta(content);
    if (meta == null) {
        vscode.window.showErrorMessage(
            "File meta info has been changed, please check the content: '@lc app=leetcode.cn id=xx lang=xx'.",
        );
        throw new Error('');
    }

    const newPath: string = path.join(extensionState.cachePath, `${meta.id}-${meta.lang}`);
    await fse.writeFile(newPath, stripped);
    return newPath;
}

export async function getProblemSpecialCode(
    language: string,
    problem: string,
    fileExt: string,
    extDir: string,
): Promise<string> {
    const problemPath: string = path.join(
        extDir,
        'src/debug/entry',
        language,
        'problems',
        `${problem}.${fileExt}`,
    );
    const isSpecial: boolean = await fse.pathExists(problemPath);
    if (isSpecial) {
        const specialContent: Buffer = await fse.readFile(problemPath);
        return specialContent.toString();
    }
    if (language === 'cpp') {
        return '';
    }
    const fileContent: Buffer = await fse.readFile(
        path.join(extDir, 'src/debug/entry', language, 'problems', `common.${fileExt}`),
    );
    return fileContent.toString();
}

export async function getEntryFile(language: string, problem: string): Promise<string> {
    const extDir: string = vscode.extensions.getExtension('wangtao0101.debug-leetcode')!
        .extensionPath;
    const fileExt: string = genFileExt(language);
    const specialCode: string = await getProblemSpecialCode(language, problem, fileExt, extDir);
    const tmpEntryCode: string = (
        await fse.readFile(path.join(extDir, 'src/debug/entry', language, `entry.${fileExt}`))
    ).toString();
    const entryCode: string = tmpEntryCode.replace(/\/\/ @@stub-for-code@@/, specialCode);
    const entryPath: string = path.join(
        extensionState.cachePath,
        `${language}problem${problem}.${fileExt}`,
    );
    await fse.writeFile(entryPath, entryCode);
    return entryPath;
}

export function parseTestString(test: string): string {
    if (useWsl() || !isWindows()) {
        return `'${test}'`;
    }

    // In windows and not using WSL
    if (usingCmd()) {
        return `"${test.replace(/"/g, '\\"')}"`;
    } else {
        // Assume using PowerShell
        return `'${test.replace(/"/g, '\\"')}'`;
    }
}

export function randomString(len: number): string {
    len = len || 32;
    const $chars: string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos: number = $chars.length;
    let pwd: string = '';
    for (let i: number = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
