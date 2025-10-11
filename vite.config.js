import { defineConfig } from 'vite';
/** @type {import ('vite').UserConfig} */

export default {
    base: process.env.NODE_ENV === 'production' ? '/3d-render/' : '/'
}