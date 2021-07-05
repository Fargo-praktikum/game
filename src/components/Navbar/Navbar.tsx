import React, { MouseEvent, useCallback, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";


import { toggleFullScreen } from "../../game/utils/toggleFullScreen";
import { sound } from "../../game/utils/soundEffects";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { Avatar } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../store/authReducer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            backgroundColor: "#3369f3",
        },
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        menuLink: {
            textDecoration: "none",
            color: "black"
        },
        red: {
            color: "red"
        },
        title: {
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        sectionDesktop: {
            display: "none",
            [theme.breakpoints.up("md")]: {
                display: "flex",
            },
            marginLeft: "auto",
        },
        sectionMobile: {
            display: "flex",
            [theme.breakpoints.up("md")]: {
                display: "none",
            },
        },
    }),
);

export default function PrimarySearchAppBar(): JSX.Element {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [clickedFullscreen, setClickedFullscreen] = useState(false);
    const [clickedSound, setClickedSound] = useState(false);
    const userInfo = useAppSelector((state): any | null => state.auth.userInfo);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuFullscreen = () => {
        setClickedFullscreen(!clickedFullscreen);
        return toggleFullScreen();
    };

    const handleMenuSound = () => {
        setClickedSound(!clickedSound);
        sound.mute() ? sound.mute(true) : sound.mute(false);
    };

    const handleLogoutClick = useCallback(async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        await dispatch(logout());

        history.push("/login");
    }, []);

    const menuId = "primary-search-account-menu";


    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to="/" className={classes.menuLink}>
                <MenuItem onClick={handleMenuClose}>Главная страница</MenuItem>
            </Link>
            <Link to="/leaderboard" className={classes.menuLink}>
                <MenuItem onClick={handleMenuClose}>Доска почета</MenuItem>
            </Link>
            <Link to="/profile" className={classes.menuLink}>
                <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
            </Link>
            <Link to="/forum" className={classes.menuLink}>
                <MenuItem onClick={handleMenuClose}>Форум</MenuItem>
            </Link>
            <Link to="/logout" className={ `${classes.menuLink} ${classes.red}` }>
                <MenuItem onClick={handleLogoutClick as any}>Выйти</MenuItem>
            </Link>
        </Menu>
    );

    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleProfileMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        FargoCards
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit">
                            <Badge onClick={handleMenuSound} color="secondary">
                                {clickedSound ? <VolumeUpIcon /> : <VolumeOffIcon /> }
                            </Badge>
                        </IconButton>
                        <IconButton onClick={handleMenuFullscreen} color="inherit">
                            <Badge color="secondary">
                                {clickedFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon /> }
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            { userInfo.avatar ? <Avatar alt="Remy Sharp" src={`${userInfo.avatar as string}`} /> : <AccountCircle /> }
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}
