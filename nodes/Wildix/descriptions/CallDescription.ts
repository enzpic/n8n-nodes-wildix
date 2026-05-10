import type { INodeProperties } from 'n8n-workflow';

export const callOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['call'] } },
		options: [
			{
				name: 'Answer',
				value: 'answer',
				action: 'Answer a call',
				description: 'Answer an incoming call',
			},
			{
				name: 'Attendant Transfer',
				value: 'attendantTransfer',
				action: 'Attendant transfer a call',
				description: 'Transfer a call with consultation (attended transfer)',
			},
			{
				name: 'Blind Transfer',
				value: 'blindTransfer',
				action: 'Blind transfer a call',
				description: 'Transfer a call without consultation',
			},
			{
				name: 'Hang Up',
				value: 'hangup',
				action: 'Hang up a call',
				description: 'Terminate an active call',
			},
			{
				name: 'Hold',
				value: 'hold',
				action: 'Hold a call',
				description: 'Place an active call on hold',
			},
			{
				name: 'List Active Calls',
				value: 'listActive',
				action: 'List active calls',
				description: 'List all active calls for a user',
			},
			{
				name: 'Make Call',
				value: 'makeCall',
				action: 'Make a call',
				description: 'Initiate a call from a specific device to a destination',
			},
			{
				name: 'Originate',
				value: 'originate',
				action: 'Originate a call',
				description: 'Quick click-to-call: dial a number on behalf of a user',
			},
			{
				name: 'Originate (Advanced)',
				value: 'originateAdvanced',
				action: 'Originate a call advanced',
				description: 'Full AMI-style originate with channel, context, caller ID and more',
			},
			{
				name: 'Send DTMF',
				value: 'dtmf',
				action: 'Send DTMF',
				description: 'Send DTMF tones during a call',
			},
			{
				name: 'Set Active Device',
				value: 'setActiveDevice',
				action: 'Set active device',
				description: 'Set the active device for call control',
			},
			{
				name: 'Unhold',
				value: 'unhold',
				action: 'Unhold a call',
				description: 'Resume a call that is on hold',
			},
			{
				name: 'Update Contact Info',
				value: 'updateContactInfo',
				action: 'Update contact info',
				description: 'Update the caller name and phone number shown during an active call',
			},
		],
		default: 'originate',
	},
];

