"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const i18n_1 = require("../source/i18n");
(0, ava_1.default)('resourceKeys flat', t => {
    const i18n = new i18n_1.I18n();
    i18n.loadLocale('en', {
        greeting: 'Hello!',
    });
    t.deepEqual(i18n.resourceKeys('en'), [
        'greeting',
    ]);
});
(0, ava_1.default)('resourceKeys with depth', t => {
    const i18n = new i18n_1.I18n();
    i18n.loadLocale('en', {
        greeting: 'Hello!',
        foo: {
            bar: '42',
            hell: {
                devil: 666,
            },
        },
    });
    t.deepEqual(i18n.resourceKeys('en'), [
        'greeting',
        'foo.bar',
        'foo.hell.devil',
    ]);
});
(0, ava_1.default)('resourceKeys of not existing locale are empty', t => {
    const i18n = new i18n_1.I18n();
    i18n.loadLocale('en', {
        greeting: 'Hello!',
    });
    t.deepEqual(i18n.resourceKeys('de'), []);
});
function createMultiLanguageExample() {
    const i18n = new i18n_1.I18n();
    i18n.loadLocale('en', {
        greeting: 'Hello!',
        checkout: 'Thank you!',
    });
    i18n.loadLocale('ru', {
        greeting: 'Привет!',
    });
    return i18n;
}
(0, ava_1.default)('availableLocales', t => {
    const i18n = createMultiLanguageExample();
    t.deepEqual(i18n.availableLocales(), [
        'en',
        'ru',
    ]);
});
(0, ava_1.default)('missingKeys ', t => {
    const i18n = createMultiLanguageExample();
    t.deepEqual(i18n.missingKeys('en', 'ru'), []);
    t.deepEqual(i18n.missingKeys('ru'), [
        'checkout',
    ]);
});
(0, ava_1.default)('overspecifiedKeys', t => {
    const i18n = createMultiLanguageExample();
    t.deepEqual(i18n.overspecifiedKeys('ru'), []);
    t.deepEqual(i18n.overspecifiedKeys('en', 'ru'), [
        'checkout',
    ]);
});
(0, ava_1.default)('translationProgress', t => {
    const i18n = createMultiLanguageExample();
    // 'checkout' is missing
    t.is(i18n.translationProgress('ru'), 0.5);
    // Overspecified (unneeded 'checkout') but everything required is there
    t.is(i18n.translationProgress('en', 'ru'), 1);
});
