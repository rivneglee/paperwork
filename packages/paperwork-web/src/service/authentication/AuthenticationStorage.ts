import { Authentication } from '../../schema/User';

export interface AuthenticationStorage {
  set: (authentication: Authentication) => void;
  get: () => Authentication | undefined | null;
  clear: () => void;
}

export default {
  set: (authentication: Authentication) => {
    const { accessToken, user } = authentication;
    localStorage.setItem('Authorization', accessToken);
    localStorage.setItem('Client', JSON.stringify(user));
  },

  get: (): Authentication | undefined => {
    const accessToken = localStorage.getItem('Authorization');
    if (!accessToken) return;
    const user = JSON.parse(localStorage.getItem('Client') || '');
    return {
      accessToken,
      user,
    };
  },

  clear: () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('Client');
  },
};
