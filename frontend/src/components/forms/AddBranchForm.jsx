"use client";
import { GET_Branch, PATCH_Branch, POST_Branch } from "@/utils/apiQueries";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { siteRoutes } from "@/utils/siteRoutes";
import InputText from "./InputText";
import Button from "../inputs/Button";

const AddBranchForm = ({ editBranchId }) => {
  const router = useRouter();

  const defaultFormValues = {
    name: "",
    location: "",
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState({});

  async function getData(id) {
    try {
      const res = await GET_Branch(id);
      const { branch: data } = await res.data;

      setFormValues({
        name: data.name,
        location: data.location,
      });
    } catch (error) {
      console.error("[E] There was an error fetching branch data");
    }
  }

  useEffect(() => {
    if (editBranchId) {
      getData(editBranchId);
    }
  }, [editBranchId]);

  const validateForm = () => {
    let newErrors = {};

    if (!formValues.name) {
      newErrors.name = "Name is required";
    }
    if (!formValues.location) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editBranchId) {
        await PATCH_Branch(editBranchId, formValues);
        alert("Branch successfully edited!");
      } else {
        await POST_Branch(formValues);
        alert("Branch successfully added!");
      }

      setFormValues(defaultFormValues);

      router.push(`/${siteRoutes.branch}`);

      // if (editBranchId) {
      // router.push(`/${siteRoutes.branch}/add`);
      // }
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-primary/5 container-small rounded-lg p-6">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <InputText
          label="Branch Name"
          name="name"
          placeholder={"Kathmandu"}
          value={formValues.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputText
          label="Location"
          name="location"
          placeholder={"15 Durbar Marg"}
          value={formValues.location}
          onChange={handleChange}
          error={errors.location}
        />

        <div className="">
          <Button
            type={"submit"}
            title={editBranchId ? "Update Branch" : "Add Branch"}
            icon={editBranchId ? "update" : "plus"}
          />
        </div>
      </form>
    </section>
  );
};

export default AddBranchForm;
