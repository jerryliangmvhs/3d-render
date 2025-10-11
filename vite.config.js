
import { defineConfig } from 'vite'

/** @type {import ('vite').UserConfig} */

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/3d-render/' : ''
})