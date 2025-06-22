import { create } from "zustand";

type GeneratorStatus = "idle" | "loading" | "done" | "error";

interface GeneratorStore {
  status: GeneratorStatus;
  generate: () => Promise<void>;
  reset: () => void;
}

export const useGeneratorStore = create<GeneratorStore>((set) => ({
  status: "idle",

  generate: async () => {
    set({ status: "loading" });

    try {
      const res = await fetch("http://localhost:3000/report?size=1");
      console.log("Ответ получен:", res);

      if (!res.ok) throw new Error("Ошибка при генерации");

      const blob = await res.blob();
      console.log("blob:", blob);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated.csv";
      a.click();
      URL.revokeObjectURL(url);

      set({ status: "done" });
    } catch (error) {
      console.error("Ошибка генерации:", error);
      set({ status: "error" });
    }
  },
  reset: () => set({ status: "idle" }),
}));
