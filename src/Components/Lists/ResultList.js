import React from "react";
import styles from "./ResultsList.module.scss";

const ResultsList = ({ results, onSelect, activeIndex }) => {
    return (
        <ul className={styles.resultsContainer}>
            { results.map((result, index) => (
                <li
                    key={ `${result.text}-${index}` }
                    onClick={ () => onSelect(result) }
                    className={ `${styles.dropdown} ${index === activeIndex ? styles.active : ""}` }
                >
                    { result?.text }
                </li>
            )) }
        </ul>
    );
};

export default ResultsList;