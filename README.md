# n8n-nodes-wildix

This is an [n8n](https://n8n.io) community node package that lets you use [Wildix](https://www.wildix.com) in your n8n workflows.

Wildix is a cloud-based UCaaS platform providing business telephony (PBX/SIP/WebRTC), team messaging, contact center, and SMS/WhatsApp via Classound.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) | [Operations](#operations) | [Credentials](#credentials) | [Compatibility](#compatibility) | [Resources](#resources)

---

## Installation

This node works on any self-hosted n8n instance. It is available on npm but not yet listed in the official n8n community nodes directory — you can still install it directly.

1. Open your n8n instance and go to **Settings → Community Nodes**
2. Click **Install**
3. Enter `n8n-nodes-wildix` and click **Install**
4. Restart n8n when prompted

The **Wildix** and **Wildix Trigger** nodes will then appear in the node picker.

> **Note:** Community nodes are not available on n8n Cloud. You need a self-hosted instance (Docker, npm, or desktop app).

---

## Operations

### Wildix (action node)

| Resource | Operations |
|---|---|
| **ACL Group** | Create, Create Rule, Delete, Delete Rule, Get Many, Get Permissions, Get Rules, Update, Update Rule |
| **Alarm Clock** | Create, Delete, Get Many |
| **Application** | Create S2S Application, Create Simple Token, Delete S2S Application, Delete Simple Token, Get S2S Applications, Get Simple Tokens, Update Simple Token |
| **Broadcast** | Send |
| **Call** | Answer, Attendant Transfer, Blind Transfer, Hang Up, Hold, List Active Calls, Make Call, Originate, Originate (Advanced), Send DTMF, Set Active Device, Unhold, Update Contact Info |
| **Call History** | Change Tags, Delete Call Record, Delete Voicemails, Get Call History by User, Get Call Record, Get Full Call History, Get Personal Call History, Update Archived Status, Update Voicemails Status |
| **Call Queue** | Add Dynamic Member, Get Dynamic Members, Get Many, Get Settings, Remove Dynamic Member |
| **Colleague** | Create, Delete, Get, Get Many, Get My Info, Update |
| **Contact** | Create, Delete, Get, Get Many, Update |
| **Department** | Get Many |
| **Device** | Add, Connect, Delete, Disconnect, Get Many, List User Devices, Reset Token, Scan, Update, Verify |
| **Dialplan** | Create IVR, Create Paging Group, Create Switch, Create Time Table, Delete IVR, Delete Paging Group, Delete Switch, Delete Time Table, Get Dialplans, Get General Settings, Get IVR, Get Paging Groups, Get Switches, Get Time Tables, Update General Settings, Update IVR, Update Paging Group, Update Switch, Update Time Table |
| **Fax** | Delete, Get Many, Get Settings, Send, Update Settings |
| **Group** | Get Call Groups, Get Many |
| **Notification** | Send |
| **OAuth2 Client** | Create, Delete, Get Many, Update |
| **PBX** | Get Many |
| **PBX Setting** | Get HTTP Proxy, Get License, Get NTP, Get Settings, Get SMTP, Test SMTP, Update HTTP Proxy, Update NTP, Update Settings, Update SMTP |
| **PBX System** | Get Candidates, Get Ports Status, Get Version, Ping, Reboot |
| **PBX Upgrade** | Check for Updates, Get Upgrade Settings, Get Upgrade Status, Start Upgrade, Update Upgrade Settings |
| **Personal** | Get ACL, Get Features, Get Locations, Get Paging Groups, Get Presence, Get Presence Location, Get Roster, Get Settings, Get Token, Reset Token, Update Features, Update Presence, Update Presence Location, Update Settings |
| **Phonebook** | Create, Delete, Get, Get Many, Update |
| **Recording** | Delete, Get Many |
| **SIP Registration** | Get Many |
| **SMS** | Send |
| **Sound** | Create, Delete, Get Directory Contents, Get Many, Update |
| **Trunk** | Create FXO Trunk, Create PSTN Trunk, Create SIP Trunk, Create Trunk Group, Delete FXO Trunk, Delete PSTN Trunk, Delete SIP Trunk, Delete Trunk Group, Get FXO Trunks, Get PSTN Trunks, Get SIP Trunks, Get Trunk Groups, Get Trunk Prices, Update FXO Trunk, Update PSTN Trunk, Update SIP Trunk, Update Trunk Group |
| **Trusted IP** | Create, Delete, Get Many |
| **Video Conference** | Create Room, Delete Room, Get Rooms, Invite, Update Room |
| **Voicemail** | Delete, Get Many, Update Status |

### Wildix Trigger (webhook trigger)

Listens for real-time call events from Wildix:

| Event | Description |
|---|---|
| `call:live:progress` | Call started or state changed |
| `call:live:completed` | Call ended normally |
| `call:live:interrupted` | Call ended due to an error |
| `call:live:transcription` | Transcription segment available |

Incoming webhook requests are verified using HMAC-SHA256 (`X-Wildix-Signature` header). Requests with invalid signatures are rejected with HTTP 401.

---

## Credentials

Two authentication methods are supported:

### Bearer Token (recommended for testing)

1. In your Wildix Administration Console, generate a personal access token.
2. In n8n, create a **Wildix Bearer Token API** credential and enter:
   - **PBX Subdomain** — e.g. `company.wildixin.com`
   - **Bearer Token** — your access token

### OAuth2

1. In your Wildix Administration Console, create an OAuth2 application under **Integrations → OAuth2 Clients**.
2. Note the **Client ID** and **Client Secret**.
3. In n8n, create a **Wildix OAuth2 API** credential and enter:
   - **PBX Subdomain** — e.g. `company.wildixin.com`
   - **Client ID** and **Client Secret**
4. Complete the OAuth2 authorization flow.

### Webhook Setup (Wildix Trigger)

1. Add a **Wildix Trigger** node to your workflow and activate the workflow — n8n will generate a webhook URL.
2. In your Wildix Administration Console, register the webhook URL under **Integrations → Webhooks**.
3. Copy the webhook secret from the Wildix console and paste it into the **Webhook Secret** field on the trigger node.

---

## Compatibility

Tested against n8n `>=1.0.0`.

Requires Node.js `>=18`.

---

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Wildix API reference](https://docs.wildix.com/api-reference/)
- [Wildix webhooks guide](https://docs.wildix.com/docs/calls/webhooks/)
- [Wildix authentication](https://docs.wildix.com/wms/index.html#section/Authentication)
