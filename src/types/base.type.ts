export interface BaseResponse<T> {
  success: false;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}