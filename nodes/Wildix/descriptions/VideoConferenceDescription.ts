import type { INodeProperties } from 'n8n-workflow';

export const videoConferenceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['videoConference'] } },
		options: [
			{ name: 'Create Room', value: 'createRoom', action: 'Create a video conference room', description: 'Create a new video conference room' },
			{ name: 'Delete Room', value: 'deleteRoom', action: 'Delete a video conference room', description: 'Delete a video conference room by ID' },
			{ name: 'Get Rooms', value: 'getRooms', action: 'Get video conference rooms', description: 'Return the rooms in which the user is a participant' },
			{ name: 'Invite', value: 'invite', action: 'Invite to a video conference room', description: 'Invite a participant to a video conference room' },
			{ name: 'Update Room', value: 'updateRoom', action: 'Update a video conference room', description: 'Update a video conference room by ID' },
		],
		default: 'getRooms',
	},
];

export const videoConferenceFields: INodeProperties[] = [
	// ── Shared: room ID ───────────────────────────────────────────────────────
	{
		displayName: 'Room ID',
		name: 'roomId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['videoConference'], operation: ['updateRoom', 'deleteRoom', 'invite'] } },
		description: 'ID of the video conference room',
	},

	// ── Create Room ───────────────────────────────────────────────────────────
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['videoConference'], operation: ['createRoom'] } },
		description: 'Subject/title of the room',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['videoConference'], operation: ['createRoom'] } },
		options: [
			{ displayName: 'Password', name: 'password', type: 'string', typeOptions: { password: true }, default: '', description: 'Room password' },
			{ displayName: 'Schedule (JSON)', name: 'schedule', type: 'json', default: '{}', description: 'Schedule object with start, end, recurrence, timezone, and other fields' },
			{ displayName: 'Participants (JSON)', name: 'participants', type: 'json', default: '[]', description: 'Array of participant objects with type, name, jid, email, phone, extension' },
		],
	},

	// ── Update Room ───────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['videoConference'], operation: ['updateRoom'] } },
		options: [
			{ displayName: 'Subject', name: 'subject', type: 'string', default: '', description: 'Room subject/title' },
			{ displayName: 'Password', name: 'password', type: 'string', typeOptions: { password: true }, default: '', description: 'Room password' },
			{ displayName: 'Schedule (JSON)', name: 'schedule', type: 'json', default: '{}', description: 'Schedule object' },
			{ displayName: 'Participants (JSON)', name: 'participants', type: 'json', default: '[]', description: 'Array of participant objects' },
		],
	},

	// ── Invite ────────────────────────────────────────────────────────────────
	{
		displayName: 'Participants (JSON)',
		name: 'participants',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: { show: { resource: ['videoConference'], operation: ['invite'] } },
		description: 'Array of participant objects to invite (type, name, jid, email, phone, extension)',
	},
];
