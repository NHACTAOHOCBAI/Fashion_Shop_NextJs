interface Stock {
  id: number;
  type: StockLogType;
  note: string;
  createdBy: User;
  createdAt: Date;
  items: {
    variant: Variant;
    quantity: number;
  }[];
}
enum StockLogType {
  IN = "IN",
  OUT = "OUT",
}
