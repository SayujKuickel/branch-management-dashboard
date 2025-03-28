"use client";
import { GET_Student } from "@/utils/apiQueries";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loading, MainTitle, NoData, SearchText, Table } from "@/components";
import { filterTableData } from "@/utils/filterTableData";

const tableHeaders = ["sn.", "name", "phone", "email", "options"];

const page = () => {
  const router = useRouter();
  const { id: branchId } = useParams();

  const [loading, setLoading] = useState(true);
  const [searchText, setsearchText] = useState("");
  const [data, setData] = useState([]);

  async function getData(id) {
    setLoading(true);
    try {
      const res = await GET_Student(null, null, id);
      const { data } = await res.data;

      const formattedData = data.map((item, index) => ({
        ...item,
        "sn.": index + 1,
        options: <>btn:change btn:delete</>,
        name: `${item.first_name} ${item.last_name}`,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("There was an error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (branchId) {
      getData(branchId);
    } else {
      router.push("/");
    }
  }, []);

  const filteredData = filterTableData(data, tableHeaders, searchText);

  return (
    <>
      <main>
        <div className="container mx-auto px-5 mt-8 mb-10">
          <MainTitle title={"Branch Details"} />

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
        </div>
      </main>
    </>
  );
};

export default page;
