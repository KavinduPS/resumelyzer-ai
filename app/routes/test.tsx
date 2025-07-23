import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Test = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Files selected:", acceptedFiles);
    // Handle your files here
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="p-10 border border-red-500 mx-auto" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        {isDragActive
          ? "Drop files here"
          : "Click here or drag files to upload"}
      </p>
    </div>
  );
};

export default Test;
