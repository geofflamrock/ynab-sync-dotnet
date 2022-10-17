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
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 items-center">
        <Link to="/">
          <div className="relative group h-8 w-8 text-neutral-500">
            <HomeIcon className="h-8 w-8 group-hover:invisible absolute" />
            <HomeIconSolid className="h-8 w-8 invisible group-hover:visible absolute" />
          </div>
        </Link>
        <ChevronRightIcon className="w-4 h-4 text-neutral-500" />
        <BankLogo bank={sync.bank} />
        <div className="flex flex-col">
          <div className="text-lg">{sync.bank.accountName}</div>
          <div className="flex text-sm text-neutral-500">
            {sync.bank.bsbNumber} {sync.bank.accountNumber}
          </div>
        </div>
        <ArrowRightCircleIcon className="w-6 h-6 text-neutral-500" />
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
        {sync.history.map((h) => (
          <Link
            to={`history/${h.id}`}
            key={h.id}
            className="flex gap-4 items-center py-2 px-4 hover:bg-neutral-100"
          >
            <SyncStatusIcon status={h.status} />
            <div title={format(new Date(h.date), "Pp")}>
              {formatDistanceToNow(new Date(h.date), { addSuffix: true })}
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
      <div>
        <Outlet />
      </div>
    </div>
  );
}
