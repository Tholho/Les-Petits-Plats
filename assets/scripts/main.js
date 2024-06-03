function searchFieldClear() {
  const formFields = document.querySelectorAll(".form-field input");

  formFields.forEach(
    (field) =>
      (field.oninput = function () {
        const svgclear = field.parentElement.querySelector(".svg-clear");
        console.log(field.value);
        if (field.value) {
          svgclear.style.display = "block";
          svgclear.onclick = function () {
            field.value = "";
            svgclear.style.display = "none";
          };
        } else {
          svgclear.style.display = "none";
        }
      }),
  );
}

function setupCustomDropdown() {
  const customDropdown = document.querySelectorAll(".dropdownBtn");

  customDropdown.forEach((btn) =>
    btn.addEventListener("click", displayCustomDropdown),
  );

  function displayCustomDropdown(e) {
    const currentDropdown = e.target.closest(".dropdownBtn");
    const currentList = currentDropdown.nextElementSibling;
    //  currentList.style.display = "block";
    currentList.classList.add("displayed");
    currentDropdown.style.borderBottomLeftRadius = "0px";
    currentDropdown.style.borderBottomRightRadius = "0px";
    setAngleUp(currentDropdown);
  }
  function setAngleUp(target) {
    const angle = target.querySelector("i");
    const paragraph = target.querySelector("p");
    angle.classList.remove("fa-angle-down");
    angle.classList.add("fa-angle-up");
    angle.addEventListener("click", hideCustomDropdown);
    paragraph.addEventListener("click", hideCustomDropdown);
  }
  async function hideCustomDropdown(e) {
    e.stopPropagation();
    const currentDropdown = e.target.closest(".dropdownBtn");
    const currentList = e.target.parentNode.nextElementSibling;
    console.log(currentList);
    const angle = currentDropdown.querySelector("i");
    const paragraph = currentDropdown.querySelector("p");
    console.log(currentDropdown);
    //   currentList.style.display = "none";
    currentList.classList.remove("displayed");
    setTimeout(removeBorderRadiuses, 500);
    angle.classList.add("fa-angle-down");
    angle.classList.remove("fa-angle-up");
    angle.removeEventListener("click", hideCustomDropdown);
    paragraph.removeEventListener("click", hideCustomDropdown);

    function removeBorderRadiuses() {
      currentDropdown.style.removeProperty("border-bottom-left-radius");
      currentDropdown.style.removeProperty("border-bottom-right-radius");
    }
  }
}

async function init() {
  searchFieldClear();
  setupCustomDropdown();
}

init();
