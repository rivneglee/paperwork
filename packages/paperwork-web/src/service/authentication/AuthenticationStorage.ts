import { Authentication } from '../../schema/User';

export interface AuthenticationStorage {
  set: (authentication: Authentication) => void;
  get: () => Authentication | undefined | null;
}

export default {
  set: (authentication: Authentication) => {
    const { accessToken, user } = authentication;
    localStorage.setItem('Authorization', accessToken);
    localStorage.setItem('Client', JSON.stringify(user));
  },

  get: () => {
    const accessToken = localStorage.getItem('Authorization');
    if (!accessToken) return;
    const user = JSON.parse(localStorage.getItem('Client') || '');
    return {
      accessToken,
      user,
    };
  },
};