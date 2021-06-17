import { app } from "./src/server/server";

const port = process.env.PORT || 9001;

app.listen(port, () => {
    console.log("ПРОВЕРКА ИЗ app.lister");
    console.log("Application is started on localhost:", port);
});
