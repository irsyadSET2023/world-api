import axios from "axios";

export const getAllCountryData2 = async () => {
  return fetch(
    "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const getCountryData2 = async (country) => {
  return fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((res) => res.json())
    .then((data) => data);
};

export const getAllCountryData = async () => {
  return axios.get(
    "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
  );
};

export const getCountryData = async (country) => {
  return axios.get(`https://restcountries.com/v3.1/name/${country}`);
  //   return fetch(`https://restcountries.com/v3.1/name/${country}`)
  //     .then((res) => res.json())
  //     .then((data) => data);
};

/* <form action="">
                    <select action="">
                      {fetchData.map((country, index) => (
                        <option value={country.name}>{country.name}</option>
                      ))}
                    </select>
                  </form> */
