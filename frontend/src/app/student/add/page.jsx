"use client";
import { AddStudentForm, MainTitle } from "@/components";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const edit_id = searchParams.get("edit");

  return (
    <main>
      <div className="container mx-auto px-5 mt-8 mb-10">
        <MainTitle
          title={edit_id ? "Editing Student Details" : "Add Student"}
        />

        <AddStudentForm editStudentId={edit_id} />
      </div>
    </main>
  );
};

export default page;
