import SignupRequestData from "../../../models/signupRequestData";

export type SignupFormValuesType = SignupRequestData & { passwordRepeat: string };
