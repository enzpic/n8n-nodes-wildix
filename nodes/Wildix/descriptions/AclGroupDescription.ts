import type { INodeProperties } from 'n8n-workflow';

export const aclGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['aclGroup'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an ACL group',
				description: 'Create a new ACL group on the PBX',
			},
			{
				name: 'Create Rule',
				value: 'createRule',
				action: 'Create an ACL group rule',
				description: 'Create a new ACL group rule',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an ACL group',
				description: 'Delete an ACL group by ID',
			},
			{
				name: 'Delete Rule',
				value: 'deleteRule',
				action: 'Delete an ACL group rule',
				description: 'Delete an ACL group rule by ID',
			},
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many ACL groups',
				description: 'Return the list of ACL groups',
			},
			{
				name: 'Get Permissions',
				value: 'getPermissions',
				action: 'Get ACL group permissions',
				description: 'Retrieve the permissions for an ACL group',
			},
			{
				name: 'Get Rules',
				value: 'getRules',
				action: 'Get ACL group rules',
				description: 'Return the list of ACL group rules',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update an ACL group',
				description: 'Update an existing ACL group by ID',
			},
			{
				name: 'Update Rule',
				value: 'updateRule',
				action: 'Update an ACL group rule',
				description: 'Update an ACL group rule by ID',
			},
		],
		default: 'getMany',
	},
];

export const aclGroupFields: INodeProperties[] = [
	// ── Shared: group ID ───────────────────────────────────────────────────────
	{
		displayName: 'ACL Group ID',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['aclGroup'], operation: ['update', 'delete', 'getRules', 'createRule', 'updateRule', 'deleteRule'] } },
		description: 'ID of the ACL group',
	},

	// ── Shared: rule ID ────────────────────────────────────────────────────────
	{
		displayName: 'Rule ID',
		name: 'ruleId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['aclGroup'], operation: ['updateRule', 'deleteRule'] } },
		description: 'ID of the ACL group rule',
	},

	// ── Create ─────────────────────────────────────────────────────────────────
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['aclGroup'], operation: ['create'] } },
		description: 'Name for the new ACL group',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['aclGroup'], operation: ['create'] } },
		options: [
			{
				displayName: 'Inherits',
				name: 'inherits',
				type: 'string',
				default: '',
				description: 'DN of the ACL group this group inherits permissions from',
			},
			{
				displayName: 'WCGRP',
				name: 'wcgrp',
				type: 'string',
				default: '',
				description: 'Wildcard group identifier',
			},
		],
	},

	// ── Update ─────────────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['aclGroup'], operation: ['update'] } },
		options: [
			{ displayName: 'Name', name: 'name', type: 'string', default: '', description: 'ACL group name' },
			{ displayName: 'Inherits', name: 'inherits', type: 'string', default: '', description: 'DN of the parent ACL group' },
		],
	},

	// ── Create Rule ────────────────────────────────────────────────────────────
	{
		displayName: 'Rule (JSON)',
		name: 'rule',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['aclGroup'], operation: ['createRule'] } },
		description: 'ACL rule object as JSON',
	},

	// ── Update Rule ────────────────────────────────────────────────────────────
	{
		displayName: 'Rule (JSON)',
		name: 'rule',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['aclGroup'], operation: ['updateRule'] } },
		description: 'Updated ACL rule object as JSON',
	},
];
