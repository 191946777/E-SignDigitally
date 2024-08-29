document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("signatureCanvas");
  const ctx = canvas.getContext("2d");
  let drawing = false;

  // Resize the canvas to fill its container
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  function startDrawing(event) {
      drawing = true;
      draw(event);
  }

  function endDrawing() {
      drawing = false;
      ctx.beginPath();
  }

  function draw(event) {
      if (!drawing) return;

      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = "black";

      ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  }

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", endDrawing);
  canvas.addEventListener("mousemove", draw);

  document.getElementById("clearButton").addEventListener("click", function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  document.getElementById("saveButton").addEventListener("click", function() {
      const dataURL = canvas.toDataURL();
      navigator.clipboard.writeText(dataURL)
      console.log(dataURL);
      // You can send dataURL to your server to save the signature
  });

  document.getElementById("downloadBtn").addEventListener("click", function() {
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    link.click();
  });
});