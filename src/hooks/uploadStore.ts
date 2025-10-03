import { create } from "zustand";

type UploadStatus = "idle" | "ready" | "loading" | "success" | "error";

export interface UploadResult {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_date: string;
  big_spent_date: string;
  less_spent_civ: string;
  big_spent_civ: string;
  big_spent_value: number;
  average_spend_galactic: number;
}

interface UploadStore {
  file: File | null;
  status: UploadStatus;
  error: string | null;
  result: UploadResult | null;
  invalidType: boolean;
  setFile: (file: File | null) => void;
  upload: () => Promise<void>;
  clear: () => void;
}

export const useUploadStore = create<UploadStore>((set, get) => ({
  file: null,
  status: "idle",
  error: null,
  result: null,
  invalidType: false,

  setFile: (file) => {
    const isCSV = file?.name.toLowerCase().endsWith(".csv");
    set({
      file,
      invalidType: file ? !isCSV : false,
      status: file ? (isCSV ? "ready" : "error") : "idle",
      error: !isCSV && file ? "Неверный тип файла" : null,
    });
  },

  upload: async () => {
    const { file, invalidType } = get();
    if (!file || invalidType) return;

    set({ status: "loading", error: null, result: null });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/aggregate?rows=1000", {
        method: "POST",
        body: formData,
      });

      if (!res.ok || !res.body) {
        throw new Error("Ошибка при загрузке");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
      }

      console.log("RAW STREAM:", accumulated);

      const lines = accumulated.trim().split("\n");
      const lastLine = lines[lines.length - 1];
      const parsed: UploadResult = JSON.parse(lastLine);

      set({ result: parsed, status: "success" });

      const history = JSON.parse(localStorage.getItem("uploadHistory") || "[]");
      const newEntry = { name: file.name, date: new Date().toISOString() };
      localStorage.setItem(
        "uploadHistory",
        JSON.stringify([newEntry, ...history]),
      );
    } catch (e) {
      if (e instanceof Error) {
        set({ status: "error", error: e.message });
      } else {
        set({ status: "error", error: "Неизвестная ошибка" });
      }
    }
  },

  clear: () => {
    set({
      file: null,
      result: null,
      error: null,
      status: "idle",
      invalidType: false,
    });
  },
}));
