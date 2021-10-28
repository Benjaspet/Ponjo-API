import Chance from "chance";
import {compareHashes} from "jimp";

export default class RandomUtil {

    public static getRandomMonth(raw: boolean) {
        if (raw) {
            return new Chance().month({raw: true});
        } else {
            return new Chance().month();
        }
    }

    public static getRandomParagraph(sentences?: number) {
        if (sentences) {
            return new Chance().paragraph({sentences: sentences})
        } else {
            return new Chance().paragraph();
        }
    }

    public static getRandomUserProfile(amount?: number): object[] {
        let profiles: object[] = [];
        let children: object[] = [];
        for (let i = 0; i <= Math.floor(Math.random() * 8); i++) {
            children.push({
                age: Math.floor(Math.random() * 19),
                name: new Chance().name().split(" ")[0],
                gender: new Chance().gender(),
                birthday: new Chance().birthday(),
                favorites: {
                    animal: new Chance().animal(),
                    color: new Chance().color()
                }
            });
        }
        if (amount) {
            for (let i = 0; i <= amount; i++) {
                profiles.push({
                    age: new Chance().age(),
                    name: new Chance().name(),
                    gender: new Chance().gender(),
                    address: new Chance().address(),
                    city: new Chance().city(),
                    state: new Chance().state(),
                    email: new Chance().email(),
                    birthday: new Chance().birthday(),
                    company: new Chance().company(),
                    ip: new Chance().ip(),
                    macAddress: new Chance().mac_address(),
                    ssn: new Chance().ssn(),
                    postCode: new Chance().postal(),
                    isBlackOrLatino: new Chance().bool(),
                    children: children,
                    favorites: {
                        animal: new Chance().animal(),
                        color: new Chance().color(),
                        currency: new Chance().currency()
                    }
                });
            }
        } else {
            profiles.push({
                age: new Chance().age(),
                name: new Chance().name(),
                gender: new Chance().gender(),
                address: new Chance().address(),
                city: new Chance().city(),
                state: new Chance().state(),
                email: new Chance().email(),
                birthday: new Chance().birthday(),
                company: new Chance().company(),
                ip: new Chance().ip(),
                macAddress: new Chance().mac_address(),
                ssn: new Chance().ssn(),
                postCode: new Chance().postal(),
                isBlackOrLatino: new Chance().bool(),
                children: children,
                favorites: {
                    animal: new Chance().animal(),
                    color: new Chance().color(),
                    currency: new Chance().currency()
                }
            });
        }
        return profiles;
    }

    public static getRandomTimezone(amount: number) {
        let timezones: object[] = [];
        for (let i = 0; i < amount; i++) {
            timezones.push({
                timezone: new Chance().timezone()
            });
        }
        return timezones;
    }
}