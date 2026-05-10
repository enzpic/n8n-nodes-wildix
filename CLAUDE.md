# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`n8n-nodes-wildix` — an n8n community node package integrating the [Wildix UCaaS platform](https://www.wildix.com). Full planning detail is in `PROJECT.md`.

## Commands

Once the package is scaffolded these are the expected commands (standard n8n community node toolchain):

```bash
npm run build      # tsc — compile TypeScript to dist/
npm run dev        # tsc --watch
npm run lint       # eslint nodes/ credentials/
npm run lintfix    # eslint --fix
npm test           # jest (if tests are added)
```

To test the node locally in n8n:
```bash
npm run build && npm link
# In your local n8n install:
npm link n8n-nodes-wildix
```

## Architecture

Two nodes, one credential type:

### Credential: `WildixApi` (`credentials/WildixApi.credentials.ts`)
OAuth2 credential scoped per PBX subdomain. Fields: `pbxSubdomain`, `clientId`, `clientSecret`. Token URLs are constructed dynamically from the subdomain: `https://{pbxSubdomain}/auth/`.

### Action node: `Wildix` (`nodes/Wildix/Wildix.node.ts`)
Targets the WMS PBX REST API (`https://{pbxSubdomain}/api/v1/`). The official TypeScript SDK is `@wildix/wms-api-client`.

Resources (each has its own description file under `nodes/Wildix/descriptions/`):
- **Call** — originate, control (answer, hangup, hold, unhold, transfer, DTMF), list active calls
- **Colleague** — CRUD + get my info
- **Device** — list user devices
- **PBX** — list instances
- **Department** — list
- **Group** — list groups, get call groups
- **CallQueue** — get settings
- **AclGroup** — create, delete, get permissions
- **Oauth2Client** — CRUD

Shared HTTP helper lives in `nodes/Wildix/GenericFunctions.ts`.

### Trigger node: `WildixTrigger` (`nodes/Wildix/WildixTrigger.node.ts`)
Receives webhook POSTs from Wildix. Verifies each request with HMAC-SHA256: `HMAC-SHA256(secret, JSON.stringify(body)) === X-Wildix-Signature`. Rejects invalid signatures with HTTP 401.

Events: `call:live:progress`, `call:live:completed`, `call:live:interrupted`, `call:live:transcription`.

## n8n Node Conventions

- All API calls via `this.helpers.requestWithAuthentication('wildixApi', options)`.
- Output via `this.helpers.returnJsonArray(items)`.
- Pagination: expose `returnAll` (boolean) + `limit` (number, default 50) on list operations.
- Node UI is fully declarative — use `INodeProperties[]` arrays in each description file, never hardcode values in `execute()`.
- Errors: wrap API errors in `new NodeApiError(this.getNode(), error)`.
- The credential test endpoint is `GET /api/v1/colleagues/me` (maps to `getPersonalInfo`).
- `n8n_nodes_api_version` in `package.json` must be `1`; `keywords` must include `n8n-community-node-package`.
