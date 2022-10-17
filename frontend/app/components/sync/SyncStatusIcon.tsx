import React from "react";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import type { SyncStatus } from "~/api/api";

export type SyncStatusIconProps = {
  status: SyncStatus;
};

export function SyncStatusIcon({ status }: SyncStatusIconProps) {
  switch (status) {
    case "notsynced":
      return <ArrowPathIcon className="w-8 h-8 mt-0.5 text-ynab" />;

    case "syncing":
      return (
        <ArrowPathIcon className="w-8 h-8 mt-0.5 text-ynab animate-spin" />
      );

    case "queued":
      return <ArrowPathIcon className="w-8 h-8 mt-0.5 text-ynab" />;

    case "synced":
      return <CheckCircleIcon className="w-8 h-8 mt-0.5 text-green-600" />;

    case "error":
      return (
        <ExclamationTriangleIcon className="w-8 h-8 mt-0.5 text-red-600" />
      );
  }
}
