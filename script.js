const productData = {
  iphone: {
    title: "iPhone 17 Pro",
    price: "官方售價 NT$ 39,900 起",
    description: "目前頁面以 Apple 台灣官網可查到的 iPhone 17 Pro 256GB 起跳版本作為手機主打款。",
    features: [
      "Apple 台灣官網售價 NT$ 39,900 起",
      "對應 256GB 起跳版本",
      "適合搭配舊換新或電信方案",
    ],
    tags: ["Apple 官方價", "256GB 起", "旗艦機型"],
  },
  macbook: {
    title: "13 吋 MacBook Air (M4)",
    price: "官方售價 NT$ 34,900 起",
    description: "目前頁面以 Apple 台灣公布的 13 吋 MacBook Air M4 起售價作為筆電主打款。",
    features: [
      "Apple 台灣官方起售價 NT$ 34,900",
      "13.6 吋、16GB 記憶體、256GB SSD 起",
      "適合做企業採購與行動工作主力",
    ],
    tags: ["Apple 官方價", "M4 晶片", "13 吋 Air"],
  },
  switch: {
    title: "Nintendo Switch 2",
    price: "官方售價 NT$ 15,580",
    description: "目前頁面採用任天堂台灣官網的 Nintendo Switch 2 瑪利歐賽車世界主機組合售價。",
    features: [
      "任天堂台灣建議售價 TWD 15,580（含稅）",
      "對應瑪利歐賽車世界主機組合",
      "適合首發主打與配件延伸銷售",
    ],
    tags: ["Nintendo 官方價", "Mario Kart World", "主機組合"],
  },
};

const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");
const addButtons = document.querySelectorAll("[data-add-product]");
const cartCount = document.getElementById("cart-count");
const toast = document.getElementById("cart-toast");

const selectionTitle = document.getElementById("selection-title");
const selectionPrice = document.getElementById("selection-price");
const selectionDescription = document.getElementById("selection-description");
const selectionFeatures = document.getElementById("selection-features");
const selectionTags = document.getElementById("selection-tags");
const year = document.getElementById("year");

let selectedProduct = "iphone";
let cartItems = 0;
let toastTimer = null;

function updateSelection(productKey) {
  const data = productData[productKey];

  if (!data) {
    return;
  }

  selectedProduct = productKey;
  selectionTitle.textContent = data.title;
  selectionPrice.textContent = data.price;
  selectionDescription.textContent = data.description;

  selectionFeatures.innerHTML = "";
  data.features.forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    selectionFeatures.appendChild(item);
  });

  selectionTags.innerHTML = "";
  data.tags.forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    selectionTags.appendChild(item);
  });

  productCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.product === productKey);
  });
}

function applyFilter(filterValue) {
  let firstVisibleCard = null;

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filterValue;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  productCards.forEach((card) => {
    const matches = filterValue === "all" || card.dataset.category === filterValue;
    card.classList.toggle("is-hidden", !matches);
    card.setAttribute("aria-hidden", String(!matches));

    if (!firstVisibleCard && matches) {
      firstVisibleCard = card;
    }
  });

  if (!firstVisibleCard) {
    return;
  }

  const selectedCard = document.querySelector(`.product-card[data-product="${selectedProduct}"]`);
  if (!selectedCard || selectedCard.classList.contains("is-hidden")) {
    updateSelection(firstVisibleCard.dataset.product);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyFilter(button.dataset.filter);
  });
});

productCards.forEach((card) => {
  const activateCard = () => {
    updateSelection(card.dataset.product);
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("[data-add-product]")) {
      return;
    }

    activateCard();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateCard();
    }
  });
});

addButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();

    const productKey = button.dataset.addProduct;
    updateSelection(productKey);
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    showToast(`${productData[productKey].title} 已加入詢價清單`);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

year.textContent = String(new Date().getFullYear());
updateSelection(selectedProduct);
applyFilter("all");
