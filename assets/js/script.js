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

document.addEventListener('DOMContentLoaded', function () {
  setInterval(() => {
      typeCode("codeBlock1", code1, 30);
      typeCode("codeBlock2", code2, 30);
      typeCode("codeBlock3", code3, 30);
      typeCode("codeBlock4", code4, 30);
  }, 7000);
});

const code1 = 
  `class BankAccount {
      constructor(owner, balance = 0) {
          this.owner = owner;
          this.balance = balance;
      }
  }`;

const code2 = 
  `const myAccount = new BankAccount("Your Name", 5000);
  myAccount.deposit(10000000);
  console.log(\`Final balance: R\${myAccount.balance.toLocaleString('en-ZA')}\`);`;

const code3 = 
  `function calculateInterest(balance, rate) {
      return balance * rate / 100;
  }
  console.log(calculateInterest(10000, 5));`;

const code4 = 
  `function withdrawMoney(amount) {
      return amount;
  }
  console.log(calculateInterest(amount, 5));`;

function typeCode(elementId, code, speed = 50) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    let index = 0;
    
    function type() {
        if (index < code.length) {
            element.innerHTML += code[index] === "\n" ? "<br/>" : code[index];
            index++;
            setTimeout(type, speed);
        }

    }

    type();
}
