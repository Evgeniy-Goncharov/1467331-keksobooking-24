const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const form = document.querySelector('.ad-form');
const avatarChooser = form.querySelector('#avatar');
const avatarPreview = form.querySelector('.ad-form-header__preview');
const imagesChooser = form.querySelector('#images');
const imagesPreview = form.querySelector('.ad-form__photo');
const defaultAvatarPreview = avatarPreview.innerHTML;
const defaultImagesPreview = imagesPreview.innerHTML;

function setFileUploadPreview (chooser, preview) {
  let previewImage = preview.querySelector('img');

  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      if (previewImage) {
        previewImage.style.width = '70px';
        previewImage.style.height = '70px';
        previewImage.style.borderRadius = '5px';
        previewImage.src = URL.createObjectURL(file);
      } else {
        previewImage = document.createElement('img');
        previewImage.style.width = '70px';
        previewImage.style.height = '70px';
        previewImage.style.borderRadius = '5px';
        previewImage.src =  URL.createObjectURL(file);
        preview.append(previewImage);
      }
    }
  });
}

function clearFileUploadPreview () {
  avatarPreview.innerHTML = defaultAvatarPreview;
  imagesPreview.innerHTML = defaultImagesPreview;
}

setFileUploadPreview(avatarChooser, avatarPreview);
setFileUploadPreview (imagesChooser, imagesPreview);

export { clearFileUploadPreview };
