"use client";
import { Button, ListItem, Loading, MainTitle, NoData } from "@/components";
import { GET_Student } from "@/utils/apiQueries";
import { siteRoutes } from "@/utils/siteRoutes";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const basicData = data
    ? [
        {
          label: "Name",
          name: `${data.first_name} ${data.last_name}`,
          icon: "fi fi-rr-id-card-clip-alt",
        },
        {
          label: "Phone",
          name: data.phone,
          icon: "fi fi-rr-mobile-button",
        },
        {
          label: "Email",
          name: data.email,
          icon: "fi fi-rr-envelope",
        },
      ]
    : [];

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        alert("No id Found");
        router.push(siteRoutes.student);
        return;
      }
      try {
        setLoading(true);
        const res = await GET_Student(id);
        setData(res.data.student);
      } catch (error) {
        console.error("Error while fetching", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  if (loading) {
    return (
      <main>
        <div className="container mx-auto px-5 mt-8 mb-10">
          <MainTitle title={"Student Details"} />
          <Loading loading={true} />
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main>
        <div className="container mx-auto px-5 mt-8 mb-10">
          <MainTitle title={"Student Details"} />

          <NoData
            title={
              <span className="text-text/80">
                No student data{" "}
                <Link href="/" className="text-text hover:text-text/80">
                  Go home.
                </Link>{" "}
              </span>
            }
          />
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container mx-auto px-5 mt-8 mb-10">
        <MainTitle title={"Student Details"} />

        <div className="grid grid-cols-6 gap-4">
          <section className="col-span-4 bg-primary/5 p-5 rounded-lg">
            <h3 className="font-bold text-2xl underline mb-6">Basic Info</h3>

            <div className="grid grid-cols-3">
              {basicData.map((item, i) => (
                <ListItem
                  key={i}
                  label={item?.label}
                  icon={item?.icon}
                  name={item?.name}
                />
              ))}
            </div>
            <Button
              title={"Edit Details"}
              icon="edit"
              btnType="secondary"
              className="mt-6"
              href={`/${siteRoutes.student}/add?edit=${id}`}
            />
          </section>

          <section className="col-span-2 bg-primary/5 p-5 rounded-lg">
            <h3 className="font-bold text-2xl underline mb-6">Branch Info</h3>

            {data.branch_id === null ? (
              <div>
                <p>Student Not in any branch</p>
                <Button
                  title={"Add to branch"}
                  icon="plus"
                  btnType="secondary"
                  className="mt-6"
                  href={`/${siteRoutes.student}/add?edit=${id}`}
                />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2">
                  <ListItem
                    label={"Branch Name"}
                    icon={"fi fi-rs-building"}
                    name={data?.branch?.name}
                  />
                  <ListItem
                    label={"Branch Location"}
                    icon={"fi fi-rr-marker"}
                    name={data?.branch?.location}
                  />
                </div>
                <Button
                  title={"View Branch Details"}
                  icon="info"
                  btnType="secondary"
                  className="mt-6"
                  href={`/${siteRoutes.branch}/${data?.branch?.id}`}
                />
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Page;
