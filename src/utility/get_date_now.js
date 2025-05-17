function getTanggalJakartaFormatted() {
  const now = new Date();
  const jakartaDate = new Date(
    now.toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    })
  );

  const year = jakartaDate.getFullYear();
  const month = String(jakartaDate.getMonth() + 1).padStart(2, "0");
  const day = String(jakartaDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default getTanggalJakartaFormatted;
