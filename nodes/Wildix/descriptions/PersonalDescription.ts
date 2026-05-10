import type { INodeProperties } from 'n8n-workflow';

export const personalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['personal'] } },
		options: [
			{ name: 'Get ACL', value: 'getAcl', action: 'Get personal ACL', description: 'Return the personal ACL permissions' },
			{ name: 'Get Features', value: 'getFeatures', action: 'Get personal features', description: 'Return the enabled personal features' },
			{ name: 'Get Locations', value: 'getLocations', action: 'Get personal locations', description: 'Return saved personal locations' },
			{ name: 'Get Paging Groups', value: 'getPagingGroups', action: 'Get personal paging groups', description: 'Return the paging groups the user belongs to' },
			{ name: 'Get Presence', value: 'getPresence', action: 'Get personal presence', description: 'Return the current presence status' },
			{ name: 'Get Presence Location', value: 'getPresenceLocation', action: 'Get presence location', description: 'Return the current presence location' },
			{ name: 'Get Roster', value: 'getRoster', action: 'Get personal roster', description: 'Return the personal contact roster' },
			{ name: 'Get Settings', value: 'getSettings', action: 'Get personal settings', description: 'Return personal user settings' },
			{ name: 'Get Token', value: 'getToken', action: 'Get personal token', description: 'Return the personal API token' },
			{ name: 'Reset Token', value: 'resetToken', action: 'Reset personal token', description: 'Generate a new personal API token' },
			{ name: 'Update Features', value: 'updateFeatures', action: 'Update personal features', description: 'Update personal feature settings' },
			{ name: 'Update Presence', value: 'updatePresence', action: 'Update personal presence', description: 'Update the current presence status' },
			{ name: 'Update Presence Location', value: 'updatePresenceLocation', action: 'Update presence location', description: 'Update the current presence location' },
			{ name: 'Update Settings', value: 'updateSettings', action: 'Update personal settings', description: 'Update personal user settings' },
		],
		default: 'getSettings',
	},
];

export const personalFields: INodeProperties[] = [
	// ── Update Settings ───────────────────────────────────────────────────────
	{
		displayName: 'Settings (JSON)',
		name: 'settings',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['personal'], operation: ['updateSettings'] } },
		description: 'Personal settings as a JSON object',
	},

	// ── Update Presence ───────────────────────────────────────────────────────
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{ name: 'Available', value: 'available' },
			{ name: 'Away', value: 'away' },
			{ name: 'Busy', value: 'busy' },
			{ name: 'DND', value: 'dnd' },
			{ name: 'Offline', value: 'offline' },
		],
		required: true,
		default: 'available',
		displayOptions: { show: { resource: ['personal'], operation: ['updatePresence'] } },
		description: 'Presence status to set',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['personal'], operation: ['updatePresence'] } },
		options: [
			{ displayName: 'Message', name: 'message', type: 'string', default: '', description: 'Optional presence message' },
		],
	},

	// ── Update Presence Location ──────────────────────────────────────────────
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['personal'], operation: ['updatePresenceLocation'] } },
		description: 'Location to set (e.g., office name)',
	},

	// ── Update Features ───────────────────────────────────────────────────────
	{
		displayName: 'Features (JSON)',
		name: 'features',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['personal'], operation: ['updateFeatures'] } },
		description: 'Feature settings as a JSON object',
	},
];
