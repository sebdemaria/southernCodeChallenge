import { useMemo } from "react";
import Head from "next/head";

import { getManifests } from "utils/getManifests";
import AppProvider from "hooks/useAppContext";

import { PhotosHome } from "screens/PhotosHome";

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
    const contextDefaultValue = useMemo(
        () => ({ rover_manifests }),
        [rover_manifests]
    );

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
