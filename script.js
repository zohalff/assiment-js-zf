// Global variables
let currentUser = null
let orderData = null

// Authentication function
function login() {
  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value.trim()

  // Valid credentials check
  if ((username === "admin" || username === "user") && password === "1234") {
    // Set user role and security level
    currentUser = {
      username: username,
      role: username,
      securityLevel: username === "admin" ? "high" : "low",
    }

    // Show success and proceed to order section
    alert(`🚀 Welcome aboard, ${username}! Access granted with ${currentUser.securityLevel} security level.`)
    showSection("orderSection")

    // Update user info display
    document.getElementById("userRole").textContent =
      `Logged in as: ${currentUser.role} (Security: ${currentUser.securityLevel})`
  } else {
    // Show error and stop
    alert("❌ Access denied! Invalid credentials. Please check your username and password.")
    return
  }
}

// Calculate order function
function calculateOrder() {
  const name = document.getElementById("customerName").value.trim()
  const age = Number.parseInt(document.getElementById("customerAge").value)
  const coffeeType = document.getElementById("coffeeType").value
  const quantity = Number.parseInt(document.getElementById("quantity").value)
  // Validation
  if (!name || !age || !coffeeType || !quantity) {
    alert("⚠️ Please fill in all fields to proceed with your cosmic order!")
    return
  }

  // Coffee prices
  const prices = {
    espresso: 2.5,
    latte: 3.5,
    cappuccino: 4.0,
  }

  const pricePerCup = prices[coffeeType]
  const originalTotal = pricePerCup * quantity

  // Apply discount for age < 18 or > 60
  let discount = 0
  if (age < 18 || age > 60) {
    discount = originalTotal * 0.1 // 10% discount
  }

  const finalTotal = originalTotal - discount

  // Store order data
  orderData = {
    name: name,
    age: age,
    coffeeType: coffeeType,
    quantity: quantity,
    pricePerCup: pricePerCup,
    originalTotal: originalTotal,
    discount: discount,
    finalTotal: finalTotal,
  }

  // Display order summary
  const summaryContent = document.getElementById("summaryContent")
  summaryContent.innerHTML = `
        <p><span class="highlight">Customer:</span> ${name}</p>
        <p><span class="highlight">Age:</span> ${age}</p>
        <p><span class="highlight">Order:</span> ${quantity} ${coffeeType}(s)</p>
        <p><span class="highlight">Price per cup:</span> $${pricePerCup.toFixed(2)}</p>
        <p><span class="highlight">Original total:</span> $${originalTotal.toFixed(2)}</p>
        ${discount > 0 ? `<p><span class="highlight">Discount (10%):</span> -$${discount.toFixed(2)}</p>` : ""}
        <p><span class="highlight">Final total:</span> $${finalTotal.toFixed(2)}</p>
    `

  document.getElementById("orderSummary").classList.remove("hidden")
}

// Proceed to bill split
function proceedToBillSplit() {
  showSection("billSplitSection")
}

// Calculate bill split with tip
function calculateBillSplit() {
  const splitCount = Number.parseInt(document.getElementById("splitCount").value)
  const tipPercentage = Number.parseInt(document.getElementById("tipPercentage").value)

  if (!splitCount || tipPercentage === null) {
    alert("⚠️ Please select split count and tip percentage!")
    return
  }

  const tipAmount = orderData.finalTotal * (tipPercentage / 100)
  const totalWithTip = orderData.finalTotal + tipAmount
  const amountPerPerson = totalWithTip / splitCount

  // Display final bill
  const billContent = document.getElementById("billContent")
  billContent.innerHTML = `
        <p><span class="highlight">Hello ${orderData.name}!</span></p>
        <p>You ordered ${orderData.quantity} ${orderData.coffeeType}(s).</p>
        <br>
        <p><span class="highlight">Original total:</span> $${orderData.originalTotal.toFixed(2)}</p>
        ${orderData.discount > 0 ? `<p><span class="highlight">Discount:</span> $${orderData.discount.toFixed(2)}</p>` : ""}
        <p><span class="highlight">Subtotal:</span> $${orderData.finalTotal.toFixed(2)}</p>
        <p><span class="highlight">Tip (${tipPercentage}%):</span> $${tipAmount.toFixed(2)}</p>
        <p><span class="highlight">Total with Tip:</span> $${totalWithTip.toFixed(2)}</p>
        <br>
        <p><span class="highlight">Split between ${splitCount} ${splitCount === 1 ? "person" : "people"}:</span> $${amountPerPerson.toFixed(2)} each</p>
    `

  document.getElementById("finalBill").classList.remove("hidden")

  // Also show alert as requested
  alert(
    `🧾 Final Bill Summary:\n\nHello ${orderData.name}!\nYou ordered ${orderData.quantity} ${orderData.coffeeType}(s).\n\nOriginal total: $${orderData.originalTotal.toFixed(2)}\n${orderData.discount > 0 ? `Discount: $${orderData.discount.toFixed(2)}\n` : ""}Tip: $${tipAmount.toFixed(2)}\nTotal with Tip: $${totalWithTip.toFixed(2)}\nSplit between ${splitCount} people: $${amountPerPerson.toFixed(2)} each`
  )
}

// Start new order
function startNewOrder() {
  orderData = null

  // Clear all form fields
  document.getElementById("customerName").value = ""
  document.getElementById("customerAge").value = ""
  document.getElementById("coffeeType").value = ""
  document.getElementById("quantity").value = ""
  document.getElementById("splitCount").value = "1"
  document.getElementById("tipPercentage").value = "0"
  // Hide summary sections
  document.getElementById("orderSummary").classList.add("hidden")
  document.getElementById("finalBill").classList.add("hidden")

  // Go back to order section
  showSection("orderSection")
}

// Logout function
function logout() {
  currentUser = null
  orderData = null

  // Clear all form fields
  document.getElementById("username").value = ""
  document.getElementById("password").value = ""
  document.getElementById("customerName").value = ""
  document.getElementById("customerAge").value = ""
  document.getElementById("coffeeType").value = ""
  document.getElementById("quantity").value = ""
  document.getElementById("splitCount").value = "1"
  document.getElementById("tipPercentage").value = "0"

  // Hide all summary sections
  document.getElementById("orderSummary").classList.add("hidden")
  document.getElementById("finalBill").classList.add("hidden")

  // Go back to login
  showSection("loginSection")

  alert("👋 Logged out successfully. Thank you for visiting Saturn Coffee!")
}

// Utility function to show sections
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  // Show target section
  document.getElementById(sectionId).classList.add("active")
}

// Allow Enter key to trigger login
document.addEventListener("DOMContentLoaded", () => {
  const loginInputs = document.querySelectorAll("#loginSection input")
  loginInputs.forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        login()
      }
    })
  })
})