"use client";
import React, { useEffect, useState } from "react";
import { GET_Stats } from "@/utils/apiQueries";
import { Button, Loading, MainTitle, Table } from "@/components";
import { siteRoutes } from "@/utils/siteRoutes";
import { title } from "process";

const HomePage = () => {
  const [data, setData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = sessionStorage.getItem("user-name") || "Mr. admin";

  useEffect(() => {
    async function getData() {
      try {
        const res = await GET_Stats();
        const { stats } = res.data;

        setData(stats);

        const tableData = stats?.branch_data?.map((item, i) => ({
          ...item,
          "sn.": i + 1,
          id: item.branch_id,
          location: item.branch_location,
          student_count: `${item.student_count} students`,
          view: (
            <>
              <a href={`/${siteRoutes.branch}/${item.branch_id}`}>
                View Details
              </a>
            </>
          ),
        }));
        console.log(stats.branch_data);
        setTableData(tableData);
      } catch (error) {
        console.error("Error fetching data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const totalData = [
    {
      title: "Students",
      value: data?.total_students,
      icon: "fi fi-rr-student",
      link: siteRoutes.student,
    },
    {
      title: "Branch",
      value: data?.total_branches,
      icon: "fi fi-rr-building",
      link: siteRoutes.branch,
    },
    {
      title: "Unassigned",
      value: data?.unassigned,
      icon: "fi fi-rr-delete-user",
    },
  ];

  return (
    <main className="pb-8">
      <div className="container mx-auto px-5 mt-8 mb-10">
        <MainTitle title={`Welcome ${userName}!`} />

        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid lg:grid-cols-2 gap-2">
              {totalData.map((item, i) => (
                <div key={i} className="mb-4 p-4 bg-primary/5 rounded-lg">
                  <div className="flex gap-4 mb-4">
                    <i
                      className={`${item.icon} flex text-3xl w-18 aspect-square grid place-items-center outline-2 outline-primary/75 rounded-lg text-primary/75`}
                    />
                    <p className="flex flex-col gap-2">
                      <span className="block uppercase text-3xl font-bold text-primary/75">
                        Total {item.title}
                      </span>
                      <span className="text-2xl">{item.value}</span>
                    </p>
                  </div>

                  {item.link && (
                    <Button
                      btnType="secondary"
                      title={`View all ${item.title}`}
                      href={`/${item.link}`}
                    />
                  )}
                </div>
              ))}
            </div>

            <h2 className="relative w-fit text-2xl text-text font-bold before:bg-accent before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 pb-1 mb-4 mt-8">
              Branch Data
            </h2>
            <Table
              data={tableData}
              tableHeaders={[
                "sn.",
                "branch_name",
                "branch_location",
                "student_count",
                "view",
              ]}
            />
            <p className="text-xs">
              This table only shows branch with students assigned.{" "}
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
