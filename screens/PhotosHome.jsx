import { useState } from 'react'
import useSWR from 'swr';

import { Button, NextImage as Image } from 'components/UI';

import { httpGet } from 'http/services/httpGet';

import { ROVER_PHOTOS } from 'consts/endpoints';
import { CURIOSITY } from 'consts/rovers';

import styles from "styles/screenStyles/Home.module.scss";

export const PhotosHome = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const [pageIndex, setPageIndex] = useState(0);

    const OPTIONS = `sol=1000&page=${pageIndex}`

    const fetcher = ([BASE_URL, ENDPOINT, OPTIONS]) => httpGet(BASE_URL, ENDPOINT, OPTIONS);

    const { data, isLoading, error } = useSWR([BASE_URL, `${ROVER_PHOTOS.replace('$rover_name', CURIOSITY)}/photos`, OPTIONS], fetcher);

    return (
        <div className={styles.container}>
            {
                isLoading ? 'Loading...'
                    :
                    data.photos.map(({ img_src }, index) => (
                        <Image alt='rover photo' key={index} img_src={img_src} height={200} width={200} />
                    ))
            }

            <div className={styles.buttonContainer}>
                <Button onClick={() => setPageIndex(pageIndex - 1)}>Previous</Button>
                <Button onClick={() => setPageIndex(pageIndex + 1)}>Next</Button>
            </div>
        </div>
    )
}
