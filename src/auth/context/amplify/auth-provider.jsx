import PropTypes from 'prop-types';
import { Amplify } from 'aws-amplify';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
import {
  signIn,
  signUp,
  signOut,
  confirmSignUp,
  resetPassword,
  getCurrentUser,
  resendSignUpCode,
  fetchAuthSession,
  fetchUserAttributes,
  confirmResetPassword,
} from 'aws-amplify/auth';

import { AMPLIFY_API } from 'src/config-global';

import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

/**
 * DOCS: https://docs.amplify.aws/react/build-a-backend/auth/manage-user-session/
 */
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: `${AMPLIFY_API.userPoolId}`,
      userPoolClientId: `${AMPLIFY_API.userPoolWebClientId}`,
    },
  },
});

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const { userId: currentUser } = await getCurrentUser();

      const userAttributes = await fetchUserAttributes();

      const { idToken, accessToken } = (await fetchAuthSession()).tokens ?? {};

      if (currentUser) {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...userAttributes,
              id: userAttributes.sub,
              displayName: `${userAttributes.given_name} ${userAttributes.family_name}`,
              idToken,
              accessToken,
              role: 'admin',
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    await signIn({
      username: email,
      password,
    });

    const userAttributes = await fetchUserAttributes();

    const { idToken, accessToken } = (await fetchAuthSession()).tokens ?? {};

    dispatch({
      type: 'INITIAL',
      payload: {
        user: {
          ...userAttributes,
          id: userAttributes.sub,
          displayName: `${userAttributes.given_name} ${userAttributes.family_name}`,
          idToken,
          accessToken,
          role: 'admin',
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          given_name: firstName,
          family_name: lastName,
        },
      },
    });
  }, []);

  // CONFIRM REGISTER
  const confirmRegister = useCallback(async (email, code) => {
    await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
  }, []);

  // RESEND CODE REGISTER
  const resendCodeRegister = useCallback(async (email) => {
    await resendSignUpCode({
      username: email,
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await signOut();
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email) => {
    await resetPassword({ username: email });
  }, []);

  // NEW PASSWORD
  const newPassword = useCallback(async (email, code, password) => {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword: password,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'amplify',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      newPassword,
      forgotPassword,
      confirmRegister,
      resendCodeRegister,
    }),
    [
      status,
      state.user,
      //
      login,
      logout,
      register,
      newPassword,
      forgotPassword,
      confirmRegister,
      resendCodeRegister,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
