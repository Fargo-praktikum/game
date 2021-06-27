import React, { useCallback, useState } from "react";
import "./DropdownMenu.scss";
import { changeTheme } from "../../store/gameReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";

interface DropdownMenuProps {
    data: {
        id: number,
        label: string
    }[],
    text: string
}

export const DropdownMenu = (props: DropdownMenuProps) => {
    const [isOpen, setOpen] = useState(false);
    const [items] = useState(props.data);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    const toggleDropdown = () => setOpen(!isOpen);
    const userInfoId = useAppSelector((state): any | null => state.auth?.userInfo?.id);

    const handleSubmit = useCallback(
        async (values: number) => {

            try {
                await dispatch(changeTheme({ themeId: values, userId: userInfoId }));
            }
            catch (e) {
                throw Error(e);
            }
        },
        []
    );

    const handleItemClick = (id: any) => {
        selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
        handleSubmit(id);
    };


    return (
        <div className='dropdown'>
            <div className='dropdown__header' onClick={toggleDropdown}>
                {selectedItem ? items.find(item => item.id == selectedItem)?.label : props.text}
                <i className={`fa fa-chevron-right icon ${isOpen ? "open" : "" }`}/>
            </div>
            <div className={`dropdown__body ${isOpen ? "open" : ""}`}>
                {items.map(item => (
                    <div className="dropdown__item" onClick={((e) => {
                        const selectedDiv = e.target as HTMLDivElement;
                        handleItemClick(selectedDiv.id);
                    })} id={item.id.toString()} key={item.id}>
                        <span className={`dropdown__item-dot ${item.id == selectedItem  ? "selected" : ""}`}>• </span>
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

