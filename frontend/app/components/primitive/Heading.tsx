import classNames from "classnames";

type HeadingProps = {
  title: string;
  icon?: React.ReactNode;
  className?: string;
};

export function Heading({ title, icon, className }: HeadingProps) {
  return (
    <div className={classNames("flex gap-2 text-neutral-700", className)}>
      {icon}
      <div className="text-xl">{title}</div>
    </div>
  );
}
