import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Atom to store the theme, with localStorage persistence
export const themeAtom = atomWithStorage('theme', 'light');

// Atom effect to update the DOM when the theme changes
export const themeEffect = atom((get) => {
    const theme = get(themeAtom);
    document.documentElement.setAttribute('data-theme', theme);
});