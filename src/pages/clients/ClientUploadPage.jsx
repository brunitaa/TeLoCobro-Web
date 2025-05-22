import { useState, useEffect } from "react";
import { useClients } from "../../context/clientsContext";
import Sidebar from "../../components/ui/Sidebar";
import ClientTable from "../../components/clients/ClientTable";
import ClientModal from "../../components/clients/ClientModal";
import FileUploadForm from "../../components/clients/FileUploadForm";
import Pagination from "../../components/clients/Pagination";


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
  const pageSize = 10;

  useEffect(() => {
      loadClients(); 
    }, []);

  // Validación de archivo CSV al seleccionar
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

  // Subir CSV y limpiar archivo cargado
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setFileError("Selecciona un archivo CSV.");
      return;
    }

    await uploadCSV(file); // Aquí se recarga automáticamente la lista en ClientsContext
    setFile(null);
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  // Manejar ordenamiento de columnas
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filtrar y ordenar clientes
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

  // Paginación
  const totalPages = Math.ceil(filteredClients.length / pageSize);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 w-full min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Subida Masiva de Clientes
        </h1>

        <FileUploadForm
          file={file}
          fileName={file?.name}
          fileError={fileError}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />

        <section className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">Lista de Clientes</h2>
            <div className="flex gap-2">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="name">Nombre</option>
                <option value="nit">NIT</option>
                <option value="email">Email</option>
                <option value="phone_number">Teléfono</option>
              </select>
              <input
                type="text"
                placeholder={`Buscar por ${filterBy}...`}
                className="border border-gray-300 rounded px-3 py-1 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <p className="text-gray-600">Cargando clientes...</p>
          ) : paginatedClients.length === 0 ? (
            <p className="text-gray-500">No hay clientes registrados.</p>
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
          <ClientModal client={selectedClient} onClose={() => setShowModal(false)} />
        )}
      </main>
    </div>
  );
}

export default ClientUploadPage;
