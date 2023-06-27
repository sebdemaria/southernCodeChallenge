import { useState } from "react";
import useSWR from "swr";

import { RoverPhotosGrid } from "components/RoverPhotosGrid";
import { PhotoSkeleton } from "components/UI";
import { Filters, Paginator } from "@components/*";

import { httpGet } from "http/services/httpGet";

import { CURIOSITY } from "../consts/rovers";

import styles from "styles/screenStyles/Home.module.scss";
import { ROVER_PHOTOS } from "consts/endpoints";
import moment from "moment";

export const PhotosHome = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const [pageIndex, setPageIndex] = useState(1);
    const [roverSelected, setRoverSelected] = useState(CURIOSITY);
    const [filters, setFilters] = useState(
        `${ROVER_PHOTOS.replace(
            "$rover_name",
            roverSelected
        )}?earth_date=${moment().format("YYYY-MM-DD")}`
    );

    const fetcher = ([BASE_URL, OPTIONS]) => httpGet(BASE_URL, null, OPTIONS);

    // swr for pagination caching
    const { data, isLoading } = useSWR(
        [BASE_URL, `${filters}&page=${pageIndex}`],
        fetcher
    );

    return (
        <section className={styles.container}>
            <Filters
                setRoverSelected={setRoverSelected}
                roverSelected={roverSelected}
                setFilters={setFilters}
                setPageIndex={setPageIndex}
            />

            <div className={styles.photoContainer}>
                <Paginator
                    data={data}
                    disabled={isLoading}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                />

                {isLoading && filters && <PhotoSkeleton />}

                {data?.photos?.length ? (
                    <RoverPhotosGrid data={data} />
                ) : (
                    <h1>
                        We couldn&apos;t find any images for those filters :(
                    </h1>
                )}

                {!data && <h1>Use the filters above to search for images!</h1>}

                {data?.data?.error && (
                    <h1>
                        There was an error while trying to fetch the images.
                        Please try again.
                    </h1>
                )}
            </div>

            <Paginator
                data={data}
                disabled={isLoading}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
            />
        </section>
    );
};
