import PropTypes from "prop-types";

import { Header } from "components/Header";

import styles from "styles/templateStyles/Layout.module.scss";

export const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className={styles.main}>{children}</main>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
