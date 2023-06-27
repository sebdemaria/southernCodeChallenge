import { useEffect, useRef, useState } from "react";
import { useAppContext, useFilters } from "hooks";
import moment from "moment";

import { Form, Formik } from "formik";
import { FiltersValidationSchema } from "./FiltersValidationSchema";

import { Select, Button, Input } from "components/UI";

import { ROVERS_SPECS } from "consts/rovers";

import styles from "styles/componentStyles/Filters.module.scss";

export const Filters = () => {
    const {
        rover_manifests,
        setFilters,
        roverSelected,
        setRoverSelected,
        setPageIndex,
        myFavourites,
    } = useAppContext();

    const { setQueryParams, addTofavourites } = useFilters(setFilters);

    const favRef = useRef();

    const [filterBy, setFilterBy] = useState("earth_date");
    const [wasSaved, setWasSaved] = useState(false);

    const maxEarthDateAvailable =
        moment(
            JSON.parse(rover_manifests).filter(
                (rover) => rover?.rover?.toLowerCase() === roverSelected
            )[0]?.max_date
        ).format("YYYY-MM-DD") || null;

    const maxSolAvailable =
        JSON.parse(rover_manifests).filter(
            (rover) => rover?.rover?.toLowerCase() === roverSelected
        )[0]?.max_sol || "";

    const validationSchema = FiltersValidationSchema();

    useEffect(() => {
        wasSaved &&
            setTimeout(() => {
                setWasSaved(false);
            }, 3000);
    }, [wasSaved]);

    return (
        <Formik
            initialValues={{
                earth_date: moment().format("YYYY-MM-DD"),
                sol: "",
                camera: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    setPageIndex(1);
                    setQueryParams(roverSelected, values);
                    console.log(favRef.current.value);
                } catch (error) {
                    throw new Error(error.message);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ resetForm, setFieldValue }) => (
                <Form noValidate className={styles.filterContainer}>
                    <Select
                        label="Rover"
                        defaultValue={roverSelected}
                        onChange={(e) => {
                            setRoverSelected(e.target.value), resetForm();
                        }}
                    >
                        <option value={""}>Select a rover</option>

                        {Object.values(ROVERS_SPECS).map(
                            ({ rover_name }, index) => (
                                <option key={index} value={rover_name}>
                                    {rover_name}
                                </option>
                            )
                        )}
                    </Select>

                    <div className={styles.filterBy}>
                        <label className={styles.radioTitle}>Filter by</label>

                        <span className={styles.radioContainer}>
                            <label
                                htmlFor="earth"
                                className={styles.radioLabel}
                            >
                                <input
                                    checked={filterBy === "earth_date" || false}
                                    id="earth"
                                    label="Earth Date"
                                    name="filterBy"
                                    type="radio"
                                    value="earth_date"
                                    onChange={(e) => {
                                        setFilterBy(e.target.value),
                                            setFieldValue("sol", "");
                                    }}
                                />
                                Earth Date
                            </label>

                            <label htmlFor="sol" className={styles.radioLabel}>
                                <input
                                    id="sol"
                                    label="Sol"
                                    name="filterBy"
                                    type="radio"
                                    value="sol"
                                    onChange={(e) => {
                                        setFilterBy(e.target.value),
                                            setFieldValue("earth_date", "");
                                    }}
                                />
                                Sol
                            </label>
                        </span>
                    </div>

                    {/* set max date to oldest date available for each rover mission according to manifest */}
                    <Input
                        disabled={
                            !roverSelected || filterBy !== "earth_date"
                                ? true
                                : false
                        }
                        id="earth_date"
                        label={"Earth Date"}
                        helperText={
                            roverSelected &&
                            maxEarthDateAvailable &&
                            `Max Earth Day available ${maxEarthDateAvailable}`
                        }
                        max={maxEarthDateAvailable}
                        name="earth_date"
                        type="date"
                    />

                    <Input
                        disabled={
                            !roverSelected || filterBy !== "sol" ? true : false
                        }
                        id="sol"
                        label="Sol"
                        max={maxSolAvailable}
                        name="sol"
                        placeholder={
                            roverSelected &&
                            maxSolAvailable &&
                            `Max sol available ${maxSolAvailable}`
                        }
                        type="tel"
                    />

                    <Select
                        label="Camera"
                        disabled={
                            !maxEarthDateAvailable ||
                            !maxSolAvailable ||
                            !roverSelected
                                ? true
                                : false
                        }
                        name="camera"
                    >
                        <option value={""}>All</option>

                        {roverSelected &&
                            ROVERS_SPECS[
                                roverSelected.toUpperCase()
                            ].cameras.map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                    </Select>

                    <span className={styles.btnsDiv}>
                        <Button type="submit">Search</Button>
                        <Button
                            type="submit"
                            customClass={"favouriteBtn"}
                            handleClick={() => {
                                addTofavourites(), setWasSaved(true);
                            }}
                        >
                            ⭐️
                        </Button>
                    </span>

                    <span className={styles.favouritesDiv}>
                        <Select
                            customClass={"favouritesSelect"}
                            disabled={!myFavourites.length}
                            label="Favs ⭐️"
                            name="favs"
                            ref={favRef}
                            onChange={(e) => {
                                setFilters(e.target.value),
                                    setPageIndex(1),
                                    resetForm();
                            }}
                        >
                            <option value={""}>Your favourites</option>

                            {myFavourites.map(
                                ({ favourite_name, queries }, index) => (
                                    <option key={index} value={queries}>
                                        {favourite_name}
                                    </option>
                                )
                            )}
                        </Select>

                        {wasSaved && (
                            <p className={styles.savedMsg}>Saved succesfully</p>
                        )}
                    </span>
                </Form>
            )}
        </Formik>
    );
};
