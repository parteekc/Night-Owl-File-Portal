document.querySelectorAll('.tile-group').forEach(group => {
  group.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
      group.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      const inputId = group.id.replace('Group', '');
      document.getElementById(inputId).value = tile.dataset.value;
    });
  });
});


window.addEventListener("load", () => {
  document.getElementById("pageLoader").style.display = "none";
});

document.querySelectorAll('.tile-group').forEach(group => {
  group.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
      group.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      const inputId = group.id.replace('Group', '');
      document.getElementById(inputId).value = tile.dataset.value;
    });
  });
});

document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("uploadLoader").style.display = "flex";

  const file = document.getElementById("fileInput").files[0];
  const reader = new FileReader();

  reader.onload = function() {
    const base64Data = reader.result.split(',')[1];
    const formData = new FormData();
    formData.append("file", base64Data);
    formData.append("fileName", file.name);
    formData.append("fileType", file.type);
    formData.append("docType", document.getElementById("docType").value);
    formData.append("paperSize", document.getElementById("paperSize").value);
    formData.append("doubleSided", document.getElementById("doubleSided").value);
    formData.append("copies", document.getElementById("copies").value);
    formData.append("notes", document.getElementById("notes").value);

    fetch(CONFIG.WEB_APP_URL, {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById("uploadLoader").style.display = "none";
      alert("✅ Upload successful! Redirecting to review page...");
      setTimeout(() => {
        window.location.href = "https://g.page/r/CZtz1WN9piiDEAE/review";
      }, 2000);
    })
    .catch(error => {
      document.getElementById("uploadLoader").style.display = "none";
      alert("❌ Upload failed: " + error);
    });
  };

  reader.readAsDataURL(file);
});