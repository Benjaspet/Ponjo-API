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

import Chance from "chance";

export default class RandomUtil {

    /**
     * Get a random month of the year.
     * @param raw boolean
     * @return object|string
     */

    public static getRandomMonth(raw: boolean): object|string {
        if (raw) {
            return new Chance().month({raw: true});
        } else {
            return new Chance().month();
        }
    }

    /**
     * Get a random paragraph of text.
     * @param ?sentences number
     * @return string
     */

    public static getRandomParagraph(sentences?: number): string {
        if (sentences) {
            return new Chance().paragraph({sentences: sentences})
        } else {
            return new Chance().paragraph();
        }
    }

    /**
     * Get a random user profile.
     * @param ?amount number
     * @return object[]
     */

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
            for (let i = 1; i <= amount; i++) {
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

    /**
     * Get a random number of timezones.
     * @param amount number
     * @return object
     */

    public static getRandomTimezone(amount: number): object {
        let timezones: object[] = [];
        for (let i = 0; i < amount; i++) {
            timezones.push({
                timezone: new Chance().timezone()
            });
        }
        return timezones;
    }
}