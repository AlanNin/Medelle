export default function formatDate(dateTime: Date) {
  const date = new Date(dateTime);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("es-ES", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();

  return `${day} de ${capitalizedMonth} de ${year}`;
}
