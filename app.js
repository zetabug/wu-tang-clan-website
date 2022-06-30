// IGNORE THIS(CUSTOM-ALERT)=================
iziToast.settings({
  timeout: 1500,
});
// ==========================================

// NAVIGATION ===============================
const dropdownBtn = document.querySelectorAll(".dd_btn");
const backBtn = document.querySelectorAll(".dd .back_btn");

backBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    dropdownBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
  });
});

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
    }
  });
});


// ===========================================
// TOGGLE MENU
const menu = document.querySelector(".nav_menu");

function toggleMenu() {
  if (menu.classList.contains("show") == true) {
    menu.classList.remove("show");

    dropdownBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
  } else {
    menu.classList.add("show");
  }
}


// ==========================================
// TOGGLE CART

const cart = document.querySelector(".cart")
function toggleCart() {
  if (cart.classList.contains("show") == true) {
    cart.classList.remove("show");
  } else {
    cart.classList.add("show");
  }
}


// ==========================================
// MAKING CART WORK
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
}
else {
  ready();
}

function ready() {
  updateTotal()
  // REMOVE 
  const removeCartbtns = document.querySelectorAll('.cart-remove');
  removeCartbtns.forEach(btn => {
    btn.addEventListener('click', removeCartItem);
  })

  // QUANTITYCHANGE
  const quantityInputs = document.querySelectorAll('.cart-quantity');
  quantityInputs.forEach(count => {
    count.addEventListener('change', quantityChanged);
  })

  const addtoCartbtns = document.querySelectorAll('.atc-btn');
  addtoCartbtns.forEach(btn => {
    btn.addEventListener('click', addtoCartClicked);
  })

  // BUY 
  // document.querySelector('.btn-buy').addEventListener('click',buy)
}


// ADD TO CART CLICKED ==================================
function addtoCartClicked(e) {
  const parentEl = e.target.parentElement;
  const title = parentEl.querySelector('.product-title').innerText;
  const price = parentEl.querySelector('.price').innerText;
  const img = parentEl.querySelector('.product-img').src;
  addtoCart(title, price, img)
  updateTotal();
}

function addtoCart(title, price, img) {
  const cartItems = document.querySelector('.cart-items');
  const itemNames = cartItems.querySelectorAll('.cart-product-title');
  for (const element of itemNames) {
    if (element.innerText == title) {
      // alert("Product already present in the Cart");

      iziToast.error({
        message: 'This Product is already present in the Cart.',
    });
      return;
    }
  }
  const cartBox = document.createElement('div');
  cartBox.classList.add('cart-item');
  cartBox.innerHTML = ` <img src="${img}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">
                            ${title}
                            </div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" min="1" class="cart-quantity">
                        </div>
                        <i class="ri-delete-bin-7-fill cart-remove"></i>`

  cartItems.append(cartBox);
  cartBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
  cartBox.querySelector('.cart-quantity').addEventListener('click', quantityChanged);

  // alert('Product added to the Cart')
  iziToast.success({
    title: 'Success!',
    message: 'Added to the Cart.',
  });
}

//REMOVE CART ITEM
function removeCartItem(e) {
  e.target.parentElement.remove();
  updateTotal();
}

// QUANTITY CHANGED
function quantityChanged(e) {
  const input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// UPDATE AMOUNT
function updateTotal() {
  const cartBoxes = document.querySelectorAll('.cart-item');
  const totalPrice = document.querySelector('.total-price')
  let total = 0
  cartBoxes.forEach(item => {
    const price = item.querySelector('.cart-price').textContent.slice(1)
    const quantity = item.querySelector('.cart-quantity').value

    total += price * quantity;

  })
  total = total.toFixed(2);
  totalPrice.innerHTML = `$${total}`
}