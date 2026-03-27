const productData = {
  iphone: {
    title: "iPhone Creator",
    price: "示意專案價 NT$ 34,900",
    description: "適合內容創作與高頻通勤的主打款式，讓首頁第一屏就有明確的成交主角。",
    features: [
      "主打高階質感與快速決策",
      "適合搭配舊換新或電信方案",
      "首頁視覺最容易做出品牌感",
    ],
    tags: ["行動工作", "內容創作", "高轉換商品"],
  },
  macbook: {
    title: "MacBook Flow",
    price: "示意專案價 NT$ 42,900",
    description: "適合作為高單價門面商品，頁面氣質穩定，也很適合延伸企業採購或教育專案。",
    features: [
      "適合用來承接商務與工作族群",
      "高單價商品有助拉高客單價印象",
      "後續很好擴充成規格比較頁",
    ],
    tags: ["行動辦公", "企業採購", "高客單價"],
  },
  switch: {
    title: "Switch Party",
    price: "示意專案價 NT$ 11,480",
    description: "用活潑色彩補足整站情緒，適合主打家庭娛樂、聚會需求與節慶檔期活動。",
    features: [
      "色彩鮮明，能快速抓住視線",
      "適合搭售遊戲與配件內容",
      "很適合節慶行銷與送禮情境",
    ],
    tags: ["家庭娛樂", "派對首選", "節慶檔期"],
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
