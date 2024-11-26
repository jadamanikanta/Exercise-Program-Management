
import { defineConfig } from 'astro/config';
import React from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [React()]
});