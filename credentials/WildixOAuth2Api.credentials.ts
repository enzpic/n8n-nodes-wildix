import type { ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';

export class WildixOAuth2Api implements ICredentialType {
	name = 'wildixOAuth2Api';
	extends = ['oAuth2Api'];
	displayName = 'Wildix OAuth2 API';
	icon = 'file:wildix.svg' as const;
	documentationUrl = 'https://docs.wildix.com/wms/index.html#section/Authentication';

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
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			default: '={{ "https://" + $self["pbxSubdomain"] + "/auth/oauth2/authorize" }}',
			required: true,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: '={{ "https://" + $self["pbxSubdomain"] + "/auth/oauth2/token" }}',
			required: true,
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
	];
}
