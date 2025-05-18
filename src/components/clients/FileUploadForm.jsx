import React from "react";
import { FiUploadCloud } from "react-icons/fi";

function FileUploadForm({ file, fileError, handleFileChange, handleUpload }) {
  return (
    <form
      onSubmit={handleUpload}
      className="bg-white shadow-lg rounded-xl p-8 mb-10 max-w-xl mx-auto text-center border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Subir archivo CSV (máx. 2MB)</h2>

      <div
        className="w-full border-2 border-dashed border-gray-300 p-10 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition"
      >
        <FiUploadCloud size={48} className="text-blue-500 mb-4" />
        <p className="text-gray-600">Arrastra el archivo aquí</p>
        <p className="text-sm text-gray-500 my-1">o</p>

        <label className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded cursor-pointer transition">
          Elegir archivo desde tu ordenador
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {fileError && (
        <p className="text-red-600 text-sm mt-4">{fileError}</p>
      )}

      {file && (
        <p className="text-sm text-gray-700 mt-4">
          Archivo seleccionado: <strong>{file.name}</strong>
        </p>
      )}

      <button
        type="submit"
        disabled={!file}
        className={`mt-6 px-5 py-2 rounded-lg font-medium text-white transition ${
          file
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Subir CSV
      </button>
    </form>
  );
}

export default FileUploadForm;