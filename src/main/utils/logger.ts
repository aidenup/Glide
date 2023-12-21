/*
 * @Author: goudanyang
 * @Date: 2023-10-23 16:26:38
 * @LastEditors: goudanyang
 * @LastEditTime: 2023-10-23 16:26:39
 * @Description: 日志
 */
import log from 'electron-log'
import { platform } from '@electron-toolkit/utils'
import { convertPath } from '../middleware/index'
import { app } from 'electron'

// 关闭控制台打印
log.transports.console.level = false
log.transports.file.level = 'debug'
log.transports.file.maxSize = 10024300 // 文件最大不超过 10M

// 输出格式
log.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}'
const date = new Date()
const dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

// 文件位置及命名方式
// 默认位置为：C:\Users\[user]\AppData\Roaming\[appname]\electron_log\
// 文件名为：年-月-日.log
// 自定义文件保存位置为安装目录下 \log\年-月-日.log
let transportsFilePath = () => `log/${dateStr}.log`

if (!platform.isWindows) {
  // mac 存放在缓存目录下  /Users/{username}/Library/Application Support/{App name}
  transportsFilePath = () =>
    convertPath(`${app.getPath('appData')}/${app.getName()}/${dateStr}.log`)
}
console.log('transportsFilePath', transportsFilePath)
console.log('aa', log.transports.file.getFile())

// log.transports.file.resolvePathFn = transportsFilePath
// 有六个日志级别error, warn, info, verbose, debug, silly。默认是silly
export default {
  info(...params) {
    const formattedParams = params.join(' ')
    log.info(formattedParams)
    console.log(formattedParams)
  },
  warn(param) {
    log.warn(param)
  },
  error(param) {
    log.error(param)
  },
  debug(param) {
    log.debug(param)
  },
  verbose(param) {
    log.verbose(param)
  },
  silly(param) {
    log.silly(param)
  }
}

// Logger.info('app.getPath', app.getAppPath()) // app/Contents/Resources/app.asar
// Logger.info("app.getPath('exe')", app.getPath('exe')) // /Applications/translation-tools.app/Contents/MacOS/translation-tools
// Logger.info("app.getPath('appData')", app.getPath('appData')) // /Users/allez/Library/Application Support
