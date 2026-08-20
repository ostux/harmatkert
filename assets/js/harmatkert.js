  function filterPlants() {
    const q = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('.plant').forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
  }

  // Label counter for unique IDs
  let labelCounter = 0;

  // Form validation and button state management
  function validateLabelForm() {
    const plantInput = document.getElementById('labelPlant');
    const useInput = document.getElementById('labelUse');
    const addButton = document.getElementById('addLabelBtn');

    const plantValid = plantInput.value.trim() !== '';
    const useValid = useInput.value.trim() !== '';

    // Update visual feedback
    if (!plantValid && plantInput.value !== '') {
      plantInput.classList.add('invalid');
    } else {
      plantInput.classList.remove('invalid');
    }

    if (!useValid && useInput.value !== '') {
      useInput.classList.add('invalid');
    } else {
      useInput.classList.remove('invalid');
    }

    // Enable/disable button
    if (plantValid && useValid) {
      addButton.disabled = false;
    } else {
      addButton.disabled = true;
    }
  }

  // Add event listeners for real-time validation
  if (document.getElementById('labelPlant')) {
    document.getElementById('labelPlant').addEventListener('input', validateLabelForm);
    document.getElementById('labelUse').addEventListener('input', validateLabelForm);
  }

  function makeLabel() {
    const plantInput = document.getElementById('labelPlant');
    const useInput = document.getElementById('labelUse');
    const collectorInput = document.getElementById('labelCollector');
    const yearInput = document.getElementById('labelYear');

    const plant = plantInput.value.trim();
    const use = useInput.value.trim();
    const collector = collectorInput.value.trim();

    // Validation - show red borders on empty required fields
    if (!plant || !use) {
      if (!plant) plantInput.classList.add('invalid');
      if (!use) useInput.classList.add('invalid');
      return;
    }

    // Remove invalid class if present
    plantInput.classList.remove('invalid');
    useInput.classList.remove('invalid');

    // Auto-fill year with current year if empty
    const currentYear = new Date().getFullYear();
    const year = yearInput.value.trim() || currentYear;

    // Create unique ID for this label
    const labelId = `label-${labelCounter++}`;

    // Build collector line conditionally
    const collectorLine = collector ? `<p>Gyűjtötte: ${collector}</p>` : '';

    // Create label element
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.id = labelId;
    labelDiv.innerHTML = `
      <button class="label-remove" data-tooltip="Címke eltávolítása" onclick="removeLabel('${labelId}')">&times;</button>
      <h2>Harmatkert</h2>
      <h3>${plant}</h3>
      <p>${use}</p>
      ${collectorLine}
      <p>${year}</p>
      <em>Tisztán, szívből, földből.</em>
    `;

    // Append to container (not replace)
    document.getElementById('labelResult').appendChild(labelDiv);

    // Do NOT clear form values (user preference to keep them)
  }

  function removeLabel(labelId) {
    const label = document.getElementById(labelId);
    if (label) {
      label.remove();
    }
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
