const photos = [
  { url: 'images/img1.jpg', caption: 'Spidy Far From Home', favorite: true },
  { url: 'images/img2.png', caption: 'Spidy Mountain Hike', favorite: false },
  { url: 'images/img3.jpg', caption: 'Spidy No way home', favorite: true },
  // Add more images...
];


const gallery = document.getElementById('gallery');


function renderGallery(images) {
  gallery.innerHTML = '';
  gallery.style.position = 'relative';
  gallery.style.height = '220px';

  const centerIndex = Math.floor(images.length / 2);

  images.forEach((photo, idx) => {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.top = '30px';
    div.style.width = '200px';
    div.style.height = '150px';

    const offset = idx - centerIndex;
    const translateX = offset * 120;
    const rotateY = offset * 40;
    const scale = idx === centerIndex ? 1.1 : 0.8;

    div.style.left = '50%';
    div.style.transform = `
      translateX(${translateX}px)
      scale(${scale})
      perspective(600px)
      rotateY(${rotateY}deg)
    `;
    div.style.zIndex = idx === centerIndex ? 10 : 10 - Math.abs(offset);
    div.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    div.style.opacity = idx === centerIndex ? '1' : '0.7';
    div.style.transition = 'transform 0.3s, opacity 0.3s, z-index 0.3s';

    div.innerHTML = `
      <img src="${photo.url}" alt="${photo.caption}" 
        style="width:100%; height:100%; object-fit:cover; display:block; border-radius:10px; cursor:pointer;" />
      <p style="text-align:center; margin-top:4px;">${photo.caption}</p>
    `;

    // Hover effect: bring to front and scale up
    div.addEventListener('mouseenter', () => {
      div.style.zIndex = 20;
      div.style.transform = `
        translateX(${translateX}px)
        scale(1.2)
        perspective(600px)
        rotateY(${rotateY}deg)
      `;
    });
    div.addEventListener('mouseleave', () => {
      div.style.zIndex = idx === centerIndex ? 10 : 10 - Math.abs(offset);
      div.style.transform = `
        translateX(${translateX}px)
        scale(${scale})
        perspective(600px)
        rotateY(${rotateY}deg)
      `;
    });

    // Click: show modal
    div.querySelector('img').addEventListener('click', () => {
      showModal(photo.url, photo.caption);
    });

    gallery.appendChild(div);
  });
}

// Modal function
function showModal(url, caption) {
  let modal = document.getElementById('img-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'img-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';
    modal.innerHTML = `
      <div style="position:relative;">
        <img src="${url}" alt="${caption}" style="max-width:80vw; max-height:80vh; border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,0.5);" />
        <p style="color:#fff; text-align:center; margin-top:8px;">${caption}</p>
        <button id="close-modal" style="position:absolute; top:8px; right:8px; background:#222; color:#fff; border:none; border-radius:50%; width:32px; height:32px; font-size:18px; cursor:pointer;">×</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  } else {
    modal.querySelector('img').src = url;
    modal.querySelector('img').alt = caption;
    modal.querySelector('p').textContent = caption;
    modal.style.display = 'flex';
  }
}

// ...existing code...



renderGallery(photos);

document.getElementById('toggleMode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});


let showingFavorites = false;

document.getElementById('filterFavorites').addEventListener('click', () => {
  showingFavorites = !showingFavorites;
  const filtered = showingFavorites ? photos.filter(p => p.favorite) : photos;
  renderGallery(filtered);
});