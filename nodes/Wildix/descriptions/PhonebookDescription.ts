import type { INodeProperties } from 'n8n-workflow';

export const phonebookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['phonebook'] } },
		options: [
			{ name: 'Add Contact', value: 'addContact', action: 'Add a contact to a phonebook', description: 'Add a contact to a phonebook' },
			{ name: 'Create', value: 'create', action: 'Create a phonebook', description: 'Create a new phonebook' },
			{ name: 'Delete', value: 'delete', action: 'Delete a phonebook', description: 'Delete a phonebook by ID' },
			{ name: 'Delete All Contacts', value: 'deleteContacts', action: 'Delete all contacts in a phonebook', description: 'Delete every contact in a phonebook' },
			{ name: 'Delete Contact', value: 'deleteContact', action: 'Delete a contact from a phonebook', description: 'Delete a single contact from a phonebook' },
			{ name: 'Get', value: 'get', action: 'Get a phonebook', description: 'Return a single phonebook by ID' },
			{ name: 'Get Contact', value: 'getContact', action: 'Get a contact from a phonebook', description: 'Return a single contact from a phonebook' },
			{ name: 'Get Contacts', value: 'getContacts', action: 'Get contacts from a phonebook', description: 'Return the contacts in a phonebook' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many phonebooks', description: 'Return a list of phonebooks' },
			{ name: 'Update', value: 'update', action: 'Update a phonebook', description: 'Update a phonebook by ID' },
			{ name: 'Update Contact', value: 'updateContact', action: 'Update a contact in a phonebook', description: 'Update a single contact in a phonebook' },
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

	// ── Shared: phonebook ID for contact operations ───────────────────────────
	{
		displayName: 'Phonebook ID',
		name: 'contactPhonebookId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['phonebook'],
				operation: ['getContacts', 'getContact', 'addContact', 'updateContact', 'deleteContact', 'deleteContacts'],
			},
		},
		description: 'ID of the phonebook the contact belongs to',
	},

	// ── Shared: contact ID ─────────────────────────────────────────────────────
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['phonebook'],
				operation: ['getContact', 'updateContact', 'deleteContact'],
			},
		},
		description: 'ID of the contact',
	},

	// ── Get Contacts ───────────────────────────────────────────────────────────
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['phonebook'], operation: ['getContacts'] } },
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['phonebook'], operation: ['getContacts'], returnAll: [false] } },
		description: 'Max number of results to return',
	},

	// ── Add Contact ────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'contactName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['phonebook'], operation: ['addContact'] } },
		description: 'Name of the contact',
	},
	{
		displayName: 'Additional Fields',
		name: 'contactAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['phonebook'], operation: ['addContact'] } },
		options: [
			{ displayName: 'Email', name: 'email', type: 'string',
																																										placeholder: 'name@email.com', default: '', description: 'Contact email address' },
			{ displayName: 'Extension', name: 'extension', type: 'string', default: '', description: 'Contact extension' },
			{ displayName: 'Mobile', name: 'mobile', type: 'string', default: '', description: 'Contact mobile number' },
			{ displayName: 'Note', name: 'note', type: 'string', default: '', description: 'Free-text note' },
			{ displayName: 'Organization', name: 'organization', type: 'string', default: '', description: 'Contact organization' },
			{ displayName: 'Phone', name: 'phone', type: 'string', default: '', description: 'Contact phone number' },
		],
	},

	// ── Update Contact ─────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'contactUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['phonebook'], operation: ['updateContact'] } },
		options: [
			{ displayName: 'Email', name: 'email', type: 'string',
																																										placeholder: 'name@email.com', default: '', description: 'Contact email address' },
			{ displayName: 'Extension', name: 'extension', type: 'string', default: '', description: 'Contact extension' },
			{ displayName: 'Mobile', name: 'mobile', type: 'string', default: '', description: 'Contact mobile number' },
			{ displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Contact name' },
			{ displayName: 'Note', name: 'note', type: 'string', default: '', description: 'Free-text note' },
			{ displayName: 'Organization', name: 'organization', type: 'string', default: '', description: 'Contact organization' },
			{ displayName: 'Phone', name: 'phone', type: 'string', default: '', description: 'Contact phone number' },
		],
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
