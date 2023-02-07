"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const process = require("process");
const grammy_1 = require("grammy");
const source_1 = require("../source");
// I18n options
const i18n = new source_1.I18n({
    directory: path.resolve(__dirname, 'locales'),
    defaultLanguage: 'en',
    sessionName: 'session',
    useSession: true,
    templateData: {
        pluralize: source_1.pluralize,
        uppercase: (value) => value.toUpperCase(),
    },
});
const bot = new grammy_1.Bot(process.env['BOT_TOKEN']);
bot.use((0, grammy_1.session)({ initial: () => ({ apples: 0 }) }));
bot.use(i18n.middleware());
// Start message handler
bot.command('start', async (ctx) => ctx.reply(ctx.i18n.t('greeting'), { parse_mode: 'HTML' }));
// Set locale to `en`
bot.command('en', async (ctx) => {
    ctx.i18n.locale('en-US');
    return ctx.reply(ctx.i18n.t('greeting'), { parse_mode: 'HTML' });
});
// Set locale to `ru`
bot.command('ru', async (ctx) => {
    ctx.i18n.locale('ru');
    return ctx.reply(ctx.i18n.t('greeting'), { parse_mode: 'HTML' });
});
// Add apple to cart
bot.command('add', async (ctx) => {
    ctx.session.apples++;
    const message = ctx.i18n.t('cart', { apples: ctx.session.apples });
    return ctx.reply(message);
});
// Add apple to cart
bot.command('cart', async (ctx) => {
    const message = ctx.i18n.t('cart', { apples: ctx.session.apples });
    return ctx.reply(message);
});
// Checkout
bot.command('checkout', async (ctx) => ctx.reply(ctx.i18n.t('checkout')));
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bot.start();
