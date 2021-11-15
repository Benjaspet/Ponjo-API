import {Request, Response} from "express";

export default class UploaderUtil {

    public static imageData: string[] = [];
    public static htmlData: string[] = [];

    public static imageExists(id, array) {
        return array.some(function(el) {
            return el.imageId === id;
        });
    }

    public static getImageData(id, array) {
        return array.find(e => e.imageId === id);
    }

    public static sendEmbeddedResponse(imagePath: string, imageId: string, req: Request, res: Response) {
        return res.status(200).send('<html lang="en">\n' +
            '<head>\n' +
            '    <style id="stndz-style"></style>\n' +
            '    <title>Ponjo Hosting</title>\n' +
            '    <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/Eerie6560/Archives/main/images/icons/Ponjo-Hosting.png">\n' +
            `    <meta name="twitter:image" content=${imagePath}>\n` +
            `    <meta property="og:title" content="Ponjo | ${imageId}.png">\n` +
            '    <meta property="og:description" content="Developed by Eerie#6560.">\n' +
            '    <meta name="twitter:card" content="summary_large_image">\n' +
            '    <meta name="theme-color" content="#4295f4">\n' +
            '</head>\n' +
            '<body style="height: 100%; text-align: center; margin: 0; background: #222222;">\n' +
            `    <img id="imageTag" style="user-select: none; -webkit-user-select: none; cursor: zoom-in;" src=${imagePath} alt="https://ponjo.club" alt="">\n` +
            '</body>\n' +
            '</html>');
    }
}