import { ROVER_PHOTOS } from "consts/endpoints";

export const useFilters = (setFilters) => {
    let filterValues = [];

    const setQueryParams = (roverSelected, values) => {
        for (const key in values) {
            if (!values[key]) continue;

            const newQueryParam = `&${key}=${values[key]}`;
            if (filterValues.length === 0) filterValues.push(newQueryParam);

            // check if index of filter value is 'earth_date' or 'sol'
            if (key === "earth_date" || key === "sol") {
                // check if filterValues array already contains any of these
                // if it does replace older with new one cause api doesn't accept more than one date
                filterValues.forEach((queryString) => {
                    if (
                        queryString.indexOf("earth_date") !== -1 ||
                        queryString.indexOf("sol") !== -1
                    ) {
                        filterValues.splice(
                            filterValues.indexOf(queryString),
                            1
                        );
                        filterValues.unshift(newQueryParam);
                    }
                });
            } else {
                filterValues.push(newQueryParam);
            }

            // unify all query params into one
            setFilters(
                `${ROVER_PHOTOS.replace(
                    "$rover_name",
                    roverSelected
                )}?${filterValues.join("").slice(1)}`
            );
        }
    };

    return { setQueryParams };
};
