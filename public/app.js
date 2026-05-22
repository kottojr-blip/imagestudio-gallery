async function loadGallery() {

  const code = document
    .getElementById("galleryCode")
    .value
    .trim();

  const status =
    document.getElementById("status");

  status.innerHTML = "Loading...";

  try {

    const res = await fetch(
      `/api/gallery/${code}`
    );

    if (!res.ok) {

      status.innerHTML =
        "Invalid gallery code";

      return;
    }

    const gallery = await res.json();

    if (!gallery.paid) {

      status.innerHTML =
        "Gallery Locked";

      return;
    }

    document.querySelector(".hero")
      .style.display = "none";

    document.getElementById(
      "gallerySection"
    ).style.display = "block";

    const grid =
      document.getElementById(
        "galleryGrid"
      );

    grid.innerHTML = "";

    gallery.images.forEach(img => {

      grid.innerHTML += `
        <div class="card">

          <img src="${img}">

        </div>
      `;
    });

  } catch (err) {

    status.innerHTML =
      "Server Error";
  }
}