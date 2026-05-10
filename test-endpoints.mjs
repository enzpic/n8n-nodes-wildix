/**
 * Wildix API endpoint smoke-tests.
 * Usage: node test-endpoints.mjs <pbxSubdomain> <bearerToken>
 */

const [, , HOST, TOKEN] = process.argv;
if (!HOST || !TOKEN) {
  console.error('Usage: node test-endpoints.mjs <pbxSubdomain> <bearerToken>');
  process.exit(1);
}

const BASE = `https://${HOST}`;
const HEADERS = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };

let passed = 0;
let failed = 0;

function extractList(json) {
  const r = json?.result;
  if (Array.isArray(r)) return r;
  if (r && Array.isArray(r.records)) return r.records;
  return [];
}

async function test(label, method, path, body) {
  const url = `${BASE}${path}`;
  const opts = { method, headers: HEADERS };
  if (body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(url, opts);
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = text; }

    const ok = res.status >= 200 && res.status < 300;
    const symbol = ok ? '✅' : '❌';
    console.log(`${symbol} [${res.status}] ${method} ${path}`);
    if (!ok) {
      console.log(`   └─ ${text.slice(0, 300)}`);
      failed++;
    } else {
      const list = extractList(json);
      if (list.length > 0) {
        console.log(`   └─ ${list.length} records`);
      } else if (json?.result && typeof json.result === 'object' && !Array.isArray(json.result)) {
        const keys = Object.keys(json.result).slice(0, 8);
        console.log(`   └─ result: { ${keys.join(', ')} }`);
      } else {
        console.log(`   └─ ${text.slice(0, 120)}`);
      }
      passed++;
    }
    return { ok, status: res.status, json };
  } catch (err) {
    console.log(`💥 [ERR] ${method} ${path} — ${err.message}`);
    failed++;
    return { ok: false };
  }
}

console.log(`\nWildix API smoke-tests → ${BASE}\n${'─'.repeat(60)}`);

// ── Personal info ─────────────────────────────────────────────────
const meRes = await test('Personal info (getMe)', 'GET', '/api/v1/personal/info');
const me = meRes.json?.result ?? {};
const myLogin = me.login ?? me.email;
const myExtension = me.extension;
console.log(`   (login: ${myLogin}, extension: ${myExtension})`);

// ── Colleagues ────────────────────────────────────────────────────
const collRes = await test('Get many colleagues (limit 5)', 'GET', '/api/v1/PBX/Colleagues?count=5&start=0');
const colleagues = extractList(collRes.json);
const firstColleague = colleagues[0];
if (firstColleague?.id) {
  await test(`Get colleague by ID (${firstColleague.id})`, 'GET', `/api/v1/Colleagues/${firstColleague.id}`);
}

// ── Departments ───────────────────────────────────────────────────
await test('Get many departments', 'GET', '/api/v1/Departments');

// ── Groups ────────────────────────────────────────────────────────
const grpRes = await test('Get many groups', 'GET', '/api/v1/Groups');
const groups = extractList(grpRes.json);
await test('Get call groups', 'GET', '/api/v1/Dialplan/CallGroups');

// ── PBX ───────────────────────────────────────────────────────────
await test('Get many PBXes', 'GET', '/api/v1/network/pbxes');

// ── Call Queue ────────────────────────────────────────────────────
const firstGroup = groups[0];
if (firstGroup?.id) {
  await test(`Get call queue settings (group ${firstGroup.id})`, 'GET', `/api/v1/pbx/settings/callqueues/${firstGroup.id}`);
} else {
  console.log('⚠️  No groups — skipping call queue');
}

// ── ACL Groups ────────────────────────────────────────────────────
await test('Get ACL permissions', 'GET', '/api/v1/pbx/aclgroups/permissions');

// ── OAuth2 Clients ────────────────────────────────────────────────
await test('Get OAuth2 clients', 'GET', '/api/v1/pbx/applications/oauth2');

// ── Call control — try with extension (avoids + email issue) ──────
const userParam = myExtension ?? myLogin;
if (userParam) {
  await test(`List devices (user=${userParam})`, 'GET', `/api/v2/call-control/list-devices?user=${encodeURIComponent(userParam)}`);
  await test(`List active calls (user=${userParam})`, 'GET', `/api/v2/call-control/list-calls?user=${encodeURIComponent(userParam)}`);
  // Also try with raw login if extension didn't work
  if (myLogin && myExtension && myLogin !== myExtension) {
    await test(`List devices (user=${myLogin})`, 'GET', `/api/v2/call-control/list-devices?user=${encodeURIComponent(myLogin)}`);
  }
}

// ── Originate (probe — expect possible 4xx/5xx with dummy data) ───
await test('Originate call endpoint reachable', 'POST', '/api/v1/originate/call', { name: '__test__', number: '0000000000' });

// ── SMS (probe) ───────────────────────────────────────────────────
await test('SMS endpoint reachable', 'POST', '/api/v1/originate/sms', { number: '0000000000', message: 'test' });

console.log(`\n${'─'.repeat(60)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
