import type { INodeProperties } from 'n8n-workflow';

export const callQueueOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['callQueue'] } },
		options: [
			{
				name: 'Add Dynamic Member',
				value: 'addDynamicMember',
				action: 'Add a dynamic member to a call group',
				description: 'Add a user as a dynamic member to a call group',
			},
			{
				name: 'Get Dynamic Members',
				value: 'getDynamicMembers',
				action: 'Get dynamic members of a call group',
				description: 'Return the list of dynamic members for a call group',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many call queues',
				description: 'Return the list of all call queues',
			},
			{
				name: 'Get Settings',
				value: 'getSettings',
				action: 'Get call queue settings',
				description: 'Retrieve the configuration for a call queue group',
			},
			{
				name: 'Remove Dynamic Member',
				value: 'removeDynamicMember',
				action: 'Remove a dynamic member from a call group',
				description: 'Remove a dynamic member from a call group',
			},
		],
		default: 'getMany',
	},
];

export const callQueueFields: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['callQueue'],
				operation: ['getSettings', 'getDynamicMembers', 'addDynamicMember', 'removeDynamicMember'],
			},
		},
		description: 'ID of the call queue or call group',
	},

	// ── Add Dynamic Member ────────────────────────────────────────────────────
	{
		displayName: 'Extension',
		name: 'extension',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: { show: { resource: ['callQueue'], operation: ['addDynamicMember', 'removeDynamicMember'] } },
		description: 'Extension of the member to add or remove',
	},
];
