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

  const files = document.getElementById("fileInput").files;
  if (files.length > 5) {
    alert("❌ You can upload up to 5 files only.");
    document.getElementById("uploadLoader").style.display = "none";
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (function(file, index) {
      return function(e) {
        const base64Data = e.target.result.split(',')[1];
        formData.append(`file${index}`, base64Data);
        formData.append(`fileName${index}`, file.name);
        formData.append(`fileType${index}`, file.type);

        if (index === files.length - 1) {
          // Add metadata after last file
          const fileNamesList = Array.from(files).map(f => f.name).join(", ");
          document.getElementById("fileNames").value = fileNamesList;
          
          formData.append("docType", document.getElementById("docType").value);
          formData.append("paperSize", document.getElementById("paperSize").value);
          formData.append("doubleSided", document.getElementById("doubleSided").value);
          formData.append("copies", document.getElementById("copies").value);
          formData.append("notes", document.getElementById("notes").value);
          formData.append("fileNamesHidden", document.getElementById("fileNames").value);
          

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
        }
      };
    })(files[i], i);
    reader.readAsDataURL(files[i]);
  }
});