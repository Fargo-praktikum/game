import { useSelector } from "react-redux";
import User from "../models/user";
import { userSelector } from "../store/selectors";

export const useAuth = (): User | null => {
    return useSelector(userSelector);
};
