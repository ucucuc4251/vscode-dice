import * as vscode from 'vscode';
import * as ts from 'typescript'

import { CheckDice } from './playDice';

let cProvider: vscode.Disposable;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (!e.affectsConfiguration('diceconf')) {
		  return;
		}
		if (cProvider) {
		  const idx = context.subscriptions.indexOf(cProvider);
		  context.subscriptions.splice(idx, 1);
		  cProvider.dispose();
		}
		cosupu(context);
	}));
	cosupu(context);
}

function cosupu(context: vscode.ExtensionContext){
	const cd = new CheckDice();
	const type:vscode.DocumentSelector = vscode.workspace.getConfiguration('diceconf').get<vscode.DocumentSelector>('languages');
	const provider1 = vscode.languages.registerCompletionItemProvider(type, {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			const initials = new vscode.CompletionItem('dice');
			initials.kind = vscode.CompletionItemKind.Keyword;
			initials.insertText = 'dice ';
			initials.command = { command: 'dice num1(1~9) d num2(1~999999) = ans[num1] (<-sum)', title: 'dice' };
			const d = new vscode.CompletionItem('d');
			d.kind = vscode.CompletionItemKind.Keyword;
			d.insertText = 'd ';
			return [
				initials,
				d,
			];
		}
	});
	const provider2 = vscode.languages.registerCompletionItemProvider(type, cd, '=');
	context.subscriptions.push(provider1, provider2);
}

export function deactivate() {}
