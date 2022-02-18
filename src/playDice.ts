//check textDocument for "dicerole" class program
import * as vscode from 'vscode';

export class CheckDice{
  constructor() {}
  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
    const linePrefix = document.lineAt(position).text.substr(0, position.character);
    const pattern = /dice[ ]*\d[ ]*d[ ]*\d{1,8}[ ]*=$/i;
    var mach;
		if ((mach = pattern.exec(linePrefix)) === null ) {
			return undefined;
		}
    var ans = " ";
    var sum = 0;
    var cutFirst = mach[0].slice(4);// remove keyword[dice]
    var values = cutFirst.slice(0, cutFirst.length - 1).split("d");// remove [=] . and split [d]
    var max = parseInt(values[1]);
    var qua = parseInt(values[0]);

    for(var i=0; i<qua; i++){
      var value = Math.floor(Math.random()*max)+1;
      sum += value;
      ans += value + " ";
    }
    ans += "("+sum+")";

		return [
			new vscode.CompletionItem(ans, vscode.CompletionItemKind.Method),
    ];			
	}
}