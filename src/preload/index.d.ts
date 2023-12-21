/*
 * @Author: goudanyang
 * @Date: 2023-12-17 17:21:47
 * @LastEditors: goudanyang
 * @LastEditTime: 2023-12-21 22:54:58
 * @Description:
 */
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getWinURL: (callback) => void
      getText: (callback) => void
    }
  }
}
