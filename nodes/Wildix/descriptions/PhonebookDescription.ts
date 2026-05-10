import type { INodeProperties } from 'n8n-workflow';

export const phonebookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['phonebook'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a phonebook', description: 'Create a new phonebook' },
			{ name: 'Delete', value: 'delete', action: 'Delete a phonebook', description: 'Delete a phonebook by ID' },
			{ name: 'Get', value: 'get', action: 'Get a phonebook', description: 'Return a single phonebook by ID' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many phonebooks', description: 'Return a list of phonebooks' },
			{ name: 'Update', value: 'update', action: 'Update a phonebook', description: 'Update a phonebook by ID' },
		],
		default: 'getMany',
	},
];

export const phonebookFields: INodeProperties[] = [
	// ── Shared: phonebook ID ──────────────────────────────────────────────────
	{
		displayName: 'Phonebook ID',
		name: 'phonebookId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['phonebook'], operation: ['get', 'update', 'delete'] } },
		description: 'ID of the phonebook',
	},

	// ── Get Many ──────────────────────────────────────────────────────────────
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['phonebook'], operation: ['getMany'] } },
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['phonebook'], operation: ['getMany'], returnAll: [false] } },
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['phonebook'], operation: ['getMany'] } },
		options: [
			{ displayName: 'Search', name: 'search', type: 'string', default: '', description: 'Search term' },
			{ displayName: 'Sort Field', name: 'sort', type: 'string', default: 'name', description: 'Field to sort by' },
		],
	},

	// ── Create ────────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['phonebook'], operation: ['create'] } },
		description: 'Name of the phonebook',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['phonebook'], operation: ['create'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '', description: 'Phonebook description' },
			{ displayName: 'Type', name: 'type', type: 'string', default: '', description: 'Phonebook type' },
		],
	},

	// ── Update ────────────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['phonebook'], operation: ['update'] } },
		options: [
			{ displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Phonebook name' },
			{ displayName: 'Description', name: 'description', type: 'string', default: '', description: 'Phonebook description' },
		],
	},
];
