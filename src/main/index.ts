import { app, BrowserWindow, globalShortcut, clipboard, Tray, Menu, dialog } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import robot from 'robotjs'
import mainWindow from './BrowserWindow/mainWindow'
import dictWindow from './BrowserWindow/dictWindow'
import trayIcon from '../../resources/favicon-16x16.png?asset'
import icon from '../../resources/icon.png?asset'

app.dock.hide()
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  mainWindow.createWinwow()
  dictWindow.createWinwow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow.createWinwow()
    }
  })

  const shortcut = 'CommandOrControl+D'
  globalShortcut.register(shortcut, () => {
    dictWindow.show()
    // 保存当前剪贴板内容
    const originalClipboardText = clipboard.readText()
    const originalClipboardImage = clipboard.readImage()

    // 模拟按下 Ctrl+C 或 Command+C
    console.log('robot.keyTap', robot.keyTap)

    if (process.platform === 'darwin') {
      robot.keyTap('c', 'command')
    } else {
      robot.keyTap('c', 'control')
    }

    // 延时一小段时间以确保复制操作完成
    setTimeout(() => {
      // 获取剪贴板中的文本
      const selectedText = clipboard.readText()
      console.log(`User selected text: ${selectedText}`)

      // 在这里你可以对选中的文本进行进一步的处理
      dictWindow.window && dictWindow.window.webContents.send('get-text', selectedText)

      // 恢复剪贴板内容
      if (!originalClipboardImage.isEmpty()) {
        clipboard.writeImage(originalClipboardImage)
      } else {
        clipboard.writeText(originalClipboardText)
      }
    }, 1000) // 延时时间可能需要根据实际情况调整
  })

  // 创建系统托盘
  const tray = new Tray(trayIcon)

  // 菜单模板
  const menu = Menu.buildFromTemplate([
    {
      label: '显示主窗口',
      click: () => {
        app.dock.show()
        mainWindow.window?.show()
      }
    },
    {
      label: '最小化到托盘',
      click: () => {
        mainWindow.window?.hide()
        app.dock.hide()
      }
    },
    {
      label: '退出',
      click: () => {
        app.exit()
      }
    }
  ])
  Menu.setApplicationMenu(null)
  tray.displayBalloon({ title: 'cccdasd', content: 'sacacdsa' })
  // 给系统托盘设置菜单
  tray.setContextMenu(menu)

  // 给托盘图标设置气球提示
  tray.setToolTip('Electron测试')

  // 托盘图标被双击
  tray.on('double-click', () => {
    // 显示窗口
    mainWindow.window?.show()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  console.log('window-all-closed')

  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('before-quit', (event) => {
  event.preventDefault()

  // 询问是否退出
  dialog
    .showMessageBox({
      icon: icon,
      type: 'info',
      // title: '确定要退出Glide dict 吗?', // 可能不显示
      message: '确定要退出Glide dict 吗?',
      buttons: ['确认', '取消'],
      defaultId: 0
    })
    .then((it) => {
      if (it.response === 0) {
        app.exit()
      }
    })
})
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
