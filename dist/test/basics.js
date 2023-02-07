"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const i18n_1 = require("../source/i18n");
(0, ava_1.default)('can translate', t => {
    const i18n = new i18n_1.I18n();
    i18n.loadLocale('en', {
        greeting: 'Hello!',
    });
    t.is(i18n.t('en', 'greeting'), 'Hello!');
});
(0, ava_1.default)('allowMissing false throws', t => {
    const i18n = new i18n_1.I18n({
        allowMissing: false,
    });
    t.throws(() => {
        i18n.t('en', 'greeting');
    }, { message: 'telegraf-i18n: \'en.greeting\' not found' });
});
