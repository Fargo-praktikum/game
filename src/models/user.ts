import UserProfile from "./userProfile";

export default interface User extends UserProfile {
    id: number;
    avatar: string | null;
}
