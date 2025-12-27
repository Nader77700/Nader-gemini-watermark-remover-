const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

upload.addEventListener("change", () => {
  const file = upload.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Reverse Alpha Blending (simplified)
    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha < 255) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  img.src = URL.createObjectURL(file);
});

document.getElementById("download").onclick = () => {
  const link = document.createElement("a");
  link.download = "nader-akram-watermark-removed.png";
  link.href = canvas.toDataURL();
  link.click();
};
