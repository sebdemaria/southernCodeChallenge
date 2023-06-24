import { useCallback } from "react";

export const useLocalStorage = () => {
    const setStorageItem = (key, value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    const getStorageItem = useCallback((key) => {
        const item = window.localStorage.getItem(key);
        if (item !== "undefined" || item !== null) return JSON.parse(item);
    }, []);

    const deleteStorageItem = (key) => {
        window.localStorage.removeItem(key);
    };

    const clearStorage = () => {
        window.localStorage.clear();
    };

    return { setStorageItem, getStorageItem, deleteStorageItem, clearStorage };
};
