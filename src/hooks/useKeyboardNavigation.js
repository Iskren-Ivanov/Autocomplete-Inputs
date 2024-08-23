import { useState, useCallback } from "react";

const useKeyboardNavigation = (items, onSelect) => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleKeyDown = useCallback((event) => {
        if (event.key === "ArrowDown") {
            // Move selection down
            setActiveIndex(prevIndex => Math.min(prevIndex + 1, items.length - 1));
        } else if (event.key === "ArrowUp") {
            // Move selection up
            setActiveIndex(prevIndex => Math.max(prevIndex - 1, 0));
        } else if (event.key === "Enter") {
            // Select the active item 
            if (activeIndex >= 0 && activeIndex < items.length) {
                onSelect(items[activeIndex]);
            }
        }
    }, [activeIndex, items, onSelect]);

    const resetActiveIndex = () => {
        setActiveIndex(-1);
    };

    return { activeIndex, handleKeyDown, resetActiveIndex };
};

export default useKeyboardNavigation; 