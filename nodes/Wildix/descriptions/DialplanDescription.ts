import type { INodeProperties } from 'n8n-workflow';

export const dialplanOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['dialplan'] } },
		options: [
			{ name: 'Create IVR', value: 'createIvr', action: 'Create an IVR entry', description: 'Create a new IVR entry' },
			{ name: 'Create Paging Group', value: 'createPagingGroup', action: 'Create a paging group', description: 'Create a new paging group' },
			{ name: 'Create Switch', value: 'createSwitch', action: 'Create a switch', description: 'Create a new dialplan switch' },
			{ name: 'Create Time Table', value: 'createTimeTable', action: 'Create a time table', description: 'Create a new time table' },
			{ name: 'Delete IVR', value: 'deleteIvr', action: 'Delete an IVR entry', description: 'Delete an IVR entry by ID' },
			{ name: 'Delete Paging Group', value: 'deletePagingGroup', action: 'Delete a paging group', description: 'Delete a paging group by ID' },
			{ name: 'Delete Switch', value: 'deleteSwitch', action: 'Delete a switch', description: 'Delete a dialplan switch by ID' },
			{ name: 'Delete Time Table', value: 'deleteTimeTable', action: 'Delete a time table', description: 'Delete a time table by ID' },
			{ name: 'Get Dialplans', value: 'getDialplans', action: 'Get PBX dialplans', description: 'Return the list of PBX dialplans' },
			{ name: 'Get General Settings', value: 'getGeneralSettings', action: 'Get dialplan general settings', description: 'Return dialplan general settings' },
			{ name: 'Get IVR', value: 'getIvr', action: 'Get IVR entries', description: 'Return the list of IVR entries' },
			{ name: 'Get Paging Groups', value: 'getPagingGroups', action: 'Get paging groups', description: 'Return the list of paging groups' },
			{ name: 'Get Switches', value: 'getSwitches', action: 'Get switches', description: 'Return the list of dialplan switches' },
			{ name: 'Get Time Tables', value: 'getTimeTables', action: 'Get time tables', description: 'Return the list of time tables' },
			{ name: 'Update General Settings', value: 'updateGeneralSettings', action: 'Update dialplan general settings', description: 'Update dialplan general settings' },
			{ name: 'Update IVR', value: 'updateIvr', action: 'Update an IVR entry', description: 'Update an IVR entry by ID' },
			{ name: 'Update Paging Group', value: 'updatePagingGroup', action: 'Update a paging group', description: 'Update a paging group by ID' },
			{ name: 'Update Switch', value: 'updateSwitch', action: 'Update a switch', description: 'Update a dialplan switch by ID' },
			{ name: 'Update Time Table', value: 'updateTimeTable', action: 'Update a time table', description: 'Update a time table by ID' },
		],
		default: 'getDialplans',
	},
];

export const dialplanFields: INodeProperties[] = [
	// ── Shared: item ID ───────────────────────────────────────────────────────
	{
		displayName: 'ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dialplan'],
				operation: [
					'updatePagingGroup', 'deletePagingGroup',
					'updateSwitch', 'deleteSwitch',
					'updateIvr', 'deleteIvr',
					'updateTimeTable', 'deleteTimeTable',
				],
			},
		},
		description: 'ID of the item to update or delete',
	},

	// ── Create/Update Paging Group ────────────────────────────────────────────
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'MyPagingGroup',
		displayOptions: { show: { resource: ['dialplan'], operation: ['createPagingGroup'] } },
		description: 'Title of the paging group (no spaces allowed)',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['dialplan'], operation: ['updatePagingGroup'] } },
		options: [
			{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'Paging group title (no spaces allowed)' },
			{ displayName: 'Extension', name: 'extension', type: 'string', default: '', description: 'Extension number' },
			{ displayName: 'Members (JSON)', name: 'members', type: 'json', default: '[]', description: 'Array of member extension numbers (required by API)' },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['dialplan'], operation: ['createPagingGroup'] } },
		options: [
			{ displayName: 'Extension', name: 'extension', type: 'string', default: '', description: 'Extension number' },
			{ displayName: 'Members (JSON)', name: 'members', type: 'json', default: '[]', description: 'Array of member extension numbers' },
		],
	},

	// ── Create/Update Switch ──────────────────────────────────────────────────
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'MySwitch',
		displayOptions: { show: { resource: ['dialplan'], operation: ['createSwitch'] } },
		description: 'Title of the switch (no spaces allowed)',
	},
	{
		displayName: 'State',
		name: 'state',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: ['dialplan'], operation: ['createSwitch'] } },
		description: 'Initial switch state (integer)',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['dialplan'], operation: ['updateSwitch'] } },
		options: [
			{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'Switch title (no spaces allowed)' },
			{ displayName: 'State', name: 'state', type: 'number', default: 0, description: 'Switch state (integer)' },
			{ displayName: 'Is Tree Type', name: 'isTreeType', type: 'boolean', default: false, description: 'Whether the switch is tree type' },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['dialplan'], operation: ['createSwitch'] } },
		options: [
			{ displayName: 'Is Tree Type', name: 'isTreeType', type: 'boolean', default: false, description: 'Whether the switch is tree type' },
		],
	},

	// ── Create/Update IVR ─────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['dialplan'], operation: ['createIvr'] } },
		description: 'Name of the IVR',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['dialplan'], operation: ['updateIvr'] } },
		options: [
			{ displayName: 'Name', name: 'name', type: 'string', default: '', description: 'IVR name' },
			{ displayName: 'Extension', name: 'extension', type: 'string', default: '', description: 'Extension number' },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['dialplan'], operation: ['createIvr'] } },
		options: [
			{ displayName: 'Extension', name: 'extension', type: 'string', default: '', description: 'Extension number' },
		],
	},

	// ── Create/Update Time Table ──────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['dialplan'], operation: ['createTimeTable'] } },
		description: 'Name of the time table',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['dialplan'], operation: ['updateTimeTable'] } },
		options: [
			{ displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Time table name' },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['dialplan'], operation: ['createTimeTable'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '', description: 'Time table description' },
		],
	},

	// ── Update General Settings ───────────────────────────────────────────────
	{
		displayName: 'Settings',
		name: 'settings',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['dialplan'], operation: ['updateGeneralSettings'] } },
		description: 'General settings object as JSON',
	},
];
