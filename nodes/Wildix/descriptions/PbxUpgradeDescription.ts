import type { INodeProperties } from 'n8n-workflow';

export const pbxUpgradeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['pbxUpgrade'] } },
		options: [
			{ name: 'Check for Updates', value: 'check', action: 'Check for PBX updates', description: 'Check if firmware updates are available' },
			{ name: 'Get Upgrade Settings', value: 'getSettings', action: 'Get upgrade settings', description: 'Return upgrade configuration settings' },
			{ name: 'Get Upgrade Status', value: 'getStatus', action: 'Get upgrade status', description: 'Return the current upgrade status' },
			{ name: 'Start Check', value: 'startCheck', action: 'Start an update check', description: 'Trigger a new check for available firmware updates' },
			{ name: 'Start Upgrade', value: 'start', action: 'Start a PBX upgrade', description: 'Start a firmware upgrade' },
			{ name: 'Update Upgrade Settings', value: 'updateSettings', action: 'Update upgrade settings', description: 'Update upgrade configuration settings' },
		],
		default: 'getStatus',
	},
];

export const pbxUpgradeFields: INodeProperties[] = [
	// ── Start Upgrade ─────────────────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['pbxUpgrade'], operation: ['start'] } },
		options: [
			{ displayName: 'Version', name: 'version', type: 'string', default: '', description: 'Specific firmware version to upgrade to (leave empty for latest)' },
		],
	},

	// ── Update Upgrade Settings ───────────────────────────────────────────────
	{
		displayName: 'Settings (JSON)',
		name: 'settings',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['pbxUpgrade'], operation: ['updateSettings'] } },
		description: 'Upgrade settings as a JSON object',
	},
];
