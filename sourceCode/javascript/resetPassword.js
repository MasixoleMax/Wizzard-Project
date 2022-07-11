function mySubmitFunction(evt) {
  if ($("#Password").val() == $("#Password2").val()) {
    return true;
  } else {
    alert("Your passwords do not match. Please try again");
    document.getElementById("Password").focus();
    evt.preventDefault();
    return false;
  }
}

var password = document.getElementById("vchPassword"),
  confirm_password = document.getElementById("vchPassword2");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity("");
  }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
