export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  lastLoginAt: string;
  phone: string;
  roleOverride: string;
  status: string;
  nickname: string;
  manager: string;
  coeffToPoint: number;
  kpi: number;
  line: string;
  rank: number;
  rankExplicit: string;
  employeeId: string;
  createdAt: string;
  updatedAt: string;
  systemOnly: boolean;
  fullname: string;

  meta: { [key: string]: any };
}
