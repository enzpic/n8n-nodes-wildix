import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

import { aclGroupFields, aclGroupOperations } from './descriptions/AclGroupDescription';
import { alarmClockFields, alarmClockOperations } from './descriptions/AlarmClockDescription';
import { applicationFields, applicationOperations } from './descriptions/ApplicationDescription';
import { broadcastFields, broadcastOperations } from './descriptions/BroadcastDescription';
import { callFields, callOperations } from './descriptions/CallDescription';
import { callHistoryFields, callHistoryOperations } from './descriptions/CallHistoryDescription';
import { callQueueFields, callQueueOperations } from './descriptions/CallQueueDescription';
import { colleagueFields, colleagueOperations } from './descriptions/ColleagueDescription';
import { contactFields, contactOperations } from './descriptions/ContactDescription';
import { departmentFields, departmentOperations } from './descriptions/DepartmentDescription';
import { deviceFields, deviceOperations } from './descriptions/DeviceDescription';
import { dialplanFields, dialplanOperations } from './descriptions/DialplanDescription';
import { faxFields, faxOperations } from './descriptions/FaxDescription';
import { groupFields, groupOperations } from './descriptions/GroupDescription';
import { notificationFields, notificationOperations } from './descriptions/NotificationDescription';
import { oauth2ClientFields, oauth2ClientOperations } from './descriptions/Oauth2ClientDescription';
import { pbxFields, pbxOperations } from './descriptions/PbxDescription';
import { pbxSettingsFields, pbxSettingsOperations } from './descriptions/PbxSettingsDescription';
import { pbxSystemFields, pbxSystemOperations } from './descriptions/PbxSystemDescription';
import { pbxUpgradeFields, pbxUpgradeOperations } from './descriptions/PbxUpgradeDescription';
import { personalFields, personalOperations } from './descriptions/PersonalDescription';
import { phonebookFields, phonebookOperations } from './descriptions/PhonebookDescription';
import { recordingFields, recordingOperations } from './descriptions/RecordingDescription';
import { sipRegistrationFields, sipRegistrationOperations } from './descriptions/SipRegistrationDescription';
import { smsFields, smsOperations } from './descriptions/SmsDescription';
import { soundFields, soundOperations } from './descriptions/SoundDescription';
import { trustedIpFields, trustedIpOperations } from './descriptions/TrustedIpDescription';
import { trunkFields, trunkOperations } from './descriptions/TrunkDescription';
import { videoConferenceFields, videoConferenceOperations } from './descriptions/VideoConferenceDescription';
import { voiceMailFields, voiceMailOperations } from './descriptions/VoiceMailDescription';
import { wildixApiFormRequest, wildixApiRequest, wildixApiRequestAllItems, wildixApiUpload } from './GenericFunctions';

