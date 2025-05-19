import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import EditCompanyForm from "../../components/company/EditCompanyForm";

const EditCompanyPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Editar Compañía
        </h1>
        <EditCompanyForm />
      </main>
    </div>
  );
};

export default EditCompanyPage;