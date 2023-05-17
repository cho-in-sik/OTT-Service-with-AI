import { atom, selector } from 'recoil';

export const isBottom = atom<boolean>({
  key: 'isBottom',
  default: false,
});
