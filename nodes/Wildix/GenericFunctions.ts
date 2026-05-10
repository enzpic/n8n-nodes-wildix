import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

type CredentialType = 'wildixOAuth2Api' | 'wildixBearerApi';

export async function wildixApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT',
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	credentialType: CredentialType = 'wildixOAuth2Api',
): Promise<IDataObject> {
	const credentials = await this.getCredentials(credentialType);

	const options: IHttpRequestOptions = {
		method,
		url: `https://${credentials.pbxSubdomain}${endpoint}`,
		qs,
		headers: { 'Content-Type': 'application/json' },
		json: true,
	};

	if (Object.keys(body).length) {
		options.body = body;
	}

	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function wildixApiFormRequest(
	this: IExecuteFunctions,
	method: 'POST' | 'PUT',
	endpoint: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formData: Record<string, any>,
	credentialType: CredentialType = 'wildixOAuth2Api',
): Promise<IDataObject> {
	const credentials = await this.getCredentials(credentialType);
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(formData)) {
		params.append(key, String(value));
	}
	const options: IHttpRequestOptions = {
		method,
		url: `https://${credentials.pbxSubdomain}${endpoint}`,
		body: params.toString() as unknown as IDataObject,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		json: true,
	};
	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function wildixApiUpload(
	this: IExecuteFunctions,
	endpoint: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formData: Record<string, any>,
	credentialType: CredentialType = 'wildixOAuth2Api',
): Promise<IDataObject> {
	const credentials = await this.getCredentials(credentialType);
	const form = new FormData();
	for (const [key, value] of Object.entries(formData)) {
		if (Buffer.isBuffer(value)) {
			form.append(key, new Blob([value]));
		} else {
			form.append(key, String(value));
		}
	}
	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `https://${credentials.pbxSubdomain}${endpoint}`,
		body: form as unknown as IDataObject,
		json: true,
	};
	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, credentialType, options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

export async function wildixApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	endpoint: string,
	qs: IDataObject = {},
	credentialType: CredentialType = 'wildixOAuth2Api',
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	const limit = 100;
	let offset = 0;

	while (true) {
		const response = await wildixApiRequest.call(this, 'GET', endpoint, {}, {
			...qs,
			count: limit,
			start: offset,
		}, credentialType);
		const resultData = response.result;
		const items: IDataObject[] = Array.isArray(resultData)
			? (resultData as IDataObject[])
			: (((resultData as IDataObject)?.records as IDataObject[]) ?? []);
		returnData.push(...items);
		if (items.length < limit) break;
		offset += limit;
	}

	return returnData;
}


