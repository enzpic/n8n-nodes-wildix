import type { INodeProperties } from 'n8n-workflow';

export const callHistoryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['callHistory'] } },
		options: [
			{
				name: 'Change Tags',
				value: 'changeTags',
				action: 'Change tags of a call record',
				description: 'Update the tags on a call history record',
			},
			{
				name: 'Delete Call Record',
				value: 'delete',
				action: 'Delete a call record',
				description: 'Permanently delete a call history record',
			},
			{
				name: 'Delete Voicemails',
				value: 'deleteVoicemails',
				action: 'Delete voicemails',
				description: 'Delete one or more voicemail records',
			},
			{
				name: 'Get Call History by User',
				value: 'getByUser',
				action: 'Get call history by user',
				description: 'Retrieve call history for a specific user',
			},
			{
				name: 'Get Call Record',
				value: 'get',
				action: 'Get a call record',
				description: 'Retrieve a single call history record by ID',
			},
			{
				name: 'Get Full Call History',
				value: 'getMany',
				action: 'Get full call history',
				description: 'Retrieve all call history records',
			},
			{
				name: 'Get Personal Call History',
				value: 'getPersonal',
				action: 'Get personal call history',
				description: 'Retrieve call history for the authenticated user',
			},
			{
				name: 'Update Archived Status',
				value: 'updateArchived',
				action: 'Update archived status of a call record',
				description: 'Archive or unarchive a call history record',
			},
			{
				name: 'Update Voicemails Status',
				value: 'updateVoicemailStatus',
				action: 'Update voicemails status',
				description: 'Mark one or more voicemails as read or unread',
			},
		],
		default: 'getMany',
	},
];

export const callHistoryFields: INodeProperties[] = [
	// ── Shared: record ID ─────────────────────────────────────────────────────
	{
		displayName: 'Call Record ID',
		name: 'id',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['callHistory'],
				operation: ['get', 'updateArchived', 'delete', 'changeTags', 'updateVoicemailStatus', 'deleteVoicemails'],
			},
		},
		description: 'Unique ID of the call history record',
	},

	// ── Get Full Call History ─────────────────────────────────────────────────
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['callHistory'], operation: ['getMany'] } },
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['callHistory'], operation: ['getMany'], returnAll: [false] } },
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['callHistory'], operation: ['getMany'] } },
		options: [
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2024-01-01T00:00:00Z',
				description: 'Start of date range (ISO 8601)',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2024-12-31T23:59:59Z',
				description: 'End of date range (ISO 8601)',
			},
		],
	},

	// ── Get Personal Call History ─────────────────────────────────────────────
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['callHistory'], operation: ['getPersonal'] } },
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['callHistory'], operation: ['getPersonal'], returnAll: [false] } },
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['callHistory'], operation: ['getPersonal'] } },
		options: [
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2024-01-01T00:00:00Z',
				description: 'Start of date range (ISO 8601)',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2024-12-31T23:59:59Z',
				description: 'End of date range (ISO 8601)',
			},
		],
	},

	// ── Update Archived Status ─────────────────────────────────────────────────
	{
		displayName: 'Archived',
		name: 'archived',
		type: 'boolean',
		required: true,
		default: true,
		displayOptions: { show: { resource: ['callHistory'], operation: ['updateArchived'] } },
		description: 'Whether to archive (true) or unarchive (false) the record',
	},

	// ── Change Tags ────────────────────────────────────────────────────────────
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'tag1, tag2',
		displayOptions: { show: { resource: ['callHistory'], operation: ['changeTags'] } },
		description: 'Comma-separated list of tags to set on the call record',
	},

	// ── Get Call History by User ───────────────────────────────────────────────
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: { show: { resource: ['callHistory'], operation: ['getByUser'] } },
		description: 'Extension or user ID to retrieve call history for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['callHistory'], operation: ['getByUser'] } },
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['callHistory'], operation: ['getByUser'], returnAll: [false] } },
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['callHistory'], operation: ['getByUser'] } },
		options: [
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'string',
				default: '',
				placeholder: '2024-01-01T00:00:00Z',
				description: 'Start of date range (ISO 8601)',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'string',
				default: '',
				placeholder: '2024-12-31T23:59:59Z',
				description: 'End of date range (ISO 8601)',
			},
		],
	},
];
