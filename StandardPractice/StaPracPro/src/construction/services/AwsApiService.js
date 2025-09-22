import axios from 'axios';

// Using proxy path defined in vite.config.js => '/aws-api' -> real AWS endpoint + '/dev'
const AWS_BASE_PATH = '/aws-api/app';

// Environment variables (add to .env / .env.local)
const AWS_API_KEY = import.meta.env.VITE_AWS_API_KEY;
const AWS_ADV_USERNAME = import.meta.env.VITE_AWS_ADV_USERNAME;
const AWS_ADV_PASSWORD = import.meta.env.VITE_AWS_ADV_PASSWORD;

let authToken = null;
let tokenExpiry = null; // epoch ms
let refreshing = null; // promise guard

const client = axios.create({
  baseURL: AWS_BASE_PATH,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use(async (config) => {
  if (AWS_API_KEY) config.headers['XApiKey'] = AWS_API_KEY;
  config.headers['accept'] = '*/*';

  if (!authToken || (tokenExpiry && Date.now() > tokenExpiry)) {
    await loginInternal();
  }
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

client.interceptors.response.use(r => r, async (error) => {
  if (error.response?.status === 401) {
    authToken = null; tokenExpiry = null;
  }
  return Promise.reject(error);
});

const DEBUG_AWS_AUTH = import.meta.env.VITE_AWS_AUTH_DEBUG === 'true';

function findTokenDeep(payload) {
  if (!payload) return null;
  if (typeof payload === 'string') {
    // Try to parse if JSON string
    try { const parsed = JSON.parse(payload); return findTokenDeep(parsed); } catch { /* ignore */ }
    return null;
  }
  if (typeof payload === 'object') {
    // Common key candidates (case-insensitive)
    for (const k of Object.keys(payload)) {
      if (/^(access)?_?token$/i.test(k) || /accessToken/i.test(k)) {
        const val = payload[k];
        if (val && typeof val === 'string') return val;
      }
    }
    // Recurse
    for (const v of Object.values(payload)) {
      const found = findTokenDeep(v);
      if (found) return found;
    }
  }
  return null;
}

async function loginInternal() {
  if (refreshing) return refreshing; // prevent parallel calls
  refreshing = (async () => {
    if (!AWS_ADV_USERNAME || !AWS_ADV_PASSWORD || !AWS_API_KEY) {
      const missing = [
        !AWS_API_KEY && 'VITE_AWS_API_KEY',
        !AWS_ADV_USERNAME && 'VITE_AWS_ADV_USERNAME',
        !AWS_ADV_PASSWORD && 'VITE_AWS_ADV_PASSWORD'
      ].filter(Boolean).join(', ');
      throw new Error(`AWS advisory credentials not configured. Missing: ${missing}. Add them to .env.local and restart dev server.`);
    }
    try {
      const res = await axios.post(`${AWS_BASE_PATH}/Auth/login`, {
        username: AWS_ADV_USERNAME,
        password: AWS_ADV_PASSWORD
      }, {
        headers: {
          'XApiKey': AWS_API_KEY,
          'Content-Type': 'application/json',
          'accept': 'text/plain'
        }
      });
      if (DEBUG_AWS_AUTH) {
        console.group('[AWS AUTH DEBUG] Raw login response');
        console.log('status', res.status);
        console.log('headers', res.headers);
        console.log('data', res.data);
        console.groupEnd();
      }
      let token = res.data?.accessToken || res.data?.token || res.data?.access_token;
      if (!token) {
        token = findTokenDeep(res.data);
      }
      const expiresIn = res.data?.expiresIn || res.data?.tokenExpiresIn || 3300; // fallback 55m
      if (!token) {
        const availableKeys = res && res.data && typeof res.data === 'object' ? Object.keys(res.data).join(', ') : 'n/a';
        throw new Error(`Missing token in AWS auth response. Available top-level keys: ${availableKeys}`);
      }
      authToken = token;
      tokenExpiry = Date.now() + expiresIn * 1000;
      return token;
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

async function getAdvisoryTalktimeDetails(params) {
  const { advcode, batype = 'advisory' } = params;
  try {
    const res = await client.post('/AdvCopilotDash/GetAdvtalktimedetails', { advcode, batype });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: normalizeError(error) };
  }
}

function normalizeError(error) {
  return {
    status: error.response?.status,
    message: error.response?.data?.message || error.message,
    data: error.response?.data
  };
}

export const awsApiService = {
  login: loginInternal,
  getAdvisoryTalktimeDetails
};

export default awsApiService;