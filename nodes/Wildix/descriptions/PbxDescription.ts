import type { INodeProperties } from 'n8n-workflow';

export const pbxOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['pbx'] } },
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many PBX instances',
				description: 'Retrieve all PBX instances available to the account',
			},
		],
		default: 'getMany',
	},
];

export const pbxFields: INodeProperties[] = [];