export class Wildix implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Wildix',
		name: 'wildix',
		icon: 'file:wildix.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with Wildix UCaaS platform',
		usableAsTool: true,
		defaults: { name: 'Wildix' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'wildixOAuth2Api',
				required: true,
				displayOptions: { show: { authentication: ['oAuth2'] } },
			},
			{
				name: 'wildixBearerApi',
				required: true,
				displayOptions: { show: { authentication: ['bearerToken'] } },
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Bearer Token', value: 'bearerToken' },
					{ name: 'OAuth2', value: 'oAuth2' },
				],
				default: 'bearerToken',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'ACL Group', value: 'aclGroup' },
					{ name: 'Alarm Clock', value: 'alarmClock' },
					{ name: 'Application', value: 'application' },
					{ name: 'Broadcast', value: 'broadcast' },
					{ name: 'Call', value: 'call' },
					{ name: 'Call History', value: 'callHistory' },
					{ name: 'Call Queue', value: 'callQueue' },
					{ name: 'Colleague', value: 'colleague' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Department', value: 'department' },
					{ name: 'Device', value: 'device' },
					{ name: 'Dialplan', value: 'dialplan' },
					{ name: 'Fax', value: 'fax' },
					{ name: 'Group', value: 'group' },
					{ name: 'Notification', value: 'notification' },
					{ name: 'OAuth2 Client', value: 'oauth2Client' },
					{ name: 'PBX', value: 'pbx' },
					{ name: 'PBX Setting', value: 'pbxSettings' },
					{ name: 'PBX System', value: 'pbxSystem' },
					{ name: 'PBX Upgrade', value: 'pbxUpgrade' },
					{ name: 'Personal', value: 'personal' },
					{ name: 'Phonebook', value: 'phonebook' },
					{ name: 'Recording', value: 'recording' },
					{ name: 'SIP Registration', value: 'sipRegistration' },
					{ name: 'SMS', value: 'sms' },
					{ name: 'Sound', value: 'sound' },
					{ name: 'Trunk', value: 'trunk' },
					{ name: 'Trusted IP', value: 'trustedIp' },
					{ name: 'Video Conference', value: 'videoConference' },
					{ name: 'Voicemail', value: 'voiceMail' },
				],
				default: 'call',
			},
			...aclGroupOperations,
			...aclGroupFields,
			...alarmClockOperations,
			...alarmClockFields,
			...applicationOperations,
			...applicationFields,
			...broadcastOperations,
			...broadcastFields,
			...callOperations,
			...callFields,
			...callHistoryOperations,
			...callHistoryFields,
			...callQueueOperations,
			...callQueueFields,
			...colleagueOperations,
			...colleagueFields,
			...contactOperations,
			...contactFields,
			...departmentOperations,
			...departmentFields,
			...deviceOperations,
			...deviceFields,
			...dialplanOperations,
			...dialplanFields,
			...faxOperations,
			...faxFields,
			...groupOperations,
			...groupFields,
			...notificationOperations,
			...notificationFields,
			...oauth2ClientOperations,
			...oauth2ClientFields,
			...pbxOperations,
			...pbxFields,
			...pbxSettingsOperations,
			...pbxSettingsFields,
			...pbxSystemOperations,
			...pbxSystemFields,
			...pbxUpgradeOperations,
			...pbxUpgradeFields,
			...personalOperations,
			...personalFields,
			...phonebookOperations,
			...phonebookFields,
			...recordingOperations,
			...recordingFields,
			...sipRegistrationOperations,
			...sipRegistrationFields,
			...smsOperations,
			...smsFields,
			...soundOperations,
			...soundFields,
			...trustedIpOperations,
			...trustedIpFields,
			...trunkOperations,
			...trunkFields,
			...videoConferenceOperations,
			...videoConferenceFields,
			...voiceMailOperations,
			...voiceMailFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const authentication = this.getNodeParameter('authentication', 0) as string;
		const credentialType = authentication === 'bearerToken' ? 'wildixBearerApi' : 'wildixOAuth2Api';

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				let responseData: IDataObject | IDataObject[];

				// ── ACL Group ────────────────────────────────────────────────────────────
				if (resource === 'aclGroup') {
					if (operation === 'getMany') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/pbx/aclgroups', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/pbx/aclgroups', { name, ...additionalFields }, {}, credentialType);

					} else if (operation === 'update') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/pbx/aclgroups/${groupId}`, updateFields, {}, credentialType);

					} else if (operation === 'delete') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/pbx/aclgroups/${groupId}`, {}, {}, credentialType);

					} else if (operation === 'getPermissions') {
						responseData = await wildixApiRequest.call(this, 'GET', '/api/v1/pbx/aclgroups/permissions', {}, {}, credentialType);

					} else if (operation === 'getRules') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/pbx/aclgroups/rules`, {}, { groupId }, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createRule') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const rule = this.getNodeParameter('rule', i, false, {}) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', `/api/v1/pbx/aclgroups/rules`, { groupId, ...rule }, {}, credentialType);

					} else if (operation === 'updateRule') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const ruleId = this.getNodeParameter('ruleId', i) as string;
						const rule = this.getNodeParameter('rule', i, false, {}) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/pbx/aclgroups/rules/${ruleId}`, { groupId, ...rule }, {}, credentialType);

					} else if (operation === 'deleteRule') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const ruleId = this.getNodeParameter('ruleId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/pbx/aclgroups/rules/${ruleId}`, { groupId }, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Alarm Clock ────────────────────────────────────────────────────────────
				} else if (resource === 'alarmClock') {
					if (operation === 'originate') {
						const number = this.getNodeParameter('number', i) as string;
						const time = this.getNodeParameter('time', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/originate/AlarmClocks', { number, time, ...additionalFields }, {}, credentialType);
					} else if (operation === 'get') {
						const alarmClockId = this.getNodeParameter('alarmClockId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/originate/AlarmClocks/${alarmClockId}/`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};
					} else if (operation === 'delete') {
						const alarmClockId = this.getNodeParameter('alarmClockId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/originate/AlarmClocks/${alarmClockId}`, {}, {}, credentialType);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Application ────────────────────────────────────────────────────────────
				} else if (resource === 'application') {
					if (operation === 'getSimpleTokens') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/pbx/applications/simpletoken', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createSimpleToken') {
						const name = this.getNodeParameter('name', i) as string;
						const pbxUser = this.getNodeParameter('pbxUser', i) as string;
						const expireTime = this.getNodeParameter('expireTime', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/pbx/applications/simpletoken', { name, pbxUser, expireTime, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updateSimpleToken') {
						const appId = this.getNodeParameter('appId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/pbx/applications/simpletoken/${appId}`, updateFields, {}, credentialType);

					} else if (operation === 'deleteSimpleToken') {
						const appId = this.getNodeParameter('appId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/pbx/applications/simpletoken/${appId}`, {}, {}, credentialType);

					} else if (operation === 'getS2s') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/pbx/applications/s2s', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createS2s') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/pbx/applications/s2s', { name, ...additionalFields }, {}, credentialType);

					} else if (operation === 'deleteS2s') {
						const appId = this.getNodeParameter('appId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/pbx/applications/s2s/${appId}`, {}, {}, credentialType);

					} else if (operation === 'updateS2s') {
						const appId = this.getNodeParameter('appId', i) as string;
						const updateS2sFields = this.getNodeParameter('updateS2sFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/pbx/applications/s2s/${appId}`, updateS2sFields, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Broadcast ─────────────────────────────────────────────────────────────
				} else if (resource === 'broadcast') {
					if (operation === 'reload') {
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/broadcasts/reload', {}, {}, credentialType);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Call ─────────────────────────────────────────────────────────────────
				} else if (resource === 'call') {
					if (operation === 'originate') {
						const callerName = this.getNodeParameter('callerName', i) as string;
						const destinationNumber = this.getNodeParameter('destinationNumber', i) as string;
						const originateAdditionalFields = this.getNodeParameter('originateAdditionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/originate/call', { name: callerName, number: destinationNumber, ...originateAdditionalFields }, {}, credentialType);

					} else if (operation === 'originateAdvanced') {
						const channel = this.getNodeParameter('channel', i) as string;
						const originateAdvancedFields = this.getNodeParameter('originateAdvancedFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/originate', { channel, ...originateAdvancedFields }, {}, credentialType);

					} else if (operation === 'answer') {
						const user = this.getNodeParameter('user', i) as string;
						const sipCallId = this.getNodeParameter('sipCallId', i) as string;
						const answerAdditionalFields = this.getNodeParameter('answerAdditionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/call-control/answer', { sipCallId, ...answerAdditionalFields }, { user }, credentialType);

					} else if (operation === 'hangup') {
						const user = this.getNodeParameter('user', i) as string;
						const sipCallId = this.getNodeParameter('sipCallId', i) as string;
						const hangupAdditionalFields = this.getNodeParameter('hangupAdditionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/call-control/hangup', { sipCallId, ...hangupAdditionalFields }, { user }, credentialType);

					} else if (operation === 'hold') {
						const user = this.getNodeParameter('user', i) as string;
						const sipCallId = this.getNodeParameter('sipCallId', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/call-control/hold', { sipCallId }, { user }, credentialType);

					} else if (operation === 'unhold') {
						const user = this.getNodeParameter('user', i) as string;
						const sipCallId = this.getNodeParameter('sipCallId', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/call-control/unhold', { sipCallId }, { user }, credentialType);

					} else if (operation === 'blindTransfer') {
						const user = this.getNodeParameter('user', i) as string;
						const sipCallId = this.getNodeParameter('sipCallId', i) as string;
						const destination = this.getNodeParameter('destination', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/call-control/blind-transfer', { sipCallId, destination }, { user }, credentialType);

					} else if (operation === 'attendantTransfer') {
						const user = this.getNodeParameter('user', i) as string;
						const sipCallId = this.getNodeParameter('sipCallId', i) as string;
						const destination = this.getNodeParameter('destination', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/call-control/attendant-transfer', { sipCallId, destination }, { user }, credentialType);

					} else if (operation === 'makeCall') {
						const user = this.getNodeParameter('user', i) as string;
						const destination = this.getNodeParameter('makeCallDestination', i) as string;
						const makeCallAdditionalFields = this.getNodeParameter('makeCallAdditionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/call-control/make-call', { destination, ...makeCallAdditionalFields }, { user }, credentialType);

					} else if (operation === 'dtmf') {
						const user = this.getNodeParameter('user', i) as string;
						const sipCallId = this.getNodeParameter('sipCallId', i) as string;
						const digits = this.getNodeParameter('digits', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/call-control/dtmf', { sipCallId, digits }, { user }, credentialType);

					} else if (operation === 'updateContactInfo') {
						const user = this.getNodeParameter('user', i) as string;
						const sipCallId = this.getNodeParameter('sipCallId', i) as string;
						const updateContactInfoFields = this.getNodeParameter('updateContactInfoFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/call-control/update-contact-info', { sipCallId, ...updateContactInfoFields }, { user }, credentialType);

					} else if (operation === 'listActive') {
						const user = this.getNodeParameter('user', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', '/api/v2/call-control/list-calls', {}, { user }, credentialType);
						responseData = ((response.result as IDataObject)?.calls as IDataObject[]) ?? [];

					} else if (operation === 'setActiveDevice') {
						const user = this.getNodeParameter('user', i) as string;
						const deviceId = this.getNodeParameter('deviceId', i) as string;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v2/call-control/set-active-device', { deviceId }, { user }, credentialType);

					} else if (operation === 'getStatus') {
						const channel = encodeURIComponent(this.getNodeParameter('callChannel', i) as string);
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Calls/${channel}`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'getRecordings') {
						const channel = encodeURIComponent(this.getNodeParameter('callChannel', i) as string);
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Calls/${channel}/Recordings`, {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? (response.result as IDataObject) ?? {};

					} else if (operation === 'getTags') {
						const channel = encodeURIComponent(this.getNodeParameter('callChannel', i) as string);
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Calls/${channel}/Tags`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'setTags') {
						const channel = encodeURIComponent(this.getNodeParameter('callChannel', i) as string);
						const tags = this.getNodeParameter('tags', i) as string;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Calls/${channel}/Tags/`, { tags }, {}, credentialType);

					} else if (operation === 'makeCallLegacy') {
						const number = this.getNodeParameter('number', i) as string;
						const makeCallLegacyFields = this.getNodeParameter('makeCallLegacyFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Calls/', { number, ...makeCallLegacyFields }, {}, credentialType);

					} else if (operation === 'dtmfByChannel') {
						const channel = encodeURIComponent(this.getNodeParameter('callChannel', i) as string);
						const dtmf = this.getNodeParameter('dtmf', i) as string;
						const sendOnBridgedChannel = this.getNodeParameter('sendOnBridgedChannel', i) as boolean;
						responseData = await wildixApiRequest.call(this, 'POST', `/api/v1/Calls/${channel}/Dtmf`, { dtmf, sendOnBridgedChannel }, {}, credentialType);

					} else if (operation === 'transferByChannel') {
						const channel = encodeURIComponent(this.getNodeParameter('callChannel', i) as string);
						const to = this.getNodeParameter('transferTo', i) as string;
						const transferByChannelFields = this.getNodeParameter('transferByChannelFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', `/api/v1/Calls/${channel}/Transfer`, { to, ...transferByChannelFields }, {}, credentialType);

					} else if (operation === 'originateMobility') {
						const number = this.getNodeParameter('mobilityNumber', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/originate/mobility', { number }, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Call History ──────────────────────────────────────────────────────────
				} else if (resource === 'callHistory') {
					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};
						if (filters.dateFrom) qs['filter[start][from]'] = filters.dateFrom;
						if (filters.dateTo) qs['filter[start][to]'] = filters.dateTo;
						if (returnAll) {
							responseData = await wildixApiRequestAllItems.call(this, '/api/v1/PBX/CallHistory', qs, credentialType);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/CallHistory', {}, { count: limit, start: 0, ...qs }, credentialType);
							responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						}

					} else if (operation === 'getPersonal') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};
						if (filters.dateFrom) qs['filter[start][from]'] = filters.dateFrom;
						if (filters.dateTo) qs['filter[start][to]'] = filters.dateTo;
						if (returnAll) {
							responseData = await wildixApiRequestAllItems.call(this, '/api/v1/CallHistory', qs, credentialType);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await wildixApiRequest.call(this, 'GET', '/api/v1/CallHistory', {}, { count: limit, start: 0, ...qs }, credentialType);
							responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						}

					} else if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/CallHistory/${id}`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateArchived') {
						const id = this.getNodeParameter('id', i) as string;
						const archived = this.getNodeParameter('archived', i) as boolean;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/CallHistory/${id}`, { 'data[archived]': archived ? 'true' : 'false' }, {}, credentialType);

					} else if (operation === 'delete') {
						const id = this.getNodeParameter('id', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/CallHistory/${id}`, {}, {}, credentialType);

					} else if (operation === 'changeTags') {
						const id = this.getNodeParameter('id', i) as string;
						const tagsRaw = this.getNodeParameter('tags', i) as string;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/CallHistory/${id}/Tags/`, { tags: tagsRaw }, {}, credentialType);

					} else if (operation === 'updateVoicemailStatus') {
						const id = this.getNodeParameter('id', i) as string;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/CallHistory/${id}/Voicemail/`, {}, {}, credentialType);

					} else if (operation === 'deleteVoicemails') {
						const id = this.getNodeParameter('id', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/CallHistory/${id}/Voicemail/`, {}, {}, credentialType);

					} else if (operation === 'getByUser') {
						const userId = this.getNodeParameter('userId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};
						if (filters.dateFrom) qs['filter[start][from]'] = filters.dateFrom;
						if (filters.dateTo) qs['filter[start][to]'] = filters.dateTo;
						if (returnAll) {
							responseData = await wildixApiRequestAllItems.call(this, `/api/v1/User/${userId}/CallHistory`, qs, credentialType);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await wildixApiRequest.call(this, 'GET', `/api/v1/User/${userId}/CallHistory`, {}, { count: limit, start: 0, ...qs }, credentialType);
							responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						}

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Call Queue ────────────────────────────────────────────────────────────
				} else if (resource === 'callQueue') {
					if (operation === 'getMany') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/pbx/settings/callqueues', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'getSettings') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						responseData = await wildixApiRequest.call(this, 'GET', `/api/v1/pbx/settings/callqueues/${groupId}`, {}, {}, credentialType);

					} else if (operation === 'getDynamicMembers') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v2/call-groups/${groupId}/members/dynamic`, {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.members as IDataObject[]) ?? [];

					} else if (operation === 'addDynamicMember') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const extension = this.getNodeParameter('extension', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', `/api/v2/call-groups/${groupId}/members/dynamic`, { extension }, {}, credentialType);

					} else if (operation === 'removeDynamicMember') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const extension = this.getNodeParameter('extension', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v2/call-groups/${groupId}/members/dynamic`, { extension }, {}, credentialType);

					} else if (operation === 'forwardCall') {
						const groupId = this.getNodeParameter('groupId', i) as string;
						const sipCallId = this.getNodeParameter('sipCallId', i) as string;
						const destination = this.getNodeParameter('destination', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', `/api/v2/call-groups/${groupId}/forward`, { sipCallId, destination }, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Colleague ─────────────────────────────────────────────────────────────
				} else if (resource === 'colleague') {
					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						if (returnAll) {
							responseData = await wildixApiRequestAllItems.call(this, '/api/v1/PBX/Colleagues', filters, credentialType);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/Colleagues', {}, { count: limit, ...filters }, credentialType);
							responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						}

					} else if (operation === 'get') {
						const colleagueId = this.getNodeParameter('colleagueId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Colleagues/${colleagueId}`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'getManyBasic') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						if (returnAll) {
							responseData = await wildixApiRequestAllItems.call(this, '/api/v1/Colleagues', filters, credentialType);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Colleagues', {}, { count: limit, ...filters }, credentialType);
							responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						}

					} else if (operation === 'getMe') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/personal/info', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'getUserPresence') {
						const extension = this.getNodeParameter('presenceExtension', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/User/${extension}/Presence/`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateUserPresence') {
						const extension = this.getNodeParameter('presenceExtension', i) as string;
						const status = this.getNodeParameter('presenceStatus', i) as string;
						const userPresenceFields = this.getNodeParameter('userPresenceFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/User/${extension}/Presence/`, { status, ...userPresenceFields }, {}, credentialType);

					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const extension = this.getNodeParameter('extension', i) as string;
						const role = this.getNodeParameter('role', i) as string;
						const licenseType = this.getNodeParameter('licenseType', i) as string;
						const dialplan = this.getNodeParameter('dialplan', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/PBX/Colleagues', { name, email, extension, role, licenseType, dialplan, ...additionalFields }, {}, credentialType);

					} else if (operation === 'update') {
						const colleagueId = this.getNodeParameter('colleagueId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/pbx/colleagues/${colleagueId}`, updateFields, {}, credentialType);

					} else if (operation === 'delete') {
						const colleagueId = this.getNodeParameter('colleagueId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/PBX/Colleagues/${colleagueId}`, {}, {}, credentialType);

					} else if (operation === 'copyPreferences') {
						const colleagueId = this.getNodeParameter('colleagueId', i) as string;
						const fromColleagueId = this.getNodeParameter('fromColleagueId', i) as string;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/PBX/Colleagues/${colleagueId}/preferences`, { from: fromColleagueId }, {}, credentialType);

					} else if (operation === 'setBatchPresence') {
						const colleaguesCollection = this.getNodeParameter('colleagues', i) as IDataObject;
						const colleagues = (colleaguesCollection.values as IDataObject[]) ?? [];
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/PBX/presence', { colleagues }, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Contact ───────────────────────────────────────────────────────────────
				} else if (resource === 'contact') {
					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = { ...filters };
						if (returnAll) {
							responseData = await wildixApiRequestAllItems.call(this, '/api/v1/Contacts', qs, credentialType);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Contacts', {}, { count: limit, start: 0, ...qs }, credentialType);
							responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						}

					} else if (operation === 'get') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Contacts/${contactId}`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const formBody: Record<string, string> = { 'data[name]': name };
						for (const [key, value] of Object.entries(additionalFields)) {
							if (value !== '' && value !== null && value !== undefined) {
								formBody[`data[${key}]`] = String(value);
							}
						}
						responseData = await wildixApiFormRequest.call(this, 'POST', '/api/v1/Contacts', formBody, credentialType);

					} else if (operation === 'update') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const formBody: Record<string, string> = {};
						for (const [key, value] of Object.entries(updateFields)) {
							if (value !== '' && value !== null && value !== undefined) {
								formBody[`data[${key}]`] = String(value);
							}
						}
						responseData = await wildixApiFormRequest.call(this, 'PUT', `/api/v1/Contacts/${contactId}`, formBody, credentialType);

					} else if (operation === 'delete') {
						const contactId = this.getNodeParameter('contactId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Contacts/${contactId}`, {}, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Department ────────────────────────────────────────────────────────────
				} else if (resource === 'department') {
					if (operation === 'getMany') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Departments', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Device ────────────────────────────────────────────────────────────────
				} else if (resource === 'device') {
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/devices', {}, {}, credentialType);
						const records = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						responseData = returnAll ? records : records.slice(0, this.getNodeParameter('limit', i) as number);

					} else if (operation === 'listUserDevices') {
						const user = this.getNodeParameter('user', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', '/api/v2/call-control/list-devices', {}, { user }, credentialType);
						responseData = ((response.result as IDataObject)?.devices as IDataObject[]) ?? [];

					} else if (operation === 'getIosConfig') {
						const iosConfigOptions = this.getNodeParameter('iosConfigOptions', i) as IDataObject;
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/iOS/Config/', {}, iosConfigOptions, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'add') {
						const macsRaw = this.getNodeParameter('macs', i) as string;
						const macs = macsRaw.split(',').map((m) => m.trim()).filter(Boolean);
						const response = await wildixApiRequest.call(this, 'POST', '/api/v1/devices', { macs }, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [response.result as IDataObject];

					} else if (operation === 'update') {
						const mac = this.getNodeParameter('mac', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/devices/${mac}`, updateFields, {}, credentialType);

					} else if (operation === 'delete') {
						const mac = this.getNodeParameter('mac', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/devices/${mac}`, {}, {}, credentialType);

					} else if (operation === 'scan') {
						const range = this.getNodeParameter('range', i) as string;
						const response = await wildixApiRequest.call(this, 'POST', '/api/v1/devices/scan', { range }, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'verify') {
						const verifyFields = this.getNodeParameter('verifyAdditionalFields', i) as IDataObject;
						const qs: IDataObject = {};
						if (verifyFields.mac) qs.mac = verifyFields.mac;
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/devices/verify', {}, qs, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [response.result as IDataObject];

					} else if (operation === 'connect') {
						const mac = this.getNodeParameter('mac', i) as string;
						const extension = this.getNodeParameter('extension', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', `/api/v1/Devices/${mac}/connect/`, { extension }, {}, credentialType);

					} else if (operation === 'disconnect') {
						const mac = this.getNodeParameter('mac', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', '/api/v1/devices/disconnect', { mac }, {}, credentialType);

					} else if (operation === 'resetToken') {
						const mac = this.getNodeParameter('resetMac', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/device/resettoken', { mac }, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Dialplan ──────────────────────────────────────────────────────────────
				} else if (resource === 'dialplan') {
					if (operation === 'getDialplans') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/Dialplans', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'getDialplan') {
						const dialplanId = this.getNodeParameter('dialplanId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/PBX/Dialplans/${dialplanId}/`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'createDialplan') {
						const name = this.getNodeParameter('dialplanName', i) as string;
						const createDialplanFields = this.getNodeParameter('createDialplanFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/PBX/Dialplans/', { name, ...createDialplanFields }, {}, credentialType);

					} else if (operation === 'updateDialplan') {
						const dialplanId = this.getNodeParameter('dialplanId', i) as string;
						const updateDialplanFields = this.getNodeParameter('updateDialplanFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/PBX/Dialplans/${dialplanId}/`, updateDialplanFields, {}, credentialType);

					} else if (operation === 'deleteDialplan') {
						const dialplanIds = this.getNodeParameter('dialplanIds', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/PBX/Dialplans/${dialplanIds}/`, {}, {}, credentialType);

					} else if (operation === 'getPagingGroups') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Dialplan/PagingGroups', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createPagingGroup') {
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (!additionalFields.members) additionalFields.members = [];
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Dialplan/PagingGroups', { title, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updatePagingGroup') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Dialplan/PagingGroups/${itemId}`, updateFields, {}, credentialType);

					} else if (operation === 'deletePagingGroup') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Dialplan/PagingGroups/${itemId}`, {}, {}, credentialType);

					} else if (operation === 'getSwitches') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Dialplan/Switches', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createSwitch') {
						const title = this.getNodeParameter('title', i) as string;
						const state = this.getNodeParameter('state', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.isTreeType === undefined) additionalFields.isTreeType = false;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Dialplan/Switches', { title, state, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updateSwitch') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Dialplan/Switches/${itemId}`, updateFields, {}, credentialType);

					} else if (operation === 'deleteSwitch') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Dialplan/Switches/${itemId}`, {}, {}, credentialType);

					} else if (operation === 'getIvr') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Dialplan/Ivr', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createIvr') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Dialplan/Ivr', { name, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updateIvr') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Dialplan/Ivr/${itemId}`, updateFields, {}, credentialType);

					} else if (operation === 'deleteIvr') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Dialplan/Ivr/${itemId}`, {}, {}, credentialType);

					} else if (operation === 'getTimeTables') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Dialplan/timeTables', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createTimeTable') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Dialplan/timeTables', { name, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updateTimeTable') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Dialplan/timeTables/${itemId}`, updateFields, {}, credentialType);

					} else if (operation === 'deleteTimeTable') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Dialplan/timeTables/${itemId}`, {}, {}, credentialType);

					} else if (operation === 'getGeneralSettings') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Dialplan/GeneralSettings', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateGeneralSettings') {
						const settings = this.getNodeParameter('settings', i, '{}') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/Dialplan/GeneralSettings', settings, {}, credentialType);

					} else if (operation === 'getDbFamilyKeys') {
						const family = encodeURIComponent(this.getNodeParameter('dbFamily', i) as string);
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Dialplan/DB/${family}/`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'getDbValue') {
						const family = encodeURIComponent(this.getNodeParameter('dbFamily', i) as string);
						const key = encodeURIComponent(this.getNodeParameter('dbKey', i) as string);
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Dialplan/DB/${family}/${key}+`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'addDbValue') {
						const family = encodeURIComponent(this.getNodeParameter('dbFamily', i) as string);
						const key = encodeURIComponent(this.getNodeParameter('dbKey', i) as string);
						const value = this.getNodeParameter('dbValue', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', `/api/v1/Dialplan/DB/${family}/${key}+/`, { value }, {}, credentialType);

					} else if (operation === 'updateDbValue') {
						const family = encodeURIComponent(this.getNodeParameter('dbFamily', i) as string);
						const key = encodeURIComponent(this.getNodeParameter('dbKey', i) as string);
						const value = this.getNodeParameter('dbValue', i) as string;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Dialplan/DB/${family}/${key}+/`, { value }, {}, credentialType);

					} else if (operation === 'deleteDbKey') {
						const family = encodeURIComponent(this.getNodeParameter('dbFamily', i) as string);
						const key = encodeURIComponent(this.getNodeParameter('dbKey', i) as string);
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Dialplan/DB/${family}/${key}+/`, {}, {}, credentialType);

					} else if (operation === 'deleteDbFamily') {
						const family = encodeURIComponent(this.getNodeParameter('dbFamily', i) as string);
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Dialplan/DB/${family}/`, {}, {}, credentialType);

					} else if (operation === 'importTimeTables') {
						const records = this.getNodeParameter('records', i, '[]') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/Dialplan/timeTables/import/', { records }, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Fax ───────────────────────────────────────────────────────────────────
				} else if (resource === 'fax') {
					if (operation === 'send') {
						const faxNumbersRaw = this.getNodeParameter('faxNumbers', i) as string;
						const fileNamesRaw = this.getNodeParameter('fileNames', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const faxNumbers = faxNumbersRaw.split(',').map((n) => n.trim()).filter(Boolean);
						const fileName = fileNamesRaw.split(',').map((f) => f.trim()).filter(Boolean);
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/fax', { faxNumbers, fileName, ...additionalFields }, {}, credentialType);

					} else if (operation === 'uploadFile') {
						const binaryProperty = this.getNodeParameter('binaryProperty', i) as string;
						const fileName = this.getNodeParameter('fileName', i) as string;
						const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
						const buffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
						responseData = await wildixApiUpload.call(this, '/api/v1/fax/file', {
							file: { value: buffer, options: { filename: fileName, contentType: binaryData.mimeType } },
						}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Group ─────────────────────────────────────────────────────────────────
				} else if (resource === 'group') {
					if (operation === 'getMany') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Groups', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'getCallGroups') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Dialplan/CallGroups', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'getCallGroupStat') {
						const callGroupId = this.getNodeParameter('callGroupId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Dialplan/CallGroups/${callGroupId}/stat`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'createCallGroup') {
						const title = this.getNodeParameter('callGroupTitle', i) as string;
						const createCallGroupFields = this.getNodeParameter('createCallGroupFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Dialplan/CallGroups', { title, ...createCallGroupFields }, {}, credentialType);

					} else if (operation === 'updateCallGroup') {
						const callGroupId = this.getNodeParameter('callGroupId', i) as string;
						const data = this.getNodeParameter('updateCallGroupData', i, '{}') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Dialplan/CallGroups/${callGroupId}`, data, {}, credentialType);

					} else if (operation === 'deleteCallGroup') {
						const callGroupId = this.getNodeParameter('callGroupId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Dialplan/CallGroups/${callGroupId}`, {}, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── OAuth2 Client ─────────────────────────────────────────────────────────
				} else if (resource === 'oauth2Client') {
					if (operation === 'getMany') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/pbx/applications/oauth2', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const redirectUrisCollection = this.getNodeParameter('redirectUris', i) as IDataObject;
						const redirectUris = ((redirectUrisCollection.values as IDataObject[] | undefined) ?? []).map(
							(v) => v.uri as string,
						);
						const createAdditionalFields = this.getNodeParameter('createAdditionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/pbx/applications/oauth2', { name, redirectUris, ...createAdditionalFields }, {}, credentialType);

					} else if (operation === 'update') {
						const oauthClientId = this.getNodeParameter('oauthClientId', i) as string;
						const updateName = this.getNodeParameter('updateName', i) as string;
						const updateRedirectUrisCollection = this.getNodeParameter('updateRedirectUris', i) as IDataObject;
						const redirectUri = ((updateRedirectUrisCollection.values as IDataObject[] | undefined) ?? []).map(
							(v) => v.uri as string,
						);
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/pbx/applications/oauth2/${oauthClientId}`, { name: updateName, redirectUri }, {}, credentialType);

					} else if (operation === 'delete') {
						const oauthClientId = this.getNodeParameter('oauthClientId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/pbx/applications/oauth2/${oauthClientId}`, {}, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── PBX ───────────────────────────────────────────────────────────────────
				} else if (resource === 'pbx') {
					if (operation === 'getMany') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/network/pbxes', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── PBX Settings ───────────────────────────────────────────────────────────
				} else if (resource === 'pbxSettings') {
					if (operation === 'getSettings') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/settings', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateSettings') {
						const settings = this.getNodeParameter('settings', i, '{}') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/PBX/settings', settings, {}, credentialType);

					} else if (operation === 'getNtp') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/settings/ntp', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateNtp') {
						const ntpServer = this.getNodeParameter('ntpServer', i) as string;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/PBX/settings/ntp', { ntpServer }, {}, credentialType);

					} else if (operation === 'getSmtp') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/settings/smtp', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateSmtp') {
						const smtpSettings = this.getNodeParameter('smtpSettings', i, '{}') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/PBX/settings/smtp', smtpSettings, {}, credentialType);

					} else if (operation === 'testSmtp') {
						const email = this.getNodeParameter('email', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/PBX/settings/smtp/test', { email }, {}, credentialType);

					} else if (operation === 'getSmtpTestStatus') {
						const testId = this.getNodeParameter('testId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/PBX/settings/smtp/test/status/${testId}/`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'getHttpProxy') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/settings/httpProxy', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateHttpProxy') {
						const proxySettings = this.getNodeParameter('proxySettings', i, '{}') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/PBX/settings/httpProxy', proxySettings, {}, credentialType);

					} else if (operation === 'getLicense') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/settings/license', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── PBX System ─────────────────────────────────────────────────────────────
				} else if (resource === 'pbxSystem') {
					if (operation === 'ping') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/ping', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'getVersion') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/version', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'getPorts') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/Ports/Status', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'getCandidates') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/candidates', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'getDictionaries') {
						const items = this.getNodeParameter('items', i, '') as string;
						const qs: IDataObject = {};
						if (items) qs.items = items.split(',').map((d) => d.trim()).filter(Boolean);
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Dictionaries', {}, qs, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'reboot') {
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/PBX/System/Reboot', {}, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── PBX Upgrade ────────────────────────────────────────────────────────────
				} else if (resource === 'pbxUpgrade') {
					if (operation === 'getStatus') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/Upgrade', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'start') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/PBX/Upgrade', additionalFields, {}, credentialType);

					} else if (operation === 'check') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/Upgrade/Check', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'startCheck') {
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/PBX/Upgrade/Check', {}, {}, credentialType);

					} else if (operation === 'getSettings') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/Upgrade/Settings', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateSettings') {
						const settings = this.getNodeParameter('settings', i, '{}') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/PBX/Upgrade/Settings', settings, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Personal ───────────────────────────────────────────────────────────────
				} else if (resource === 'personal') {
					if (operation === 'getSettings') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Personal/settings', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateSettings') {
						const settings = this.getNodeParameter('settings', i, '{}') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/Personal/settings', settings, {}, credentialType);

					} else if (operation === 'getToken') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Personal/Token', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'resetToken') {
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Personal/Token', {}, {}, credentialType);

					} else if (operation === 'updatePresence') {
						const status = this.getNodeParameter('status', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/Personal/Presence', { status, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updatePresenceLocation') {
						const location = this.getNodeParameter('location', i) as string;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/Personal/Presence/location', { location }, {}, credentialType);

					} else if (operation === 'getPagingGroups') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Personal/PagingGroups', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'getAcl') {
						const aclFilters = this.getNodeParameter('aclFilters', i, {}) as IDataObject;
						const filterRows = (aclFilters.values as IDataObject[]) ?? [];
						const qs: IDataObject = {};
						for (const row of filterRows) {
							qs[`filter[${row.kind as string}]`] = row.acl as string;
						}
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Personal/Acl', {}, qs, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'getFeatures') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v2/personal/features', {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'updateFeatures') {
						const features = this.getNodeParameter('features', i, '{}') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v2/personal/features', features, {}, credentialType);

					} else if (operation === 'getLocations') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/personal/locations', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'deleteLocation') {
						const ip = this.getNodeParameter('locationIp', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/personal/locations/${ip}`, {}, {}, credentialType);

					} else if (operation === 'updateRoster') {
						const roster = this.getNodeParameter('roster', i, '{}') as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/personal/roster', roster, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Phonebook ──────────────────────────────────────────────────────────────
				} else if (resource === 'phonebook') {
					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						if (returnAll) {
							responseData = await wildixApiRequestAllItems.call(this, '/api/v1/Phonebooks', filters, credentialType);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Phonebooks', {}, { count: limit, start: 0, ...filters }, credentialType);
							responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						}

					} else if (operation === 'get') {
						const phonebookId = this.getNodeParameter('phonebookId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Phonebooks/${phonebookId}`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const formBody: Record<string, string> = { 'data[name]': name };
						for (const [key, value] of Object.entries(additionalFields)) {
							if (value !== '' && value !== null && value !== undefined) {
								formBody[`data[${key}]`] = String(value);
							}
						}
						responseData = await wildixApiFormRequest.call(this, 'POST', '/api/v1/Phonebooks', formBody, credentialType);

					} else if (operation === 'update') {
						const phonebookId = this.getNodeParameter('phonebookId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const formBody: Record<string, string> = {};
						for (const [key, value] of Object.entries(updateFields)) {
							if (value !== '' && value !== null && value !== undefined) {
								formBody[`data[${key}]`] = String(value);
							}
						}
						responseData = await wildixApiFormRequest.call(this, 'PUT', `/api/v1/Phonebooks/${phonebookId}`, formBody, credentialType);

					} else if (operation === 'delete') {
						const phonebookId = this.getNodeParameter('phonebookId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Phonebooks/${phonebookId}`, {}, {}, credentialType);

					} else if (operation === 'getContacts') {
						const phonebookId = this.getNodeParameter('contactPhonebookId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						if (returnAll) {
							responseData = await wildixApiRequestAllItems.call(this, `/api/v1/Phonebooks/${phonebookId}/Contacts/`, {}, credentialType);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Phonebooks/${phonebookId}/Contacts/`, {}, { count: limit, start: 0 }, credentialType);
							responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						}

					} else if (operation === 'getContact') {
						const phonebookId = this.getNodeParameter('contactPhonebookId', i) as string;
						const contactId = this.getNodeParameter('contactId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Phonebooks/${phonebookId}/Contacts/${contactId}`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? {};

					} else if (operation === 'addContact') {
						const phonebookId = this.getNodeParameter('contactPhonebookId', i) as string;
						const name = this.getNodeParameter('contactName', i) as string;
						const additionalFields = this.getNodeParameter('contactAdditionalFields', i) as IDataObject;
						const formBody: Record<string, string> = { 'data[name]': name };
						for (const [key, value] of Object.entries(additionalFields)) {
							if (value !== '' && value !== null && value !== undefined) {
								formBody[`data[${key}]`] = String(value);
							}
						}
						responseData = await wildixApiFormRequest.call(this, 'POST', `/api/v1/Phonebooks/${phonebookId}/Contacts`, formBody, credentialType);

					} else if (operation === 'updateContact') {
						const phonebookId = this.getNodeParameter('contactPhonebookId', i) as string;
						const contactId = this.getNodeParameter('contactId', i) as string;
						const updateFields = this.getNodeParameter('contactUpdateFields', i) as IDataObject;
						const formBody: Record<string, string> = {};
						for (const [key, value] of Object.entries(updateFields)) {
							if (value !== '' && value !== null && value !== undefined) {
								formBody[`data[${key}]`] = String(value);
							}
						}
						responseData = await wildixApiFormRequest.call(this, 'PUT', `/api/v1/phonebooks/${phonebookId}/Contacts/${contactId}`, formBody, credentialType);

					} else if (operation === 'deleteContact') {
						const phonebookId = this.getNodeParameter('contactPhonebookId', i) as string;
						const contactId = this.getNodeParameter('contactId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Phonebooks/${phonebookId}/Contacts/${contactId}/`, {}, {}, credentialType);

					} else if (operation === 'deleteContacts') {
						const phonebookId = this.getNodeParameter('contactPhonebookId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Phonebooks/${phonebookId}/Contacts/`, {}, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Notification ──────────────────────────────────────────────────────────
				} else if (resource === 'notification') {
					if (operation === 'send') {
						const from = this.getNodeParameter('from', i) as string;
						const notificationType = this.getNodeParameter('notificationType', i) as string;
						const event = this.getNodeParameter('event', i) as string;
						const broadcastMessage = this.getNodeParameter('broadcastMessage', i) as string;
						const broadcastId = this.getNodeParameter('broadcastId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/notifications', { from, notificationType, event, broadcastMessage, broadcastId, ...additionalFields }, {}, credentialType);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Recording ─────────────────────────────────────────────────────────────
				} else if (resource === 'recording') {
					if (operation === 'getMany') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};
						if (filters.from) qs.from = filters.from;
						if (filters.to) qs.to = filters.to;
						if (returnAll) {
							responseData = await wildixApiRequestAllItems.call(this, '/api/v1/PBX/recordings', qs, credentialType);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/recordings', {}, { count: limit, start: 0, ...qs }, credentialType);
							responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];
						}

					} else if (operation === 'createDownloadTask') {
						const idsRaw = this.getNodeParameter('ids', i) as string;
						const ids = idsRaw.split(',').map((id) => id.trim()).filter(Boolean);
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/PBX/recordings/download', { ids }, {}, credentialType);

					} else if (operation === 'download') {
						const recordingId = this.getNodeParameter('recordingId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/PBX/recordings/download/${recordingId}`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? response;

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── SIP Registration ───────────────────────────────────────────────────────
				} else if (resource === 'sipRegistration') {
					if (operation === 'getAll') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/PBX/Users/Sip/Registrations', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'getByExtension') {
						const extension = this.getNodeParameter('extension', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/PBX/Users/${extension}/Sip/Registrations`, {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── SMS ───────────────────────────────────────────────────────────────────
				} else if (resource === 'sms') {
					if (operation === 'send') {
						const number = this.getNodeParameter('number', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const mediaRaw = additionalFields.media as string | undefined;
						if (mediaRaw) {
							additionalFields.media = mediaRaw.split(',').map((u) => u.trim()).filter(Boolean);
						}
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/originate/sms', { number, message, ...additionalFields }, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Sound ─────────────────────────────────────────────────────────────────
				} else if (resource === 'sound') {
					if (operation === 'getMany') {
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};
						if (filters.directory) qs.directory = filters.directory;
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Sounds', {}, qs, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'getDirectories') {
						const directory = this.getNodeParameter('directory', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Sounds', {}, { directory }, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'create') {
						const soundName = this.getNodeParameter('soundName', i) as string;
						const binaryProperty = this.getNodeParameter('binaryProperty', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
						const buffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
						responseData = await wildixApiUpload.call(this, '/api/v1/Sounds', {
							file: { value: buffer, options: { filename: soundName, contentType: binaryData.mimeType } },
							name: soundName,
							...additionalFields,
						}, credentialType);

					} else if (operation === 'update') {
						const soundName = this.getNodeParameter('soundName', i) as string;
						const binaryProperty = this.getNodeParameter('binaryProperty', i) as string;
						const binaryData = this.helpers.assertBinaryData(i, binaryProperty);
						const buffer = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
						responseData = await wildixApiUpload.call(this, `/api/v1/Sounds/${soundName}`, {
							file: { value: buffer, options: { filename: soundName, contentType: binaryData.mimeType } },
						}, credentialType);

					} else if (operation === 'delete') {
						const soundName = this.getNodeParameter('soundName', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Sounds/${soundName}`, {}, {}, credentialType);

					} else if (operation === 'createDirectory') {
						const path = this.getNodeParameter('directoryPath', i) as string;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Sounds/directory/', { path }, {}, credentialType);

					} else if (operation === 'updateDirectory') {
						const path = encodeURIComponent(this.getNodeParameter('existingDirectoryPath', i) as string);
						const directoryUpdateFields = this.getNodeParameter('directoryUpdateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Sounds/directory/${path}`, directoryUpdateFields, {}, credentialType);

					} else if (operation === 'deleteDirectory') {
						const path = encodeURIComponent(this.getNodeParameter('existingDirectoryPath', i) as string);
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Sounds/directory/${path}`, {}, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Trusted IP ─────────────────────────────────────────────────────────────
				} else if (resource === 'trustedIp') {
					if (operation === 'getMany') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/TrustedIP', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.rows as IDataObject[]) ?? [];

					} else if (operation === 'set') {
						const rowsRaw = this.getNodeParameter('rows', i) as string;
						const rows = rowsRaw.split(',').map((ip) => ip.trim()).filter(Boolean);
						responseData = await wildixApiRequest.call(this, 'PUT', '/api/v1/TrustedIP', { rows }, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Trunk ─────────────────────────────────────────────────────────────────
				} else if (resource === 'trunk') {
					if (operation === 'getGroups') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Trunks/Groups', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createGroup') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Trunks/Groups', { name, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updateGroup') {
						const trunkId = this.getNodeParameter('trunkId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Trunks/Groups/${trunkId}`, updateFields, {}, credentialType);

					} else if (operation === 'deleteGroup') {
						const trunkId = this.getNodeParameter('trunkId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Trunks/Groups/${trunkId}`, {}, {}, credentialType);

					} else if (operation === 'getSip') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Trunks/Sip', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createSip') {
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Trunks/Sip', { title, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updateSip') {
						const trunkId = this.getNodeParameter('trunkId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Trunks/Sip/${trunkId}`, updateFields, {}, credentialType);

					} else if (operation === 'deleteSip') {
						const trunkId = this.getNodeParameter('trunkId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Trunks/Sip/${trunkId}`, {}, {}, credentialType);

					} else if (operation === 'getPstn') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Trunks/Pstn', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createPstn') {
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Trunks/Pstn', { title, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updatePstn') {
						const trunkId = this.getNodeParameter('trunkId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Trunks/Pstn/${trunkId}`, updateFields, {}, credentialType);

					} else if (operation === 'deletePstn') {
						const trunkId = this.getNodeParameter('trunkId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Trunks/Pstn/${trunkId}`, {}, {}, credentialType);

					} else if (operation === 'getFxo') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Trunks/Fxo', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createFxo') {
						const title = this.getNodeParameter('title', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/Trunks/Fxo', { title, ...additionalFields }, {}, credentialType);

					} else if (operation === 'updateFxo') {
						const trunkId = this.getNodeParameter('trunkId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/Trunks/Fxo/${trunkId}`, updateFields, {}, credentialType);

					} else if (operation === 'deleteFxo') {
						const trunkId = this.getNodeParameter('trunkId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Trunks/Fxo/${trunkId}`, {}, {}, credentialType);

					} else if (operation === 'getPrices') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/Trunks/Prices', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'createPrice') {
						const name = this.getNodeParameter('priceName', i) as string;
						const binaryProperty = this.getNodeParameter('priceBinaryProperty', i, '') as string;
						const formData: Record<string, unknown> = { name };
						if (binaryProperty) {
							formData.upload = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
						}
						responseData = await wildixApiUpload.call(this, '/api/v1/Trunks/Prices/', formData, credentialType);

					} else if (operation === 'updatePrice') {
						const priceId = this.getNodeParameter('priceId', i) as string;
						const name = this.getNodeParameter('priceName', i) as string;
						const binaryProperty = this.getNodeParameter('priceBinaryProperty', i, '') as string;
						const formData: Record<string, unknown> = { name };
						if (binaryProperty) {
							formData.upload = await this.helpers.getBinaryDataBuffer(i, binaryProperty);
						}
						responseData = await wildixApiUpload.call(this, `/api/v1/Trunks/Prices/${priceId}/`, formData, credentialType);

					} else if (operation === 'exportPrice') {
						const priceId = this.getNodeParameter('priceId', i) as string;
						const response = await wildixApiRequest.call(this, 'GET', `/api/v1/Trunks/Prices/${priceId}/export`, {}, {}, credentialType);
						responseData = (response.result as IDataObject) ?? response;

					} else if (operation === 'deletePrice') {
						const priceId = this.getNodeParameter('priceId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/Trunks/Prices/${priceId}/`, {}, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Video Conference ───────────────────────────────────────────────────────
				} else if (resource === 'videoConference') {
					if (operation === 'getRooms') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/videoConference/Rooms', {}, {}, credentialType);
						responseData = (response.result as IDataObject[]) ?? [];

					} else if (operation === 'createRoom') {
						const subject = this.getNodeParameter('subject', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const body: IDataObject = { subject };
						if (additionalFields.password) body.password = additionalFields.password;
						if (additionalFields.schedule) body.schedule = additionalFields.schedule;
						if (additionalFields.participants) body.participants = additionalFields.participants;
						responseData = await wildixApiRequest.call(this, 'POST', '/api/v1/videoConference/Rooms', body, {}, credentialType);

					} else if (operation === 'updateRoom') {
						const roomId = this.getNodeParameter('roomId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/videoConference/Rooms/${roomId}`, updateFields, {}, credentialType);

					} else if (operation === 'deleteRoom') {
						const roomId = this.getNodeParameter('roomId', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/videoConference/Rooms/${roomId}`, {}, {}, credentialType);

					} else if (operation === 'invite') {
						const roomId = this.getNodeParameter('roomId', i) as string;
						const participants = this.getNodeParameter('participants', i) as IDataObject[];
						responseData = await wildixApiRequest.call(this, 'POST', `/api/v1/videoConference/invite`, { roomId, participants }, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ── Voicemail ──────────────────────────────────────────────────────────────
				} else if (resource === 'voiceMail') {
					if (operation === 'getMany') {
						const response = await wildixApiRequest.call(this, 'GET', '/api/v1/VoiceMail', {}, {}, credentialType);
						responseData = ((response.result as IDataObject)?.records as IDataObject[]) ?? [];

					} else if (operation === 'markAsRead') {
						const messageId = this.getNodeParameter('messageId', i) as string;
						responseData = await wildixApiRequest.call(this, 'PUT', `/api/v1/VoiceMail/${messageId}`, {}, {}, credentialType);

					} else if (operation === 'delete') {
						const messageIds = this.getNodeParameter('messageIds', i) as string;
						responseData = await wildixApiRequest.call(this, 'DELETE', `/api/v1/VoiceMail/${messageIds}/`, {}, {}, credentialType);

					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				} else {
					throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
				}

				const normalized = Array.isArray(responseData) ? responseData : [responseData];
				returnData.push(...normalized);

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: (error as Error).message });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
