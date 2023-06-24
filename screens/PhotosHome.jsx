import { useState } from "react";
import useSWR from "swr";

import { RoverPhotosGrid } from "components/RoverPhotosGrid";
import { PhotoSkeleton } from "components/UI";
import { Filters, Paginator } from "@components/*";

import { httpGet } from "http/services/httpGet";

import { ROVER_PHOTOS } from "consts/endpoints";

import styles from "styles/screenStyles/Home.module.scss";

export const PhotosHome = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const [pageIndex, setPageIndex] = useState(0);
    const [roverSelected, setRoverSelected] = useState("");
    const [filters, setFilters] = useState("");

    const fetcher = ([BASE_URL, ENDPOINT, OPTIONS]) =>
        httpGet(BASE_URL, ENDPOINT, OPTIONS);

    // swr for pagination caching
    const { data, isLoading } = useSWR(
        [
            BASE_URL,
            `${ROVER_PHOTOS.replace("$rover_name", roverSelected)}`,
            filters
        ],
        fetcher
    );

    return (
        <section className={styles.container}>
            <Paginator pageIndex={pageIndex} setPageIndex={setPageIndex} />

            <Filters setRoverSelected={setRoverSelected} roverSelected={roverSelected} setFilters={setFilters} />

            {isLoading && (
                <PhotoSkeleton />
            )}

            {!isLoading && data?.photos?.length ? (
                <RoverPhotosGrid data={data} />
            ) :
                <h1>We couldn't find any pictures for those dates or cameras</h1>
            }

            <Paginator pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </section>
    );
};
