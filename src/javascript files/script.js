/*
  ABOUT ME:
  Hi, I'm Ashraful Alam, a passionate web and app developer from Bangladesh. I love making websites, apps, web apps, desktop apps, and cross-platform mobile apps.
  I specialize in building interactive and user-friendly web applications, and I also enjoy developing mobile apps that work seamlessly across different platforms.
  This JavaScript code powers my Palindrome Checker app, where I use HTML, CSS, and JavaScript to build engaging features like history tracking and sound effects.
  If you'd like to see more of my projects or get in touch, you can find me on the following platforms:
  - GitHub: https://github.com/ashrafulalamasad
  - Personal Website: https://ashrafulalam.me
  - Facebook: https://facebook.com/ashrafulalam005
  - Instagram: https://www.instagram.com/ashrafulalam005
  - LinkedIn: https://www.linkedin.com/in/ashrafulalam005/
  - Twitter: https://x.com/ashrafulalam005
*/

const txtInput = document.querySelector(".inputs input"),
  checkBtn = document.querySelector(".check-palindrome"),
  infoTxt = document.querySelector(".info-txt"),
  historyList = document.querySelector(".history-list"),
  clearHistoryBtn = document.querySelector(".clear-history"),
  palindromeSound = document.getElementById("palindrome-sound"),
  nonPalindromeSound = document.getElementById("non-palindrome-sound"),
  clearInputBtn = document.querySelector(".clear-input");

let debounceTimeout;

// Handle live input and update preview (without triggering sound)
txtInput.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    let originalText = txtInput.value;
    let cleanedText = originalText.toLowerCase().replace(/[^a-z0-9]/gi, "");
    let reversedText = cleanedText.split("").reverse().join("");

    // If there's text, check palindrome and update the result preview
    if (cleanedText.length > 0) {
      if (cleanedText === reversedText) {
        infoTxt.innerHTML = `Yes, <span>'${originalText}'</span> is a palindrome!`;
        infoTxt.classList.add("glow");
      } else {
        infoTxt.innerHTML = `No, <span>'${originalText}'</span> isn't a palindrome!`;
        infoTxt.classList.remove("glow");
      }
      infoTxt.style.display = "block";
      checkBtn.classList.add("active"); // Enable check button
    } else {
      infoTxt.style.display = "none";
      checkBtn.classList.remove("active"); // Disable check button if empty
    }
  }, 300);
});

// Clear Input Button
clearInputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  txtInput.value = "";
  checkBtn.classList.remove("active");
  infoTxt.style.display = "none";
});

// Check Palindrome on button click (with sound and history)
checkBtn.addEventListener("click", () => {
  let originalText = txtInput.value;
  let cleanedText = originalText.toLowerCase().replace(/[^a-z0-9]/gi, "");
  let reversedText = cleanedText.split("").reverse().join("");

  if (cleanedText.length === 0) return; // Prevent empty check

  if (cleanedText === reversedText) {
    infoTxt.innerHTML = `Yes, <span>'${originalText}'</span> is a palindrome!`;
    infoTxt.classList.add("glow");
    playSound(palindromeSound); // Play palindrome sound
    addToHistory(originalText, true);
  } else {
    infoTxt.innerHTML = `No, <span>'${originalText}'</span> isn't a palindrome!`;
    infoTxt.classList.remove("glow");
    playSound(nonPalindromeSound); // Play non-palindrome sound
    addToHistory(originalText, false);
  }
});

// Add to History
function addToHistory(value, isPalindrome) {
  const li = document.createElement("li");
  li.textContent = `${value} - ${
    isPalindrome ? "Palindrome" : "Not a Palindrome"
  }`;
  historyList.appendChild(li);
  saveToLocalStorage(value, isPalindrome);
}

// Save to Local Storage
function saveToLocalStorage(value, isPalindrome) {
  let history = JSON.parse(localStorage.getItem("palindromeHistory")) || [];
  history.push({ value, isPalindrome });
  localStorage.setItem("palindromeHistory", JSON.stringify(history));
}

// Load from Local Storage
function loadFromLocalStorage() {
  let history = JSON.parse(localStorage.getItem("palindromeHistory")) || [];
  history.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.value} - ${
      item.isPalindrome ? "Palindrome" : "Not a Palindrome"
    }`;
    historyList.appendChild(li);
  });
}

// Clear History
clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("palindromeHistory");
  historyList.innerHTML = "";
});

// Play the appropriate sound
function playSound(sound) {
  sound.currentTime = 0; // Reset audio to the start
  sound.play(); // Play the sound
}

window.onload = loadFromLocalStorage;
