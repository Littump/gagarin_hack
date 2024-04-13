export type TQuizStep =
  | "enterlude"
  | "enterludeIsEnded"
  | "portfolio"
  | "portfolioIsEnded"
  | "test"
  | "testIsEnded";

export interface IVariant {
  id: number;
  text: string;
  is_answer: boolean;
}
export interface IQuestion {
  id: number;
  text: string;
  number: number;
  variants: IVariant[];
  test: number;
}
export interface ITest {
  id: number;
  is_complete: boolean;
  name: string;
  percentage: string;
  questions: IQuestion[];
}
export interface IAnswer {}
