import { useState } from "react";
import { useClients } from "../../context/clientsContext";
import Sidebar from "../../components/ui/Sidebar";

function ClientUploadPage() {
  const { clients, uploadCSV, loading } = useClients();
  const [file, setFile] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Selecciona un archivo CSV");
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
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Subida Masiva de Clientes</h1>

        <form
          onSubmit={handleUpload}
          className="bg-white shadow-md rounded p-6 mb-10 flex flex-col items-start max-w-xl mx-auto"
        >
          <label className="font-semibold mb-2">Selecciona un archivo CSV:</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          {file && (
            <p className="text-sm text-gray-600 mb-2">Archivo seleccionado: <strong>{file.name}</strong></p>
          )}
          <button
            type="submit"
            disabled={!file}
            className={`px-4 py-2 rounded text-white font-semibold ${
              file ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Subir CSV
          </button>
        </form>

        <section className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Lista de Clientes</h2>

          {loading ? (
            <p className="text-gray-600">Cargando clientes...</p>
          ) : clients.length === 0 ? (
            <p className="text-gray-500">No hay clientes registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">#</th>
                    <th className="border px-4 py-2">Nombre</th>
                    <th className="border px-4 py-2">NIT</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, idx) => (
                    <tr
                      key={client._id}
                      onClick={() => handleSelectClient(client)}
                      className="hover:bg-blue-100 cursor-pointer"
                    >
                      <td className="border px-4 py-2">{idx + 1}</td>
                      <td className="border px-4 py-2">{client.name}</td>
                      <td className="border px-4 py-2">{client.nit}</td>
                      <td className="border px-4 py-2">{client.email}</td>
                      <td className="border px-4 py-2">{client.phone_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Modal para información del cliente */}
        {showModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">Información del Cliente</h3>
              <p className="mb-2"><strong>Nombre:</strong> {selectedClient.name}</p>
              <p className="mb-2"><strong>NIT:</strong> {selectedClient.nit}</p>
              <p className="mb-2"><strong>Email:</strong> {selectedClient.email}</p>
              <p className="mb-2"><strong>Teléfono:</strong> {selectedClient.phone_number}</p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ClientUploadPage;
