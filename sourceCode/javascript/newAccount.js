function mySubmitFunction(evt) {
  if ($("#NewPassword").val() == $("#RepeatPassword").val()) {
    return true;
  } else {
    alert("Your passwords do not match. Please try again");
    document.getElementById("Password").focus();
    evt.preventDefault();
    return false;
  }
}
var password = document.getElementById("vchNewPassword"),
  confirm_password = document.getElementById("vchRepeatPassword");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity("");
  }
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

function myFunction() {
  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("text");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

document.getElementById("SelectOption").addEventListener("change", function () {
  val = $("#SelectOption").val();

  console.log(val);
  if (val === "Teacher") {
    window.open(
      "file:///C:/Users/franc/Desktop/Project%201/TeacherOnly.html",
      "_blank"
    );
  }
  if (val === "Principal") {
    window.open("contact.php", "_blank");
  }
  if (val === "Deputy") {
    window.open("sitemap.php", "_blank");
  }
});

// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

$(document).ready(function () {
  $("btnSubmit").click(function () {});
});
