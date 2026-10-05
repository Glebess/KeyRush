export type QuoteLengthCategory = "all" | "short" | "medium" | "long" | "huge";

export interface Quote {
  id: number;
  text: string;
  source: string;
  lengthCategory: number;
}
