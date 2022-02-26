/*
 * Copyright 2022 Ben Petrillo. All rights reserved.
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

import Config from "./Config";

export default class Constants {

    public static API_PORT: string = Config.get("PORT");
    public static HOST_ADDRESS: string = Config.get("HOST-ADDRESS");
    public static ELIXIR_API_PORT: string = Config.get("ELIXIR-API-PORT");
    public static ELIXIR_PREMIUM_API_PORT: string = Config.get("ELIXIR-PREMIUM-API-PORT");
    public static ELIXIR_TWO_API_PORT: string = Config.get("ELIXIR-TWO-API-PORT");
    public static ELIXIR_BLUE_API_PORT: string = Config.get("ELIXIR-BLUE-API-PORT");
    public static ELIXIR_BOT_ID: string = Config.get("ELIXIR-BOT-ID");
    public static ELIXIR_PREMIUM_BOT_ID: string = Config.get("ELIXIR-PREMIUM-BOT-ID");
    public static ELIXIR_TWO_BOT_ID: string = Config.get("ELIXIR-TWO-BOT-ID");
    public static ELIXIR_BLUE_BOT_ID: string = Config.get("ELIXIR-BLUE-BOT-ID");
    public static PONJOAPI_MONGO_URI: string = Config.get("PONJOAPI-URI");
    public static REQUEST_LOG_WEBHOOK: string = Config.get("REQUEST-LOG-WEBHOOK");

}