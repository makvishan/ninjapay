function loadHTML(file, containerId, callback) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      const container = document.getElementById(containerId);
      container.innerHTML = data;

      if (callback) callback(container);
    })
    .catch((error) => console.error("Error loading HTML:", error));
}

// Load header and initialize popover only after loading is complete
loadHTML("header.html", "header-container", (container) => {
  const productsLink = container.querySelector("#productsLink");

  if (productsLink) {
    // Initialize the popover with custom options
    const popover = new bootstrap.Popover(productsLink, {
      trigger: "manual",
      html: true,
      content: `
        <div class="popover-content">
          <div class="d-flex align-items-center nav-link-js mt-3">
              <i class="fas fa-wallet"></i>
              <h6 class="ms-2 mt-2">Ninja Payout</h6>
          </div>
          <div class="d-flex align-items-center nav-link-js  mt-3">
              <i class="fas fa-university"></i>
              <h6 class="ms-2  mt-2">Ninja UPI Collect</h6>
          </div>
          <div class="d-flex align-items-center nav-link-js mt-3">
            <i class="fas fa-exchange-alt">   </i>
              <h6 class="ms-2  mt-2"> <a href="./indo-nepal-prabu-money-transfer-api.html" class="text-decoration-none">Indo Nepal Money Transfer API</a></h6>
           
          </div>
          <div class="d-flex align-items-center nav-link-js mt-3">
          <i class="fas fa-coins" > </i>
          <h6 class="ms-2  mt-2"><a href="./gold-and-silver-inverstment-api.html" class="text-decoration-none">Gold Investment API</a></h6>
             
          </div>
      </div> `,

      placement: "bottom",
      customClass: "custom-popover",
    });

    let isInsidePopover = false;

    // Show the popover when hovering over the link
    productsLink.addEventListener("mouseenter", () => {
      popover.show();
    });

    // Track when the mouse enters the popover element
    productsLink.addEventListener("shown.bs.popover", () => {
      const popoverElement = document.querySelector(".popover.custom-popover");
      if (popoverElement) {
        popoverElement.addEventListener("mouseenter", () => {
          isInsidePopover = true;
        });
        popoverElement.addEventListener("mouseleave", () => {
          isInsidePopover = false;
          setTimeout(() => {
            if (!isInsidePopover) {
              popover.hide();
            }
          }, 100);
        });
      }
    });

    // Hide the popover if mouse leaves the link and the popover area
    productsLink.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!isInsidePopover) {
          popover.hide();
        }
      }, 100);
    });
  }
});

// Load footer without additional initialization
loadHTML("footer.html", "footer-container");

// Section 5
const messages = [
  "Hello, World!",
  "Welcome to our website!",
  "Enjoy browsing our content!",
  "Have a great day!",
];

let index = 0;
const element = document.getElementById("changeText");

setInterval(() => {
  element.classList.remove("animate-text");
  void element.offsetWidth;
  element.classList.add("animate-text");

  index = (index + 1) % messages.length;
  document.getElementById("changeText").textContent = messages[index];
}, 2000);
