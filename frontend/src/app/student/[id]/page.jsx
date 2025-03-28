"use client";
import { Button, Loading, MainTitle } from "@/components";
import { GET_Student } from "@/utils/apiQueries";
import { siteRoutes } from "@/utils/siteRoutes";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ListItem({ icon, name, label }) {
  return (
    <p className="flex items-center gap-2.5 mb-4 w-fit">
      <i
        className={`${icon} text-lg w-10 h-10 grid place-items-center outline-2 outline-primary/75 rounded-lg text-primary/75`}
      />
      <span>
        <span className="block uppercase text-xs font-bold text-primary/75">
          {label}
        </span>

        <span className="block">{name}</span>
      </span>
    </p>
  );
}

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const basicData = [
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
  ];

  async function fetchItemData(id) {
    try {
      setLoading(true);
      const res = await GET_Student(id);

      setData(res.data.student);
    } catch (error) {
      console.log("Error while fetching", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) {
      alert("No id Found");
      router.push("");
    } else {
      fetchItemData(id);
    }
  }, []);

  return (
    <main>
      <div className="container mx-auto px-5 mt-8 mb-10">
        <MainTitle title={"Student Details"} />

        <Loading loading={loading}>
          <div className="grid grid-cols-6 gap-4">
            <section className=" col-span-4 bg-primary/5 p-5 rounded-lg">
              <h3 className="font-bold text-2xl underline mb-6">Basic Info</h3>

              {basicData.map((item, i) => (
                <ListItem
                  key={i}
                  label={item?.label}
                  icon={item?.icon}
                  name={item?.name}
                />
              ))}

              <Button
                title={"Edit Details"}
                icon="edit"
                btnType="secondary"
                className="mt-6"
                href={`/${siteRoutes.student}/add?edit=${id}`}
              />
            </section>

            <section className=" col-span-2 bg-primary/5 p-5 rounded-lg">
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
        </Loading>
      </div>
    </main>
  );
};

export default Page;
