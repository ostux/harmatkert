  function filterPlants() {
    const q = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('.plant').forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
  }

  function makeLabel() {
    const plant = document.getElementById('labelPlant').value || 'Gyógynövény';
    const use = document.getElementById('labelUse').value || 'tea';
    const year = document.getElementById('labelYear').value || '2026';
    document.getElementById('labelResult').innerHTML = `
      <div class="label">
        <h2>Harmatkert</h2>
        <h3>${plant}</h3>
        <p>${use}</p>
        <p>Gyűjtötte: Anita</p>
        <p>${year}</p>
        <em>Tisztán, szívből, földből.</em>
      </div>
    `;
  }

  function addJournal() {
    const date = document.getElementById('journalDate').value || 'Dátum nélkül';
    const text = document.getElementById('journalText').value;
    if (!text) return alert('Írj be egy naplóbejegyzést.');
    const list = JSON.parse(localStorage.getItem('harmatkertJournal') || '[]');
    list.unshift({ date, text });
    localStorage.setItem('harmatkertJournal', JSON.stringify(list));
    renderJournal();
  }

  function renderJournal() {
    const list = JSON.parse(localStorage.getItem('harmatkertJournal') || '[]');
    document.getElementById('journalList').innerHTML = list.map(item => `
      <div class="note">
        <h3>${item.date}</h3>
        <p>${item.text}</p>
      </div>
    `).join('');
  }

  function clearJournal() {
    if (confirm('Biztosan törlöd a naplót?')) {
      localStorage.removeItem('harmatkertJournal');
      renderJournal();
    }
  }

  renderJournal();
