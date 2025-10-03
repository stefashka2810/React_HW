import {useState} from "react";

const useGenerateApi = () => {
    const [status, setStatus] = useState<"begin" | "loading" | "success" | "error">("begin");
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [filename, setFilename] = useState<string|null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [items, setItems] = useState(false);

    async function getGeneratedFile() {
        setStatus("loading");
        setErrorMsg(null);
        setDownloadUrl(null);

        const ac = new AbortController();
        const timer = setTimeout(() => ac.abort(), 10_000); // таймаут 10s

        try {
            const res = await fetch("http://localhost:3000/report?size=0.01", {
                method: "GET",
                signal: ac.signal,
            });

            if (!res.ok) {
                const ct = res.headers.get("content-type") ?? "";
                let message = `HTTP ${res.status}`;
                try {
                    message = ct.includes("application/json")
                        ? (await res.json())?.message ?? message
                        : await res.text();
                } catch {
                    throw new Error(message);
                }
            }

            const ct = res.headers.get("content-type") ?? "";
            const isFile = ct.includes("text/csv") || ct.includes("application/octet-stream");
            if (!isFile) {
                const data = await res.json();
                throw new Error(typeof data?.message === "string" ? data.message : "Неожиданный ответ сервера");
            }

            const timeNow = new Date();
            const newFilename = `result_${timeNow}.csv`;

            setFilename(newFilename);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            localStorage.setItem(newFilename, url);
            setItems(true);

            setDownloadUrl(url);
            setStatus("success");
        } catch {
            setErrorMsg("Request failed");
            setStatus("error");
        } finally {
            clearTimeout(timer);
        }
    }

    return {
        status,
        downloadUrl,
        filename,
        errorMsg,
        items,
        getGeneratedFile
    }
}

export default useGenerateApi;


