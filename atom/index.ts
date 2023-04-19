import { atom, selector } from 'recoil';

export const textState = atom<string>({
  key: 'textState', // unique ID (다른 atom, selector 와 겹치지 않게)
  default: '', // default value
});

export const charCountState = selector<number>({
  key: 'charCountState', // unique ID (다른 atom, selector 와 겹치지 않게)
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});
