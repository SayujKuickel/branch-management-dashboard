"use client";
import React, { useEffect, useState } from "react";
import { GET_Stats } from "@/utils/apiQueries";
import {
  Button,
  HomeStatisticsSection,
  Loading,
  MainTitle,
  Table,
} from "@/components";
import { siteRoutes } from "@/utils/siteRoutes";

// data?.total_students
// data?.total_branches
// data?.unassigned
// statistics
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
              <Button
                btnType="secondary"
                title={"View"}
                className={"text-sm font-semibold"}
                href={`/${siteRoutes.branch}/${item.branch_id}`}
              />
            </>
          ),
        }));
        setTableData(tableData);
      } catch (error) {
        console.error("Error fetching data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <main className="pb-8">
      <div className="container  mx-auto px-5 mt-8 mb-10">
        <MainTitle title={`Welcome ${userName}!`} />

        {loading ? (
          <Loading />
        ) : (
          <>
            <HomeStatisticsSection
              totalStudents={data?.total_students}
              totalBranches={data?.total_branches}
              unassigned={data?.unassigned}
            />

            <h2 className="relative w-fit text-2xl text-text font-bold before:bg-accent before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 pb-1 mb-4 mt-8">
              Branch Data
            </h2>

            <div className="rounded-lg overflow-hidden">
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
            </div>

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
