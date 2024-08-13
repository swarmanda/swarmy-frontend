export type Plan = {
  _id: string;
  type: 'FREE_PLAN' | undefined
  organizationId: string;
  name: string;
  amount: number;
  currency: string;
  frequency: string;
  status: PlanStatus;
  statusReason: string;
  cancelAt: string,
  quotas: PlanQuota;
};

export type PlanStatus = 'PENDING_PAYMENT' | 'ACTIVE' | 'CANCELLED';

export type PlanQuota = {
  uploadSizeLimit: number;
  uploadCountLimit: number;
  downloadSizeLimit: number;
  downloadCountLimit: number;
};
