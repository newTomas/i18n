"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = require("ava");
const i18n_1 = require("../source/i18n");
(0, ava_1.default)('can pluralize', t => {
    const i18n = new i18n_1.I18n();
    i18n.loadLocale('en', {
        // eslint-disable-next-line no-template-curly-in-string, @typescript-eslint/quotes
        pluralize: "${pluralize(n, 'There was an apple', 'There were apples')}",
    });
    t.is(i18n.t('en', 'pluralize', { n: 0 }), '0 There were apples');
    t.is(i18n.t('en', 'pluralize', { n: 1 }), '1 There was an apple');
    t.is(i18n.t('en', 'pluralize', { n: 5 }), '5 There were apples');
});
(0, ava_1.default)('can pluralize using functional forms', t => {
    const i18n = new i18n_1.I18n();
    i18n.loadLocale('en', {
        // eslint-disable-next-line no-template-curly-in-string, @typescript-eslint/quotes
        pluralize: "${pluralize(n, n => 'There was an apple', n => 'There were ' + n + ' apples')}",
    });
    t.is(i18n.t('en', 'pluralize', { n: 0 }), 'There were 0 apples');
    t.is(i18n.t('en', 'pluralize', { n: 1 }), 'There was an apple');
    t.is(i18n.t('en', 'pluralize', { n: 5 }), 'There were 5 apples');
});
