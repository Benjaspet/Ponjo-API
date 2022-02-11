/*
 * Copyright © 2022 Ben Petrillo. All rights reserved.
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
import {Webhook, MessageBuilder} from "discord-webhook-node";
import Config from "../../../Config";

export default class WebhookUtil {

    public static async sendBaseLogWebhook(req: Request, res: Response): Promise<any> {
        const webhook: Webhook = new Webhook(Config.get("REQUEST-LOG-WEBHOOK"));
        const embed: MessageBuilder = new MessageBuilder()
            .setTitle(`New Request`)
            .setDescription(`
            • URL: [${req.url}](${"https://app.ponjo.club" + req.url})
            • Protocol: ${req.protocol}
            • Request type: \`${req.method}\`
            `)
            .addField("Headers", "```json" + "\n" + JSON.stringify(req.headers, null, 4) + "```", false)
            .setFooter(`Method type: ${req.method}`)
            .setTimestamp()
        await webhook.send(embed);
    }
}