import { atom } from 'recoil';

export const languageAtom = atom({
    key: 'language',
    default: 'de'
});

export const statusAtom = atom({
    key: 'status',
    default: 'action'
});

export const AImodeAtom = atom({
    key: 'AImode',
    default: false
});