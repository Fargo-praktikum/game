import { createSelector } from "reselect";
import User from "../models/user";
import { TRootState } from "./store";

export const userSelector = createSelector(
    (state: TRootState) => state.auth.userInfo,
    (user: User | null) => user
);
