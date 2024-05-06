import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const tabGroups = vscode.window.tabGroups;
	tabGroups.onDidChangeTabs((e: vscode.TabChangeEvent) => {
		vscode.window.showInformationMessage('!');
		e.changed.forEach(t => {
			vscode.window.showInformationMessage('Tab ' + t.label + ' changed.');
		});
		e.opened.forEach(t => {
			vscode.window.showInformationMessage('Tab ' + t.label + ' opened.');
		});
		e.closed.forEach(t => {
			vscode.window.showInformationMessage('Tab ' + t.label + ' closed.');
		});
	});

	tabGroups.onDidChangeTabGroups((e: vscode.TabGroupChangeEvent) => {
		e.changed.forEach(t => {
			vscode.window.showInformationMessage('Tab Group with ' + t.activeTab?.label + ' changed.');
		});
		e.closed.forEach(t => {
			vscode.window.showInformationMessage('Tab Group with ' + t.activeTab?.label + ' closed');
		});
		e.opened.forEach(t => {
			vscode.window.showInformationMessage('Tab Group with ' + t.activeTab?.label + ' opened');
		});
	});

	context.subscriptions.push(vscode.commands.registerCommand('tab-test.closeActiveTab', () => {
		const activeTab = tabGroups.activeTabGroup.activeTab;
		if (activeTab) {
			tabGroups.close(activeTab);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('tab-test.closeActiveTabGroup', () => {
		const activeTabGroup = tabGroups.activeTabGroup;
		if (activeTabGroup) {
			tabGroups.close(activeTabGroup);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('tab-test.showActiveTabGroup', () => {
		vscode.window.showInformationMessage('active tab group collumn ' + tabGroups.activeTabGroup.viewColumn + ' active tab ' + tabGroups.activeTabGroup.activeTab?.label);
	}));
}

export function deactivate() { }
