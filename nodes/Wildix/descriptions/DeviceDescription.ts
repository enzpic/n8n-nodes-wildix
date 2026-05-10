import type { INodeProperties } from 'n8n-workflow';

export const deviceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['device'] } },
		options: [
			{
				name: 'Add',
				value: 'add',
				action: 'Add devices',
				description: 'Add one or more devices to the PBX by MAC address',
			},
			{
				name: 'Connect',
				value: 'connect',
				action: 'Connect a device',
				description: 'Connect a device to a user extension',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a device',
				description: 'Remove a device from the PBX',
			},
			{
				name: 'Disconnect',
				value: 'disconnect',
				action: 'Disconnect a device',
				description: 'Disconnect a device from the PBX',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many devices',
				description: 'Retrieve many provisioned devices on the PBX',
			},
			{
				name: 'List User Devices',
				value: 'listUserDevices',
				action: 'List user devices',
				description: 'Retrieve all call-control devices registered to a user',
			},
			{
				name: 'Reset Token',
				value: 'resetToken',
				action: 'Reset device token',
				description: 'Reset the provisioning token for a device',
			},
			{
				name: 'Scan',
				value: 'scan',
				action: 'Scan devices',
				description: 'Scan an IP address or range for discoverable devices',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a device',
				description: 'Update device settings',
			},
			{
				name: 'Verify',
				value: 'verify',
				action: 'Verify devices',
				description: 'Verify device provisioning status',
			},
		],
		default: 'getAll',
	},
];

export const deviceFields: INodeProperties[] = [
	// ── Shared: MAC address ────────────────────────────────────────────────────
	{
		displayName: 'MAC Address',
		name: 'mac',
		type: 'string',
		required: true,
		default: '',
		placeholder: '9c75145003fa',
		displayOptions: {
			show: { resource: ['device'], operation: ['delete', 'update', 'connect', 'disconnect'] },
		},
		description: 'MAC address of the device (hex string, e.g. 9c75145003fa)',
	},

	// ── Get All ────────────────────────────────────────────────────────────────
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: ['device'], operation: ['getAll'] } },
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 50,
		displayOptions: {
			show: { resource: ['device'], operation: ['getAll'], returnAll: [false] },
		},
		description: 'Max number of results to return',
	},

	// ── List User Devices ──────────────────────────────────────────────────────
	{
		displayName: 'User',
		name: 'user',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: { show: { resource: ['device'], operation: ['listUserDevices'] } },
		description: 'Extension number of the user whose call-control devices to list',
	},

	// ── Add ────────────────────────────────────────────────────────────────────
	{
		displayName: 'MAC Addresses',
		name: 'macs',
		type: 'string',
		required: true,
		default: '',
		placeholder: '9c75145003fa, 9c7514073406',
		displayOptions: { show: { resource: ['device'], operation: ['add'] } },
		description: 'Comma-separated list of MAC addresses to add',
	},

	// ── Update ─────────────────────────────────────────────────────────────────
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['device'], operation: ['update'] } },
		options: [
			{
				displayName: 'Alternate Port',
				name: 'alternatePort',
				type: 'string',
				default: '',
				description: 'Alternate SIP port for the device',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Human-readable label for the device',
			},
			{
				displayName: 'Provision',
				name: 'provision',
				type: 'boolean',
				default: true,
				description: 'Whether the device should be auto-provisioned',
			},
		],
	},

	// ── Scan ───────────────────────────────────────────────────────────────────
	{
		displayName: 'IP Address / Range',
		name: 'range',
		type: 'string',
		required: true,
		default: '',
		placeholder: '192.168.1.1',
		displayOptions: { show: { resource: ['device'], operation: ['scan'] } },
		description: 'IP address to scan for discoverable Wildix devices',
	},

	// ── Verify ─────────────────────────────────────────────────────────────────
	{
		displayName: 'Additional Fields',
		name: 'verifyAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['device'], operation: ['verify'] } },
		options: [
			{
				displayName: 'MAC Address',
				name: 'mac',
				type: 'string',
				default: '',
				placeholder: '9c75145003fa',
				description: 'Filter by specific device MAC address',
			},
		],
	},

	// ── Connect ────────────────────────────────────────────────────────────────
	{
		displayName: 'Extension',
		name: 'extension',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1001',
		displayOptions: { show: { resource: ['device'], operation: ['connect'] } },
		description: 'Extension number to connect the device to',
	},

	// ── Reset Token ────────────────────────────────────────────────────────────
	{
		displayName: 'MAC Address',
		name: 'resetMac',
		type: 'string',
		required: true,
		default: '',
		placeholder: '9c75145003fa',
		displayOptions: { show: { resource: ['device'], operation: ['resetToken'] } },
		description: 'MAC address of the device to reset the token for',
	},
];
