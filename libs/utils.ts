export const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  if (bytes < 0) return "Invalid size";
  if (typeof bytes !== "number" || isNaN(bytes)) return "Invalid input";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = bytes / Math.pow(k, i);

  const decimals = i === 0 ? 0 : 2;

  return `${size.toFixed(decimals)} ${units[i]}`;
};

export const convertPdfToImage = async (
  pdfFile: File,
  pageNumber: number = 1
): Promise<File> => {
  try {
    // Check if we're in the browser
    if (typeof window === "undefined") {
      throw new Error("PDF conversion only works in browser environment");
    }

    // Dynamic import only when needed and in browser
    const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");

    // Set up worker
    GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@5.4.54/build/pdf.worker.mjs`;

    // Read PDF file
    const arrayBuffer = await pdfFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Load PDF document
    const pdf = await getDocument({ data: uint8Array }).promise;
    const page = await pdf.getPage(pageNumber);

    // Create canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to get 2D rendering context from canvas");
    }
    // Set canvas size
    const viewport = page.getViewport({ scale: 2 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas,
    }).promise;

    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob!);
        },
        "image/png",
        0.9
      );
    });

    // Create File object from blob
    const imageFile = new File(
      [blob],
      `${pdfFile.name.replace(".pdf", "")}.png`,
      {
        type: "image/png",
        lastModified: Date.now(),
      }
    );
    return imageFile;
  } catch (error) {
    console.error("Error converting PDF to image:", error);
    throw error;
  }
};

export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, "_") // Replace any non-alphanumeric chars with underscore
    .replace(/_+/g, "_") // Replace multiple underscores with single
    .replace(/^_|_$/g, ""); // Remove leading/trailing underscores
};
