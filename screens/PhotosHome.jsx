import { useEffect, useState } from "react";
import useSWR from "swr";

import { RoverPhotosGrid } from "components/RoverPhotosGrid";
import { PhotoSkeleton } from "components/UI";
import { Filters, Paginator } from "@components/*";

import { httpGet } from "http/services/httpGet";

import { ROVER_PHOTOS } from "consts/endpoints";
import { CURIOSITY } from "../consts/rovers";

import styles from "styles/screenStyles/Home.module.scss";

export const PhotosHome = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const [pageIndex, setPageIndex] = useState(1);
    const [roverSelected, setRoverSelected] = useState(CURIOSITY);
    const [filters, setFilters] = useState("");

    const fetcher = ([BASE_URL, ENDPOINT, OPTIONS]) => {
        httpGet(BASE_URL, ENDPOINT, OPTIONS);
    };
    console.log(filters);
    // swr for pagination caching
    const { data, isLoading } = useSWR(
        [
            BASE_URL,
            `${ROVER_PHOTOS.replace("$rover_name", roverSelected)}`,
            `${filters}&page=${pageIndex}`,
        ],
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
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                />

                {isLoading && filters && <PhotoSkeleton />}

                {!isLoading && data?.photos?.length && (
                    <RoverPhotosGrid data={data} />
                )}

                {!isLoading && !data?.photos?.length && (
                    <h1>
                        We couldn&apos;t find any pictures for the filters
                        selected.
                    </h1>
                )}

                {data?.data?.error && (
                    <h1>
                        There was an error while trying to fetch the images.
                        Please try again.
                    </h1>
                )}
            </div>

            <Paginator
                data={data}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
            />
        </section>
    );
};
