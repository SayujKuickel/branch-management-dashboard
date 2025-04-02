"use client";
import React, { useEffect, useState } from "react";
import { getData } from "@/services/fetchStudent";
import { siteRoutes } from "@/utils/siteRoutes";
import {
  Button,
  Loading,
  MainTitle,
  NoData,
  Pagination,
  SearchText,
  Table,
} from "@/components";
import { filterTableData } from "@/utils/filterTableData";
import { handlePagination } from "@/utils/handlePagination";
import {
  ApiUrlMappings,
  DELETE_Student,
  GET_ApiRequest,
} from "@/utils/apiQueries";
import { useSearchParams } from "next/navigation";

const tableHeaders = ["sn.", "name", "phone", "email", "branch", "options"];

const page = () => {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [searchText, setsearchText] = useState("");
  const [data, setData] = useState([]);
  const [isFetchingUnasigned, setIsFetchingUnasigned] = useState(() => {
    const fetchMode = searchParams.get("unassigned");

    console.log(fetchMode, typeof fetchMode);
    if (fetchMode === "true") return true;

    return false;
  });

  const page = parseInt(searchParams.get("page"), 10) || 0;
  const limit = parseInt(searchParams.get("limit"), 10) || 10;

  async function fetchData(pageNumber, dataLimit, isAssignedMode) {
    setLoading(true);
    let queries = [];
    if (isAssignedMode) queries.push("unasigned=true");

    try {
      const formattedData = await getData(
        GET_ApiRequest(
          ApiUrlMappings.student,
          null,
          pageNumber,
          dataLimit,
          queries
        ),
        handleDeleteStudent
      );
      setData(formattedData);
    } catch (error) {
      console.error("There was an error");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (page < 0 || limit < 0) {
      handlePagination(0, 10);
    } else {
      fetchData(page, limit, isFetchingUnasigned);
    }
  }, [page, limit]);

  async function handleDeleteStudent(id) {
    try {
      if (!confirm("Are you sure you want to delete?")) return;

      await DELETE_Student(id);
      setData([]);

      fetchData(page, limit);
    } catch (error) {
      console.error("Error while deleting");
    }
  }

  function handleAsignedFetch() {
    setIsFetchingUnasigned((value) => !value);
    fetchData(page, limit, !isFetchingUnasigned);
  }

  const filteredData = filterTableData(data, tableHeaders, searchText);

  return (
    <main>
      <div className="container mx-auto px-5 mt-8 mb-10">
        <MainTitle title={"View Students"} />

        <div className="flex items-center justify-between mb-3">
          <SearchText value={searchText} setValue={setsearchText} />

          <div className="flex items-center gap-2">
            <div></div>
            <Button
              onClick={handleAsignedFetch}
              title={`View ${
                !isFetchingUnasigned ? "Unassigned" : "all"
              } Students`}
              icon={""}
              className={"text-sm"}
              btnType="secondary"
            />

            <Button
              href={`/${siteRoutes.student}/add`}
              title="Add Student"
              icon={"plus"}
              btnType="secondary"
              className={"text-sm"}
            />
          </div>
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
                  ? "No Student matches your query!"
                  : `No data on page ${page + 1}!`
              }
            />
          )}

          <Pagination page={page} limit={limit} />
        </Loading>
      </div>
    </main>
  );
};

export default page;
