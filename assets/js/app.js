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
        trigger: 'manual',
        html: true,
        content: `
          <div class="popover-content">
            <div class="d-flex align-items-center mt-2">
              <img src="./assets/single_payouts.png" alt="" width="30px">
              <a href=""><h6 class="ms-2">Ninja Payout</h6></a>
            </div>
            <div class="d-flex align-items-center mt-2">
              <img src="./assets/single_payouts.png" alt="" width="30px">
               <a href=""><h6 class="ms-2">Ninja UPI Collect</h6></a>
            </div>
            <div class="d-flex align-items-center mt-2">
              <img src="./assets/single_payouts.png" alt="" width="30px">
              <a href=""> <h6 class="ms-2">Indo Nepal Money Transfer API</h6></a>
            </div>
            <div class="d-flex align-items-center mt-2">
              <img src="./assets/single_payouts.png" alt="" width="30px">
              <a href=""> <h6 class="ms-2">Gold Investment API</h6></a>
            </div>
          </div>
        `,
        placement: 'bottom',
        customClass: 'custom-popover'
      });
  
      let isInsidePopover = false;
  
      // Show the popover when hovering over the link
      productsLink.addEventListener('mouseenter', () => {
        popover.show();
      });
  
      // Track when the mouse enters the popover element
      productsLink.addEventListener('shown.bs.popover', () => {
        const popoverElement = document.querySelector('.popover.custom-popover');
        if (popoverElement) {
          popoverElement.addEventListener('mouseenter', () => {
            isInsidePopover = true;
          });
          popoverElement.addEventListener('mouseleave', () => {
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
      productsLink.addEventListener('mouseleave', () => {
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
  