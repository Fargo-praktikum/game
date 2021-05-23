import { UserScore } from "../../models/userScore";

export interface LeaderboardTableProps {
    usersScore: { data: UserScore }[]
}
