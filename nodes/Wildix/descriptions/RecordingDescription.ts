import type { INodeProperties } from 'n8n-workflow';

export const recordingOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['recording'] } },
		options: [
			{ name: 'Get Many', value: 'getMany', action: 'Get many recordings', description: 'Return a list of call recordings' },
			{ name: 'Create Download Task', value: 'createDownloadTask', action: 'Create a recording download task', description: 'Create a task to download recordings as a ZIP archive' },
		],
		default: 'getMany',
	},
];

export const recordingFields: INodeProperties[] = [
	// ── Get Many ──────────────────────────────────────────────────────────────
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['recording'], operation: ['getMany'] } },
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['recording'], operation: ['getMany'], returnAll: [false] } },
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['recording'], operation: ['getMany'] } },
		options: [
			{ displayName: 'From Date', name: 'from', type: 'dateTime', default: '', description: 'Filter recordings from this date' },
			{ displayName: 'To Date', name: 'to', type: 'dateTime', default: '', description: 'Filter recordings until this date' },
		],
	},

	// ── Create Download Task ──────────────────────────────────────────────────
	{
		displayName: 'Recording IDs',
		name: 'ids',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['recording'], operation: ['createDownloadTask'] } },
		description: 'Comma-separated list of recording IDs to include in the download',
	},
];
