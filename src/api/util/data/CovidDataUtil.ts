import axios from "axios";

export default class CovidDataUtil {

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