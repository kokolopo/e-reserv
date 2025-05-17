import QRCode from "qrcode";
// Data JSON yang akan disimpan di dalam QR
const data = {
  table_id: 2,
};

// Ubah ke string JSON
const jsonString = JSON.stringify(data);

// Generate dan simpan QR ke file
QRCode.toFile(
  "reservation-qr.png",
  jsonString,
  {
    color: {
      dark: "#000", // QR Code warna hitam
      light: "#FFF", // Latar belakang putih
    },
  },
  function (err) {
    if (err) throw err;
    console.log("QR code berhasil dibuat!");
  }
);
