import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['contact'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a contact', description: 'Create a new contact' },
			{ name: 'Delete', value: 'delete', action: 'Delete a contact', description: 'Delete a contact by ID' },
			{ name: 'Get', value: 'get', action: 'Get a contact', description: 'Return a single contact by ID' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many contacts', description: 'Return a list of contacts' },
			{ name: 'Update', value: 'update', action: 'Update a contact', description: 'Update a contact by ID' },
		],
		default: 'getMany',
	},
];

export const contactFields: INodeProperties[] = [
	// ── Shared: contact ID ────────────────────────────────────────────────────
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['contact'], operation: ['get', 'update', 'delete'] } },
		description: 'ID of the contact',
	},

	// ── Get Many ──────────────────────────────────────────────────────────────
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['contact'], operation: ['getMany'] } },
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		displayOptions: { show: { resource: ['contact'], operation: ['getMany'], returnAll: [false] } },
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['contact'], operation: ['getMany'] } },
		options: [
			{ displayName: 'Fields', name: 'fields', type: 'string', default: '', description: 'Comma-separated list of fields to return' },
			{ displayName: 'Phonebook ID', name: 'phonebook_id', type: 'string', default: '', description: 'Filter by phonebook ID' },
			{ displayName: 'Search', name: 'search', type: 'string', default: '', description: 'Search by name, email, extension, phone, fax, mobile, or organization' },
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
		displayOptions: { show: { resource: ['contact'], operation: ['create'] } },
		description: 'Full name of the contact',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['contact'], operation: ['create'] } },
		options: [
			{ displayName: 'Address', name: 'address', type: 'string', default: '', description: 'Street address' },
			{ displayName: 'Country', name: 'country', type: 'string', default: '', description: 'Country code' },
			{ displayName: 'Email', name: 'email', type: 'string', default: '', placeholder: 'name@email.com', description: 'Email address' },
			{ displayName: 'Extension', name: 'extension', type: 'string', default: '', description: 'Internal extension' },
			{ displayName: 'Fax', name: 'fax', type: 'string', default: '', description: 'Fax number' },
			{ displayName: 'Mobile', name: 'mobile', type: 'string', default: '', description: 'Mobile number' },
			{ displayName: 'Note', name: 'note', type: 'string', default: '', description: 'Additional notes' },
			{ displayName: 'Office', name: 'office', type: 'string', default: '', description: 'Office phone number' },
			{ displayName: 'Organization', name: 'organization', type: 'string', default: '', description: 'Organization name' },
			{ displayName: 'Phone', name: 'phone', type: 'string', default: '', description: 'Phone number' },
			{ displayName: 'Phonebook ID', name: 'phonebook_id', type: 'string', default: '', description: 'ID of the phonebook to add contact to' },
		],
	},

	// ── Update ────────────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['contact'], operation: ['update'] } },
		options: [
			{ displayName: 'Address', name: 'address', type: 'string', default: '', description: 'Street address' },
			{ displayName: 'Email', name: 'email', type: 'string', default: '', placeholder: 'name@email.com', description: 'Email address' },
			{ displayName: 'Extension', name: 'extension', type: 'string', default: '', description: 'Internal extension' },
			{ displayName: 'Fax', name: 'fax', type: 'string', default: '', description: 'Fax number' },
			{ displayName: 'Mobile', name: 'mobile', type: 'string', default: '', description: 'Mobile number' },
			{ displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Full name' },
			{ displayName: 'Note', name: 'note', type: 'string', default: '', description: 'Additional notes' },
			{ displayName: 'Office', name: 'office', type: 'string', default: '', description: 'Office phone number' },
			{ displayName: 'Organization', name: 'organization', type: 'string', default: '', description: 'Organization name' },
			{ displayName: 'Phone', name: 'phone', type: 'string', default: '', description: 'Phone number' },
		],
	},
];
