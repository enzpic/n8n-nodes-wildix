import type { INodeProperties } from 'n8n-workflow';

export const pbxSystemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['pbxSystem'] } },
		options: [
			{ name: 'Get Candidates', value: 'getCandidates', action: 'Get PBX candidates', description: 'Return the list of PBX network candidates' },
			{ name: 'Get Ports Status', value: 'getPorts', action: 'Get PBX port status', description: 'Return the status of PBX ports' },
			{ name: 'Get Version', value: 'getVersion', action: 'Get PBX version', description: 'Return the PBX firmware version' },
			{ name: 'Ping', value: 'ping', action: 'Ping the PBX', description: 'Check PBX connectivity' },
			{ name: 'Reboot', value: 'reboot', action: 'Reboot the PBX', description: 'Trigger a PBX system reboot' },
		],
		default: 'ping',
	},
];

export const pbxSystemFields: INodeProperties[] = [];
