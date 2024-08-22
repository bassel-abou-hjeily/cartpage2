const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      { code: "black", img: "./img/air.png" },
      { code: "darkblue", img: "./img/air2.png" },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      { code: "lightgray", img: "./img/jordan.png" },
      { code: "green", img: "./img/jordan2.png" },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      { code: "lightgray", img: "./img/blazer.png" },
      { code: "green", img: "./img/blazer2.png" },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      { code: "black", img: "./img/crater.png" },
      { code: "lightgray", img: "./img/crater2.png" },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      { code: "gray", img: "./img/hippie.png" },
      { code: "black", img: "./img/hippie2.png" },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

// Function to update the product details
function updateProduct(index) {
  choosenProduct = products[index];
  currentProductTitle.textContent = choosenProduct.title;
  currentProductPrice.textContent = "$" + choosenProduct.price;
  currentProductImg.src = choosenProduct.colors[0].img;

  // Update color options
  currentProductColors.forEach((color, colorIndex) => {
    color.style.backgroundColor = choosenProduct.colors[colorIndex]?.code || "transparent";
    // Set a click event for color options
    color.onclick = () => {
      currentProductImg.src = choosenProduct.colors[colorIndex]?.img || "";
    };
  });

  // Reset size options
  currentProductSizes.forEach((size) => {
    size.style.backgroundColor = "white";
    size.style.color = "black";
  });
}

// Event listeners for menu items
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    updateProduct(index);
  });
});

// Event listener for size options
currentProductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((s) => {
      s.style.backgroundColor = "white";
      s.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});



// Add product to cart
document.querySelector(".addCart").addEventListener("click", () => {
  try {
    const selectedProduct = {
      img: currentProductImg.src,
      title: currentProductTitle.textContent,
      price: currentProductPrice.textContent,
      color: Array.from(currentProductColors).find(color => color.style.backgroundColor === "black")?.style.backgroundColor || "none",
      size: Array.from(currentProductSizes).find(size => size.style.backgroundColor === "black")?.textContent || "none",
      quantity: 1  // Default quantity is 1
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(selectedProduct);
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
});

// Initial product update
updateProduct(0);  // Set initial product details
