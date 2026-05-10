import type { INodeProperties } from 'n8n-workflow';

export const faxOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['fax'] } },
		options: [
			{ name: 'Send', value: 'send', action: 'Send a fax', description: 'Send a fax to one or more numbers' },
			{ name: 'Upload File', value: 'uploadFile', action: 'Upload a fax file', description: 'Upload a file to be used in a fax' },
		],
		default: 'send',
	},
];

export const faxFields: INodeProperties[] = [
	// ── Send Fax ──────────────────────────────────────────────────────────────
	{
		displayName: 'Fax Numbers',
		name: 'faxNumbers',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['fax'], operation: ['send'] } },
		description: 'Comma-separated list of destination fax numbers',
	},
	{
		displayName: 'File Names',
		name: 'fileNames',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['fax'], operation: ['send'] } },
		description: 'Comma-separated list of file names to send (must be uploaded first)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['fax'], operation: ['send'] } },
		options: [
			{ displayName: 'Postpone (Seconds)', name: 'postpone', type: 'number', default: 0, description: 'Delay sending by this many seconds' },
			{ displayName: 'Cover Page', name: 'faxCover', type: 'boolean', default: false, description: 'Whether to add a cover page' },
		],
	},

	// ── Upload File ───────────────────────────────────────────────────────────
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: { show: { resource: ['fax'], operation: ['uploadFile'] } },
		description: 'Name of the binary property containing the file to upload',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['fax'], operation: ['uploadFile'] } },
		description: 'Name to save the uploaded file as',
	},
];
