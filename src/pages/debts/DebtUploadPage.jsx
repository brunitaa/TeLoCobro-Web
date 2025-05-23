import { useState } from "react";
import { useDebts } from "../../context/debtsContext";
import Sidebar from "../../components/ui/Sidebar";
import FileUploadForm from "../../components/clients/FileUploadForm";

function DebtUploadPage() {
  const { uploadDebtsCSV } = useDebts();

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Validación del archivo CSV
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
      setUploadSuccess(false); // Resetear mensaje de éxito al cambiar archivo
    }
  };

  // Subir archivo CSV
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setFileError("Selecciona un archivo CSV.");
      return;
    }

    try {
      await uploadDebtsCSV(file);
      setUploadSuccess(true);
      setFile(null);
    } catch (error) {
      setFileError("Hubo un error al subir el archivo. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-50 p-8">
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

        {uploadSuccess && (
          <p className="text-green-600 font-semibold text-center mt-4">
            ¡Archivo CSV subido correctamente!
          </p>
        )}
      </main>
    </div>
  );
}

export default DebtUploadPage;
