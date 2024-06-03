function searchFieldClear() {
  const formField = document.querySelector(".sectionTop__form-field input");
  const svgclear = document.querySelector(".svg__clear");

  formField.oninput = function () {
    console.log(formField.value);
    if (formField.value) {
      svgclear.style.display = "block";
    } else {
      svgclear.style.display = "none";
    }
  };
  svgclear.onclick = function () {
    formField.value = "";
    svgclear.style.display = "none";
  };
}

async function init() {
  searchFieldClear();
}

init();
