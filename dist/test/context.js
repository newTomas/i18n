"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const context_1 = require("../source/context");
const EXAMPLE_REPO = {
    en: {
        desk: () => 'desk',
        foo: () => 'bar',
    },
    de: {
        desk: () => 'Tisch',
    },
};
const MINIMAL_CONFIG = {
    defaultLanguage: 'en',
    sessionName: 'session',
    templateData: {},
};
(0, ava_1.default)('can get language', t => {
    const i18n = new context_1.I18nContext(EXAMPLE_REPO, MINIMAL_CONFIG, 'de', {});
    t.is(i18n.locale(), 'de');
});
(0, ava_1.default)('can change language', t => {
    const i18n = new context_1.I18nContext(EXAMPLE_REPO, MINIMAL_CONFIG, 'de', {});
    t.is(i18n.locale(), 'de');
    i18n.locale('en');
    t.is(i18n.locale(), 'en');
});
(0, ava_1.default)('can translate something', t => {
    const i18n = new context_1.I18nContext(EXAMPLE_REPO, MINIMAL_CONFIG, 'de', {});
    t.is(i18n.t('desk'), 'Tisch');
});
(0, ava_1.default)('allowMissing', t => {
    const config = {
        ...MINIMAL_CONFIG,
        allowMissing: true,
    };
    const i18n = new context_1.I18nContext(EXAMPLE_REPO, config, 'de', {});
    t.is(i18n.t('unknown'), 'unknown');
});
(0, ava_1.default)('defaultLanguageOnMissing', t => {
    const config = {
        ...MINIMAL_CONFIG,
        defaultLanguageOnMissing: true,
    };
    const i18n = new context_1.I18nContext(EXAMPLE_REPO, config, 'de', {});
    t.is(i18n.t('foo'), 'bar');
});
