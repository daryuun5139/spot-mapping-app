import { atom } from "recoil";

export const cardClicked = atom<string>({
  key: "cardClicked",
  default: "",
});
