import type { INodeProperties } from 'n8n-workflow';

export const sipRegistrationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['sipRegistration'] } },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get many SIP registrations', description: 'Return SIP registrations for many users' },
			{ name: 'Get By Extension', value: 'getByExtension', action: 'Get SIP registrations by extension', description: 'Return SIP registrations for a specific extension' },
		],
		default: 'getAll',
	},
];

export const sipRegistrationFields: INodeProperties[] = [
	// ── Get By Extension ──────────────────────────────────────────────────────
	{
		displayName: 'Extension',
		name: 'extension',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: { show: { resource: ['sipRegistration'], operation: ['getByExtension'] } },
		description: 'Extension number to get SIP registrations for',
	},
];
