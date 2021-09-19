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
}