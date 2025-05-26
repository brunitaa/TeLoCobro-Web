/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useClients } from "../../context/clientsContext";
import Sidebar from "../../components/ui/Sidebar";
import ClientTable from "../../components/clients/ClientTable";
import ClientModal from "../../components/clients/ClientModal";
import FileUploadForm from "../../components/clients/FileUploadForm";
import Pagination from "../../components/clients/Pagination";
import EmptyState from "../../components/ui/EmptyState";
import Toast from "../../components/ui/ToastNotifier";
import ClientSearchBar from "../../components/clients/ClientSearchBar";

function ClientUploadPage() {
  const { clients, uploadCSV, loading, loadClients } = useClients();

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  const pageSize = 10;

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBy, sortField, sortOrder]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name.toLowerCase();
      const fileType = selectedFile.type;
      const isCSV = fileName.endsWith(".csv") || fileType === "text/csv";

      if (!isCSV) {
        setFile(null);
        setFileError("Solo se permiten archivos con formato CSV.");
        e.target.value = "";
        return;
      }

      setFile(selectedFile);
      setFileError("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setFileError("Selecciona un archivo CSV.");
      setToast({
        visible: true,
        type: "warning",
        message: "Debes elegir un archivo CSV antes de subir.",
      });
      return;
    }

    try {
      await uploadCSV(file);
      setToast({
        visible: true,
        type: "success",
        message: "¡Archivo CSV subido correctamente!",
      });
      setFile(null);
    } catch (error) {
      setFileError("Hubo un error al subir el archivo.");
      setToast({
        visible: true,
        type: "danger",
        message: "Intenta nuevamente con un archivo válido.",
      });
    }
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredClients = clients
    .filter((client) => {
      const field = client[filterBy] || "";
      return field.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      const valA = (a[sortField] || "").toString().toLowerCase();
      const valB = (b[sortField] || "").toString().toLowerCase();
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredClients.length / pageSize);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <main className="md:ml-64 w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-700">
          Subida Masiva de Clientes
        </h1>

        <FileUploadForm
          file={file}
          fileName={file?.name}
          fileError={fileError}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />

        <section className="w-full bg-white p-4 sm:p-6 rounded shadow mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 w-full">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Lista de Clientes
            </h2>
            <div className="w-full sm:w-auto">
              <ClientSearchBar
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>

          {loading ? (
            <p className="text-gray-600">Cargando clientes...</p>
          ) : paginatedClients.length === 0 ? (
            <EmptyState
              title="No hay clientes registrados"
              subtitle="Carga un archivo CSV o añade clientes manualmente para comenzar."
            />
          ) : (
            <>
              <ClientTable
                clients={paginatedClients}
                onSelectClient={handleSelectClient}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </section>

        {showModal && selectedClient && (
          <ClientModal
            client={selectedClient}
            onClose={() => setShowModal(false)}
          />
        )}

        <Toast
          visible={toast.visible}
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      </main>
    </div>
  );
}

export default ClientUploadPage;
