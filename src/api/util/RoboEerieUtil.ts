import Tags from "../models/roboeerie/TagSchema";
import APIUtil from "./api/APIUtil";

export default class RoboEerieUtil {

    public static async fetchTags(count?: number) {
        return new Promise((resolve, reject) => {
            try {
                if (count) {
                    Tags.find()
                        .then(result => {
                            const array = [];
                            result.forEach(key => {
                                array.push({
                                    tag: key.tag,
                                    content: key.content,
                                    author: key.author,
                                    guild: key.guild,
                                    createdAt: key.createdAt,
                                    updatedAt: key.updatedAt
                                });
                            });
                            const sliced = array.slice(0, count);
                            resolve(sliced);
                        });
                } else {
                    Tags.find()
                        .then(result => {
                            const array = [];
                            result.forEach(key => {
                                array.push({
                                    tag: key.tag,
                                    content: key.content,
                                    author: key.author,
                                    guild: key.guild,
                                    createdAt: key.createdAt,
                                    updatedAt: key.updatedAt
                                });
                            });
                            resolve(array);
                        });
                }
            } catch (error) {
                reject({
                    msg: "An error occurred."
                });
            }
        });
    }
}