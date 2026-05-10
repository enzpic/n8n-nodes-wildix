import type { INodeProperties } from 'n8n-workflow';

export const alarmClockOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['alarmClock'] } },
		options: [
			{ name: 'Originate', value: 'originate', action: 'Originate an alarm clock call', description: 'Schedule an alarm clock call to a user' },
		],
		default: 'originate',
	},
];

export const alarmClockFields: INodeProperties[] = [
	// ── Originate ─────────────────────────────────────────────────────────────
	{
		displayName: 'Extension',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: { show: { resource: ['alarmClock'], operation: ['originate'] } },
		description: 'Extension to call for the alarm',
	},
	{
		displayName: 'Time',
		name: 'time',
		type: 'string',
		required: true,
		default: '',
		placeholder: '08:00',
		displayOptions: { show: { resource: ['alarmClock'], operation: ['originate'] } },
		description: 'Time to trigger the alarm clock call (HH:MM format)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['alarmClock'], operation: ['originate'] } },
		options: [
			{ displayName: 'Message', name: 'message', type: 'string', default: '', description: 'Message to play when the alarm is answered' },
			{ displayName: 'Repeat', name: 'repeat', type: 'boolean', default: false, description: 'Whether to repeat the alarm daily' },
		],
	},
];
