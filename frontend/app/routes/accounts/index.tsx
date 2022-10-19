import React from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import classnames from "classnames";
import {
  ArrowRightCircleIcon,
  CreditCardIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import type { SyncDetail } from "~/api/api";
import { syncDetails } from "~/api/api";
import { BankLogo } from "../../components/bank/BankLogo";
import { YnabIcon } from "../../components/ynab/YnabIcon";
import { SyncStatusButton } from "../../components/sync/SyncStatusButton";
import { Heading } from "~/components/primitive/Heading";

export function loader() {
  return json(syncDetails);
}

export default function AccountsIndex() {
  const data = useLoaderData<Array<SyncDetail>>();

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Accounts" icon={<CreditCardIcon className="h-8 w-8" />} />
      {data.map((d) => {
        const borderClassName =
          d.status === "error"
            ? "border-red-600 hover:border-red-700"
            : "border-neutral-300 hover:border-neutral-400";

        return (
          <Link
            key={d.id}
            to={`/accounts/${d.id}`}
            className={classnames(
              "flex items-center gap-8 rounded-lg border-2 bg-white p-4",
              borderClassName
            )}
          >
            <div className="flex w-64 items-center gap-4">
              <BankLogo bank={d.bank} />
              <div className="flex flex-col">
                <div>{d.bank.accountName}</div>
                <div className="text-sm text-neutral-500">
                  {d.bank.bsbNumber} {d.bank.accountNumber}
                </div>
              </div>
            </div>
            <ArrowRightCircleIcon className="h-6 w-6 text-neutral-500" />
            <div className="flex items-center gap-4">
              <YnabIcon />
              <div className="flex flex-col">
                <div>{d.ynab.accountName}</div>
                <div className="text-sm text-neutral-500">
                  {d.ynab.budgetName}
                </div>
              </div>
            </div>
            <SyncStatusButton status={d.status} />
          </Link>
        );
      })}
      <Link
        to="/sync/new"
        className="flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-neutral-300 p-4 text-neutral-500 hover:border-neutral-400 hover:text-neutral-700"
      >
        <PlusCircleIcon className="h-6 w-6" />
        Add New Account
      </Link>
    </div>
  );
}
