import React from "react";
import Sidebar from "../../components/ui/Sidebar";
import EditCompanyForm from "../../components/company/EditCompanyForm";

const EditCompanyPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="w-full lg:ml-64 px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Editar Compañía
        </h1>
        <div className="max-w-4xl mx-auto">
          <EditCompanyForm />
        </div>
      </main>
    </div>
  );
};

export default EditCompanyPage;