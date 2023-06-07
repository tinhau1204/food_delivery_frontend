import router from "next/router";
import Swal from "sweetalert2";

export const checkLoginCookie = () => {
  let cookieInfo = document.cookie.split("=")[1];

  if (cookieInfo == undefined) {
    Swal.fire({
      title: "Error!",
      text: "You must login first!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#36c6d3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then(function (result) {
      if (result.value) {
        router.push("/customer/login", undefined, { shallow: true });
      } else if (result.dismiss == "cancel") {
      }
    });

    return false;
  } else return true;
};
