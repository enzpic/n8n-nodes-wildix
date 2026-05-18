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
			displayName:
				'In WMS → Settings → PBX → Integrations → Applications → OAuth 2.0, create an application and copy its values into the fields below:<br>• <b>Client ID</b> ← <b>Application ID</b> from WMS<br>• <b>Client Secret</b> ← <b>Secret key</b> from WMS<br>• Paste the <b>OAuth Redirect URL</b> shown below into the application\'s <b>Redirect URI</b> list in WMS.',
			name: 'setupNotice',
			type: 'notice',
			default: '',
		},
		{
			displayName: 'PBX Subdomain',
			name: 'pbxSubdomain',
			type: 'string',
			default: '',
			placeholder: 'company.wildixin.com',
			description: 'Your PBX hostname without protocol, e.g. <code>company.wildixin.com</code>.',
			required: true,
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description:
				'Paste the <b>Application ID</b> from your WMS OAuth 2.0 application here.',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Paste the <b>Secret key</b> from your WMS OAuth 2.0 application here.',
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
			default: '={{ "https://" + $self["pbxSubdomain"] + "/authorization/oauth2" }}',
			required: true,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: '={{ "https://" + $self["pbxSubdomain"] + "/authorization/oauth2Token" }}',
			required: true,
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			// Wildix's /authorization/oauth2Token reads client_id / client_secret from the
			// POST body — using the default 'header' (HTTP Basic) yields
			// {"error":"invalid_client","error_description":"Empty client ID"}.
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];
}
