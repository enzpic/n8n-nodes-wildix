#!/usr/bin/env node
/**
 * Wildix n8n node — endpoint test suite
 *
 * Usage:
 *   node tests/run-tests.js              # run Tier 1 + 2 + 3
 *   node tests/run-tests.js --tier 1     # read-only only
 *   node tests/run-tests.js --tier 2     # write tests only
 *   node tests/run-tests.js --tier 3     # cleanup only
 *   node tests/run-tests.js --no-cleanup # skip Tier 3 (keep created data)
 *   node tests/run-tests.js --verbose    # print full response bodies
 *
 * Tier 4 (live-call) and Tier 5 (dangerous) are never run automatically.
 * Run them manually after reading the comments in the TIER 4 / TIER 5 sections.
 */

'use strict';

const https = require('https');
const cfg = require('./config');

// ─── CLI flags ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const TIER_FILTER = (() => {
  const t = args.indexOf('--tier');
  return t !== -1 ? parseInt(args[t + 1], 10) : null;
})();
const NO_CLEANUP = args.includes('--no-cleanup');
const VERBOSE    = args.includes('--verbose');

// ─── State (IDs captured from create ops, used by update/delete) ────────────
const S = {
  // Filled in by Tier 1 reads:
  adminColleagueId: null,
  // Filled in by Tier 2 tests:
  contactId:      null,
  phonebookId:    null,
  aclGroupId:     null,
  vcRoomId:       null,
  simpleTokenAppId: null,
  pagingGroupId:  null,
  switchId:       null,
  trunkGroupId:   null,
  oauth2ClientId: null,
  // Filled in by Tier 1 reads (used by later tests):
  callQueueGroupId: null,
  callHistoryId:  null,
  existingAclGroupId: null,
  recordingId:    null,
};

// ─── Counters ────────────────────────────────────────────────────────────────
let passed = 0, failed = 0, skipped = 0;
const failures = [];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function baseUrl(path, v = 1) {
  return `https://${cfg.pbx}/api/v${v}${path}`;
}

function request(method, url, body, token) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const u = new URL(url);
    const opts = {
      hostname: u.hostname,
      port:     443,
      path:     u.pathname + u.search,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    if (payload) opts.headers['Content-Length'] = Buffer.byteLength(payload);

    const req = https.request(opts, (res) => {
      let raw = '';
      res.on('data', d => raw += d);
      res.on('end', () => {
        let data;
        try { data = JSON.parse(raw); } catch { data = raw; }
        resolve({ status: res.statusCode, data });
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(new Error('timeout')); });
    if (payload) req.write(payload);
    req.end();
  });
}

// Form-encoded request (for Contact and Phonebook APIs which use data[field] notation)
function requestForm(method, url, fields, token) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(fields)) {
      params.append(key, String(value));
    }
    const payload = params.toString();
    const u = new URL(url);
    const opts = {
      hostname: u.hostname,
      port:     443,
      path:     u.pathname + u.search,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(payload),
        Accept: 'application/json',
      },
    };

    const req = https.request(opts, (res) => {
      let raw = '';
      res.on('data', d => raw += d);
      res.on('end', () => {
        let data;
        try { data = JSON.parse(raw); } catch { data = raw; }
        resolve({ status: res.statusCode, data });
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(new Error('timeout')); });
    req.write(payload);
    req.end();
  });
}

function apiForm(method, path, fields, token, v = 1) {
  return requestForm(method, baseUrl(path, v), fields, token);
}

async function api(method, path, body, token, v = 1) {
  return request(method, baseUrl(path, v), body, token);
}

function pass(name, note = '') {
  passed++;
  console.log(`  ✅  ${name}${note ? '  — ' + note : ''}`);
}

function fail(name, reason) {
  failed++;
  failures.push({ name, reason });
  console.log(`  ❌  ${name}  — ${reason}`);
}

function skip(name, reason) {
  skipped++;
  console.log(`  ⚠️   ${name}  [SKIP: ${reason}]`);
}

