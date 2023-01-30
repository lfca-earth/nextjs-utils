import loglevel from 'loglevel';
import { isDev, isProduction, isTest } from '../node-env';
if (isProduction()) {
    loglevel.setDefaultLevel(loglevel.levels.WARN);
}
else if (isTest()) {
    loglevel.setDefaultLevel(loglevel.levels.SILENT);
}
else if (isDev()) {
    loglevel.setDefaultLevel(loglevel.levels.TRACE);
}
else {
    loglevel.setDefaultLevel(loglevel.levels.INFO);
}
export var rootLogger = loglevel;
export var createLogger = loglevel.getLogger;
