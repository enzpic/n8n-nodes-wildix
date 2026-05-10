import type { INodeProperties } from 'n8n-workflow';

export const departmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['department'] } },
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many departments',
				description: 'Retrieve all departments on the PBX',
			},
		],
		default: 'getMany',
	},
];

export const departmentFields: INodeProperties[] = [];
