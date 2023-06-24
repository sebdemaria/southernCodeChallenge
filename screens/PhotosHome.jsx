import { useState } from "react";
import useSWR from "swr";

import { Button, PhotoSkeleton, Select } from "components/UI";

import { httpGet } from "http/services/httpGet";

import { ROVER_PHOTOS } from "consts/endpoints";
import { CURIOSITY, ROVERS_SPECS } from "consts/rovers";

import styles from "styles/screenStyles/Home.module.scss";
import { RoverPhotosGrid } from "components/RoverPhotosGrid";
import { Filters, Paginator } from "@components/*";

export const PhotosHome = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const [pageIndex, setPageIndex] = useState(0);
    const [roverSelected, setRoverSelected] = useState("");

    const OPTIONS = `sol=1000&page=${pageIndex}`;

    const fetcher = ([BASE_URL, ENDPOINT, OPTIONS]) =>
        httpGet(BASE_URL, ENDPOINT, OPTIONS);

    // swr for pagination caching
    const { data, isLoading } = useSWR(
        [
            BASE_URL,
            `${ROVER_PHOTOS.replace("$rover_name", roverSelected)}`,
            OPTIONS,
        ],
        fetcher
    );

    return (
        <section className={styles.container}>
            <Paginator pageIndex={pageIndex} setPageIndex={setPageIndex} />

            <Filters handleSelected={setRoverSelected} />

            {isLoading || !data ? (
                <PhotoSkeleton />
            ) : (
                <RoverPhotosGrid data={data} />
            )}

            <Paginator pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </section>
    );
};
