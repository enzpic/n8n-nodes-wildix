import type { INodeProperties } from 'n8n-workflow';

export const voiceMailOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['voiceMail'] } },
		options: [
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
];
