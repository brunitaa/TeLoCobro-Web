import { useState } from "react";
import { CloudUpload } from "lucide-react";

export default function FileUploadForm({ file, fileError, handleFileChange, handleUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    const mockEvent = { target: { files: [droppedFile] } };
    handleFileChange(mockEvent);
  };

  const onSubmit = async (e) => {
    await handleUpload(e);
    setSuccessMessage("Archivo subido correctamente");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-lg rounded-lg p-8 mb-10 w-full max-w-2xl mx-auto border border-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Cargar archivo CSV</h2>

      <div
        className={`border-2 border-dashed rounded-lg p-8 w-full text-center transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudUpload className="mx-auto text-blue-600 mb-3" size={48} />
        <p className="text-gray-600 mb-1">Arrastra tu archivo aquí</p>
        <p className="text-sm text-gray-500 mb-4">o</p>

        <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
          Seleccionar archivo
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {file && (
          <p className="mt-4 text-sm text-gray-700">
            Archivo seleccionado: <strong>{file.name}</strong>
          </p>
        )}
        {fileError && <p className="text-sm text-red-600 mt-2">{fileError}</p>}
      </div>

      <button
        type="submit"
        disabled={!file}
        className={`mt-6 w-full px-4 py-2 text-white rounded-lg font-semibold transition ${
          file ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Subir CSV
      </button>

      {successMessage && (
        <div className="mt-4 text-sm text-green-600 text-center animate-fade-in">
          {successMessage}
        </div>
      )}
    </form>
  );
}