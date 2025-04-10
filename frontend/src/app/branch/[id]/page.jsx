"use client";
import {
  ApiUrlMappings,
  GET_ApiRequest,
  GET_Student,
  PATCH_ApiRequest,
} from "@/utils/apiQueries";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Button,
  ListItem,
  Loading,
  MainTitle,
  NoData,
  Pagination,
  SearchText,
  Table,
} from "@/components";
import { filterTableData } from "@/utils/filterTableData";
import { siteRoutes } from "@/utils/siteRoutes";

const tableHeaders = ["sn.", "name", "phone", "email", "options"];

const Page = () => {
  // pagination
  const searchParams = useSearchParams();
  // for id
  const { id: branchId } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [searchText, setsearchText] = useState("");
  const [data, setData] = useState([]);

  const [branchData, setBranchData] = useState([]);
  // pagination
  const page = parseInt(searchParams.get("page"), 10) || 0;
  const limit = parseInt(searchParams.get("limit"), 10) || 10;

  async function getData(pageNumber, dataLimit, id) {
    setLoading(true);
    try {
      const res = await GET_ApiRequest(
        ApiUrlMappings.student,
        null,
        pageNumber,
        dataLimit,
        [`branch_id=${id}`]
      );
      const { data } = await res.data;

      const formattedData = data.map((item, index) => ({
        ...item,
        "sn.": index + 1,
        options: (
          <div className="flex gap-1">
            <Button
              title={""}
              icon={"fi fi-rr-shuffle"}
              href={`/${siteRoutes.student}/add?edit=${item.id}&mode=change`}
              className="text-xs"
              btnType="secondary"
            />
            <Button
              title={""}
              icon={"delete"}
              className="text-xs"
              btnType="secondary"
              onClick={() => handleRemoveFromBranch(item.id)}
            />
          </div>
        ),
        name: `${item.first_name} ${item.last_name}`,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("There was an error");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveFromBranch(id) {
    if (!confirm("Are You sure you want to remove Student from this branch?"))
      return;

    try {
      await PATCH_ApiRequest(ApiUrlMappings.student, id, {
        branch_id: null,
      });

      getData(page, limit, branchId);
    } catch (error) {
      console.error("[E]", error.messagee);
    }
  }

  useEffect(() => {
    if (branchId) {
      getData(page, limit, branchId);
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (page < 0 || limit < 0) {
      getData(0, 10, branchId);
    } else {
      getData(page, limit, branchId);
    }
  }, [page, limit]);

  useEffect(() => {
    async function getBranchData(id) {
      try {
        setLoading(true);
        const res = await GET_ApiRequest(ApiUrlMappings.branch, id);
        const { branch } = res.data;

        if (!branch) setBranchData(null);

        const data = Object.keys(branch).map((item) => ({
          label: item,
          name: branch[item],
        }));

        console.log(data);
        setBranchData(data);
      } catch (error) {
        console.log("[E]", error.message);
      } finally {
        setLoading(false);
      }
    }

    if (branchId) getBranchData(branchId);
  }, []);

  const filteredData = filterTableData(data, tableHeaders, searchText);

  if (loading) {
    <main>
      <div className="container mx-auto px-5 mt-8">
        <Loading />
      </div>
    </main>;
  }

  if (!branchData) {
    return (
      <main>
        <div className="container mx-auto px-5 mt-8">
          <NoData title={"No branch data found"} />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="pb-10">
        <div className="container mx-auto px-5 mt-8 mb-10">
          <MainTitle title={"Branch Details"} />

          <div className="bg-primary/5 p-6 gap-4 rounded-lg mb-12">
            <div className=" grid grid-cols-1 lg:grid-cols-3">
              {branchData.map((item, i) => (
                <ListItem
                  key={i}
                  label={item?.label}
                  icon={item?.icon}
                  name={item?.name}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6">
              <Button
                href={`/${siteRoutes.branch}/add?edit=${branchId}`}
                title={"Edit branch Details"}
                btnType="tertiary"
                icon={"edit"}
              />
            </div>
          </div>

          <MainTitle subtitle={"Students"} />

          <div className="flex items-center justify-between mb-3">
            <SearchText value={searchText} setValue={setsearchText} />
          </div>

          <Loading loading={loading}>
            {filteredData.length > 0 ? (
              <div className="rounded-lg overflow-hidden">
                <Table tableHeaders={tableHeaders} data={filteredData} />
              </div>
            ) : (
              <NoData
                title={
                  searchText
                    ? "No Students matches your query!"
                    : "No Data found!"
                }
              />
            )}
          </Loading>

          <Pagination page={page} limit={limit} />
        </div>
      </main>
    </>
  );
};

export default Page;
