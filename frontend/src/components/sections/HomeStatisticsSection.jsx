import { siteRoutes } from "@/utils/siteRoutes";
import Link from "next/link";
import Button from "../inputs/Button";

const HomeStatisticsSection = ({
  totalStudents,
  totalBranches,
  unassigned,
}) => {
  const totalData = [
    {
      title: "Students",
      value: totalStudents,
      icon: "fi fi-rr-student",
      link: siteRoutes.student,
      features: "@add",
    },
    {
      title: "Branches",
      value: totalBranches,
      icon: "fi fi-rr-building",
      link: siteRoutes.branch,
      features: "@add",
    },
    {
      title: "Unassigned Students",
      value: unassigned,
      icon: "fi fi-rr-delete-user",
      link: `${siteRoutes.student}/?unassigned=true`,
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-4 py-6 px-2 rounded-lg bg-primary/5 mb-5">
      {totalData.map((item, i) => (
        <div key={i} className="p-4 rounded-lg">
          <p className="mb-1 uppercase text-lg flex items-center gap-2  text-text/50">
            <i className={`${item.icon}`} />

            <span>Total {item.title}</span>
          </p>

          <p className="text-7xl font-semibold text-accent/75 mb-4">
            {item.value < 10 ? `0${item.value}` : item.value}
          </p>

          <div className="flex items-center gap-2">
            <Button
              href={item.link}
              title={`View ${item.title}`}
              btnType="tertiary"
              className={"text-sm font-semibold"}
            />

            {item.features === "@add" && (
              <Button
                href={`${item.link}/add`}
                btnType="tertiary"
                icon={"plus"}
                className={" text-lg font-semibold h-full"}
              />
            )}
          </div>

          {/* <Link className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-accent/15 w-fit text-sm font-semibold text-text/50 cursor-pointer hover:text-text"></Link> */}
        </div>
      ))}
    </div>
  );
};

export default HomeStatisticsSection;
