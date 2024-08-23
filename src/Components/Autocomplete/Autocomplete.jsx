import React, { useState, useEffect, useRef } from "react";
import ResultsList from "../Lists/ResultList";
import useClickOutside from "../../hooks/useClickOutside";
import useKeyboardNavigation from "../../hooks/useKeyboardNavigation";
import styles from "./Autocomplete.module.scss";

const AutocompleteComponent = ({ data = [], numOfResults = 10, onSelect, triggerAnotherDataSource = null }) => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [lastSearches, setLastSearches] = useState([]);

    const hasThisSearch = (prevSearches, newSearch) => {
        return prevSearches?.some(prevSearch =>
            prevSearch.text === newSearch.text && newSearch.value === prevSearch.value
        );
    };

    const handleSelect = (state) => {
        setSearch(state?.text);
        // setShowDropdown(false);
        setIsSelecting(true)
        onSelect(state);

        if (!hasThisSearch(lastSearches, state)) {
            setLastSearches(prevHistory => {
                const editedHistory = [state, ...prevHistory];
                return editedHistory.length > numOfResults ? editedHistory.slice(0, numOfResults) : editedHistory;
            });
        }
        // Using a callback function to ensure the dropdown is hidden immediately
        setTimeout(() => {
            setShowDropdown(false);
        }, 0);
    };

    const handleStateForClickOutside = () => {
        setShowDropdown(false)
        resetActiveIndex();
    }

    const { activeIndex, handleKeyDown, resetActiveIndex } = useKeyboardNavigation(results, handleSelect);
    const containerRef = useRef(null);
    useClickOutside(containerRef, () => handleStateForClickOutside());

    const handleClearFields = () => {
        setShowDropdown(false);
        setResults([]);
    }

    const handleInputChange = (event) => {
        setIsSelecting(false)
        setSearch(event.target.value);
        if (triggerAnotherDataSource && event.target.value) {
            triggerAnotherDataSource(event.target.value);
        }
    };

    const handleClick = () => {
        setShowDropdown(true);
    }

    useEffect(() => {
        if (search) {
            const filteredResults = data
                .filter(item => item?.text?.toLowerCase().startsWith(search?.toLowerCase()))
                .slice(0, numOfResults);
            setResults(filteredResults);
            setShowDropdown(true);
        } else {
            handleClearFields();
        }
    }, [search, data, numOfResults, isSelecting]);

    const showSuggestions = showDropdown && results.length > 0;
    const showLastSearches = showDropdown && lastSearches.length > 0 && search === "";

    return (
        <div className={ styles.autocomplete } ref={ containerRef }>
            <input
                className={ styles.input }
                type="search"
                value={ search }
                onClick={ handleClick }
                onChange={ handleInputChange }
                onKeyDown={ handleKeyDown }
            />
            { showSuggestions && <ResultsList results={ results } onSelect={ handleSelect } activeIndex={ activeIndex } /> }
            { showLastSearches && <ResultsList results={ lastSearches } onSelect={ handleSelect } activeIndex={ activeIndex } /> }
        </div>
    );
};

export default AutocompleteComponent;
