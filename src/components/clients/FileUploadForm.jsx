import React from "react";
import { Upload, FileText } from "lucide-react";

function FileUploadForm({ file, fileError, handleFileChange, handleUpload }) {
  return (
    <form
      onSubmit={handleUpload}
      className="bg-white border border-dashed border-blue-300 rounded-lg p-4 mb-8 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <label className="flex items-center gap-2 cursor-pointer w-full md:w-auto">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
          <Upload size={20} />
          <span className="text-sm font-medium">
            {file ? "Archivo seleccionado" : "Seleccionar archivo CSV"}
          </span>
        </div>
      </label>

      {file && (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FileText size={16} />
          {file.name}
        </div>
      )}

      {fileError && (
        <p className="text-sm text-red-500 w-full md:w-auto">{fileError}</p>
      )}

      <button
        type="submit"
        disabled={!file}
        className={`px-4 py-2 rounded text-white text-sm font-medium transition ${
          file
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Subir
      </button>
    </form>
  );
}

export default FileUploadForm;