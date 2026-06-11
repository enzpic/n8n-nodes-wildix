import type { INodeProperties } from 'n8n-workflow';

export const alarmClockOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['alarmClock'] } },
		options: [
			{ name: 'Delete', value: 'delete', action: 'Delete an alarm clock', description: 'Remove a scheduled alarm clock by ID' },
			{ name: 'Get', value: 'get', action: 'Get an alarm clock', description: 'Retrieve a scheduled alarm clock by ID' },
			{ name: 'Originate', value: 'originate', action: 'Originate an alarm clock call', description: 'Schedule an alarm clock call to a user' },
		],
		default: 'originate',
	},
];

export const alarmClockFields: INodeProperties[] = [
	// ── Get / Delete ────────────────────────────────────────────────────────────
	{
		displayName: 'Alarm Clock ID',
		name: 'alarmClockId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['alarmClock'], operation: ['get', 'delete'] } },
		description: 'ID of the alarm clock',
	},

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
