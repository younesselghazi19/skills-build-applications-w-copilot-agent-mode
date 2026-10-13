const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function getResourceArray(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items', 'data']) {
      if (key in payload) {
        return getResourceArray(payload[key]);
      }
    }
  }

  throw new TypeError('The API response did not contain a resource list.');
}

export async function fetchResources(endpoint, signal) {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, { signal });
  if (!response.ok) {
    throw new Error(`Unable to load ${endpoint} (HTTP ${response.status}).`);
  }

  return getResourceArray(await response.json());
}
