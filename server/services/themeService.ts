import { UserTheme } from "../../db/models/theme/userTheme";
import sequelize from "../../db/sequalize";
import RestServiceBase from "./restServiceBase";
import { SiteTheme } from "../../db/models/theme/siteTheme";

interface FindRequest {
    id?: number;
}

interface CreateRequest {
    title: string;
    description: string;
}


export default class ThemeService extends RestServiceBase<UserTheme> {


    private readonly _userThemeRepository = sequelize.getRepository(UserTheme);
    private readonly _siteThemeRepository = sequelize.getRepository(SiteTheme);
    //TODO добавить  проверку юзера
    // private readonly  _userRepository = sequelize.getRepository(User);

    create = (data: CreateRequest) => {
        return this._userThemeRepository.create(data);
    };

    update = async (data: { data: number }) => {
        //TODO костыль пока нет проверки юзера
        const ownerId = 0;
        const themeId = data.data;
        await this._userThemeRepository.update({ themeId: themeId }, {
            where: {
                ownerId: ownerId,
            }
        });

        return this._siteThemeRepository.findByPk(themeId);
    };

    request = async (data: FindRequest) => {
        const userTheme = await this._userThemeRepository.findOne({
            where: {
                ownerId: data.id,
            },
        });

        return this._siteThemeRepository.findByPk(userTheme?.themeId);

    };

    find? = undefined;
    delete? = undefined;
}
