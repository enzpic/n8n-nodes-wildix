import type { INodeProperties } from 'n8n-workflow';

export const soundOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['sound'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a sound', description: 'Upload a new sound file' },
			{ name: 'Create Directory', value: 'createDirectory', action: 'Create a sound directory', description: 'Create a new sound directory' },
			{ name: 'Delete', value: 'delete', action: 'Delete a sound', description: 'Delete a sound file by name' },
			{ name: 'Delete Directory', value: 'deleteDirectory', action: 'Delete a sound directory', description: 'Delete a sound directory by path' },
			{ name: 'Get Directory Contents', value: 'getDirectories', action: 'Get contents of a sound directory', description: 'Return the sound files inside a specific directory' },
			{ name: 'Get Many', value: 'getMany', action: 'Get many sounds', description: 'Return a list of sound files' },
			{ name: 'Update', value: 'update', action: 'Update a sound', description: 'Update a sound file by name' },
			{ name: 'Update Directory', value: 'updateDirectory', action: 'Update a sound directory', description: 'Rename or move a sound directory' },
		],
		default: 'getMany',
	},
];

export const soundFields: INodeProperties[] = [
	// ── Shared: sound name ────────────────────────────────────────────────────
	{
		displayName: 'Sound Name',
		name: 'soundName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['sound'], operation: ['update', 'delete'] } },
		description: 'Name of the sound file',
	},

	// ── Get Many ──────────────────────────────────────────────────────────────
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['sound'], operation: ['getMany'] } },
		options: [
			{ displayName: 'Directory', name: 'directory', type: 'string', default: '', description: 'Filter sounds by directory path (e.g. MusicOnHold). Leave empty to list all including directory entries (isDir: true).' },
		],
	},

	// ── Get Directory Contents ─────────────────────────────────────────────
	{
		displayName: 'Directory',
		name: 'directory',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'MusicOnHold',
		displayOptions: { show: { resource: ['sound'], operation: ['getDirectories'] } },
		description: 'Name of the directory to list sound files from (e.g. MusicOnHold, custom)',
	},

	// ── Create ────────────────────────────────────────────────────────────────
	{
		displayName: 'Sound Name',
		name: 'soundName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['sound'], operation: ['create'] } },
		description: 'Name to save the sound file as',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: { show: { resource: ['sound'], operation: ['create', 'update'] } },
		description: 'Name of the binary property containing the audio file',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['sound'], operation: ['create'] } },
		options: [
			{ displayName: 'Directory', name: 'directory', type: 'string', default: '', description: 'Directory to store the sound in' },
		],
	},

	// ── Create Directory ───────────────────────────────────────────────────────
	{
		displayName: 'Path',
		name: 'directoryPath',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'testDir',
		displayOptions: { show: { resource: ['sound'], operation: ['createDirectory'] } },
		description: 'Path of the new directory',
	},

	// ── Update / Delete Directory ──────────────────────────────────────────────
	{
		displayName: 'Directory Path',
		name: 'existingDirectoryPath',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'testDir',
		displayOptions: { show: { resource: ['sound'], operation: ['updateDirectory', 'deleteDirectory'] } },
		description: 'Path of the directory to edit or delete',
	},
	{
		displayName: 'Update Fields',
		name: 'directoryUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['sound'], operation: ['updateDirectory'] } },
		options: [
			{ displayName: 'Name', name: 'name', type: 'string', default: '', description: 'New directory name' },
			{ displayName: 'Move', name: 'move', type: 'string', default: '', description: 'New directory location' },
		],
	},
];
