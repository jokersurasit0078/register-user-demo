import { createContext, useContext, useState } from 'react';
import { node } from 'prop-types';

const LoadingContext = createContext<any>({});

export function useLoadingContext() {
    return useContext(LoadingContext);
}

function LoadingProvider({ children }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function startLoading() {
        setIsLoading(true);
    }

    function stopLoading() {
        setIsLoading(false);
    }

    const loadingStore = {
        isLoading,
        userRegisterAction: {
            startLoading,
            stopLoading
        }
    }

    return (
        <LoadingContext.Provider value={loadingStore}>
            {children}
        </LoadingContext.Provider>
    )
}

LoadingProvider.propTypes = {
    children: node.isRequired
}

export default LoadingProvider;