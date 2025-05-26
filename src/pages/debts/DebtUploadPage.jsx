/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDebts } from "../../context/debtsContext";
import Sidebar from "../../components/ui/Sidebar";
import FileUploadForm from "../../components/clients/FileUploadForm";
import DebtTable from "../../components/debts/DebtTable";
import DebtSearchBar from "../../components/debts/DebtSearchBar";
import Pagination from "../../components/clients/Pagination";
import DebtModal from "../../components/debts/DebtModal";
import EmptyState from "../../components/ui/EmptyState";
import Toast from "../../components/ui/ToastNotifier";

function DebtUploadPage() {
  const { debts, uploadDebtsCSV } = useDebts();

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [toast, setToast] = useState({ visible: false, type: "success", message: "" });
  const [filterByStatus, setFilterByStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [sortField, setSortField] = useState("due_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [filterByStatus, searchTerm, sortField, sortOrder]);

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
      setUploadSuccess(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setFileError("Selecciona un archivo CSV.");
      setToast({ visible: true, type: "warning", message: "Debes elegir un archivo CSV antes de subir." });
      return;
    }

    try {
      await uploadDebtsCSV(file);
      setUploadSuccess(true);
      setToast({ visible: true, type: "success", message: "¡Archivo CSV subido correctamente!" });
      setFile(null);
    } catch (error) {
      setFileError("Hubo un error al subir el archivo. Intenta nuevamente.");
      setToast({ visible: true, type: "danger", message: "Hubo un error al subir el archivo." });
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredDebts = debts.filter(
    (debt) =>
      (!filterByStatus || debt.status === filterByStatus) &&
      (debt.invoice_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof debt.client_id === "object" &&
          debt.client_id.name?.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const sortedDebts = [...filteredDebts].sort((a, b) => {
    let aValue, bValue;
    switch (sortField) {
      case "client":
        aValue = typeof a.client_id === "object" ? a.client_id.name || "" : "";
        bValue = typeof b.client_id === "object" ? b.client_id.name || "" : "";
        break;
      case "due_date":
        aValue = a.due_date || "";
        bValue = b.due_date || "";
        break;
      case "outstanding":
        aValue = Number(a.outstanding) || 0;
        bValue = Number(b.outstanding) || 0;
        break;
      default:
        aValue = a[sortField] || "";
        bValue = b[sortField] || "";
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedDebts.length / pageSize);
  const paginatedDebts = sortedDebts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 md:ml-64 transition-all duration-300">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Subida Masiva de Deudas
        </h1>

        <FileUploadForm
          file={file}
          fileName={file?.name}
          fileError={fileError}
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
        />

       <section className="w-full bg-white p-4 sm:p-6 rounded shadow mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 w-full">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Lista de Deudas
            </h2>
            <div className="w-full sm:w-auto">
              <DebtSearchBar
                filterByStatus={filterByStatus}
                setFilterByStatus={setFilterByStatus}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>

          {paginatedDebts.length === 0 ? (
            <EmptyState
              title="No hay deudas registradas"
              subtitle="Sube un archivo CSV o añade manualmente registros para comenzar."
            />
          ) : (
            <>
              <DebtTable
                debts={paginatedDebts}
                onSelectDebt={setSelectedDebt}
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

        {selectedDebt && (
          <DebtModal
            debt={selectedDebt}
            onClose={() => setSelectedDebt(null)}
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

export default DebtUploadPage;
