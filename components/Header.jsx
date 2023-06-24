import Image from "next/image";

import { useScroll } from "hooks";

import { NASALogo } from "public/assets";

import styles from "styles/componentStyles/Header.module.scss";

export const Header = () => {
    const [isHeaderHidden] = useScroll();

    return (
        <header className={`${styles.header} ${isHeaderHidden ? styles.headerAnimateOut : styles.headerAnimateIn}`}>
            <Image alt="NASA logo" className={styles.headerLogo} src={NASALogo} />
        </header>
    );
};
