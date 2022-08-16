export interface ApiBaseRes {
  success: boolean;
  code: string;
  message?: string;
  data: any;
}
