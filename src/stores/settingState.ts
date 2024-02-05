import { atom } from "recoil";

export const settingState = atom({
  key: "MAIN/SETTING",
  default: {
    dabarTabValue: 'card',
    worshipTabValue: 'weekly'
  },
});