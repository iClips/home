function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();

        return;
      }
    }
}

function openModal(heading, description) {
  console.log('adding.show');
  const overlay = document.getElementById('modal-overlay');
  const modal = overlay.querySelector('.budget-modal');

  // Set heading and description in the modal
  document.getElementById('modal-heading').textContent = heading;
  document.getElementById('modal-description').textContent = description;

  // Display the overlay and modal with transitions
  overlay.style.display = 'flex'; // Set display flex for overlay

  // Wait for the display change to take effect
  setTimeout(() => {
      overlay.classList.add('show-modal'); // Trigger fade-in
      modal.classList.add('show-modal');   // Trigger modal scaling and opacity
  }, 10); // Small delay to allow display change to take effect
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  const modal = overlay.querySelector('.budget-modal');

  // Remove 'show-modal' class to trigger close animation
  modal.classList.remove('show-modal');
  overlay.classList.remove('show-modal');

  // Wait for the animation to finish before fully hiding the modal
  setTimeout(() => {
      overlay.style.display = 'none';
  }, 400); // Match this duration with CSS transition time
}