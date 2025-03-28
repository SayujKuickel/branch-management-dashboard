"use client";
import {
  GET_Branch,
  GET_Student,
  PATCH_Student,
  POST_Student,
} from "@/utils/apiQueries";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { useRouter } from "next/navigation";
import { siteRoutes } from "@/utils/siteRoutes";
import InputText from "./InputText"; // Import the InputText component
import { Button } from "@/components";

const AddStudentForm = ({ editStudentId }) => {
  const router = useRouter();

  const defaultFormValues = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    branch_id: "",
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState({});
  const { data: branches, loading, error } = useFetchData(GET_Branch, true);

  async function getData(id) {
    try {
      const res = await GET_Student(id);
      const { student: data } = await res.data;

      setFormValues({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        email: data.email,
        branch_id: data.branch_id === null ? "" : data.branch_id,
      });
    } catch (error) {
      console.error("[E] There was an error");
    }
  }

  useEffect(() => {
    if (editStudentId) {
      getData(editStudentId);
    }
  }, [editStudentId]);

  const validateForm = () => {
    let newErrors = {};

    // First Name validation: Ensure it is not empty and only contains alphabetic characters
    if (!formValues.first_name.trim()) {
      newErrors.first_name = "First name is required";
    } else if (!formValues.first_name.match(/^[A-Za-z]+$/)) {
      newErrors.first_name =
        "First name can only contain alphabetic characters";
    }

    // Last Name validation: Ensure it is not empty and only contains alphabetic characters
    if (!formValues.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    } else if (!formValues.last_name.match(/^[A-Za-z]+$/)) {
      newErrors.last_name = "Last name can only contain alphabetic characters";
    }

    // Email validation
    if (!formValues.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    if (!formValues.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editStudentId) {
        await PATCH_Student(editStudentId, formValues);
        alert("Student successfully edited!");
      } else {
        await POST_Student(formValues);
        alert("Student successfully added!");
      }

      setFormValues(defaultFormValues);

      if (editStudentId) {
        router.push(`/${siteRoutes.student}/add`);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-primary/5 container-small rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <InputText
          label="First Name"
          name="first_name"
          placeholder="Sayuj"
          value={formValues.first_name}
          onChange={handleChange}
          error={errors.first_name}
        />
        <InputText
          label="Last Name"
          name="last_name"
          placeholder="Kuickel"
          value={formValues.last_name}
          onChange={handleChange}
          error={errors.last_name}
        />
        <InputText
          label="Phone Number"
          name="phone"
          placeholder="9861000000"
          value={formValues.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <InputText
          label="Email"
          name="email"
          type="email"
          placeholder="sayujk@mail.com"
          value={formValues.email}
          onChange={handleChange}
          error={errors.email}
        />

        {loading ? (
          <p>Loading branches...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="mb-5">
            <p className="text-xs uppercase font-bold text-text mb-1">
              Branch (optional)
            </p>
            <select
              name="branch_id"
              id="branch"
              value={formValues.branch_id}
              onChange={handleChange}
              className={`px-4 py-3 rounded-lg border-2 border-secondary/25 bg-background w-full outline-none mb-4 accent-red`}
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="">
          <Button
            type={"submit"}
            icon={editStudentId ? "update" : "plus"}
            title={editStudentId ? "Update Student" : "Add Student"}
          />
        </div>
      </form>
    </section>
  );
};

export default AddStudentForm;
