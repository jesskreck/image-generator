import { atom } from 'recoil';



export const clickedActionAtom = atom({
    key: 'clickedAction',
    default: {}
});

export const attracAtom = atom({
    key: 'attrac',
    default: 0
});

export const mentalAtom = atom({
    key: 'mental',
    default: 0
});

export const educAtom = atom({
    key: 'educ',
    default: 0
});

export const wealthAtom = atom({
    key: 'wealth',
    default: 0
});

export const socialAtom = atom({
    key: 'social',
    default: 0
});

export const unhealedTraumasAtom = atom({
    key: 'unhealedTraumas',
    default: []
});


export const willchainAtom = atom({
    key: 'willchain',
    default: []
});

export const healedAtom = atom({
    key: 'healed',
    default: false
});

export const albumAtom = atom({
    key: 'album',
    default: []
});
