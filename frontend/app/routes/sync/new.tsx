import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { HomeIcon as HomeIconSolid } from "@heroicons/react/24/solid";
import { Form, Link } from "@remix-run/react";
import { StGeorgeLogo } from "~/components/bank/StGeorgeLogo";
import { WestpacLogo } from "~/components/bank/WestpacLogo";
import { YnabIcon } from "~/components/ynab/YnabIcon";

export default function New() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 items-center">
        <Link to="/">
          <div className="relative group h-8 w-8 text-neutral-500">
            <HomeIcon className="h-8 w-8 group-hover:invisible absolute" />
            <HomeIconSolid className="h-8 w-8 invisible group-hover:visible absolute" />
          </div>
        </Link>
        <ChevronRightIcon className="w-4 h-4 text-neutral-500 mt-0.5" />
        <div className="text-xl">New Sync</div>
      </div>
      <div className="text-xl">Bank</div>
      <div className="grid grid-cols-6 gap-4">
        <div className="rounded-md border-dashed border-2 border-neutral-300 p-8 flex flex-col items-center gap-2">
          <StGeorgeLogo className="w-16 h-16" />
          <div className="text-2xl">St George</div>
        </div>
        <div className="rounded-md border-dashed border-2 border-neutral-300 p-8 flex flex-col items-center gap-2">
          <WestpacLogo className="w-16 h-16" />
          <div className="text-2xl">Westpac</div>
        </div>
      </div>
      <div>
        <Form className="flex gap-4">
          <input
            type="text"
            placeholder="BSB Number"
            className="rounded-md border-2 border-neutral-300 hover:border-neutral-400 focus:border-neutral-400 focus:ring-0"
          />
          <input
            type="text"
            placeholder="Account Number"
            className="rounded-md border-2 border-neutral-300 hover:border-neutral-400 focus:border-neutral-400 focus:ring-0"
          />
          <input
            type="text"
            placeholder="Account Name"
            className="rounded-md border-2 border-neutral-300 hover:border-neutral-400 focus:border-neutral-400 focus:ring-0"
          />
        </Form>
      </div>
      <div className="text-xl">YNAB Budget</div>
      <div className="grid grid-cols-6 gap-4">
        <div className="rounded-md border-dashed border-2 border-neutral-300 p-8 flex flex-col items-center gap-2">
          <YnabIcon className="w-16 h-16" />
          <div className="text-2xl">Lamrock</div>
        </div>
        <div className="rounded-md border-dashed border-2 border-neutral-300 p-8 flex flex-col items-center gap-2">
          <YnabIcon className="w-16 h-16" />
          <div className="text-2xl">Test</div>
        </div>
      </div>
    </div>
  );
}
