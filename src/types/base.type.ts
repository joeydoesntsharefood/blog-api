export interface BaseResponse<T> {
  success: false;
  message: string;
  data?: T;
  errors?: Record<string, string>;
};

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
};

export interface BaseFlow<C, S> {
  controler: C,
  service: S
}
