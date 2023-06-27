import { renderHook } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const TEST_KEY = "key";
const TEST_VALUE = { test: "test" };

describe("useLocalStorage", () => {
    test("should set localstorage with default value", () => {
        const { result } = renderHook(() => useLocalStorage());
        const { setStorageItem } = result.current;

        setStorageItem(TEST_KEY, TEST_VALUE);

        expect(JSON.parse(window.localStorage.getItem(TEST_KEY))).toEqual(
            TEST_VALUE
        );
    });

    test("should get localstorage default item", () => {
        const { result } = renderHook(() => useLocalStorage());
        const { getStorageItem } = result.current;

        window.localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));

        const TEST_ITEM = getStorageItem(TEST_KEY);

        expect(TEST_ITEM).toEqual(TEST_VALUE);
    });

    test("should delete localstorage default item", () => {
        const { result } = renderHook(() => useLocalStorage());
        const { deleteStorageItem } = result.current;

        window.localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));

        deleteStorageItem(TEST_KEY);

        expect(JSON.parse(window.localStorage.getItem(TEST_KEY))).toBeNull();
    });
});
