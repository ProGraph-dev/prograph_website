const nextI18NConfig = {
    debug: process.env.NODE_ENV === 'development',
    i18n: {
        locales: ['en', 'ru', 'hy'],
        defaultLocale: 'en',
    },
};

module.exports = nextI18NConfig;