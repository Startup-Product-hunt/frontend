import { useState, useEffect } from "react";
import { GrFormUpload } from "react-icons/gr";

const FileUpload = ({ label = "Upload File", onChange, value }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (typeof value === "string") {
      setPreviewUrl(value);
    }
  }, [value]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange?.(file);
    }
  };

  return (
    <div className="w-full">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-indigo-500 hover:text-indigo-600 cursor-pointer rounded-md p-4 bg-gray-50 transition">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          <GrFormUpload className="w-6 h-6" />
          {label}
        </div>
        <input
          type="file"
          accept=".png,.jpeg,.jpg"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {previewUrl && (
        <div className="mt-4 text-center">
          <img
            src={previewUrl}
            alt="Preview"
            className="mx-auto w-28 h-28 object-cover rounded-full border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
