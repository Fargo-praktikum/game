import React from "react";
import "./dragAndDrop.scss";

interface dataDnD {
    dropDepth: number,
    inDropZone: boolean,
    fileList: any
}

const DragAndDrop = (props: { data: dataDnD, dispatch: any }) => {

    const { data, dispatch } = props;

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        e.dataTransfer.dropEffect = "copy";
        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        const files = [...e.dataTransfer.files];
        console.log(files, "drop");
        if (files && files.length > 0) {
            dispatch({ type: "ADD_FILE_TO_LIST", files });
            dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
            dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
        }
    };

    return (
        <div className={"dragDropZone"}
            onDrop={e => handleDrop(e)}
            onDragOver={e => handleDragOver(e)}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)}
        >
            <p className={"dragDropZone__mainText profile-svg-change"}>Перетащите изображение или нажмите здесь</p>
            <p className={"profile-svg-change"}>,чтобы загрузить его (не более 1 мб)</p>
        </div>
    );
};

export default DragAndDrop;
