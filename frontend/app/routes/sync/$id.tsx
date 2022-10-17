import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { SyncDetail, SyncStatus } from "~/api/api";
import { syncDetails } from "~/api/api";
import { BankLogo } from "~/components/bank/BankLogo";
import { SyncStatusButton } from "~/components/sync/SyncStatusButton";
import { SyncStatusIcon } from "~/components/sync/SyncStatusIcon";
import { YnabIcon } from "~/components/ynab/YnabIcon";
import { add, format, formatDistanceToNow, sub } from "date-fns";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.id, "Id must be provided");
  const id = parseInt(params.id);
  const sync = syncDetails.find((sync) => sync.id === id);

  return json(sync);
};

type SyncHistory = {
  id: number;
  status: SyncStatus;
  date: Date;
  newRecordsCount: number;
  updatedRecordsCount: number;
  unchangedRecordsCount: number;
};

export default function Sync() {
  const sync = useLoaderData<SyncDetail>();
  const history: Array<SyncHistory> = [
    {
      id: 1,
      status: "synced",
      date: sub(new Date(), { hours: 6 }),
      newRecordsCount: 0,
      unchangedRecordsCount: 15,
      updatedRecordsCount: 2,
    },
    {
      id: 2,
      status: "synced",
      date: sub(new Date(), { hours: 6, days: 1 }),
      newRecordsCount: 3,
      unchangedRecordsCount: 12,
      updatedRecordsCount: 0,
    },
    {
      id: 3,
      status: "synced",
      date: sub(new Date(), { hours: 6, days: 2 }),
      newRecordsCount: 10,
      unchangedRecordsCount: 6,
      updatedRecordsCount: 1,
    },
    {
      id: 4,
      status: "error",
      date: sub(new Date(), { hours: 6, days: 2 }),
      newRecordsCount: 12,
      unchangedRecordsCount: 4,
      updatedRecordsCount: 6,
    },
    {
      id: 5,
      status: "synced",
      date: sub(new Date(), { hours: 6, days: 3 }),
      newRecordsCount: 0,
      unchangedRecordsCount: 7,
      updatedRecordsCount: 0,
    },
  ];
  return (
    <div className="flex flex-col p-2 gap-8 container mx-auto">
      <div className="flex gap-4 items-center">
        <BankLogo bank={sync.bank} />
        <div className="flex flex-col">
          <div className="text-lg">{sync.bank.accountName}</div>
          <div className="flex text-sm text-neutral-500">
            {sync.bank.bsbNumber} {sync.bank.accountNumber}
          </div>
        </div>
        <ChevronRightIcon className="w-4 h-4 mt-0.5" />
        <YnabIcon />
        <div className="flex flex-col">
          <div className="text-lg">{sync.ynab.accountName}</div>
          <div className="flex text-sm text-neutral-500">
            {sync.ynab.budgetName}
          </div>
        </div>
        <div className="ml-auto">
          <SyncStatusButton status={sync.status} />
        </div>
      </div>
      <div className="border-2 border-neutral-300 rounded-lg py-4 bg-white flex flex-col">
        <div className="text-xl px-4 pb-4">History</div>
        {history.map((h) => (
          <Link
            to={`history/${h.id}`}
            key={h.id}
            className="flex gap-4 items-center py-2 px-4 hover:bg-neutral-100"
          >
            <SyncStatusIcon status={h.status} />
            <div title={format(h.date, "Pp")}>
              {formatDistanceToNow(h.date, { addSuffix: true })}
            </div>
            <div className="flex gap-2 ml-auto text-neutral-500 text-sm">
              <div>
                {h.newRecordsCount} new, {h.updatedRecordsCount} updated,{" "}
                {h.unchangedRecordsCount} not changed
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
