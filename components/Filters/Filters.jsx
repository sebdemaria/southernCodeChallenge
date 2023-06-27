import PropTypes from "prop-types";

import { useState } from "react";
import { useAppContext, useFilters } from "hooks";
import moment from "moment";

import { Form, Formik } from "formik";
import { FiltersValidationSchema } from "./FiltersValidationSchema";

import { Select, Button, Input } from "components/UI";

import { ROVERS_SPECS } from "consts/rovers";

import styles from "styles/componentStyles/Filters.module.scss";

export const Filters = ({
    setFilters,
    roverSelected,
    setRoverSelected,
    setPageIndex,
}) => {
    const { rover_manifests } = useAppContext();
    const { setQueryParams } = useFilters(setFilters);

    const [filterBy, setFilterBy] = useState("");

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

    const validationSchema = FiltersValidationSchema(
        maxSolAvailable,
        filterBy,
        roverSelected
    );

    return (
        <Formik
            initialValues={{
                earth_date: maxEarthDateAvailable,
                sol: "",
                camera: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    setPageIndex(1);
                    setQueryParams(roverSelected, values);
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
                                    id="earth"
                                    label="Earth Date"
                                    // checked={true}
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
                        defaultValue={maxEarthDateAvailable}
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
                            !maxEarthDateAvailable || !maxSolAvailable
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

                    <Button type="submit">Search</Button>
                </Form>
            )}
        </Formik>
    );
};

Filters.propTypes = {
    setFilters: PropTypes.func.isRequired,
    roverSelected: PropTypes.string.isRequired,
    setRoverSelected: PropTypes.func.isRequired,
    setPageIndex: PropTypes.func.isRequired,
    setExecuteSubmit: PropTypes.func.isRequired,
};
