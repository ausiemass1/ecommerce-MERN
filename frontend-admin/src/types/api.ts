// PaginatedResponse type
export type PaginatedResponse<T> = {
    data: T[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
  };