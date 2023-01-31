import loglevel from 'loglevel'
import prefix from 'loglevel-plugin-prefix'

import { isDev, isProduction, isTest } from '../node-env'

prefix.reg(loglevel)

prefix.apply(loglevel, {
  format(level, name) {
    return `[${level}] ${name}:`
  },
})

if (isProduction()) {
  loglevel.setDefaultLevel(loglevel.levels.WARN)
} else if (isTest()) {
  loglevel.setDefaultLevel(loglevel.levels.SILENT)
} else if (isDev()) {
  loglevel.setDefaultLevel(loglevel.levels.TRACE)
} else {
  loglevel.setDefaultLevel(loglevel.levels.INFO)
}

export const rootLogger = loglevel

export type Logger = loglevel.Logger

export const createLogger = loglevel.getLogger
