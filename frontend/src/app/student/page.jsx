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

  const page = parseInt(searchParams.get("page"), 10) || 0;
  const limit = parseInt(searchParams.get("limit"), 10) || 10;

  async function fetchData(pageNumber, dataLimit) {
    setLoading(true);

    try {
      const formattedData = await getData(
        GET_ApiRequest(ApiUrlMappings.student, null, pageNumber, dataLimit),
        handleDeleteStudent
      );
      setData(formattedData);
    } catch (error) {
      console.error("There was an error");
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (page < 0 || limit < 0) {
      handlePagination(0, 10);
    } else {
      fetchData(page, limit);
    }
  }, [page, limit]);

  async function handleDeleteStudent(id) {
    try {
      if (!confirm("Are you sure you want to delete?")) return;

      await DELETE_Student(id);
      setData([]);

      fetchData(page, limit);
    } catch (error) {
      console.log("Error while deleting");
    }
  }

  const filteredData = filterTableData(data, tableHeaders, searchText);

  return (
    <main>
      <div className="container mx-auto px-5 mt-8 mb-10">
        <MainTitle title={"View Students"} />

        <div className="flex items-center justify-between mb-3">
          <SearchText value={searchText} setValue={setsearchText} />

          <Button
            href={`/${siteRoutes.student}/add`}
            title="Add Student"
            icon={"plus"}
            btnType="secondary"
          />
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
