interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: "ASC" | "DESC";
  sortBy?: string;
}
interface ProductQueryParams extends QueryParams {
  categoryId?: number;
  attributeCategoryIds?: number[];
  brandIds?: number[];
}
interface OrderQueryParams extends QueryParams {
  status?: string;
}
interface NotificationParams extends QueryParams {
  type?: NotificationType;
  isRead?: "true" | "false";
}
enum NotificationType {
  DISCOUNT = "DISCOUNT",
  ORDER = "ORDER",
  REVIEW = "REVIEW",
}
