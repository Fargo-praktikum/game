import React, { useCallback, useState } from "react";
import "./DropdownMenu.scss";
import { changeTheme, ThemeType } from "../../store/gameReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { setStyle } from "../../scripts/utils/setStyle";

interface DropdownMenuProps {
    data: {
        id: number,
        label: ThemeType
    }[]
}

export const DropdownMenu = ({ data: items }: DropdownMenuProps) => {
    const dispatch = useAppDispatch();
    const [isOpen, setOpen] = useState(false);
    const userInfoId = useAppSelector((state): any | null => state.auth?.userInfo?.id);
    const mainTheme = useAppSelector((state) => state.game.theme);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleSubmit = useCallback(
        async (values: number) => {

            try {
                await dispatch(changeTheme({ themeId: values, userId: userInfoId }));
            }
            catch (e) {
                throw Error(e);
            }
        },
        [userInfoId]
    );


    return (
        <div className='dropdown'>
            <div className='dropdown__header' onClick={toggleDropdown}>
                {mainTheme}
            </div>
            <div className={`dropdown__body ${setStyle(isOpen, "open")}`}>
                {items.map(({ id, label }) => (
                    <div className="dropdown__item" key={id}
                        onClick={(_e) => {
                            handleSubmit(id);
                        }}>
                        <span className={`dropdown__item-dot ${setStyle(mainTheme === label, "selected")}`}>• </span>
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
};

