import {useEffect, useState} from "react";

const useLocalStorage = () => {
    const [storageData, setStorageData] = useState<[string, string][]>([]);

    function getLocalStorage(): [string, string][] {
        const data: [string, string][] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key != null) {
                const item = localStorage.getItem(key);
                if (item) {
                    data.push([key, item]);
                }
            }
        }
        return data;
    }

    function deleteFromLocalStorage(key: string) {
        localStorage.removeItem(key);
        setStorageData(prev => prev.filter(item => item[0] !== key));
    }

    useEffect(() => {
        setStorageData(getLocalStorage());
    }, []);

    return {
        storageData,
        getLocalStorage,
        deleteFromLocalStorage
    }
}

export default useLocalStorage;