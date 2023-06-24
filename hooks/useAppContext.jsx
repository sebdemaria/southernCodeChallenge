import { createContext, useContext } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error(
            "useAppContext must be used within an AppContext.Provider"
        );
    }

    return context;
};

export default AppContext.Provider;
