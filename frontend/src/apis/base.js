// Base Settings for API Calls

const BASE_URL = process.env.NODE_ENV == 'development' ? "http://localhost:8000" : "";

let _csrfToken = null;

async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${BASE_URL}/api/get_csrf/`, {
      credentials: 'omit',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}

export {BASE_URL,getCsrfToken};