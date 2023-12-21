/*
 * @Author: maqian
 * @Date: 2023-10-23 08:54:51
 * @LastEditors: maqian
 * @LastEditTime: 2023-11-14 10:08:44
 * @Description:
 */
import { defineStore } from 'pinia'

export const usePatientStore = defineStore({
  id: 'patient',
  state: () => {
    return {
      coutn: 0
    }
  },
  actions: {}
})
