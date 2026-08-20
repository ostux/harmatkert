(function() {
  'use strict';

  // Get all gallery images
  const photoCards = document.querySelectorAll('.photo-card');
  if (photoCards.length === 0) return; // Exit if no gallery on page

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.modal-close');
  const prevBtn = document.querySelector('.modal-prev');
  const nextBtn = document.querySelector('.modal-next');

  let currentIndex = 0;
  const images = [];

  // Collect all images and their data
  photoCards.forEach((card, index) => {
    const img = card.querySelector('img');
    const caption = card.querySelector('figcaption');

    images.push({
      src: img.src,
      alt: img.alt,
      caption: caption ? caption.textContent : ''
    });

    // Add click event to image
    img.addEventListener('click', () => {
      openModal(index);
    });
  });

  function openModal(index) {
    currentIndex = index;
    showImage();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  function showImage() {
    const image = images[currentIndex];
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modalCaption.textContent = image.caption;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  }

  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    switch(e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowRight':
        showNext();
        break;
      case 'ArrowLeft':
        showPrev();
        break;
    }
  });
})();
