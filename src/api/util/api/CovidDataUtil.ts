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

import axios from "axios";

export default class CovidDataUtil {

    /**
     * Get COVID-19 stats by country.
     * @param country: string
     * @return Promise<object>
     */

    public static async getCovidDataByCountry(country: string): Promise<object> {
        return new Promise((resolve, reject) => {
            axios.get("https://disease.sh/v3/covid-19/countries/" + country)
                .then(result => {
                    const {data}: any = result;
                    resolve({
                        country: data.country,
                        countryData: {
                            latitude: data.countryInfo.lat,
                            longitude: data.countryInfo.long,
                            flag: "https://app.ponjo.club/assets/flags/" + data.countryInfo.iso2.toLowerCase() + ".png"
                        },
                        covidData: {
                            active: data.active,
                            critical: data.critical,
                            cases: {
                                total: data.cases,
                                today: data.todayCases
                            },
                            deaths: {
                                total: data.deaths,
                                today: data.todayDeaths
                            },
                            recovered: {
                                total: data.recovered,
                                today: data.todayRecovered
                            }
                        }
                    });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Get global COVID-19 stats.
     * @return Promise<object>
     */

    public static async getWorldWideCovidData(): Promise<object> {
        return new Promise((resolve, reject) => {
           axios.get("https://disease.sh/v3/covid-19/all")
               .then(result => {
                   const {data}: any = result;
                   resolve({
                       covidData: {
                           active: data.active,
                           critical: data.critical,
                           cases: {
                               total: data.cases,
                               today: data.todayCases
                           },
                           deaths: {
                               total: data.deaths,
                               today: data.todayDeaths
                           },
                           recovered: {
                               total: data.recovered,
                               today: data.todayRecovered
                           }
                       }
                   });
               })
               .catch(error => {
                   reject(error);
               });
        });
    }
}