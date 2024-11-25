import {createContext, useState, useContext} from "react";

const LoadingContext = createContext(undefined);

export const LoadingProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{isLoading, showLoading, hideLoading}}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
