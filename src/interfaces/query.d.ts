interface QueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sortOrder?: "ASC" | "DESC";
    sortBy?: string;
}
interface ProductQueryParams extends QueryParams {
    categoryId?: number;
    attributeCategoryIds?: number[]
}