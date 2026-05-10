import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class WildixBearerApi implements ICredentialType {
	name = 'wildixBearerApi';
	displayName = 'Wildix Bearer Token API';
	icon = 'file:wildix.svg' as const;
	documentationUrl = 'https://docs.wildix.com/wms/index.html#section/Authentication';

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://{{$credentials.pbxSubdomain}}',
			url: '/api/v1/personal/info',
		},
	};

	properties: INodeProperties[] = [
		{
			displayName: 'PBX Subdomain',
			name: 'pbxSubdomain',
			type: 'string',
			default: '',
			placeholder: 'company.wildixin.com',
			required: true,
		},
		{
			displayName: 'Bearer Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];
}
