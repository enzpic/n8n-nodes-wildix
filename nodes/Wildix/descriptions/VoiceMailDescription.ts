import type { INodeProperties } from 'n8n-workflow';

export const voiceMailOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['voiceMail'] } },
		options: [
			{ name: 'Delete', value: 'delete', action: 'Delete voicemails', description: 'Delete one or more voicemail messages by ID' },
			{ name: 'Get Many', value: 'getMany', action: 'Get all voicemails', description: 'Return all voicemails from the PBX' },
			{ name: 'Mark as Read', value: 'markAsRead', action: 'Mark voicemail as read', description: 'Mark a voicemail message as read' },
		],
		default: 'getMany',
	},
];

export const voiceMailFields: INodeProperties[] = [
	// ── Mark as Read ──────────────────────────────────────────────────────────
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['voiceMail'], operation: ['markAsRead'] } },
		description: 'ID of the voicemail message to mark as read',
	},

	// ── Delete ────────────────────────────────────────────────────────────────
	{
		displayName: 'Message IDs',
		name: 'messageIds',
		type: 'string',
		required: true,
		default: '',
		placeholder: '12,13,14',
		displayOptions: { show: { resource: ['voiceMail'], operation: ['delete'] } },
		description: 'One or more voicemail message IDs to delete, separated by commas',
	},
];
