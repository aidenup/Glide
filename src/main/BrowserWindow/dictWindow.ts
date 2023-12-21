/*
 * @Author: goudanyang
 * @Date: 2023-12-17 20:03:31
 * @LastEditors: goudanyang
 * @LastEditTime: 2023-12-21 20:47:37
 * @Description:
 */
import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
// import logger from '../utils/logger'

class dictWindow {
  window: BrowserWindow | null
  constructor() {
    this.window = null
  }

  createWinwow() {
    // Create the browser window.
    this.window = new BrowserWindow({
      width: 400,
      minWidth: 300,
      height: 670,
      // minHeight: 670,
      // maxHeight: 670,
      show: false,
      useContentSize: true,
      autoHideMenuBar: true,
      alwaysOnTop: true,
      fullscreenable: false,
      titleBarStyle: 'hidden',
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
    this.window.setWindowButtonVisibility(false)
    this.window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.window.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/#/dict`)
    } else {
      this.window.loadFile(join(__dirname, '../renderer/index.html'), {
        hash: 'dict'
      })
    }

    this.listen()
  }

  show() {
    if (!this.window) {
      this.createWinwow()
    }
    this.window && this.window.show()
  }

  listen() {
    // 关闭
    this.window?.on('close', (event) => {
      event.preventDefault()
      this.window?.hide()
    })
    // this.window?.on('blur', () => {
    //   this.window?.hide()
    // })
  }

  destroy() {
    // window.destroy() 会触发win的closed事件，不会触发close事件
    this.window && this.window.destroy()
  }
}

export default new dictWindow()
