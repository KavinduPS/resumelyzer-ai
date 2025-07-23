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
