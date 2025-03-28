"use client";
import { useRouter } from "next/navigation";

const defaultIcons = {
  plus: "fi fi-rr-plus-small",
  edit: "font-xs fi fi-rr-edit ; font-xs text-text",
  delete: "font-xs fi fi-rr-trash ; font-xs text-red-400",
  details: "font-xs fi fi-rr-file-circle-info ; font-xs text-text",
  update: "fi fi-rr-refresh",
  info: "fi fi-rr-info",
  next: "fi fi-rr-angle-small-right",
  prev: "fi fi-rr-angle-small-left",
};

const btnStyles = {
  primary:
    "bg-primary text-background hover:bg-primary/25 hover:text-text border border-transparent",
  secondary: "border border-primary/25 bg-primary/5 hover:bg-primary/25",
};

const Button = ({
  title,
  icon,
  type,
  btnType = "primary",
  href,
  className,
  onClick,
}) => {
  const router = useRouter();

  const iconStyle = Object.keys(defaultIcons).includes(icon)
    ? defaultIcons[icon]
    : `${icon} text-lg`;

  const btnStyle = btnStyles[btnType];

  function handleClick() {
    if (href) router.push(href);
  }

  return (
    <button
      onClick={onClick || handleClick}
      type={type}
      className={` transition-all cursor-pointer px-6 py-3 rounded-lg flex items-center gap-2 ${btnStyle} ${className}`}
    >
      {icon && <i className={`${iconStyle} flex`}></i>}

      {title && <span className="">{title}</span>}
    </button>
  );
};

export default Button;
