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

import {AwesomeQR} from "awesome-qr";

export default class QRCodeUtil {

    /**
     *
     * @param text: string
     * @param size: number
     * @param backgroundImage?: string <URL>
     * @return Promise<any>
     */

    public static async generateQRCode(text: string, size: number, backgroundImage?: string): Promise<any> {
        if (!backgroundImage) {
            return await new AwesomeQR({
                text: text,
                size: size
            }).draw();
        } else {
            return await new AwesomeQR({
                text: text,
                size: size,
                backgroundImage: backgroundImage
            }).draw();
        }
    }
}