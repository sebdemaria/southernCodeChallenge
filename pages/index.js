import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import moment from "moment";

import { getManifests } from "utils/getManifests";
import AppProvider from "hooks/useAppContext";
import { useLocalStorage } from "hooks";

import { PhotosHome } from "screens/PhotosHome";

import { ROVER_PHOTOS } from "consts/endpoints";
import { CURIOSITY } from "consts/rovers";

import { Layout } from "templates/base/Layout";

export const getServerSideProps = async () => {
    const rover_manifests = await getManifests();

    return {
        props: {
            rover_manifests: JSON.stringify(rover_manifests),
        },
    };
};

export default function Home({ rover_manifests }) {
    const [myFavourites, setMyFavourites] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [roverSelected, setRoverSelected] = useState(CURIOSITY);
    const [filters, setFilters] = useState(
        `${ROVER_PHOTOS.replace(
            "$rover_name",
            roverSelected
        )}?earth_date=${moment().format("YYYY-MM-DD")}`
    );

    const { getStorageItem } = useLocalStorage();

    const contextDefaultValue = useMemo(
        () => ({
            rover_manifests,
            setMyFavourites,
            myFavourites,
            pageIndex,
            setPageIndex,
            roverSelected,
            setRoverSelected,
            filters,
            setFilters,
        }),
        [
            rover_manifests,
            setMyFavourites,
            myFavourites,
            pageIndex,
            setPageIndex,
            roverSelected,
            setRoverSelected,
            filters,
            setFilters,
        ]
    );

    useEffect(() => {
        // set app context value
        const favouriteFilters = getStorageItem("my_favourites");

        if (favouriteFilters) {
            setMyFavourites(favouriteFilters);
        } else {
            setMyFavourites([]);
        }
    }, [getStorageItem]);

    return (
        <>
            <Head>
                <title>Southern Code Challenge</title>
                <meta
                    name="description"
                    content="NASA Challenge for Souther Code by Sebastian Demaria"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppProvider value={contextDefaultValue}>
                <Layout>
                    <PhotosHome />
                </Layout>
            </AppProvider>
        </>
    );
}
