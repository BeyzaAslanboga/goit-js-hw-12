export function createGalleryMarkup(images) {
  return images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img
            src="${image.webformatURL}"
            alt="${image.tags}"
          />
        </a>

        <div class="info">
          <p><b>Likes</b><br>${image.likes}</p>
          <p><b>Views</b><br>${image.views}</p>
          <p><b>Comments</b><br>${image.comments}</p>
          <p><b>Downloads</b><br>${image.downloads}</p>
        </div>
      </li>
    `
    )
    .join('');
}
