import { paths } from 'src/routes/paths';

import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    sessionStorage.removeItem('accessToken');

    window.location.href = paths.auth.jwt.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (jwt, jwtRefresh) => {
  if (jwt && jwtRefresh) {
    sessionStorage.setItem('jwt', jwt);
    sessionStorage.setItem('jwtRefresh', jwtRefresh);

    axios.defaults.headers.common.AUTH_JWT = jwt;
    axios.defaults.headers.common.AUTH_JWT_REFRESH = jwtRefresh;

  } else {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('jwtRefresh');

    delete axios.defaults.headers.common.AUTH_JWT;
    delete axios.defaults.headers.common.AUTH_JWT_REFRESH;
  }
};

