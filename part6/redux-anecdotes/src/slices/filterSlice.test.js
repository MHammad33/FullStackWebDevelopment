import deepFreeze from "deep-freeze";
import filterSlice from "./filterSlice";

describe('filterSlice', () => {
  test("filter is changed correctly", () => {
    const state = "";
    deepFreeze(state);

    const action = { type: "filter/changeFilter", payload: "debug" };
    const newState = filterSlice("", action);
    expect(newState).toEqual("debug");
  });
})