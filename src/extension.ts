import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "git-add-edit.gitAddEditFromExplorer",
      (uri: vscode.Uri | undefined, uris: vscode.Uri[] | undefined) => {
        gitAddEdit(uris);
      }
    ),
    vscode.commands.registerCommand(
      "git-add-edit.gitAddEditFromScm",
      (...resources: vscode.SourceControlResourceState[]) => {
        const uris = resources.map(resource => resource.resourceUri);
        gitAddEdit(uris);
      }
    )
  );
}

function gitAddEdit(uris: vscode.Uri[] | undefined): void {
  const terminal =
    vscode.window.terminals.find(terminal => terminal.name === "git add") ||
    vscode.window.createTerminal({ name: "git add" });
  terminal.show();

  uris?.forEach(uri => {
    terminal.sendText(`git add -e ${uri.fsPath}`);
  });
}
