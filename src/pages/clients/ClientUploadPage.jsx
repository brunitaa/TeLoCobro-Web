import { useState } from "react";
import { useClients } from "../../context/clientsContext";
import Sidebar from "../../components/ui/Sidebar";
import ClientTable from "../../components/clients/ClientTable";
import ClientModal from "../../components/clients/ClientModal";
import FileUploadForm from "../../components/clients/FileUploadForm";

function ClientUploadPage() {
  const { clients, uploadCSV, loading } = useClients();
  const [file, setFile] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fileError, setFileError] = useState("");

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
      return;
    }

    await uploadCSV(file);
    setFile(null);
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 w-full min-h-screen bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Subida Masiva de Clientes
        </h1>

        {/* Formulario modular de subida de CSV */}
        <FileUploadForm
          file={file}
          fileError={fileError}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />

        {/* Tabla de clientes */}
        <section className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lista de Clientes</h2>

          {loading ? (
            <p className="text-gray-600">Cargando clientes...</p>
          ) : clients.length === 0 ? (
            <p className="text-gray-500">No hay clientes registrados.</p>
          ) : (
            <ClientTable clients={clients} onSelectClient={handleSelectClient} />
          )}
        </section>

        {/* Modal con detalle del cliente */}
        {showModal && selectedClient && (
          <ClientModal
            client={selectedClient}
            onClose={() => setShowModal(false)}
          />
        )}
      </main>
    </div>
  );
}

export default ClientUploadPage;