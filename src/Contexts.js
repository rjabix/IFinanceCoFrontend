import {createContext, useContext} from "react";

const BackendApiUrlContext = createContext();

export const useBackendUrl = () => {
    const context = useContext(BackendApiUrlContext);
    if (!context) {
        throw new Error("useBackendUrl must be used within a BackendApiUrlProvider");
    }
    return context;
};

export const BackendApiUrlProvider = ({children, backendUrl}) => {
    return (
        <BackendApiUrlContext.Provider value={backendUrl}>
            {children}
        </BackendApiUrlContext.Provider>
    )
};