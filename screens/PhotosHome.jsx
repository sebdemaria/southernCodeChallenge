import useSWR from "swr";
import { useAppContext } from "hooks";

import { RoverPhotosGrid } from "components/RoverPhotosGrid";
import { PhotoSkeleton } from "components/UI";
import { Filters, Paginator } from "components";

import { httpGet } from "http/services/httpGet";

import styles from "styles/screenStyles/Home.module.scss";

export const PhotosHome = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const { filters, pageIndex } = useAppContext();

    const fetcher = ([BASE_URL, OPTIONS]) => httpGet(BASE_URL, null, OPTIONS);

    // swr for pagination caching
    const { data, isLoading } = useSWR(
        [BASE_URL, `${filters}&page=${pageIndex}`],
        fetcher
    );

    return (
        <section className={styles.container}>
            <Filters />

            <div className={styles.photoContainer}>
                <Paginator data={data} disabled={isLoading} />

                {isLoading && filters && <PhotoSkeleton />}

                {data?.photos?.length && !isLoading ? (
                    <RoverPhotosGrid data={data} />
                ) : (
                    false
                )}

                {!data?.photos.length && !isLoading ? (
                    <h1>
                        We couldn&apos;t find any images for those filters :(
                    </h1>
                ) : null}

                {data?.data?.error && (
                    <h1>
                        There was an error while trying to fetch the images.
                        Please try again.
                    </h1>
                )}
            </div>

            <Paginator data={data} disabled={isLoading} />
        </section>
    );
};
