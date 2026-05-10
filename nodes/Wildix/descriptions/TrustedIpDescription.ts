import type { INodeProperties } from 'n8n-workflow';

export const trustedIpOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['trustedIp'] } },
		options: [
			{ name: 'Get Many', value: 'getMany', action: 'Get trusted i ps', description: 'Return the list of trusted IP addresses' },
			{ name: 'Set', value: 'set', action: 'Set trusted i ps', description: 'Replace the entire trusted IP list' },
		],
		default: 'getMany',
	},
];

export const trustedIpFields: INodeProperties[] = [
	// ── Set ───────────────────────────────────────────────────────────────────
	{
		displayName: 'IP Addresses',
		name: 'rows',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['trustedIp'], operation: ['set'] } },
		description: 'Comma-separated list of IP addresses or CIDR ranges to trust',
	},
];
