const logoutBtn = document.getElementById("logout-btn");

logoutBtn.onclick = async () => {
  try {
    const loadingElement = document.createElement("div");
    loadingElement.textContent = "Loading...";
    document.body.appendChild(loadingElement);

    localStorage.removeItem("cartID");
    await fetch("/api/sessions/logout");

    document.body.removeChild(loadingElement);

    const successElement = document.createElement("div");
    successElement.textContent = "Redirecting...";
    document.body.appendChild(successElement);

    setTimeout(() => {
      document.body.removeChild(successElement);
      window.location.href = "/?login=true";
    }, 2500);
  } catch (error) {
    const errorElement = document.createElement("div");
    errorElement.textContent = "Something went wrong!";
    document.body.appendChild(errorElement);

    setTimeout(() => {
      document.body.removeChild(errorElement);
    }, 2500);
  }
};
