import type { INodeProperties } from 'n8n-workflow';

export const oauth2ClientOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['oauth2Client'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a client',
				description: 'Create a new OAuth2 client application',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a client',
				description: 'Delete an OAuth2 client by ID',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many clients',
				description: 'Retrieve all OAuth2 clients on the PBX',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a client',
				description: 'Update an existing OAuth2 client',
			},
		],
		default: 'getMany',
	},
];

export const oauth2ClientFields: INodeProperties[] = [
	// ── Shared: client ID ──────────────────────────────────────────────────────
	{
		displayName: 'Client ID',
		name: 'oauthClientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['oauth2Client'], operation: ['update', 'delete'] } },
		description: 'ID of the OAuth2 client',
	},

	// ── Create ─────────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['oauth2Client'], operation: ['create'] } },
		description: 'Name for the new OAuth2 client',
	},
	{
		displayName: 'Redirect URIs',
		name: 'redirectUris',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		placeholder: 'Add URI',
		default: {},
		displayOptions: { show: { resource: ['oauth2Client'], operation: ['create'] } },
		description: 'Allowed redirect URIs for the OAuth2 flow',
		options: [
			{
				name: 'values',
				displayName: 'Values',
				values: [
					{
						displayName: 'URI',
						name: 'uri',
						type: 'string',
						default: '',
						placeholder: 'https://example.com/callback',
					},
				],
			},
		],
	},

	{
		displayName: 'Additional Fields',
		name: 'createAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['oauth2Client'], operation: ['create'] } },
		options: [
			{
				displayName: 'Expire Time',
				name: 'expireTime',
				type: 'number',
				default: 3600,
				description: 'Access token expiry time in seconds',
			},
		],
	},

	// ── Update ─────────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'updateName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['oauth2Client'], operation: ['update'] } },
		description: 'New name for the OAuth2 client',
	},
	{
		displayName: 'Redirect URIs',
		name: 'updateRedirectUris',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		placeholder: 'Add URI',
		default: {},
		displayOptions: { show: { resource: ['oauth2Client'], operation: ['update'] } },
		description: 'Allowed redirect URIs for the OAuth2 flow',
		options: [
			{
				name: 'values',
				displayName: 'Values',
				values: [
					{
						displayName: 'URI',
						name: 'uri',
						type: 'string',
						default: '',
						placeholder: 'https://example.com/callback',
					},
				],
			},
		],
	},
];