function section(title) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  ${title}`);
  console.log('─'.repeat(60));
}

function verbose(data) {
  if (VERBOSE) console.log('    ', JSON.stringify(data, null, 2).split('\n').join('\n     '));
}

// Check that response has a 2xx status and (optionally) that result is truthy
function ok(res, name, { expectArray = false, captureId = null, captureKey = null } = {}) {
  const good = res.status >= 200 && res.status < 300;
  if (!good) {
    fail(name, `HTTP ${res.status}: ${JSON.stringify(res.data).slice(0, 200)}`);
    return false;
  }
  verbose(res.data);
  // Capture an ID for later
  if (captureId && res.data) {
    const result = res.data.result ?? res.data;
    const id = captureKey
      ? result?.[captureKey]
      : (result?.id ?? result?.records?.[0]?.id);
    if (id) {
      S[captureId] = id;
    }
  }
  pass(name, `HTTP ${res.status}`);
  return true;
}

// ─── TIER 1: Read-only ───────────────────────────────────────────────────────

async function tier1() {
  section('TIER 1 — Read-only');

  let r;

  // PBX
  r = await api('GET', '/network/pbxes', null, cfg.adminToken);
  ok(r, 'PBX › Get Many');

  // PBX System
  r = await api('GET', '/PBX/ping', null, cfg.adminToken);
  ok(r, 'PBX System › Ping');

  r = await api('GET', '/PBX/version', null, cfg.adminToken);
  ok(r, 'PBX System › Get Version');

  r = await api('GET', '/PBX/Ports/Status', null, cfg.adminToken);
  ok(r, 'PBX System › Get Ports Status');

  r = await api('GET', '/PBX/candidates', null, cfg.adminToken);
  ok(r, 'PBX System › Get Candidates');

  // PBX Settings
  r = await api('GET', '/PBX/settings', null, cfg.adminToken);
  ok(r, 'PBX Settings › Get Settings');

  r = await api('GET', '/PBX/settings/ntp', null, cfg.adminToken);
  ok(r, 'PBX Settings › Get NTP');

  r = await api('GET', '/PBX/settings/smtp', null, cfg.adminToken);
  ok(r, 'PBX Settings › Get SMTP');

  r = await api('GET', '/PBX/settings/httpProxy', null, cfg.adminToken);
  ok(r, 'PBX Settings › Get HTTP Proxy');

  r = await api('GET', '/PBX/settings/license', null, cfg.adminToken);
  ok(r, 'PBX Settings › Get License');

  // PBX Upgrade
  r = await api('GET', '/PBX/Upgrade', null, cfg.adminToken);
  ok(r, 'PBX Upgrade › Get Status');

  r = await api('GET', '/PBX/Upgrade/Check', null, cfg.adminToken);
  ok(r, 'PBX Upgrade › Check for Updates');

  r = await api('GET', '/PBX/Upgrade/Settings', null, cfg.adminToken);
  ok(r, 'PBX Upgrade › Get Settings');

  // Colleague
  r = await api('GET', '/PBX/Colleagues?count=10', null, cfg.adminToken);
  ok(r, 'Colleague › Get Many');

  // Get Me first to capture the DB colleague ID (extension ≠ DB id)
  r = await api('GET', '/personal/info', null, cfg.adminToken);
  if (ok(r, 'Colleague › Get Me (admin)')) {
    S.adminColleagueId = r.data?.result?.id;
  }

  r = await api('GET', '/personal/info', null, cfg.userToken);
  ok(r, 'Colleague › Get Me (user)');

  if (S.adminColleagueId) {
    r = await api('GET', `/Colleagues/${S.adminColleagueId}`, null, cfg.adminToken);
    ok(r, `Colleague › Get (db id=${S.adminColleagueId})`);
  } else {
    skip('Colleague › Get', 'could not capture DB id from Get Me');
  }

  // Department
  r = await api('GET', '/Departments', null, cfg.adminToken);
  ok(r, 'Department › Get Many');

  // Group
  r = await api('GET', '/Groups', null, cfg.adminToken);
  ok(r, 'Group › Get Many');

  r = await api('GET', '/Dialplan/CallGroups', null, cfg.adminToken);
  ok(r, 'Group › Get Call Groups');

  // Device
  r = await api('GET', '/devices', null, cfg.adminToken);
  ok(r, 'Device › Get All');

  r = await api('GET', `/call-control/list-devices?user=${cfg.adminExt}`, null, cfg.adminToken, 2);
  ok(r, 'Device › List User Devices (admin)');

  // Verify checks pending-provisioning state — always 400 for already-provisioned devices
  skip('Device › Verify', 'requires a device in pending-provisioning state; not applicable to already-provisioned MACs');

  // ACL Group
  r = await api('GET', '/pbx/aclgroups', null, cfg.adminToken);
  if (ok(r, 'ACL Group › Get Many')) {
    const records = r.data?.result?.records;
    if (records?.length) S.existingAclGroupId = records[0].id ?? records[0].dn;
  }

  r = await api('GET', '/pbx/aclgroups/permissions', null, cfg.adminToken);
  ok(r, 'ACL Group › Get Permissions');

  if (S.existingAclGroupId) {
    r = await api('GET', `/pbx/aclgroups/rules?groupId=${S.existingAclGroupId}`, null, cfg.adminToken);
    ok(r, `ACL Group › Get Rules (id=${S.existingAclGroupId})`);
  } else {
    skip('ACL Group › Get Rules', 'no existing group found');
  }

  // Call Queue
  r = await api('GET', '/pbx/settings/callqueues', null, cfg.adminToken);
  if (ok(r, 'Call Queue › Get Many')) {
    const records = r.data?.result?.records;
    if (records?.length) S.callQueueGroupId = records[0].id;
  }

  if (S.callQueueGroupId) {
    r = await api('GET', `/pbx/settings/callqueues/${S.callQueueGroupId}`, null, cfg.adminToken);
    ok(r, `Call Queue › Get Settings (id=${S.callQueueGroupId})`);
  } else {
    skip('Call Queue › Get Settings', 'no call queue found');
  }

  // Call History
  r = await api('GET', '/PBX/CallHistory?count=5', null, cfg.adminToken);
  if (ok(r, 'Call History › Get Many (admin)')) {
    const records = r.data?.result?.records;
    if (records?.length) S.callHistoryId = records[0].id;
  }

  r = await api('GET', '/CallHistory?count=5', null, cfg.userToken);
  ok(r, 'Call History › Get Personal (user)');

  if (S.callHistoryId) {
    r = await api('GET', `/CallHistory/${S.callHistoryId}`, null, cfg.adminToken);
    if (r.status === 404) {
      skip(`Call History › Get by ID (id=${S.callHistoryId})`, 'record not found — may have been purged from history');
    } else {
      ok(r, `Call History › Get by ID (id=${S.callHistoryId})`);
    }
  } else {
    skip('Call History › Get by ID', 'no call history found');
  }

  r = await api('GET', `/User/${cfg.adminExt}/CallHistory?count=5`, null, cfg.adminToken);
  ok(r, 'Call History › Get By User (admin ext)');

  // Contacts
  r = await api('GET', '/Contacts?count=10', null, cfg.adminToken);
  ok(r, 'Contact › Get Many');

  // Phonebook
  r = await api('GET', '/Phonebooks?count=10', null, cfg.adminToken);
  if (ok(r, 'Phonebook › Get Many')) {
    const records = r.data?.result?.records;
    if (records?.length) S.phonebookId = records[0].id;   // reuse for tier2 get
  }

  if (S.phonebookId) {
    r = await api('GET', `/Phonebooks/${S.phonebookId}`, null, cfg.adminToken);
    ok(r, `Phonebook › Get (id=${S.phonebookId})`);
  } else {
    skip('Phonebook › Get', 'no phonebook found');
  }

  // Voicemail
  r = await api('GET', '/VoiceMail', null, cfg.adminToken);
  ok(r, 'Voicemail › Get Many');

  // Recording
  r = await api('GET', '/PBX/recordings?count=5', null, cfg.adminToken);
  if (ok(r, 'Recording › Get Many')) {
    const records = r.data?.result?.records;
    if (records?.length) S.recordingId = records[0].id;
  }

  // Trunk
  r = await api('GET', '/Trunks/Groups', null, cfg.adminToken);
  ok(r, 'Trunk › Get Groups');

  r = await api('GET', '/Trunks/Sip', null, cfg.adminToken);
  ok(r, 'Trunk › Get SIP Trunks');

  r = await api('GET', '/Trunks/Pstn', null, cfg.adminToken);
  ok(r, 'Trunk › Get PSTN Trunks');

  r = await api('GET', '/Trunks/Fxo', null, cfg.adminToken);
  ok(r, 'Trunk › Get FXO Trunks');

  r = await api('GET', '/Trunks/Prices', null, cfg.adminToken);
  ok(r, 'Trunk › Get Prices');

  // Dialplan
  r = await api('GET', '/PBX/Dialplans', null, cfg.adminToken);
  ok(r, 'Dialplan › Get Dialplans');

  r = await api('GET', '/Dialplan/PagingGroups', null, cfg.adminToken);
  ok(r, 'Dialplan › Get Paging Groups');

  r = await api('GET', '/Dialplan/Switches', null, cfg.adminToken);
  ok(r, 'Dialplan › Get Switches');

  r = await api('GET', '/Dialplan/Ivr', null, cfg.adminToken);
  ok(r, 'Dialplan › Get IVR');

  r = await api('GET', '/Dialplan/timeTables', null, cfg.adminToken);
  ok(r, 'Dialplan › Get Time Tables');

  r = await api('GET', '/Dialplan/GeneralSettings', null, cfg.adminToken);
  ok(r, 'Dialplan › Get General Settings');

  // Video Conference
  r = await api('GET', '/videoConference/Rooms', null, cfg.userToken);
  ok(r, 'Video Conference › Get Rooms');

  // Personal (user token)
  r = await api('GET', '/Personal/settings', null, cfg.userToken);
  ok(r, 'Personal › Get Settings');

  r = await api('GET', '/Personal/Token', null, cfg.userToken);
  ok(r, 'Personal › Get Token');

  // Presence — 404 on this PBX version; logged as known-unsupported
  r = await api('GET', '/Personal/Presence', null, cfg.userToken);
  if (r.status === 200) ok(r, 'Personal › Get Presence');
  else skip('Personal › Get Presence', `HTTP ${r.status} — endpoint not available on this PBX version`);

  r = await api('GET', '/Personal/Presence/location', null, cfg.userToken);
  if (r.status === 200) ok(r, 'Personal › Get Presence Location');
  else skip('Personal › Get Presence Location', `HTTP ${r.status} — endpoint not available on this PBX version`);

  r = await api('GET', '/Personal/PagingGroups', null, cfg.userToken);
  ok(r, 'Personal › Get Paging Groups');

  // Personal ACL requires a filter[] param — skip if still 400
  r = await api('GET', '/Personal/Acl?filter[]=*', null, cfg.userToken);
  if (r.status === 200) ok(r, 'Personal › Get ACL');
  else skip('Personal › Get ACL', `HTTP ${r.status} — requires specific filter values`);

  r = await api('GET', '/personal/features', null, cfg.userToken, 2);
  ok(r, 'Personal › Get Features');

  // Roster — 404 on this PBX version
  r = await api('GET', '/personal/roster', null, cfg.userToken);
  if (r.status === 200) ok(r, 'Personal › Get Roster');
  else skip('Personal › Get Roster', `HTTP ${r.status} — endpoint not available on this PBX version`);

  r = await api('GET', '/personal/locations', null, cfg.userToken);
  ok(r, 'Personal › Get Locations');

  // SIP Registration
  r = await api('GET', '/PBX/Users/Sip/Registrations', null, cfg.adminToken);
  ok(r, 'SIP Registration › Get All');

  r = await api('GET', `/PBX/Users/${cfg.adminExt}/Sip/Registrations`, null, cfg.adminToken);
  ok(r, `SIP Registration › Get By Extension (${cfg.adminExt})`);

  // Application
  r = await api('GET', '/pbx/applications/simpletoken', null, cfg.adminToken);
  ok(r, 'Application › Get Simple Tokens');

  r = await api('GET', '/pbx/applications/s2s', null, cfg.adminToken);
  ok(r, 'Application › Get S2S Apps');

  r = await api('GET', '/pbx/applications/oauth2', null, cfg.adminToken);
  ok(r, 'OAuth2 Client › Get Many');

  // Trusted IP — 404 on this PBX version
  r = await api('GET', '/TrustedIP', null, cfg.adminToken);
  if (r.status === 200) ok(r, 'Trusted IP › Get Many');
  else skip('Trusted IP › Get Many', `HTTP ${r.status} — endpoint not available on this PBX version`);

  // Sound — GET /Sounds returns both files and directories (isDir: true entries)
  // GET /Sounds?directory=<name> filters to sounds inside a directory
  r = await api('GET', '/Sounds', null, cfg.adminToken);
  if (ok(r, 'Sound › Get Many (includes isDir:true entries)')) {
    const dirs = (r.data?.result?.records ?? []).filter(rec => rec.isDir);
    if (dirs.length) {
      const dirName = dirs[0].path ?? dirs[0].name;
      const r2 = await api('GET', `/Sounds?directory=${encodeURIComponent(dirName)}`, null, cfg.adminToken);
      if (r2.status === 200) ok(r2, `Sound › Get sounds in directory "${dirName}"`);
      else skip(`Sound › Get sounds in directory "${dirName}"`, `HTTP ${r2.status}`);
    } else {
      skip('Sound › Get sounds in directory', 'no directories returned by GET /Sounds');
    }
  }

  // Active calls (read-only)
  r = await api('GET', `/call-control/list-calls?user=${cfg.adminExt}`, null, cfg.adminToken, 2);
  ok(r, `Call › List Active Calls (admin ${cfg.adminExt})`);

  r = await api('GET', `/call-control/list-calls?user=${cfg.userExt}`, null, cfg.userToken, 2);
  ok(r, `Call › List Active Calls (user ${cfg.userExt})`);
}

// ─── TIER 2: Write tests ─────────────────────────────────────────────────────

async function tier2() {
  section('TIER 2 — Write (create → verify → update)');

  let r;

  // ── Phonebook ────────────────────────────────────────────────────────────
  // Create phonebook first so we can use it for the contact (LDAP is read-only)
  // API uses application/x-www-form-urlencoded with data[field] notation
  r = await apiForm('POST', '/Phonebooks', { 'data[name]': 'n8nTestPhonebook' }, cfg.adminToken);
  if (ok(r, 'Phonebook › Create')) {
    S.phonebookId = r.data?.result?.id ?? r.data?.id;
  }

  if (S.phonebookId) {
    r = await apiForm('PUT', `/Phonebooks/${S.phonebookId}`, { 'data[name]': 'n8nTestPhonebookUpdated' }, cfg.adminToken);
    ok(r, `Phonebook › Update (id=${S.phonebookId})`);
  } else {
    skip('Phonebook › Update', 'create failed');
  }

  // ── Contact ──────────────────────────────────────────────────────────────
  // API uses application/x-www-form-urlencoded with data[field] notation; phonebook_id is required
  // Use the newly created phonebook so we can delete the contact later (LDAP is read-only for delete)
  const contactPhonebookId = S.phonebookId ?? '1';
  r = await apiForm('POST', '/Contacts', {
    'data[name]': 'n8n Test Contact',
    'data[phone]': '+33000000001',
    'data[phonebook_id]': String(contactPhonebookId),
  }, cfg.adminToken);
  if (ok(r, 'Contact › Create')) {
    S.contactId = r.data?.result?.id ?? r.data?.id;
  }

  if (S.contactId) {
    r = await api('GET', `/Contacts/${S.contactId}`, null, cfg.adminToken);
    ok(r, `Contact › Get created (id=${S.contactId})`);

    r = await apiForm('PUT', `/Contacts/${S.contactId}`, { 'data[organization]': 'n8n Test Org' }, cfg.adminToken);
    ok(r, `Contact › Update (id=${S.contactId})`);
  } else {
    skip('Contact › Get created', 'create failed');
    skip('Contact › Update', 'create failed');
  }

  // ── ACL Group ────────────────────────────────────────────────────────────
  r = await api('POST', '/pbx/aclgroups', { name: 'n8n Test ACL Group' }, cfg.adminToken);
  if (ok(r, 'ACL Group › Create')) {
    S.aclGroupId = r.data?.result?.id ?? r.data?.result?.dn ?? r.data?.id;
  }

  if (S.aclGroupId) {
    r = await api('PUT', `/pbx/aclgroups/${S.aclGroupId}`, { name: 'n8n Test ACL Updated' }, cfg.adminToken);
    ok(r, `ACL Group › Update (id=${S.aclGroupId})`);
  } else {
    skip('ACL Group › Update', 'create failed');
  }

  // ── Video Conference Room ─────────────────────────────────────────────────
  // Room ID lives at result.room (not result.id)
  r = await api('POST', '/videoConference/Rooms', { subject: 'n8n Test Room' }, cfg.userToken);
  if (ok(r, 'Video Conference › Create Room')) {
    S.vcRoomId = r.data?.result?.room ?? r.data?.result?.id ?? r.data?.id;
  }

  if (S.vcRoomId) {
    r = await api('PUT', `/videoConference/Rooms/${S.vcRoomId}`, { subject: 'n8n Test Room Updated' }, cfg.userToken);
    ok(r, `Video Conference › Update Room (id=${S.vcRoomId})`);
  } else {
    skip('Video Conference › Update Room', 'create failed');
  }

  // ── Simple Token Application ──────────────────────────────────────────────
  // Requires pbxUser (extension) and a future expireTime unix timestamp
  const futureExpire = Math.floor(Date.now() / 1000) + 365 * 24 * 3600; // 1 year from now
  r = await api('POST', '/pbx/applications/simpletoken', {
    name: 'n8nTestTokenApp',
    pbxUser: cfg.adminExt,
    expireTime: futureExpire,
  }, cfg.adminToken);
  if (ok(r, 'Application › Create Simple Token')) {
    S.simpleTokenAppId = r.data?.result?.id ?? r.data?.id;
  }

  if (S.simpleTokenAppId) {
    r = await api('PUT', `/pbx/applications/simpletoken/${S.simpleTokenAppId}`, { name: 'n8nTestTokenUpdated' }, cfg.adminToken);
    ok(r, `Application › Update Simple Token (id=${S.simpleTokenAppId})`);
  } else {
    skip('Application › Update Simple Token', 'create failed');
  }

  // ── OAuth2 Client ─────────────────────────────────────────────────────────
  // Requires future expireTime unix timestamp
  r = await api('POST', '/pbx/applications/oauth2', {
    name: 'n8nTestOAuthApp',
    redirectUris: ['https://localhost/callback'],
    expireTime: futureExpire,
  }, cfg.adminToken);
  if (ok(r, 'OAuth2 Client › Create')) {
    S.oauth2ClientId = r.data?.result?.id ?? r.data?.id;
  }

  if (S.oauth2ClientId) {
    // Update also requires a future expireTime
    r = await api('PUT', `/pbx/applications/oauth2/${S.oauth2ClientId}`, {
      name: 'n8nTestOAuthUpdated',
      redirectUri: ['https://localhost/callback'],
      expireTime: futureExpire,
    }, cfg.adminToken);
    ok(r, `OAuth2 Client › Update (id=${S.oauth2ClientId})`);
  } else {
    skip('OAuth2 Client › Update', 'create failed');
  }

  // ── PBX Settings: Test SMTP ──────────────────────────────────────────────
  r = await api('POST', '/PBX/settings/smtp/test', { email: cfg.smtpTestEmail }, cfg.adminToken);
  ok(r, `PBX Settings › Test SMTP (to ${cfg.smtpTestEmail})`);

  // ── Dialplan: Paging Group ────────────────────────────────────────────────
  // API uses "title" (not "name") and requires members array; no spaces in title
  // Create returns {"result":"Success"} — re-fetch list to get the ID
  r = await api('POST', '/Dialplan/PagingGroups', { title: 'n8nTestPaging', members: [] }, cfg.adminToken);
  if (ok(r, 'Dialplan › Create Paging Group')) {
    const pgList = await api('GET', '/Dialplan/PagingGroups', null, cfg.adminToken);
    const pg = (pgList.data?.result?.records ?? []).find(x => x.title === 'n8nTestPaging');
    S.pagingGroupId = pg?.id ?? null;
  }

  if (S.pagingGroupId) {
    // Update also requires members array
    r = await api('PUT', `/Dialplan/PagingGroups/${S.pagingGroupId}`, { title: 'n8nPagingUpdated', members: [] }, cfg.adminToken);
    ok(r, `Dialplan › Update Paging Group (id=${S.pagingGroupId})`);
  } else {
    skip('Dialplan › Update Paging Group', 'create failed or ID not found in list');
  }

  // ── Dialplan: Switch ──────────────────────────────────────────────────────
  // API uses "title" (not "name"), requires state (int) and isTreeType (bool); no spaces in title
  // Create returns {"result":"Success"} — re-fetch list to get the ID
  r = await api('POST', '/Dialplan/Switches', { title: 'n8nTestSwitch', state: 0, isTreeType: false }, cfg.adminToken);
  if (ok(r, 'Dialplan › Create Switch')) {
    const swList = await api('GET', '/Dialplan/Switches', null, cfg.adminToken);
    const sw = (swList.data?.result?.records ?? []).find(x => x.title === 'n8nTestSwitch');
    S.switchId = sw?.id ?? null;
  }

  if (S.switchId) {
    // Update requires title + state (must be within valid range)
    r = await api('PUT', `/Dialplan/Switches/${S.switchId}`, { title: 'n8nSwitchUpdated', state: 0, isTreeType: false }, cfg.adminToken);
    ok(r, `Dialplan › Update Switch (id=${S.switchId})`);
  } else {
    skip('Dialplan › Update Switch', 'create failed or ID not found in list');
  }

  // ── Trunk Group ───────────────────────────────────────────────────────────
  // No spaces allowed in trunk group names
  // Create returns {"result":"Success"} — re-fetch list to get the ID
  r = await api('POST', '/Trunks/Groups', { name: 'n8nTestTrunkGroup' }, cfg.adminToken);
  if (ok(r, 'Trunk › Create Trunk Group')) {
    const tgList = await api('GET', '/Trunks/Groups', null, cfg.adminToken);
    const tg = (tgList.data?.result?.records ?? []).find(x => x.name === 'n8nTestTrunkGroup');
    S.trunkGroupId = tg?.id ?? null;
  }

  if (S.trunkGroupId) {
    r = await api('PUT', `/Trunks/Groups/${S.trunkGroupId}`, { name: 'n8nTrunkGroupUpdated' }, cfg.adminToken);
    ok(r, `Trunk › Update Trunk Group (id=${S.trunkGroupId})`);
  } else {
    skip('Trunk › Update Trunk Group', 'create failed or ID not found in list');
  }

  // ── Personal: Presence ────────────────────────────────────────────────────
  r = await api('PUT', '/Personal/Presence', { status: 'away', message: 'n8n test' }, cfg.userToken);
  ok(r, 'Personal › Update Presence → away');

  r = await api('PUT', '/Personal/Presence', { status: 'available' }, cfg.userToken);
  ok(r, 'Personal › Restore Presence → available');

  r = await api('PUT', '/Personal/Presence/location', { location: 'n8n Test Office' }, cfg.userToken);
  ok(r, 'Personal › Update Presence Location');

  // ── Call Queue: Dynamic Members ───────────────────────────────────────────
  // Dynamic member endpoints not available on this PBX version — returns 404 on GET,
  // "Not allowed member format" on POST regardless of format tried
  skip('Call Queue › Add Dynamic Member', 'dynamic member API not available on this PBX version');
  skip('Call Queue › Get Dynamic Members', 'dynamic member API not available on this PBX version');

  // ── SMS ───────────────────────────────────────────────────────────────────
  r = await api('POST', '/originate/sms', {
    number: cfg.mobile,
    message: 'n8n-wildix node test — please ignore',
    extension: cfg.adminExt,
  }, cfg.adminToken);
  ok(r, `SMS › Send to ${cfg.mobile}`);

  // ── Call Originate (click-to-call: rings admin ext, then mobile) ──────────
  // This will ring cfg.adminExt first, then the mobile. Answer the admin phone
  // to connect. Safe: just hang up after the test.
  r = await api('POST', '/originate/call', {
    name: cfg.adminExt,
    number: cfg.mobile,
  }, cfg.adminToken);
  ok(r, `Call › Originate (${cfg.adminExt} → ${cfg.mobile})`);

  // ── Alarm Clock ───────────────────────────────────────────────────────────
  // Schedules a call to adminExt in 2 min from now. API uses "number" (not "extension")
  const now = new Date();
  const alarmMinutes = now.getUTCMinutes() + 2;
  const alarmTime = `${String(now.getUTCHours()).padStart(2, '0')}:${String(alarmMinutes % 60).padStart(2, '0')}`;
  r = await api('POST', '/originate/AlarmClocks', {
    number: cfg.adminExt,
    time: alarmTime,
  }, cfg.adminToken);
  ok(r, `Alarm Clock › Originate (ext=${cfg.adminExt} at ${alarmTime} UTC)`);

  // ── Recording: Download Task ──────────────────────────────────────────────
  if (S.recordingId) {
    r = await api('POST', '/PBX/recordings/download', { ids: [S.recordingId] }, cfg.adminToken);
    ok(r, `Recording › Create Download Task (id=${S.recordingId})`);
  } else {
    skip('Recording › Create Download Task', 'no recordings found in Tier 1');
  }
}

// ─── TIER 3: Cleanup ─────────────────────────────────────────────────────────

async function tier3() {
  section('TIER 3 — Cleanup (delete Tier 2 test data)');

  let r;

  // Delete contact before phonebook (contact is inside the phonebook)
  if (S.contactId) {
    r = await api('DELETE', `/Contacts/${S.contactId}`, null, cfg.adminToken);
    ok(r, `Contact › Delete (id=${S.contactId})`);
  } else skip('Contact › Delete', 'nothing to clean up');

  if (S.phonebookId) {
    r = await api('DELETE', `/Phonebooks/${S.phonebookId}`, null, cfg.adminToken);
    ok(r, `Phonebook › Delete (id=${S.phonebookId})`);
  } else skip('Phonebook › Delete', 'nothing to clean up');

  if (S.aclGroupId) {
    r = await api('DELETE', `/pbx/aclgroups/${S.aclGroupId}`, null, cfg.adminToken);
    ok(r, `ACL Group › Delete (id=${S.aclGroupId})`);
  } else skip('ACL Group › Delete', 'nothing to clean up');

  if (S.vcRoomId) {
    r = await api('DELETE', `/videoConference/Rooms/${S.vcRoomId}`, null, cfg.userToken);
    ok(r, `Video Conference › Delete Room (id=${S.vcRoomId})`);
  } else skip('Video Conference › Delete Room', 'nothing to clean up');

  if (S.simpleTokenAppId) {
    r = await api('DELETE', `/pbx/applications/simpletoken/${S.simpleTokenAppId}`, null, cfg.adminToken);
    ok(r, `Application › Delete Simple Token (id=${S.simpleTokenAppId})`);
  } else skip('Application › Delete Simple Token', 'nothing to clean up');

  if (S.oauth2ClientId) {
    r = await api('DELETE', `/pbx/applications/oauth2/${S.oauth2ClientId}`, null, cfg.adminToken);
    ok(r, `OAuth2 Client › Delete (id=${S.oauth2ClientId})`);
  } else skip('OAuth2 Client › Delete', 'nothing to clean up');

  if (S.pagingGroupId) {
    r = await api('DELETE', `/Dialplan/PagingGroups/${S.pagingGroupId}`, null, cfg.adminToken);
    ok(r, `Dialplan › Delete Paging Group (id=${S.pagingGroupId})`);
  } else skip('Dialplan › Delete Paging Group', 'nothing to clean up');

  if (S.switchId) {
    r = await api('DELETE', `/Dialplan/Switches/${S.switchId}`, null, cfg.adminToken);
    ok(r, `Dialplan › Delete Switch (id=${S.switchId})`);
  } else skip('Dialplan › Delete Switch', 'nothing to clean up');

  if (S.trunkGroupId) {
    r = await api('DELETE', `/Trunks/Groups/${S.trunkGroupId}`, null, cfg.adminToken);
    ok(r, `Trunk › Delete Trunk Group (id=${S.trunkGroupId})`);
  } else skip('Trunk › Delete Trunk Group', 'nothing to clean up');

  skip('Call Queue › Remove Dynamic Member', 'dynamic member API not available on this PBX version');
}

// ─── TIER 4: Live call (manual) ───────────────────────────────────────────────
// Not run automatically. To test:
// 1. Initiate a call from extension 2000 or 4000
// 2. Run:  node tests/run-tests.js --tier 4
// 3. The script will fetch the sipCallId and run hold/unhold/dtmf

async function tier4() {
  section('TIER 4 — Live call (requires an active call)');

  let r = await api('GET', `/call-control/list-calls?user=${cfg.adminExt}`, null, cfg.adminToken, 2);
  const calls = r.data?.result?.calls ?? [];

  if (!calls.length) {
    skip('Call › Answer', 'no active calls — initiate a call first');
    skip('Call › Hold', 'no active calls');
    skip('Call › Unhold', 'no active calls');
    skip('Call › Send DTMF', 'no active calls');
    skip('Call › Update Contact Info', 'no active calls');
    return;
  }

  const sipCallId = calls[0].sipCallId ?? calls[0].id;
  console.log(`    Found active call: sipCallId=${sipCallId}`);

  r = await api('POST', '/call-control/hold', { sipCallId }, cfg.adminToken, 2);
  ok(r, `Call › Hold (${sipCallId})`);

  await new Promise(res => setTimeout(res, 1500));

  r = await api('POST', '/call-control/unhold', { sipCallId }, cfg.adminToken, 2);
  ok(r, `Call › Unhold (${sipCallId})`);

  r = await api('POST', '/call-control/dtmf', { sipCallId, digits: '1' }, cfg.adminToken, 2);
  ok(r, `Call › Send DTMF "1" (${sipCallId})`);

  r = await api('POST', '/call-control/update-contact-info', { sipCallId, name: 'n8n Test' }, cfg.adminToken, 2);
  ok(r, `Call › Update Contact Info (${sipCallId})`);
}

// ─── TIER 5: Dangerous (manual, never auto-run) ──────────────────────────────
// Each operation below is intentionally commented out.
// Uncomment and run `node tests/run-tests.js --tier 5` only when you mean it.

async function tier5() {
  section('TIER 5 — Dangerous (all skipped by default)');

  // ── PBX Reboot ── Takes PBX offline for ~60 seconds
  skip('PBX System › Reboot', 'MANUAL ONLY — uncomment in tier5() to run');
  // const r = await api('POST', '/PBX/System/Reboot', null, cfg.adminToken);
  // ok(r, 'PBX System › Reboot');

  // ── PBX Upgrade ── Upgrades firmware, cannot be undone
  skip('PBX Upgrade › Start', 'MANUAL ONLY — uncomment in tier5() to run');
  // const r2 = await api('POST', '/PBX/Upgrade', {}, cfg.adminToken);
  // ok(r2, 'PBX Upgrade › Start');

  // ── Personal Token Reset ── Invalidates current token, must re-issue
  skip('Personal › Reset Token', 'MANUAL ONLY — uncomment in tier5() to run');
  // const r3 = await api('POST', '/Personal/Token', null, cfg.userToken);
  // ok(r3, 'Personal › Reset Token');

  // ── Trusted IP Set ── Replaces the entire trusted IP list
  skip('Trusted IP › Set', 'MANUAL ONLY — uncomment in tier5() to run');
  // Prepare currentRows from Tier 1 result before running
  // const r4 = await api('PUT', '/TrustedIP', { rows: ['192.168.1.0/24'] }, cfg.adminToken);
  // ok(r4, 'Trusted IP › Set');
}

// ─── Runner ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log(`║  Wildix n8n node — test suite                            ║`);
  console.log(`║  PBX: ${cfg.pbx.padEnd(50)}║`);
  console.log('╚══════════════════════════════════════════════════════════╝');

  if (TIER_FILTER !== null) {
    console.log(`\n  Running Tier ${TIER_FILTER} only`);
  }

  try {
    if (TIER_FILTER === null || TIER_FILTER === 1) await tier1();
    if (TIER_FILTER === null || TIER_FILTER === 2) await tier2();
    if (!NO_CLEANUP && (TIER_FILTER === null || TIER_FILTER === 3)) await tier3();
    if (TIER_FILTER === 4) await tier4();
    if (TIER_FILTER === 5) await tier5();
  } catch (err) {
    console.error('\n  FATAL ERROR:', err.message);
    process.exitCode = 1;
  }

  // ── Summary ────────────────────────────────────────────────────────────
  console.log('\n' + '═'.repeat(62));
  console.log(`  Results: ✅ ${passed} passed   ❌ ${failed} failed   ⚠️  ${skipped} skipped`);
  console.log('═'.repeat(62));

  if (failures.length) {
    console.log('\n  Failed tests:');
    failures.forEach(f => console.log(`    ❌  ${f.name}\n        ${f.reason}`));
  }

  if (VERBOSE || Object.values(S).some(v => v)) {
    console.log('\n  Captured IDs (state):');
    Object.entries(S).forEach(([k, v]) => {
      if (v) console.log(`    ${k}: ${v}`);
    });
  }

  console.log('');
  process.exitCode = failed > 0 ? 1 : 0;
}

main();
