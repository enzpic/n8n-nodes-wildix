import type { INodeProperties } from 'n8n-workflow';

export const trunkOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['trunk'] } },
		options: [
			{ name: 'Create FXO Trunk', value: 'createFxo', action: 'Create a FXO trunk', description: 'Create a new FXO trunk' },
			{ name: 'Create PSTN Trunk', value: 'createPstn', action: 'Create a PSTN trunk', description: 'Create a new PSTN trunk' },
			{ name: 'Create SIP Trunk', value: 'createSip', action: 'Create a SIP trunk', description: 'Create a new SIP trunk' },
			{ name: 'Create Trunk Group', value: 'createGroup', action: 'Create a trunk group', description: 'Create a new trunk group' },
			{ name: 'Delete FXO Trunk', value: 'deleteFxo', action: 'Delete a FXO trunk', description: 'Delete a FXO trunk by ID' },
			{ name: 'Delete PSTN Trunk', value: 'deletePstn', action: 'Delete a PSTN trunk', description: 'Delete a PSTN trunk by ID' },
			{ name: 'Delete SIP Trunk', value: 'deleteSip', action: 'Delete a SIP trunk', description: 'Delete a SIP trunk by ID' },
			{ name: 'Delete Trunk Group', value: 'deleteGroup', action: 'Delete a trunk group', description: 'Delete a trunk group by ID' },
			{ name: 'Get FXO Trunks', value: 'getFxo', action: 'Get FXO trunks', description: 'Return the list of FXO trunks' },
			{ name: 'Get PSTN Trunks', value: 'getPstn', action: 'Get PSTN trunks', description: 'Return the list of PSTN trunks' },
			{ name: 'Get SIP Trunks', value: 'getSip', action: 'Get SIP trunks', description: 'Return the list of SIP trunks' },
			{ name: 'Get Trunk Groups', value: 'getGroups', action: 'Get trunk groups', description: 'Return the list of trunk groups with rules' },
			{ name: 'Get Trunk Prices', value: 'getPrices', action: 'Get trunk prices', description: 'Return trunk pricing information' },
			{ name: 'Update FXO Trunk', value: 'updateFxo', action: 'Update a FXO trunk', description: 'Update a FXO trunk by ID' },
			{ name: 'Update PSTN Trunk', value: 'updatePstn', action: 'Update a PSTN trunk', description: 'Update a PSTN trunk by ID' },
			{ name: 'Update SIP Trunk', value: 'updateSip', action: 'Update a SIP trunk', description: 'Update a SIP trunk by ID' },
			{ name: 'Update Trunk Group', value: 'updateGroup', action: 'Update a trunk group', description: 'Update a trunk group by ID' },
		],
		default: 'getGroups',
	},
];

export const trunkFields: INodeProperties[] = [
	// ── Shared: trunk ID ──────────────────────────────────────────────────────
	{
		displayName: 'Trunk ID',
		name: 'trunkId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['trunk'],
				operation: ['updateGroup', 'deleteGroup', 'updateSip', 'deleteSip', 'updatePstn', 'deletePstn', 'updateFxo', 'deleteFxo'],
			},
		},
		description: 'ID of the trunk',
	},

	// ── Create/Update Trunk Group ─────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['trunk'], operation: ['createGroup'] } },
		description: 'Name of the trunk group',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['trunk'], operation: ['updateGroup'] } },
		options: [
			{ displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Trunk group name' },
			{ displayName: 'Description', name: 'description', type: 'string', default: '', description: 'Trunk group description' },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['trunk'], operation: ['createGroup'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '', description: 'Trunk group description' },
		],
	},

	// ── Create SIP Trunk ──────────────────────────────────────────────────────
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['trunk'], operation: ['createSip'] } },
		description: 'Title of the SIP trunk',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['trunk'], operation: ['createSip'] } },
		options: [
			{ displayName: 'Name (Auth Login)', name: 'name', type: 'string', default: '', description: 'Auth login for the SIP trunk' },
			{ displayName: 'Register String', name: 'register', type: 'string', default: '', description: 'SIP register string' },
		],
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['trunk'], operation: ['updateSip'] } },
		options: [
			{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'Trunk title' },
			{ displayName: 'Name (Auth Login)', name: 'name', type: 'string', default: '', description: 'Auth login for the SIP trunk' },
			{ displayName: 'Register String', name: 'register', type: 'string', default: '', description: 'SIP register string' },
		],
	},

	// ── Create PSTN Trunk ─────────────────────────────────────────────────────
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['trunk'], operation: ['createPstn'] } },
		description: 'Title of the PSTN trunk',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['trunk'], operation: ['updatePstn'] } },
		options: [
			{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'Trunk title' },
		],
	},

	// ── Create FXO Trunk ──────────────────────────────────────────────────────
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['trunk'], operation: ['createFxo'] } },
		description: 'Title of the FXO trunk',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['trunk'], operation: ['updateFxo'] } },
		options: [
			{ displayName: 'Title', name: 'title', type: 'string', default: '', description: 'Trunk title' },
		],
	},
];
