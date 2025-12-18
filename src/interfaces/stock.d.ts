interface Stock {
  id: number;
  variant: Variant;
  quantity: number;
  type: StockLogType;
  note: string;
  createdBy: User;
  createdAt: Date;
}
enum StockLogType {
  IN = "IN",
  OUT = "OUT",
}
