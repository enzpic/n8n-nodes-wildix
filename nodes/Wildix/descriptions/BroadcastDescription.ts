import type { INodeProperties } from 'n8n-workflow';

export const broadcastOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['broadcast'] } },
		options: [
			{
				name: 'Reload',
				value: 'reload',
				action: 'Reload broadcasts',
				description: 'Reload the broadcast configuration on the PBX',
			},
		],
		default: 'reload',
	},
];

export const broadcastFields: INodeProperties[] = [];
