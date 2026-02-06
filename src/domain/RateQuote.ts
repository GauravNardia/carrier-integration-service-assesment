export interface RateQuote {
  carrier: string;
  serviceLevel: string;
  amount: number;
  currency: string;
  deliveryEstimate?: string;
}
