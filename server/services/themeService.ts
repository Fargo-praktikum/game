import { UserTheme } from "../db/models/theme/userTheme";

import RestServiceBase from "./restServiceBase";
import { SiteTheme } from "../db/models/theme/siteTheme";
import sequelize from "../db/sequelize";

interface FindRequest {
    id?: number;
}

interface ThemeData {
    themeId: number,
    userId: number
}

export default class ThemeService extends RestServiceBase<UserTheme> {

    private readonly _userThemeRepository = sequelize.getRepository(UserTheme);
    private readonly _siteThemeRepository = sequelize.getRepository(SiteTheme);

    create = (data: number) => {
        const createUserTheme = this._userThemeRepository.create({ themeId: 1, ownerid: data });
        this.request({ id: data } );
        return createUserTheme;
    };

    update = async (data: { data: ThemeData }) => {
        const ownerId = data.data.userId;
        const themeId = data.data.themeId;
        await this._userThemeRepository.update({ themeId: themeId }, {
            where: {
                ownerid: ownerId,
            }
        });

        return this._siteThemeRepository.findByPk(themeId);
    };

    request = async (data: FindRequest) => {
        const userTheme = await this._userThemeRepository.findOne({
            where: {
                ownerid: data.id,
            },
        });
        if (userTheme) {
            console.log(userTheme, "userThemeuserThemeuserTheme");
            return this._siteThemeRepository.findByPk(userTheme?.themeId);
        } else {
            console.log(userTheme, "create DATAAAAA");
            return this.create(data.id!);
        }
    };

    find? = undefined;
    delete? = undefined;
}
