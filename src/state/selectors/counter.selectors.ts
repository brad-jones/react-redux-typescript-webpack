import { RootState } from "~state/store";

export const selectCount = (state: RootState) => state.counter.value