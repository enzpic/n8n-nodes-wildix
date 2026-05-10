import type { INodeProperties } from 'n8n-workflow';

export const smsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['sms'] } },
		options: [
			{
				name: 'Send',
				value: 'send',
				action: 'Send an SMS',
				description: 'Send an SMS message via the PBX originate endpoint',
			},
		],
		default: 'send',
	},
];

export const smsFields: INodeProperties[] = [
	{
		displayName: 'To',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+15551234567',
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		description: 'Destination phone number in E.164 format. Multiple numbers can be separated by commas.',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		typeOptions: { rows: 3 },
		required: true,
		default: '',
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		description: 'Text content of the SMS message',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['sms'], operation: ['send'] } },
		options: [
			{
				displayName: 'Extension',
				name: 'extension',
				type: 'string',
				default: '',
				placeholder: '1001',
				description: 'Internal extension to originate the SMS from',
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
				placeholder: '+15551234567',
				description: 'Sender phone number or ID to show as the SMS origin',
			},
			{
				displayName: 'Media URLs',
				name: 'media',
				type: 'string',
				default: '',
				placeholder: 'https://example.com/image.jpg',
				description: 'Comma-separated list of media attachment URLs (MMS)',
			},
			{
				displayName: 'Sender Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Display name of the sender',
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				placeholder: '1001',
				description: 'User extension sending the SMS (alternative to Extension)',
			},
		],
	},
];
