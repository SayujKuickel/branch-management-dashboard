"use client";
import { useRouter } from "next/navigation";

const defaultIcons = {
  plus: "fi fi-rr-plus-small",
  edit: "fi fi-rr-edit text-text",
  delete: "fi fi-rr-trash text-red-400",
  details: "fi fi-rr-file-circle-info text-text",
  update: "fi fi-rr-refresh",
  info: "fi fi-rr-info",
  next: "fi fi-rr-angle-small-right",
  prev: "fi fi-rr-angle-small-left",
};

const btnStyles = {
  primary:
    "font-semibold bg-primary/50 text-text/80  hover:bg-primary/80 hover:text-text border border-transparent",
  secondary:
    "border border-primary/25 bg-primary/5 hover:bg-primary/25 text-text/80 hover:text-text",
  tertiary:
    "bg-primary/10 hover:bg-accent/15 text-text/80 cursor-pointer hover:text-text",
};

const Button = ({
  title,
  icon,
  type = "button",
  btnType = "primary",
  href,
  className = "",
  onClick,
  iconSize = "text-sm",
}) => {
  const router = useRouter();

  function handleClick() {
    if (!onClick && href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  }

  const iconClass = defaultIcons[icon] ? `${defaultIcons[icon]}` : `${icon}`;

  return (
    <button
      onClick={handleClick}
      type={type}
      className={`transition-all cursor-pointer px-6 py-3 rounded-lg flex items-center gap-2 w-fit ${btnStyles[btnType]} ${className}`}
      aria-label={title || "Button"}
    >
      {icon && (
        <i className={`${iconClass} ${iconSize} flex`} aria-hidden="true"></i>
      )}
      {title && <span>{title}</span>}
    </button>
  );
};

export default Button;
