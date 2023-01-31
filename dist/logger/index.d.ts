import loglevel from 'loglevel';
export declare const rootLogger: loglevel.RootLogger;
export type Logger = loglevel.Logger;
export declare const createLogger: (name: string | symbol) => loglevel.Logger;
