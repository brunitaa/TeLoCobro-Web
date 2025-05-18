import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import CreateCompanyForm from "../../components/company/CreateCompanyForm";

const CreateCompanyPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-50 p-8">
        <CreateCompanyForm />
      </main>
    </div>
  );
};

export default CreateCompanyPage;