export const callFields: INodeProperties[] = [
	// ── Originate (simple) ─────────────────────────────────────────────────────
	{
		displayName: 'Caller Name / Extension',
		name: 'callerName',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: { show: { resource: ['call'], operation: ['originate'] } },
		description: 'Extension or display name to place the call from',
	},
	{
		displayName: 'Destination Number',
		name: 'destinationNumber',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+15551234567',
		displayOptions: { show: { resource: ['call'], operation: ['originate'] } },
		description: 'Phone number or extension to call',
	},
	{
		displayName: 'Additional Fields',
		name: 'originateAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['call'], operation: ['originate'] } },
		options: [
			{
				displayName: 'Postpone',
				name: 'postpone',
				type: 'boolean',
				default: false,
				description: 'Whether to postpone the call until the user is available',
			},
		],
	},

	// ── Originate (advanced / AMI) ─────────────────────────────────────────────
	{
		displayName: 'Channel',
		name: 'channel',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'SIP/john or Local/1001@default',
		displayOptions: { show: { resource: ['call'], operation: ['originateAdvanced'] } },
		description: 'Asterisk channel to originate the call from',
	},
	{
		displayName: 'Additional Fields',
		name: 'originateAdvancedFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['call'], operation: ['originateAdvanced'] } },
		options: [
			{
				displayName: 'Account',
				name: 'account',
				type: 'string',
				default: '',
				description: 'Account code for the call',
			},
			{
				displayName: 'Action ID',
				name: 'actionid',
				type: 'string',
				default: '',
				description: 'Unique identifier for this originate action',
			},
			{
				displayName: 'Application',
				name: 'application',
				type: 'string',
				default: '',
				description: 'Asterisk application to run instead of routing through dialplan (e.g. Playback)',
			},
			{
				displayName: 'Application Data',
				name: 'data',
				type: 'string',
				default: '',
				description: 'Data to pass to the application',
			},
			{
				displayName: 'Async',
				name: 'async',
				type: 'boolean',
				default: false,
				description: 'Whether to originate asynchronously (returns immediately without waiting for answer)',
			},
			{
				displayName: 'Caller ID',
				name: 'callerid',
				type: 'string',
				default: '',
				placeholder: 'John Doe <1001>',
				description: 'Caller ID to present to the called party',
			},
			{
				displayName: 'Context',
				name: 'context',
				type: 'string',
				default: '',
				description: 'Dialplan context to route the answered call into',
			},
			{
				displayName: 'Extension',
				name: 'exten',
				type: 'string',
				default: '',
				description: 'Dialplan extension to route the answered call to',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 1,
				description: 'Dialplan priority',
			},
			{
				displayName: 'Timeout (Ms)',
				name: 'timeout',
				type: 'number',
				default: 30000,
				description: 'Milliseconds to wait for the channel to answer before giving up',
			},
			{
				displayName: 'Variable',
				name: 'variable',
				type: 'string',
				default: '',
				placeholder: 'KEY=value',
				description: 'Channel variable to set (KEY=value format)',
			},
		],
	},

	// ── Shared: user (all call-control operations) ─────────────────────────────
	{
		displayName: 'User',
		name: 'user',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['answer', 'hangup', 'hold', 'unhold', 'blindTransfer', 'attendantTransfer', 'dtmf', 'listActive', 'makeCall', 'updateContactInfo'],
			},
		},
		description: 'Extension number of the user performing the action (e.g. 1001)',
	},

	// ── Shared: SIP Call ID ────────────────────────────────────────────────────
	{
		displayName: 'SIP Call ID',
		name: 'sipCallId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['answer', 'hangup', 'hold', 'unhold', 'blindTransfer', 'attendantTransfer', 'dtmf', 'updateContactInfo'],
			},
		},
		description: 'SIP Call ID of the call to act on (from event data or list-calls)',
	},

	// ── Blind Transfer / Attendant Transfer ───────────────────────────────────
	{
		displayName: 'Destination',
		name: 'destination',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1002',
		displayOptions: { show: { resource: ['call'], operation: ['blindTransfer', 'attendantTransfer'] } },
		description: 'Extension or number to transfer the call to',
	},

	// ── Make Call ─────────────────────────────────────────────────────────────
	{
		displayName: 'Destination',
		name: 'makeCallDestination',
		type: 'string',
		required: true,
		default: '',
		placeholder: '+15551234567',
		displayOptions: { show: { resource: ['call'], operation: ['makeCall'] } },
		description: 'Phone number or extension to call',
	},
	{
		displayName: 'Additional Fields',
		name: 'makeCallAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['call'], operation: ['makeCall'] } },
		options: [
			{
				displayName: 'Device',
				name: 'device',
				type: 'string',
				default: '',
				placeholder: 'WP820-AABBCCDDEE',
				description: 'Device identifier to originate the call from (default device used if omitted)',
			},
		],
	},

	// ── Answer: optional device ────────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'answerAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['call'], operation: ['answer'] } },
		options: [
			{
				displayName: 'Device',
				name: 'device',
				type: 'string',
				default: '',
				description: 'Device to answer the call on (default device used if omitted)',
			},
		],
	},

	// ── Hangup: optional reason ────────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'hangupAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['call'], operation: ['hangup'] } },
		options: [
			{
				displayName: 'Reason',
				name: 'reason',
				type: 'string',
				default: '',
				description: 'Reason for hanging up the call',
			},
		],
	},

	// ── Update Contact Info ───────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateContactInfoFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['call'], operation: ['updateContactInfo'] } },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Contact name to display during the call',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Phone number to display during the call',
			},
		],
	},

	// ── Send DTMF ──────────────────────────────────────────────────────────────
	{
		displayName: 'DTMF Digits',
		name: 'digits',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1',
		displayOptions: { show: { resource: ['call'], operation: ['dtmf'] } },
		description: 'DTMF tone(s) to send (0–9, *, #)',
	},

	// ── Set Active Device ──────────────────────────────────────────────────────
	{
		displayName: 'User',
		name: 'user',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: { show: { resource: ['call'], operation: ['setActiveDevice'] } },
		description: 'Extension of the user to set the active device for',
	},
	{
		displayName: 'Device ID',
		name: 'deviceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['call'], operation: ['setActiveDevice'] } },
		description: 'ID of the device to set as active',
	},
];
