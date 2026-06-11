import type { INodeProperties } from 'n8n-workflow';

export const personalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['personal'] } },
		options: [
			{ name: 'Delete Location', value: 'deleteLocation', action: 'Delete a personal location', description: 'Remove a saved personal location by IP' },
			{ name: 'Get ACL', value: 'getAcl', action: 'Get personal ACL', description: 'Return the personal ACL permissions' },
			{ name: 'Get Features', value: 'getFeatures', action: 'Get personal features', description: 'Return the enabled personal features' },
			{ name: 'Get Locations', value: 'getLocations', action: 'Get personal locations', description: 'Return saved personal locations' },
			{ name: 'Get Paging Groups', value: 'getPagingGroups', action: 'Get personal paging groups', description: 'Return the paging groups the user belongs to' },
			{ name: 'Get Settings', value: 'getSettings', action: 'Get personal settings', description: 'Return personal user settings' },
			{ name: 'Get Token', value: 'getToken', action: 'Get personal token', description: 'Return the personal API token' },
			{ name: 'Reset Token', value: 'resetToken', action: 'Reset personal token', description: 'Generate a new personal API token' },
			{ name: 'Update Features', value: 'updateFeatures', action: 'Update personal features', description: 'Update personal feature settings' },
			{ name: 'Update Presence', value: 'updatePresence', action: 'Update personal presence', description: 'Update the current presence status' },
			{ name: 'Update Presence Location', value: 'updatePresenceLocation', action: 'Update presence location', description: 'Update the current presence location' },
			{ name: 'Update Roster', value: 'updateRoster', action: 'Update personal roster', description: 'Update the personal contact roster' },
			{ name: 'Update Settings', value: 'updateSettings', action: 'Update personal settings', description: 'Update personal user settings' },
		],
		default: 'getSettings',
	},
];

export const personalFields: INodeProperties[] = [
	// ── Get ACL ───────────────────────────────────────────────────────────────
	{
		displayName: 'Filters',
		name: 'aclFilters',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		required: true,
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['personal'], operation: ['getAcl'] } },
		description: 'At least one filter group is required. Each maps an ACL kind to a comma-separated ACL list.',
		options: [
			{
				name: 'values',
				displayName: 'Filter',
				values: [
					{
						displayName: 'Kind',
						name: 'kind',
						type: 'options',
						default: 'canuse',
						options: [
							{ name: 'Can Call', value: 'cancall' },
							{ name: 'Can Set', value: 'canset' },
							{ name: 'Can Use', value: 'canuse' },
							{ name: 'Yes/No', value: 'yesno' },
						],
					},
					{
						displayName: 'ACL List',
						name: 'acl',
						type: 'string',
						default: '',
						placeholder: 'feature1,feature2',
						description: 'Comma-separated ACL list for this kind',
					},
				],
			},
		],
	},

	// ── Delete Location ───────────────────────────────────────────────────────
	{
		displayName: 'IP',
		name: 'locationIp',
		type: 'string',
		required: true,
		default: '',
		placeholder: '192.168.1.10',
		displayOptions: { show: { resource: ['personal'], operation: ['deleteLocation'] } },
		description: 'IP address of the location to remove',
	},

	// ── Update Roster ─────────────────────────────────────────────────────────
	{
		displayName: 'Roster (JSON)',
		name: 'roster',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['personal'], operation: ['updateRoster'] } },
		description: 'Roster data as a JSON object',
	},

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
