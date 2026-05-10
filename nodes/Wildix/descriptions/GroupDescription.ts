import type { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['group'] } },
		options: [
			{
				name: 'Get Call Groups',
				value: 'getCallGroups',
				action: 'Get call groups',
				description: 'Retrieve all call groups on the PBX',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many groups',
				description: 'Retrieve all groups on the PBX',
			},
		],
		default: 'getMany',
	},
];

export const groupFields: INodeProperties[] = [];
