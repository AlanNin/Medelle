export default function formatDateShort(dateTime: Date) {
  const date = new Date(dateTime);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const amPm = hours >= 12 ? "P.M." : "A.M.";
  const formattedHours = hours % 12 || 12;

  return `${day} ${month} ${year}, ${formattedHours}:${minutes} ${amPm}`;
}
