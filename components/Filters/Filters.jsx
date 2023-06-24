import { useEffect, useState } from "react";
import { useAppContext } from "hooks";

import { Select } from "components/UI";

import { ROVERS_SPECS } from "consts/rovers";

import styles from "styles/componentStyles/Filters.module.scss";

export const Filters = ({ setFilters, roverSelected, setRoverSelected }) => {
    const { rover_manifests } = useAppContext();

    const [cameraSelected, setCameraSelected] = useState("");

    const maxEarthDateAvailable = JSON.parse(rover_manifests).filter(rover => rover.rover.toLowerCase() === roverSelected)[0]?.max_date;

    const maxSolAvailable = JSON.parse(rover_manifests).filter(rover => rover.rover.toLowerCase() === roverSelected)[0]?.max_sol;

    useEffect(() => {    
            // ! hay que terminar el handleo de los filtros, seria mejor usar un custom hook 
            // ! para handlear el onchange de cada filtro y setear el setfilters
        const options = 'sol='
    }, [maxEarthDateAvailable, maxSolAvailable, cameraSelected])


    return (
        <div className={styles.filterContainer}>
            {/* set max date to oldest date available for each rover mission according to manifest */}
            <input type="date" id="earth_date" max={maxEarthDateAvailable} value={maxEarthDateAvailable} />

            <input type="number" id="earth_date" placeholder={roverSelected && `Max sol available ${maxSolAvailable}`} value={maxSolAvailable} />

            <Select handleSelected={setRoverSelected}>
                <option value={""}>Select a rover</option>
                {Object.values(ROVERS_SPECS).map(({ rover_name }, index) => (
                    <option
                        key={index}
                        value={rover_name}
                    >
                        {rover_name}
                    </option>
                ))}
            </Select>

            <Select disabled={!roverSelected ? true : false} handleSelected={setCameraSelected}>
                <option value={""}>Select a camera</option>

                {roverSelected &&
                    ROVERS_SPECS[roverSelected.toUpperCase()].cameras.map((value, index) => (
                        <option
                            key={index}
                            value={value}
                        >
                            {value}
                        </option>
                    ))
                }
            </Select>
        </div>
    );
};
