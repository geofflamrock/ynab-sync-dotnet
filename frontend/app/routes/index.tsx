import React from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import classnames from "classnames";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import type { SyncDetail, SyncStatus } from "~/api/api";
import { syncDetails } from "~/api/api";
import { Layout } from "../components/layout/Layout";
import { BankLogo } from "../components/bank/BankLogo";
import { YnabIcon } from "../components/ynab/YnabIcon";
import { SyncStatusButton } from "../components/sync/SyncStatusButton";

type NavItemProps = {
  name?: string;
  icon: React.ReactElement;
  to: string;
};

const NavItem = ({ name, icon, to }: NavItemProps) => (
  <Link
    to={to}
    className="flex flex-col gap-1 items-center hover:bg-gray-700 py-6 cursor-pointer"
  >
    {icon}
    {name && <span className="text-white text-sm">{name}</span>}
  </Link>
);

export type PropsWithClassName = {
  className?: string;
};

export const HomeNavItem = () => <NavItem icon={<YnabIcon />} to="/" />;

export function loader() {
  return json(syncDetails);
}

export default function Index() {
  const data = useLoaderData<Array<SyncDetail>>();

  return (
    <div className="flex flex-col gap-4 container mx-auto">
      <div className="text-xl">YNAB Sync</div>
      {data.map((d) => {
        const borderClassName =
          d.status === "error"
            ? "border-red-600 hover:border-red-700"
            : "border-neutral-300 hover:border-neutral-400";

        return (
          <Link
            key={d.id}
            to={`/sync/${d.id}`}
            className={classnames(
              "rounded-lg border-2 bg-white p-4 flex gap-4 items-center",
              borderClassName
            )}
          >
            <div className="flex gap-4 w-48 items-center">
              <BankLogo bank={d.bank} />
              <div className="flex flex-col">
                <div>{d.bank.accountName}</div>
                <div className="text-sm text-neutral-500">
                  {d.bank.bsbNumber} {d.bank.accountNumber}
                </div>
              </div>
            </div>
            <ChevronRightIcon className="w-4 h-4" />
            <div className="flex gap-4 items-center">
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
    </div>
  );
}
