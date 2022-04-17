import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDos {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDos>({
  key: "toDos",
  default: {
    "To Do": [
      { id: 1, text: "one" },
      { id: 2, text: "two" },
    ],
    Doing: [],
    Done: [],
  },
});

export const boardState = atom<string[]>({
  key: "boards",
  default: [],
});
