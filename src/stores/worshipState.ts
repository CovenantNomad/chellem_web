import { atom } from "recoil";

export const worshipState = atom({
  key: "worship/date",
  default: {
    selectedDate: new Date()
  },
});