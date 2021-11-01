import {Request, Response} from "express";
import fetch from "node-fetch";
import AuthorizationUtil from "../../util/AuthorizationUtil";
import ErrorUtil from "../../util/ErrorUtil";

export default class ChatbotRoute {

    public static async sendChatbotMessage(req: Request, res: Response): Promise<Response> {
        try {
            const message = req.query.message as string;
            const botName = req.query.name ? req.query.name : "Ponjo Bot" as string;
            await fetch(`https://yourmommmaosamaobama.hisroyal123.repl.co/?message=${encodeURIComponent(message)}`)
                .then(response => response.json())
                .then(data => {
                    return res.status(200).json({
                        status: res.statusCode,
                        chatbot: {
                            name: botName,
                            response: data.message
                        },
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
                    });
                }).catch(error => {
                    return res.status(400).json({
                        status: 400,
                        message: "The chatbot endpoint is experiencing issues at this time.",
                        timestamps: {
                            date: new Date().toLocaleString(),
                            unix: Math.round(+ new Date() / 1000),
                        }
                    });
                });
        } catch (error) {
            return ErrorUtil.sent500Status(req, res);
        }
    }
}