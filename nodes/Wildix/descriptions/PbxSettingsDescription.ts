import type { INodeProperties } from 'n8n-workflow';

export const pbxSettingsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['pbxSettings'] } },
		options: [
			{ name: 'Get HTTP Proxy', value: 'getHttpProxy', action: 'Get HTTP proxy settings', description: 'Return HTTP proxy settings' },
			{ name: 'Get License', value: 'getLicense', action: 'Get PBX license info', description: 'Return PBX license information' },
			{ name: 'Get NTP', value: 'getNtp', action: 'Get NTP settings', description: 'Return NTP server settings' },
			{ name: 'Get Settings', value: 'getSettings', action: 'Get PBX general settings', description: 'Return PBX general settings' },
			{ name: 'Get SMTP', value: 'getSmtp', action: 'Get SMTP settings', description: 'Return SMTP email settings' },
			{ name: 'Get SMTP Test Status', value: 'getSmtpTestStatus', action: 'Get SMTP test status', description: 'Poll the result of a previously started SMTP test' },
			{ name: 'Test SMTP', value: 'testSmtp', action: 'Test SMTP settings', description: 'Send a test email using the current SMTP settings' },
			{ name: 'Update HTTP Proxy', value: 'updateHttpProxy', action: 'Update HTTP proxy settings', description: 'Update HTTP proxy settings' },
			{ name: 'Update NTP', value: 'updateNtp', action: 'Update NTP settings', description: 'Update NTP server settings' },
			{ name: 'Update Settings', value: 'updateSettings', action: 'Update PBX general settings', description: 'Update PBX general settings' },
			{ name: 'Update SMTP', value: 'updateSmtp', action: 'Update SMTP settings', description: 'Update SMTP email settings' },
		],
		default: 'getSettings',
	},
];

export const pbxSettingsFields: INodeProperties[] = [
	// ── Update General Settings ───────────────────────────────────────────────
	{
		displayName: 'Settings (JSON)',
		name: 'settings',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['pbxSettings'], operation: ['updateSettings'] } },
		description: 'PBX settings as a JSON object',
	},

	// ── Update NTP ────────────────────────────────────────────────────────────
	{
		displayName: 'NTP Server',
		name: 'ntpServer',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'pool.ntp.org',
		displayOptions: { show: { resource: ['pbxSettings'], operation: ['updateNtp'] } },
		description: 'NTP server hostname or IP address',
	},

	// ── Update SMTP ───────────────────────────────────────────────────────────
	{
		displayName: 'SMTP Settings (JSON)',
		name: 'smtpSettings',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['pbxSettings'], operation: ['updateSmtp'] } },
		description: 'SMTP settings as a JSON object (host, port, user, password, from, ssl, auth)',
	},

	// ── Test SMTP ─────────────────────────────────────────────────────────────
	{
		displayName: 'Test Email Address',
		name: 'email',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'test@example.com',
		displayOptions: { show: { resource: ['pbxSettings'], operation: ['testSmtp'] } },
		description: 'Email address to send the test message to',
	},

	// ── Get SMTP Test Status ───────────────────────────────────────────────────
	{
		displayName: 'Test ID',
		name: 'testId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['pbxSettings'], operation: ['getSmtpTestStatus'] } },
		description: 'ID of the SMTP test returned by the Test SMTP operation',
	},

	// ── Update HTTP Proxy ─────────────────────────────────────────────────────
	{
		displayName: 'HTTP Proxy Settings (JSON)',
		name: 'proxySettings',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: ['pbxSettings'], operation: ['updateHttpProxy'] } },
		description: 'HTTP proxy settings as a JSON object (host, port, user, password)',
	},
];
