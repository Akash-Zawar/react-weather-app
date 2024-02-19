import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoOptions, geoUrl } from "./api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  const loadOptions = async (input) => {
    try {
      const response = await fetch(
        `${geoUrl}/cities?minPopulation=1000000&namePrefix=${input}`,
        geoOptions
      );
      const response_1 = await response.json();
      console.log(response_1);
      return {
        options: response_1.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (err) {
      console.log(err);
      return { options: [] };
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
