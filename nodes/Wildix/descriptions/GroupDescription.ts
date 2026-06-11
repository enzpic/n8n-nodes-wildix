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
				name: 'Create Call Group',
				value: 'createCallGroup',
				action: 'Create a call group',
				description: 'Create a new call group',
			},
			{
				name: 'Delete Call Group',
				value: 'deleteCallGroup',
				action: 'Delete a call group',
				description: 'Delete a call group by ID',
			},
			{
				name: 'Get Call Group Stats',
				value: 'getCallGroupStat',
				action: 'Get call group statistics',
				description: 'Retrieve live queue statistics for a single call group',
			},
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
			{
				name: 'Update Call Group',
				value: 'updateCallGroup',
				action: 'Update a call group',
				description: 'Update a call group by ID',
			},
		],
		default: 'getMany',
	},
];

export const groupFields: INodeProperties[] = [
	{
		displayName: 'Call Group ID',
		name: 'callGroupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['group'], operation: ['getCallGroupStat', 'updateCallGroup', 'deleteCallGroup'] } },
		description: 'ID of the call group',
	},
	{
		displayName: 'Title',
		name: 'callGroupTitle',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['group'], operation: ['createCallGroup'] } },
		description: 'Name of the call group',
	},
	{
		displayName: 'Additional Fields',
		name: 'createCallGroupFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['group'], operation: ['createCallGroup'] } },
		options: [
			{ displayName: 'Members (JSON)', name: 'members', type: 'json', default: '[]', description: 'Array of member extensions. For priority strategy, append priority after the member separated by a comma, e.g. ["11@internalcalls,2"].' },
			{ displayName: 'Settings (JSON)', name: 'settings', type: 'json', default: '{}', description: 'Call group settings object (strategy, timeout, announce, etc.)' },
		],
	},
	{
		displayName: 'Update Fields (JSON)',
		name: 'updateCallGroupData',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['group'], operation: ['updateCallGroup'] } },
		description: 'Call group fields to update as a JSON object (title, members, settings)',
	},
];
