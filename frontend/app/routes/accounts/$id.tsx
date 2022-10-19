import {
  ArrowRightCircleIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon as HomeIconSolid } from "@heroicons/react/24/solid";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type { SyncDetail } from "~/api/api";
import { syncDetails } from "~/api/api";
import { BankLogo } from "~/components/bank/BankLogo";
import { SyncStatusButton } from "~/components/sync/SyncStatusButton";
import { SyncStatusIcon } from "~/components/sync/SyncStatusIcon";
import { YnabIcon } from "~/components/ynab/YnabIcon";
import { format, formatDistanceToNow } from "date-fns";

export const loader: LoaderFunction = ({ params }) => {
  invariant(params.id, "Id must be provided");
  const id = parseInt(params.id);
  const sync = syncDetails.find((sync) => sync.id === id);

  return json(sync);
};

export default function Sync() {
  const sync = useLoaderData<SyncDetail>();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {/* <Link to="/">
          <div className="relative group h-8 w-8 text-neutral-500">
            <HomeIcon className="h-8 w-8 group-hover:invisible absolute" />
            <HomeIconSolid className="h-8 w-8 invisible group-hover:visible absolute" />
          </div>
        </Link>
        <ChevronRightIcon className="w-4 h-4 text-neutral-500" /> */}
        <BankLogo bank={sync.bank} />
        <div className="flex flex-col">
          <div className="text-lg">{sync.bank.accountName}</div>
          <div className="flex text-sm text-neutral-500">
            {sync.bank.bsbNumber} {sync.bank.accountNumber}
          </div>
        </div>
        <ArrowRightCircleIcon className="h-6 w-6 text-neutral-500" />
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
      <div className="flex flex-col rounded-lg border-2 border-neutral-300 bg-white py-4">
        <div className="px-4 pb-4 text-xl">History</div>
        {sync.history.map((h) => (
          <Link
            to={`history/${h.id}`}
            key={h.id}
            className="flex items-center gap-4 py-2 px-4 hover:bg-neutral-100"
          >
            <SyncStatusIcon status={h.status} />
            <div title={format(new Date(h.date), "Pp")}>
              {formatDistanceToNow(new Date(h.date), { addSuffix: true })}
            </div>
            <div className="ml-auto flex gap-2 text-sm text-neutral-500">
              <div>
                {h.newRecordsCount} new, {h.updatedRecordsCount} updated,{" "}
                {h.unchangedRecordsCount} not changed
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
