export type ApiResponse<T = { message: string }> = T;

export type ApiResponsePaginated<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
};

export type ApiError = {
  error: {
    message: string;
  };
};
