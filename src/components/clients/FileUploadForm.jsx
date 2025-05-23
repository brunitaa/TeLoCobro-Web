import React from "react";
import { Upload, FileText } from "lucide-react";

function FileUploadForm({ file, fileError, handleFileChange, handleUpload }) {
  return (
    <form
      onSubmit={handleUpload}
      className="bg-white border border-dashed border-blue-300 rounded-lg p-4 mb-8 w-full max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      {/* Selector de archivo */}
      <label className="flex items-center gap-2 cursor-pointer w-full sm:w-auto">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 break-all">
          <Upload size={20} />
          <span className="text-sm font-medium truncate">
            {file ? "Archivo seleccionado" : "Seleccionar archivo CSV"}
          </span>
        </div>
      </label>

      {/* Nombre del archivo */}
      {file && (
        <div className="flex items-center gap-2 text-sm text-gray-700 break-all">
          <FileText size={16} />
          <span className="truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
        </div>
      )}

      {/* Error */}
      {fileError && (
        <p className="text-sm text-red-500 w-full sm:w-auto">{fileError}</p>
      )}

      {/* Botón de subida */}
      <button
        type="submit"
        disabled={!file}
        className={`px-4 py-2 rounded text-white text-sm font-medium transition w-full sm:w-auto ${
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