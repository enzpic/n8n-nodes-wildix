import { createHmac } from 'node:crypto';

import type {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class WildixTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wildix Trigger',
		name: 'wildixTrigger',
		icon: 'file:wildix.svg',
		group: ['trigger'],
		version: 1,
		description: 'Receive real-time call events from Wildix via webhooks',
		subtitle: '={{$parameter["events"].join(", ")}}',
		usableAsTool: true,
		defaults: { name: 'Wildix Trigger' },
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'wildix',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: ['call:live:progress'],
				description: 'Which Wildix call events to listen for',
				options: [
					{
						name: 'Call Completed',
						value: 'call:live:completed',
						description: 'Fires when a call ends normally',
					},
					{
						name: 'Call Interrupted',
						value: 'call:live:interrupted',
						description: 'Fires when a call ends due to an error',
					},
					{
						name: 'Call Started / Updated',
						value: 'call:live:progress',
						description: 'Fires when a call starts or its state changes',
					},
					{
						name: 'Call Transcription',
						value: 'call:live:transcription',
						description: 'Fires when a call transcription segment is available',
					},
				],
			},
			{
				displayName: 'Webhook Secret',
				name: 'secret',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description:
					'Secret used to verify HMAC-SHA256 signatures on incoming webhooks (X-Wildix-Signature header). Leave empty to skip verification.',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const res = this.getResponseObject();
		const body = this.getBodyData() as IDataObject;
		const secret = this.getNodeParameter('secret', '') as string;
		const events = this.getNodeParameter('events', []) as string[];

		if (secret) {
			const incomingSignature = (req.headers['x-wildix-signature'] as string | undefined) ?? '';
			const expectedSignature = createHmac('sha256', secret)
				.update(JSON.stringify(body))
				.digest('hex');

			if (incomingSignature !== expectedSignature) {
				res.status(401).send('Invalid signature');
				return { noWebhookResponse: true };
			}
		}

		const eventType = (body.eventType as string | undefined) ?? '';
		if (events.length > 0 && !events.includes(eventType)) {
			res.status(200).send('Event ignored');
			return { noWebhookResponse: true };
		}

		return {
			workflowData: [this.helpers.returnJsonArray([body])],
		};
	}
}
