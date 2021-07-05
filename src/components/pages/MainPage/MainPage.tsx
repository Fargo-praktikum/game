import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/authHook";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { oauthYndexSignIn } from "../../../store/authReducer";

import mainBackground from "../../../assets/mainBackground.png";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// TODO заменить url img на импорт когда разберемся с [object Object] при ssr
// import forum from "../../../assets/forum.png";
// import trophy from "../../../assets/trophy.png";
// import learn from "../../../assets/learn.png";

import "./MainPage.scss";


const useStyles = makeStyles(() =>
    createStyles({
        appBar: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            backgroundImage: `url(${mainBackground as string})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        },
        mainText: {
            flex: 3,
            width: "50%",
            paddingLeft: "75px",
        },
        gradient: {
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            border: 0,
            borderRadius: 3,
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: 36,
            maxWidth: "200px",
            padding: "0 30px",
        },
        menuLink: {
            margin: "0px 10px",
            textDecoration: "none"
        },
        navBar: {
            display: "flex",
            justifyContent: "flex-end",
            flex: 1,
            padding: "20px 20px",
        },
        footer: {
            height: "2em",
            marginTop: "40px",
            textAlign: "center",
        },
        infoWrap: {
            display: "flex",
            justifyContent: "space-around",
            margin: "50px",
        },
        infoCard: {
            maxWidth: "200px"
        },
        infoImage: {
            display: "block",
            maxWidth: "150px",
            margin: "auto",
            marginBottom: "15px",
        },
        infoText: {
            width: "80%",
            margin: "auto"
        }
    }));


export const MainPage = (): JSX.Element => {

    const queryString = new URLSearchParams(useLocation().search);
    const code = queryString.get("code");
    const dispatch = useAppDispatch();
    const user = useAuth();

    const classes = useStyles();

    useEffect(() => {
        if (code && !user) {
            dispatch(oauthYndexSignIn(code));
        }
    });

    return (
        <>
            <div className={classes.appBar}>
                <div className={classes.navBar}>
                    <a href="#info" className={classes.menuLink}>
                        <Button variant="outlined">Об игре</Button>
                    </a>
                    <Link to="/login" className={classes.menuLink}>
                        <Button variant="outlined">Войти</Button>
                    </Link>
                </div>
                <div className={classes.mainText}>
                    <Typography variant="h2" gutterBottom>
                        Онлайн викторина
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Сделайте обучение увлекательным
                    </Typography>
                    <Button component={ Link } to="/signup" type="submit" className={classes.gradient}>
                        Зарегистрироваться
                    </Button>
                </div>
            </div>
            <div className={classes.infoWrap} id="info">
                <div className={classes.infoCard}>
                    <img src="https://image.flaticon.com/icons/png/512/4696/4696535.png" alt="" className={classes.infoImage}/>
                    <Typography variant="h6" gutterBottom align="center">
                        Изучайте новое
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                        С помощью Fargocards вы можете подготовиться к экзамену, запомнить важные даны или даже выучить новый язык
                    </Typography>
                </div>
                <div className={classes.infoCard}>
                    <img src="https://image.flaticon.com/icons/png/512/4696/4696585.png" alt="" className={classes.infoImage}/>
                    <Typography variant="h6" gutterBottom align="center">
                        Соревнуйтесь
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                        Участвуйте в рейтинговых играх и зарабатывайте очки.
                    </Typography>
                </div>
                <div className={classes.infoCard}>
                    <img src="https://image.flaticon.com/icons/png/512/4696/4696589.png" alt="" className={classes.infoImage}/>
                    <Typography variant="h6" gutterBottom align="center">
                        Общайтесь
                    </Typography>
                    <Typography variant="body1" gutterBottom align="center">
                        Обсуждайте полученные знания на нашем тематическом форуме с тысячами таких же энтузиастов как и вы
                    </Typography>
                </div>
            </div>
            <div className={classes.infoText}>
                <Typography variant="h6" gutterBottom paragraph align="center">
                    Карточки — один из самых эффективных методов запоминания всего на свете. Новый веб-сервис от команды Fargo поможет вам проверить его на практике.
                </Typography>
                <Typography variant="body1" gutterBottom align="center">В основе приложения лежит система Лейтнера, которая предполагает интервальное повторение новых слов и понятий до тех пор, пока учащийся как следует не запомнит материал. </Typography>
                <Typography variant="body1" gutterBottom align="center">После регистрации на сайте вам предложат выбрать тему, которую вы хотите изучать. Есть наборы карточек самой разной тематики — от изучения иностранных языков до названий химических элементов и дат известных событий.
                </Typography>
                <Typography variant="body1" gutterBottom align="center">Сам процесс обучения незамысловат, но очень эффективен. Вам будет демонстрироваться карточка, на одной стороне которой находится картинка, а на второй — соответствующее слово. Затем для проверки задают проверочные вопросы, когда к картинке нужно подобрать нужное слово или, наоборот, сопоставить со словом правильную картинку.</Typography>
            </div>
            <footer className={classes.footer}>
                Fargo team, 2021
            </footer>
        </>
    );
};

