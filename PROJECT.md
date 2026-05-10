# n8n Community Node: Wildix

## Overview

`n8n-nodes-wildix` is a community node package for [n8n](https://n8n.io) that integrates with the [Wildix](https://www.wildix.com) Unified Communications platform. It enables n8n workflows to interact with Wildix PBX systems — triggering on call events, managing users, sending messages, retrieving call history, and more.

---

## What is Wildix?

Wildix is a cloud-based UCaaS (Unified Communications as a Service) platform providing:
- Business telephony (PBX, SIP, WebRTC)
- Team messaging and video conferencing (x-bees)
- Contact center and call analytics
- SMS and WhatsApp via Classound
- CRM and third-party integrations via REST API and webhooks

---

## Package Structure

```
n8n-nodes-wildix/
├── credentials/
│   └── WildixApi.credentials.ts         # OAuth2 credentials definition
├── nodes/
│   ├── Wildix/
│   │   ├── Wildix.node.ts               # Main action node
│   │   ├── WildixTrigger.node.ts        # Webhook trigger node
│   │   ├── wildix.svg                   # Node icon
│   │   ├── GenericFunctions.ts          # Shared HTTP helpers
│   │   └── descriptions/
│   │       ├── CallDescription.ts       # originate + call control
│   │       ├── ColleagueDescription.ts  # user/colleague CRUD
│   │       ├── DeviceDescription.ts
│   │       ├── PbxDescription.ts
│   │       ├── DepartmentDescription.ts
│   │       ├── GroupDescription.ts
│   │       ├── CallQueueDescription.ts
│   │       ├── AclGroupDescription.ts
│   │       └── Oauth2ClientDescription.ts
├── package.json
├── tsconfig.json
└── PROJECT.md
```

---

## Authentication

### Method: OAuth2 (per-PBX subdomain)

Each Wildix PBX instance has its own subdomain (e.g., `company.wildixin.com`). The OAuth2 flow is tied to this subdomain.

**Credentials fields:**
| Field | Description |
|-------|-------------|
| `PBX Subdomain` | e.g., `company.wildixin.com` |
| `Client ID` | OAuth2 app client ID |
| `Client Secret` | OAuth2 app client secret |
| `Access Token` | Auto-managed by n8n OAuth2 flow |
| `Refresh Token` | Auto-managed, tokens auto-refresh |

**Auth base URL:** `https://{pbx-subdomain}/auth/`

**Scopes required:** TBD per resource (see Wildix OAuth2 docs at `https://docs.wildix.com/wms/index.html#section/Authentication`)

---

## Node: `Wildix` (Action Node)

API scope: **WMS PBX REST API** (`https://docs.wildix.com/api-reference/rest/wms/pbx/`)
TypeScript client: `@wildix/wms-api-client`

### Resources & Operations

#### 1. Call — origination & control
Maps to: `originateCall`, `callControlMakeCall`, `callControlAnswer`, `callControlHangup`, `callControlHold`, `callControlUnhold`, `callControlBlindTransfer`, `callControlAttendantTransfer`, `callControlDtmf`, `callControlUpdateContactInfo`, `listUserActiveCalls`

| Operation | API Method | Key Parameters |
|-----------|-----------|----------------|
| `Originate Call` | `originateCall` | `from` (extension/user), `to` (number) |
| `Make Call (control)` | `callControlMakeCall` | `user`, `number` |
| `Answer` | `callControlAnswer` | `callId`, `channel` |
| `Hang Up` | `callControlHangup` | `callId` |
| `Hold` | `callControlHold` | `callId` |
| `Unhold` | `callControlUnhold` | `callId` |
| `Blind Transfer` | `callControlBlindTransfer` | `callId`, `destination` |
| `Attended Transfer` | `callControlAttendantTransfer` | `callId`, `destination` |
| `Send DTMF` | `callControlDtmf` | `callId`, `digit` |
| `Update Contact Info` | `callControlUpdateContactInfo` | `callId`, contact fields |
| `List Active Calls` | `listUserActiveCalls` | `userId` |

#### 2. Colleague (User)
Maps to: `getPbxColleagues`, `getColleagueById`, `createPbxColleague`, `updatePbxColleague`, `deletePbxColleague`, `getPersonalInfo`

| Operation | API Method | Key Parameters |
|-----------|-----------|----------------|
| `Get All` | `getPbxColleagues` | `returnAll`, `limit`, filters |
| `Get by ID` | `getColleagueById` | `colleagueId` |
| `Get My Info` | `getPersonalInfo` | — |
| `Create` | `createPbxColleague` | `name`, `email`, `extension`, `mobilePhone` |
| `Update` | `updatePbxColleague` | `colleagueId`, fields to update |
| `Delete` | `deletePbxColleague` | `colleagueId` |

#### 3. Device
Maps to: `listUserDevices`

| Operation | API Method | Key Parameters |
|-----------|-----------|----------------|
| `List User Devices` | `listUserDevices` | `userId` |

#### 4. PBX
Maps to: `getPbxes`

| Operation | API Method | Key Parameters |
|-----------|-----------|----------------|
| `Get All PBX Instances` | `getPbxes` | — |

#### 5. Department
Maps to: `listPbxDepartments`

| Operation | API Method | Key Parameters |
|-----------|-----------|----------------|
| `Get All Departments` | `listPbxDepartments` | — |

#### 6. Group
Maps to: `listPbxGroups`, `getPbxCallGroups`

| Operation | API Method | Key Parameters |
|-----------|-----------|----------------|
| `List Groups` | `listPbxGroups` | — |
| `Get Call Groups` | `getPbxCallGroups` | filters |

#### 7. Call Queue
Maps to: `getCallQueueSettings`

| Operation | API Method | Key Parameters |
|-----------|-----------|----------------|
| `Get Settings` | `getCallQueueSettings` | — |

#### 8. ACL Group
Maps to: `createPbxAclGroup`, `deletePbxAclGroup`, `getPbxAclGroupsPermissions`

| Operation | API Method | Key Parameters |
|-----------|-----------|----------------|
| `Create` | `createPbxAclGroup` | `name`, permissions |
| `Delete` | `deletePbxAclGroup` | `groupId` |
| `Get Permissions` | `getPbxAclGroupsPermissions` | `groupId` |

#### 9. OAuth2 Client
Maps to: `getPbxOauth2Clients`, `createPbxOauth2Client`, `updatePbxOauth2Client`, `deletePbxOauth2Client`

| Operation | API Method | Key Parameters |
|-----------|-----------|----------------|
| `Get All` | `getPbxOauth2Clients` | — |
| `Create` | `createPbxOauth2Client` | `name`, `redirectUris` |
| `Update` | `updatePbxOauth2Client` | `clientId`, fields |
| `Delete` | `deletePbxOauth2Client` | `clientId` |

---

## Node: `WildixTrigger` (Webhook Trigger Node)

Listens for real-time call events via Wildix webhooks. Wildix sends HTTP POST requests to the n8n webhook URL with HMAC-SHA256 signature for verification.

### Signature Verification

Every incoming webhook is authenticated by verifying:
```
HMAC-SHA256(secret, JSON.stringify(body)) === X-Wildix-Signature header
```
Requests with invalid signatures are rejected with HTTP 401.

### Trigger Events

| Event | Wildix Event Type | Description |
|-------|-------------------|-------------|
| `Call Started / Updated` | `call:live:progress` | Fires when a call starts or its state changes |
| `Call Completed` | `call:live:completed` | Fires when a call ends normally |
| `Call Interrupted` | `call:live:interrupted` | Fires when a call ends due to an error |
| `Call Transcription` | `call:live:transcription` | Fires when a transcription segment is available |

### Webhook Payload Fields (common)
```json
{
  "eventId": "string",
  "pbxId": "string",
  "companyId": "string",
  "timestamp": "ISO8601",
  "eventType": "call:live:progress",
  "integrationId": "string",
  "data": {
    "callId": "string",
    "caller": { "name": "string", "number": "string", "userId": "string" },
    "callee": { "name": "string", "number": "string", "userId": "string" },
    "duration": 0,
    "talkTime": 0,
    "waitTime": 0,
    "status": "string"
  }
}
```

### Webhook Setup Flow
1. User creates a `WildixTrigger` node in n8n — n8n auto-generates a webhook URL.
2. User registers this URL in the Wildix Administration Console under **Integrations > Webhooks**.
3. User pastes the webhook secret into the n8n credentials.
4. On activation, n8n starts listening; on deactivation it stops (optionally calls Wildix API to deregister).

---

## API Base URLs

| Service | Base URL | Scope |
|---------|----------|-------|
| WMS PBX API | `https://{pbx-subdomain}/api/v1/` | Phase 1–2 (this node) |
| Auth | `https://{pbx-subdomain}/auth/` | OAuth2 token exchange |
| Interactive API docs (per instance) | `https://{pbx-subdomain}/api/v1/doc/` | Swagger UI for your PBX |
| TypeScript client | `@wildix/wms-api-client` (npm) | Official SDK |

> Out of scope for v1 (separate node packages if needed):
> - Conversations (x-bees): `https://conversations.wildix.com/v1/`
> - History / Analytics: separate CDS API
> - Classound SMS/WA: `https://classound.wildix.com/v1/`

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| TypeScript | ~5.x | Language |
| `n8n-workflow` | `>=1.0.0` | Node interfaces, types |
| `n8n-core` | `>=1.0.0` | Credential helpers, HTTP request |
| Node.js | `>=18` | Runtime |

### n8n Node Standards
- Implement `INodeType` (action) and `INodeType` + `IWebhookFunctions` (trigger)
- Use `this.helpers.requestWithAuthentication()` for all API calls
- Use `this.helpers.returnJsonArray()` for output
- Pagination via `returnAll` + `limit` pattern
- All fields described via `INodeProperties[]` declarative UI

---

## Development Roadmap

### Phase 1 — Foundation
- [ ] Scaffold package (npm init, tsconfig, package.json with n8n community node metadata)
- [ ] Implement `WildixApi` OAuth2 credentials (subdomain + client ID/secret)
- [ ] `GenericFunctions.ts` with `wildcardRequest()` helper
- [ ] **Call** resource: `Originate Call`, `Hang Up`, `Hold`, `Unhold`, `Blind Transfer`, `Answer`, `DTMF`, `List Active Calls`
- [ ] **Colleague** resource: Get All, Get by ID, Get My Info, Create, Update, Delete

### Phase 2 — Remaining PBX Resources
- [ ] **Device** resource: List User Devices
- [ ] **PBX** resource: Get All PBX Instances
- [ ] **Department** resource: List Departments
- [ ] **Group** resource: List Groups, Get Call Groups
- [ ] **Call Queue** resource: Get Settings
- [ ] **ACL Group** resource: Create, Delete, Get Permissions
- [ ] **OAuth2 Client** resource: CRUD

### Phase 3 — Trigger Node
- [ ] `WildixTrigger` node: receive webhook POST from Wildix
- [ ] HMAC-SHA256 signature verification
- [ ] Event filter (call:live:progress, call:live:completed, call:live:interrupted, call:live:transcription)

### Phase 4 — Polish & Publish
- [ ] Full error handling with descriptive n8n `NodeApiError` messages
- [ ] Credential test endpoint (`getPersonalInfo`)
- [ ] README, wildix.svg icon, node screenshot
- [ ] Publish to npm as `n8n-nodes-wildix` with keyword `n8n-community-node-package`
- [ ] Submit PR to [n8n community nodes list](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/package.json)

---

## Key References

- [Wildix Developer Docs](https://docs.wildix.com/)
- [Wildix API Reference](https://docs.wildix.com/api-reference/)
- [Wildix Webhooks Guide](https://docs.wildix.com/docs/calls/webhooks/)
- [Wildix CRM Webhook Integration Guide](https://docs.wildix.com/guides/2024/07/01/webhooks-calls-crm-intergration/)
- [Wildix Auth Documentation](https://wildix.atlassian.net/wiki/x/oBPOAQ)
- [n8n Community Node Docs](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n Node Development Guide](https://docs.n8n.io/integrations/creating-nodes/build/)
