let soalList = [];
let index = 0;
let skor = 0;

function mulaiKuis(level) {
  if (level === "Acak") {
    soalList = [...negaraData].sort(() => 0.5 - Math.random()).slice(0, 10);
  } else {
    const filtered = negaraData.filter((item) => item.level === level);
    if (filtered.length === 0) {
      alert(`Tidak ada data untuk level "${level}"`);
      return;
    }
    soalList = filtered
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(10, filtered.length));
  }

  index = 0;
  skor = 0;
  document.getElementById("level-pilih").style.display = "none";
  document.getElementById("kuis").style.display = "block";
  document.getElementById("total").textContent = soalList.length;
  tampilkanSoal();
}

function tampilkanSoal() {
  const soalEl = document.getElementById("soal");
  const jawabanEl = document.getElementById("jawaban");
  const hasilEl = document.getElementById("hasil");

  if (index < soalList.length) {
    soalEl.textContent = `Ibu kota ${soalList[index].negara}?`;
    jawabanEl.value = "";
    hasilEl.textContent = "";
    hasilEl.className = "";
    jawabanEl.focus(); // Fokus otomatis ke input
  } else {
    selesai();
  }
}

function cekJawaban() {
  const inputEl = document.getElementById("jawaban");
  const input = inputEl.value.trim();
  const hasilEl = document.getElementById("hasil");
  const benar = soalList[index].ibukota;

  if (!input) return;

  if (input.toLowerCase() === benar.toLowerCase()) {
    hasilEl.textContent = "Benar!";
    hasilEl.className = "correct";
    skor++;
  } else {
    hasilEl.textContent = `Salah. Jawabannya: ${benar}`;
    hasilEl.className = "wrong";
  }

  document.getElementById("skor").textContent = skor;
  index++;
  setTimeout(tampilkanSoal, 1500);
}

// Event listener untuk tekan Enter
document.addEventListener("DOMContentLoaded", function () {
  const jawabanInput = document.getElementById("jawaban");
  if (jawabanInput) {
    jawabanInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        cekJawaban();
      }
    });
  }
});

function selesai() {
  const kuisDiv = document.getElementById("kuis");
  kuisDiv.innerHTML = `
    <h2>Selesai!</h2>
    <p>Skor: ${skor}/${soalList.length}</p>
    <button onclick="location.reload()">Main Lagi</button>
  `;
}
