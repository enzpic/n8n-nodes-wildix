import type { INodeProperties } from 'n8n-workflow';

export const applicationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['application'] } },
		options: [
			{ name: 'Create S2S Application', value: 'createS2s', action: 'Create an S2S application', description: 'Create a new server-to-server application' },
			{ name: 'Create Simple Token', value: 'createSimpleToken', action: 'Create a simple token application', description: 'Create a new simple token application' },
			{ name: 'Delete S2S Application', value: 'deleteS2s', action: 'Delete an S2S application', description: 'Delete a server-to-server application by ID' },
			{ name: 'Delete Simple Token', value: 'deleteSimpleToken', action: 'Delete a simple token application', description: 'Delete a simple token application by ID' },
			{ name: 'Get S2S Applications', value: 'getS2s', action: 'Get S2S applications', description: 'Return the list of server-to-server applications' },
			{ name: 'Get Simple Tokens', value: 'getSimpleTokens', action: 'Get simple token applications', description: 'Return the list of simple token applications' },
			{ name: 'Update Simple Token', value: 'updateSimpleToken', action: 'Update a simple token application', description: 'Update a simple token application by ID' },
		],
		default: 'getSimpleTokens',
	},
];

export const applicationFields: INodeProperties[] = [
	// ── Shared: application ID ────────────────────────────────────────────────
	{
		displayName: 'Application ID',
		name: 'appId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['application'],
				operation: ['updateSimpleToken', 'deleteSimpleToken', 'deleteS2s'],
			},
		},
		description: 'ID of the application',
	},

	// ── Create Simple Token ───────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['application'], operation: ['createSimpleToken'] } },
		description: 'Name of the simple token application',
	},
	{
		displayName: 'PBX User (Extension)',
		name: 'pbxUser',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: { show: { resource: ['application'], operation: ['createSimpleToken'] } },
		description: 'Extension of the PBX user this token is associated with',
	},
	{
		displayName: 'Expire Time',
		name: 'expireTime',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: ['application'], operation: ['createSimpleToken'] } },
		description: 'Unix timestamp (seconds) when the token expires — must be in the future',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['application'], operation: ['createSimpleToken'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '', description: 'Application description' },
			{ displayName: 'Permissions (JSON)', name: 'permissions', type: 'json', default: '[]', description: 'Array of permission strings' },
		],
	},

	// ── Update Simple Token ───────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['application'], operation: ['updateSimpleToken'] } },
		options: [
			{ displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Application name' },
			{ displayName: 'Description', name: 'description', type: 'string', default: '', description: 'Application description' },
			{ displayName: 'Permissions (JSON)', name: 'permissions', type: 'json', default: '[]', description: 'Array of permission strings' },
		],
	},

	// ── Create S2S ────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['application'], operation: ['createS2s'] } },
		description: 'Name of the S2S application',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['application'], operation: ['createS2s'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '', description: 'Application description' },
			{ displayName: 'Permissions (JSON)', name: 'permissions', type: 'json', default: '[]', description: 'Array of permission strings' },
		],
	},
];
