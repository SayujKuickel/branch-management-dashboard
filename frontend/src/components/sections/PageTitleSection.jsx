import { Button } from "@/components";
import Link from "next/link";

function PageTitleSection({ title, href, icon, buttonText }) {
  return (
    <div className="flex items-center gap-4 justify-between">
      <h2 className="text-4xl font-bold underline underline-offset-4 decoration-accent">
        {title}
      </h2>

      {href && icon && buttonText ? (
        <Link href={href}>
          <Button icon={icon} title={buttonText}></Button>
        </Link>
      ) : null}
    </div>
  );
}

export default PageTitleSection;
