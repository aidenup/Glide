/*
 * @Author: goudanyang
 * @Date: 2023-12-17 17:21:47
 * @LastEditors: goudanyang
 * @LastEditTime: 2023-12-21 22:55:34
 * @Description:
 */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getWinURL: (callback) => ipcRenderer.on('get-winURL', callback),
  getText: (callback) => ipcRenderer.on('get-text', callback)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
