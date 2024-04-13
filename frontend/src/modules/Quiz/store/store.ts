import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TQuizStep } from "@/modules/Quiz/types/quizTypes.ts";

interface BearState {
  step: TQuizStep;
  result: number;
  setResult: (val: number) => void;
  setStep: (step: TQuizStep) => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set) => ({
      step: "enterlude",
      setStep: (by) => set(() => ({ step: by })),
      result: 0,
      setResult: (by) => set(() => ({ result: by })),
    }),
    { name: "bearStore" },
  ),
);
