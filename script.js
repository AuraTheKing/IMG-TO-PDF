const { jsPDF } = window.jspdf;

function convertToPDF() {
  const files = document.getElementById("imageInput").files;
  if (!files.length) return alert("No files selected");

  const pdf = new jsPDF();
  let index = 0;

  const reader = new FileReader();

  const loadImage = () => {
    if (index >= files.length) {
      pdf.save("images.pdf");
      return;
    }

    reader.onload = e => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const w = pdf.internal.pageSize.getWidth();
        const h = (img.height * w) / img.width;

        if (index > 0) pdf.addPage();
        pdf.addImage(img, "JPEG", 0, 0, w, h);
        index++;
        loadImage();
      };
    };

    reader.readAsDataURL(files[index]);
  };

  loadImage();
}
