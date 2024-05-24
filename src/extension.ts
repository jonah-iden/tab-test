import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const tabGroups = vscode.window.tabGroups;
	tabGroups.onDidChangeTabs((e: vscode.TabChangeEvent) => {
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
			vscode.window.showInformationMessage('Tab Group with ' + t.activeTab?.label + ' changed.')
			logTabGroup(t, 'change');
		});
		e.closed.forEach(t => {
			vscode.window.showInformationMessage('Tab Group with ' + t.activeTab?.label + ' closed');
			logTabGroup(t, 'close');
		});
		e.opened.forEach(t => {
			vscode.window.showInformationMessage('Tab Group with ' + t.activeTab?.label + ' opened');
			logTabGroup(t, 'open');
		});
	});

	function logTabGroup(tabGroup: vscode.TabGroup, event: string) {
		console.log('tab group event ', event);
		console.log('active Tab ', tabGroup.activeTab?.label);
		console.log('viewColumn ', tabGroup.viewColumn);
		console.log('tabs ', tabGroup.tabs.map(t => t.label));
	}

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
