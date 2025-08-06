import { formatSize } from "libs/utils";
import React, { useCallback, useRef, useState } from "react";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setFile(target.files![0]);
    onFileSelect(target.files![0]);
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-4">
      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        name="file-upload"
        multiple={false}
        accept=".pdf"
        onChange={handleChange}
        className="hidden"
      />
      {file ? (
        <div className="flex flex-col flex-wrap gap-3 justify-between items-center bg-white rounded-lg sm:flex-row sm:py-3">
          <img src="images/pdf-icon.png" className="size-12" />
          <div className="flex flex-col items-center">
            <p className="text-sm text-zinc-500">{file.name}</p>
            <p className="text-sm text-zinc-500">{formatSize(file.size)}</p>
          </div>
          <button className="cursor-pointer" onClick={() => clearFile()}>
            <img src="images/close-icon.png" className="size-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4 cursor-pointer flex justify-center items-center">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src="/images/upload-icon.svg"
              alt="upload"
              className="size-6"
            />
            <p className="text-sm">Click to upload</p>
          </label>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
