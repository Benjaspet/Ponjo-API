import {Express, Request, Response} from "express";
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import Endpoints from "./V1Router";
import PremiumEndpoints from "./PremiumRouter";
import Uploader from "./UploadRouter";
import ErrorUtil from "./util/ErrorUtil";
import AvatarUtil from "./util/api/AvatarUtil";

export class Application {

    constructor(app: Express) {
        app.use("/v1", Endpoints);
        app.use("/v1", PremiumEndpoints);
        app.use("/uploads", Uploader);
        app.use(express.static(path.join(__dirname, "/public")));
        app.use(express.static(path.join(__dirname, "/uploads")));
        app.set("trust proxy", "8.8.8.8");
        app.set("trust proxy", 1);
        app.use(express.urlencoded({ extended: false }));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.get("/", (req: Request, res: Response) => {
            return res.sendFile(path.join(__dirname + "/public/index.html"));
        });
        app.get("/hosting", (req: Request, res: Response) => {
            return res.sendFile(path.join(__dirname + "/public/hosting.html"));
        });
        app.use((req: Request, res: Response) => {
            return ErrorUtil.send404Response(req, res);
        });
    }
}