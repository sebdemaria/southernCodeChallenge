import { useAppContext } from "hooks";

import { Select } from "components/UI";

import { ROVERS_SPECS } from "consts/rovers";

import styles from "styles/componentStyles/Filters.module.scss";

export const Filters = ({ handleSelected }) => {
    const { rover_manifests } = useAppContext();

    return (
        <div className={styles.filterContainer}>
            <Select handleSelected={handleSelected}>
                <option value={""}>Select a rover</option>
                {JSON.parse(rover_manifests).map(({ rover }, index) => (
                    <option
                        key={index}
                        value={
                            ROVERS_SPECS[String(rover).toUpperCase()]
                                ?.rover_name
                        }
                    >
                        {rover}
                    </option>
                ))}
            </Select>
        </div>
    );
};
