export const toggleFullScreen = () => {
    if (!document.fullscreenEnabled) return console.log("fullScreen isn't enable");

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
};
