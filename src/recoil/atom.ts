import { atom } from 'recoil';

export const jwtTokenState = atom<string | null>({
  key: 'jwtTokenState',
  default: localStorage.getItem('jwtToken'),
});

export const refreshTokenState = atom<string | null>({
  key: 'refreshTokenState',
  default: localStorage.getItem('refreshtoken'),
});
