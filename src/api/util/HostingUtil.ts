/*
 * Copyright © 2021 Ben Petrillo. All rights reserved.
 *
 * Project licensed under the MIT License: https://www.mit.edu/~amini/LICENSE.md
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * All portions of this software are available for public use, provided that
 * credit is given to the original author(s).
 */

import {Request, Response} from "express";
import APIUtil from "./api/APIUtil";
import Models from "../database/Models";
import path from "path";
import {DiskStorageOptions} from "multer";

export default class HostingUtil {

    public static imageId: string;
    public static filePath: string;

    /**
     * Determine if an image exists.
     * @param id string
     * @param array any[]
     * @return boolean
     */

    public static imageExists(id: string, array: any[]): boolean {
        return array.some(element => {
            return element.imageId === id;
        });
    }

    /**
     * Get data on a specific image.
     * @param id string
     * @param array any[]
     * @return object|any
     */

    public static getImageData(id: string, array: any[]): object|any {
        return array.find(e => e.imageId === id);
    }

    /**
     * Get the disk storage options.
     * @return object
     */

    public static getDiskStorageOptions(): DiskStorageOptions {
        return {
            destination: (req: Request, file: any, cb: any) => {
                cb(null, path.join(__dirname + "/../../../uploads"));
            },
            filename: (req: Request, file: any, cb: any) => {
                const ext = path.extname(file.originalname);
                const id = APIUtil.generateUniqueId();
                const filePath = `/${id}${ext}`;
                Models.Uploads.create({filePath: filePath, imageId: id})
                    .then(() => {
                        cb(null, filePath);
                        HostingUtil.filePath = filePath;
                        HostingUtil.imageId = id;
                    });
            }
        }
    }

    /**
     * Send an array of all images.
     * @param req Express.Request
     * @param res Express.Response
     * @return Promise<any>
     */

    public static async sendArrayOfAllUploads(req: Request, res: Response): Promise<any> {
        const result: any = await Models.Uploads.find();
        if (result) {
            return res.status(200).json({
                status: res.statusCode,
                uploads: result,
                timestamps: APIUtil.getTimestamps()
            });
        }
    }

    /**
     * Render the EJS response after an image has been uploaded.
     * @param req Express.Request
     * @param res Express.Response
     * @return void
     */

    public static sendSuccessfulUploadResponse(req: Request, res: Response): void {
        return res.render("successfulUpload", {
            imageId: HostingUtil.imageId,
            filePath: HostingUtil.filePath,
            date: APIUtil.getDate()
        });
    }

    /**
     * Get an image by ID.
     * @param req Express.Request
     * @param res Express.Response
     * @return Promise<any>
     */

    public static async getImage(req: Request, res: Response): Promise<any> {
        Models.Uploads.find().then(images => {
            if (HostingUtil.imageExists(req.params.image, images)) {
                const imagePath = HostingUtil.getImageData(req.params.image, images).filePath;
                const imageId = HostingUtil.getImageData(req.params.image, images).imageId;
                HostingUtil.filePath = path + imagePath;
                HostingUtil.imageId = imageId;
                res.set("Content-Type", "text/html")
                return HostingUtil.sendEmbeddedResponse(imagePath, imageId, req, res);
            } else {
                return res.status(404).json({
                    status: res.statusCode,
                    message: "An image with that ID does not exist.",
                    timestamps: APIUtil.getTimestamps()
                });
            }
        });
    }

    /**
     * Send an embedded response of an image.
     * @param imagePath string
     * @param imageId string
     * @param req Express.Request
     * @param res Express.Response
     * @return any
     */

    public static sendEmbeddedResponse(imagePath: string, imageId: string, req: Request, res: Response): any {
        return res.render("image", {imagePath: imagePath, imageId: imageId});
    }
}