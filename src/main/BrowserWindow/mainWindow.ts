/*
 * @Author: goudanyang
 * @Date: 2023-12-17 19:53:26
 * @LastEditors: goudanyang
 * @LastEditTime: 2023-12-21 20:16:20
 * @Description:
 */
import { BrowserWindow, app, shell } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'

class mainWindow {
  window: BrowserWindow | null
  constructor() {
    this.window = null
  }

  createWinwow() {
    // Create the browser window.
    this.window = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      //   autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    // this.window.on('ready-to-show', () => {
    //   this.window && this.window.show()
    // })

    this.window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    console.log('aa', process.env['ELECTRON_RENDERER_URL'])

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.window.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.window.loadFile(join(__dirname, '../renderer/index.html'))
    }
    this.listen()
  }

  listen() {
    // 关闭
    this.window?.on('close', (event) => {
      event.preventDefault()
      app.dock.hide()
      this.window?.hide()
    })
    this.window?.on('show', () => {
      let winURL = ''
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        winURL = `${process.env['ELECTRON_RENDERER_URL']}/#/dict`
      } else {
        winURL = `${join(__dirname, '../renderer/index.html')}/#/dict`
      }
      setTimeout(() => {
        this.window?.webContents.send('get-winURL', winURL)
      }, 2000)
    })
  }
}

export default new mainWindow()
