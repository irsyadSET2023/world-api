import GoogleMapReact from "google-map-react";
import { Fragment, useState } from "react";
/* <form action="">
                    <select action="">
                      {fetchData.map((country, index) => (
                        <option value={country.name}>{country.name}</option>
                      ))}
                    </select>
                  </form> */

function App() {
  const [fetchAllCountryState, setFetchAllCountryState] = useState("pending");
  const [fetchAllCountryData, setFetchAllCountryData] = useState(undefined);

  const handleFetchData = () => {
    setFetchAllCountryState("loading");

    fetch(
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
    )
      .then((res) => {
        // res.json();
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFetchAllCountryState("success");
        setFetchAllCountryData(data);
      })
      .catch((error) => {
        setFetchAllCountryState("error");
      });
  };

  return (
    <>
      <div className="w-screen min-h-screen flex justify-center p-4">
        <div className="container space-y-4">
          <h1>Countries of the world</h1>
          <div className="space-y-4">
            <button onClick={handleFetchData} className="bg-blue-700 w-[200px]">
              Fetch Countries
            </button>
            {fetchAllCountryState === "loading" && (
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 animate-spin"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            )}
            {fetchAllCountryState === "success" &&
              fetchAllCountryState &&
              Array.isArray(fetchAllCountryData) && (
                <div className="grid grid-cols-3 gap-y-2">
                  {/* <h1>Hello</h1> */}
                  <span>Index</span>
                  <span>Country</span>
                  <span>About</span>
                  {fetchAllCountryData.map((country, index) => {
                    return (
                      <Row country={country} index={index} />
                      // <Fragment key={index}>
                      //   <span>{index + 1}</span>
                      //   <span>{country.name}</span>
                      //   <button
                      //     className="ml-4 bg-blue-700 p-1 rounded"
                      //     id={country.name}
                      //     onClick={() => handleKnowMore(country.name)}
                      //   >
                      //     {fetchCountryState === "loading"
                      //       ? "Loading"
                      //       : "More Info"}
                      //   </button>
                      // </Fragment>
                    );
                  })}
                </div>
              )}
            {fetchAllCountryState === "error" && (
              <p className="text-red-400">Oh no Error Happened</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const Row = ({ country, index }) => {
  const [fetchCountryState, setFetchCountryState] = useState("pending");
  const [fetchedData, setFetchData] = useState(undefined);

  const handleKnowMore = (country) => {
    console.log("hit");
    setFetchCountryState("loading");
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFetchData(data);
        setFetchCountryState("success");
      })
      .catch((error) => {
        console.log(error);
        setFetchData(undefined);
        setFetchCountryState("pending");
      });
  };
  return (
    <>
      {fetchCountryState === "success" &&
        fetchedData &&
        Array.isArray(fetchedData) && (
          <CountryCard
            setFetchCountryState={setFetchCountryState}
            countryData={fetchedData}
          />
        )}
      <Fragment>
        <span>{index + 1}</span>
        <span>{country.name}</span>
        <button
          className="ml-4 bg-blue-700 p-1 rounded"
          onClick={() => handleKnowMore(country.name)}
        >
          {fetchCountryState === "loading" ? "Loading" : "More Info"}
        </button>
      </Fragment>
    </>
  );
};

const CountryCard = ({ setFetchCountryState, countryData }) => {
  return (
    <div className="w-screen min-h-screen fixed top-0 left-0 flex justify-center items-center bg-blue-200/50 backdrop-blur-sm">
      <div className="bg-white w-[500px] p-2 border border-gray-200">
        <div className="flex justify-between">
          <span>Info</span>
          <span
            className="underline text-blue-400 cursor-pointer"
            onClick={() => setFetchCountryState("pending")}
          >
            close
          </span>
        </div>
        <div>
          <div className="flex justify-center">
            <img
              className="flex h-[250px]"
              src={countryData[0]?.flags.svg}
              alt="Not Found"
            />
          </div>
          <h1>
            Name: {countryData[0]?.name.common} ({countryData[0]?.name.official}
            )
          </h1>
          <h1>
            Region: {countryData[0]?.region} ({countryData[0]?.subregion})
          </h1>
          <h1>Population: {countryData[0]?.population} </h1>
          <h1>
            United Nation Member Status:
            {countryData[0]?.unMember ? " Yes" : "No"}
          </h1>
          <h1>
            Capital:{" "}
            {countryData[0]?.capital != undefined
              ? countryData[0]?.capital[0]
              : "No capital"}
          </h1>
          <div className="w-[480px] h-[300px]">
            <GoogleMapReact
              // bootstrapURLKeys={{ key: "" }}
              defaultCenter={{
                lat: countryData[0]?.latlng[0],
                lng: countryData[0]?.latlng[1],
              }}
              defaultZoom={6}
            >
              <Star
                lat={
                  Object.keys(countryData[0]?.capitalInfo) != 0
                    ? countryData[0]?.capitalInfo?.latlng[0]
                    : 10
                }
                lng={
                  Object.keys(countryData[0]?.capitalInfo) != 0
                    ? countryData[0]?.capitalInfo?.latlng[1]
                    : 10
                }
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </div>
        {/* <div>{JSON.stringify(countryData, null, 4)}</div> */}
      </div>
    </div>
  );
};

const Star = () => {
  return (
    <img
      className="w-[15px] h-[15px] sticky"
      src="https://w7.pngwing.com/pngs/134/138/png-transparent-star-golden-stars-angle-3d-computer-graphics-symmetry-thumbnail.png"
    />
    // <svg
    //   class="w-6 h-6 text-yellow-300"
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   stroke="currentColor"
    // >
    //   <path
    //     stroke-linecap="round"
    //     stroke-linejoin="round"
    //     stroke-width="2"
    //     d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    //   />
    // </svg>
  );
};

export default App;
