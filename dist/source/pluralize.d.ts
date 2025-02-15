import { I18nContext } from './context';
type Form = string | ((n: number) => string);
export declare function pluralize(this: I18nContext, number: number, ...forms: readonly Form[]): string;
export {};
