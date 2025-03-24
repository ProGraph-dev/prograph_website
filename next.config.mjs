import i18nConfigs from './next-i18next.config.js';
const {i18n} = i18nConfigs;
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ]
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    }
};

export default nextConfig;
