export type WestpacSyncDetail = {
  type: "westpac";
  accountName: string;
  bsbNumber: string;
  accountNumber: string;
};

export type StGeorgeSyncDetail = {
  type: "stgeorge";
  accountName: string;
  bsbNumber: string;
  accountNumber: string;
};

export type SupportedBanks = WestpacSyncDetail | StGeorgeSyncDetail;

export type SyncYnabDetail = {
  budgetId: string;
  budgetName: string;
  accountId: string;
  accountName: string;
};

export type SyncStatus =
  | "notsynced"
  | "queued"
  | "syncing"
  | "synced"
  | "error";

export type SyncDetail = {
  id: number;
  bank: SupportedBanks;
  ynab: SyncYnabDetail;
  status: SyncStatus;
  lastSyncTime?: Date;
};

export const syncDetails: Array<SyncDetail> = [
  {
    id: 1,
    bank: {
      type: "westpac",
      accountNumber: "12345678",
      bsbNumber: "123-456",
      accountName: "Transaction",
    },
    ynab: {
      budgetId: "123",
      budgetName: "Lamrock",
      accountId: "123",
      accountName: "Transaction",
    },
    status: "notsynced",
    lastSyncTime: new Date(),
  },
  {
    id: 2,
    bank: {
      type: "westpac",
      accountNumber: "123",
      bsbNumber: "123",
      accountName: "Danz Work",
    },
    ynab: {
      budgetId: "123",
      budgetName: "Lamrock",
      accountId: "123",
      accountName: "Danz Work",
    },
    status: "syncing",
    lastSyncTime: new Date(),
  },
  {
    id: 3,
    bank: {
      type: "stgeorge",
      accountNumber: "123",
      bsbNumber: "123",
      accountName: "Home Loan - Fixed",
    },
    ynab: {
      budgetId: "123",
      budgetName: "Lamrock",
      accountId: "123",
      accountName: "Home Loan - St George - Fixed",
    },
    status: "queued",
    lastSyncTime: new Date(),
  },
  {
    id: 4,
    bank: {
      type: "stgeorge",
      accountNumber: "123",
      bsbNumber: "123",
      accountName: "Home Loan - Offset",
    },
    ynab: {
      budgetId: "123",
      budgetName: "Lamrock",
      accountId: "123",
      accountName: "Home Loan Offset",
    },
    status: "synced",
    lastSyncTime: new Date(),
  },
  {
    id: 5,
    bank: {
      type: "stgeorge",
      accountNumber: "123",
      bsbNumber: "123",
      accountName: "Home Loan - Variable",
    },
    ynab: {
      budgetId: "123",
      budgetName: "Lamrock",
      accountId: "123",
      accountName: "Home Loan - St George - Variable",
    },
    status: "error",
    lastSyncTime: new Date(),
  },
];
