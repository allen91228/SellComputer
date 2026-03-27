const asOfDate = "2026-03-27";

const models = [
  {
    id: "iphone16e",
    series: "16",
    name: "iPhone 16e",
    specs: {
      display: "6.1 吋 OLED",
      chip: "Apple A18",
      camera: "主相機 48MP（單鏡頭）",
      battery: "最長 26 小時（影片播放）",
      storage: "128GB / 256GB / 512GB",
    },
    officialPrices: [
      { capacity: "128GB", price: 21900, type: "suggested" },
      { capacity: "256GB", price: 25400, type: "suggested" },
      { capacity: "512GB", price: 32400, type: "suggested" },
    ],
    market: { baseline: "128GB", suggested: 21900, eprice: 17400 },
  },
  {
    id: "iphone16",
    series: "16",
    name: "iPhone 16",
    specs: {
      display: "6.1 吋 OLED",
      chip: "Apple A18",
      camera: "主相機 48MP（雙鏡頭）",
      battery: "電量 N/A（固定式）",
      storage: "128GB / 256GB / 512GB",
    },
    officialPrices: [
      { capacity: "128GB", price: 29900, type: "suggested" },
      { capacity: "256GB", price: 33400, type: "suggested" },
      { capacity: "512GB", price: 40400, type: "suggested" },
    ],
    market: { baseline: "128GB", suggested: 29900, eprice: 20900 },
  },
  {
    id: "iphone16plus",
    series: "16",
    name: "iPhone 16 Plus",
    specs: {
      display: "6.7 吋 OLED",
      chip: "Apple A18",
      camera: "主相機 48MP（雙鏡頭）",
      battery: "電量 N/A（固定式）",
      storage: "128GB / 256GB / 512GB",
    },
    officialPrices: [
      { capacity: "128GB", price: 32900, type: "suggested" },
      { capacity: "256GB", price: 36400, type: "suggested" },
      { capacity: "512GB", price: 43400, type: "suggested" },
    ],
    market: { baseline: "128GB", suggested: 32900, eprice: 26500 },
  },
  {
    id: "iphone16pro",
    series: "16",
    name: "iPhone 16 Pro",
    specs: {
      display: "6.3 吋 OLED",
      chip: "Apple A18 Pro",
      camera: "主相機 48MP（三鏡頭）",
      battery: "電量 N/A（固定式）",
      storage: "128GB / 256GB / 512GB / 1TB",
    },
    officialPrices: [
      { capacity: "128GB", price: 36900, type: "suggested" },
      { capacity: "256GB", price: 40400, type: "suggested" },
      { capacity: "512GB", price: 47400, type: "suggested" },
      { capacity: "1TB", price: 54400, type: "suggested" },
    ],
    market: { baseline: "128GB", suggested: 36900, eprice: 30890 },
  },
  {
    id: "iphone16promax",
    series: "16",
    name: "iPhone 16 Pro Max",
    specs: {
      display: "6.9 吋 OLED",
      chip: "Apple A18 Pro",
      camera: "主相機 48MP（三鏡頭）",
      battery: "電量 N/A（固定式）",
      storage: "256GB / 512GB / 1TB",
    },
    officialPrices: [
      { capacity: "256GB", price: 44900, type: "suggested" },
      { capacity: "512GB", price: 51900, type: "suggested" },
      { capacity: "1TB", price: 58900, type: "suggested" },
    ],
    market: { baseline: "256GB", suggested: 44900, eprice: 39300 },
  },
  {
    id: "iphone17e",
    series: "17",
    name: "iPhone 17e",
    specs: {
      display: "6.1 吋 OLED",
      chip: "Apple A19",
      camera: "主相機 48MP（單鏡頭）",
      battery: "最長 26 小時（影片播放）",
      storage: "256GB / 512GB",
    },
    officialPrices: [
      { capacity: "256GB", price: 21900, type: "suggested" },
      { capacity: "512GB", price: 28900, type: "suggested" },
    ],
    market: { baseline: "256GB", suggested: 21900, eprice: 19700 },
  },
  {
    id: "iphone17",
    series: "17",
    name: "iPhone 17",
    specs: {
      display: "6.3 吋 OLED",
      chip: "Apple A19",
      camera: "主相機 48MP（雙鏡頭）",
      battery: "電量 N/A（固定式）",
      storage: "256GB / 512GB",
    },
    officialPrices: [
      { capacity: "256GB", price: 29900, type: "suggested" },
      { capacity: "512GB", price: 36900, type: "suggested" },
    ],
    market: { baseline: "256GB", suggested: 29900, eprice: 27000 },
  },
  {
    id: "iphoneair",
    series: "17",
    name: "iPhone Air",
    specs: {
      display: "6.5 吋 OLED",
      chip: "Apple A19 Pro",
      camera: "主相機 48MP（單鏡頭）",
      battery: "電量 N/A（固定式）",
      storage: "256GB / 512GB / 1TB",
    },
    officialPrices: [
      { capacity: "256GB", price: 36900, type: "suggested" },
      { capacity: "512GB", price: 43900, type: "suggested" },
      { capacity: "1TB", price: 50900, type: "suggested" },
    ],
    market: { baseline: "256GB", suggested: 36900, eprice: 31200 },
  },
  {
    id: "iphone17pro",
    series: "17",
    name: "iPhone 17 Pro",
    specs: {
      display: "6.3 吋 OLED",
      chip: "Apple A19 Pro",
      camera: "主相機 48MP（三鏡頭）",
      battery: "電量 N/A（固定式）",
      storage: "256GB / 512GB / 1TB",
    },
    officialPrices: [
      { capacity: "256GB", price: 39900, type: "suggested" },
      { capacity: "512GB", price: 46900, type: "suggested" },
      { capacity: "1TB", price: 53900, type: "suggested" },
    ],
    market: { baseline: "256GB", suggested: 39900, eprice: 37000 },
  },
  {
    id: "iphone17promax",
    series: "17",
    name: "iPhone 17 Pro Max",
    specs: {
      display: "6.9 吋 OLED",
      chip: "Apple A19 Pro",
      camera: "主相機 48MP（三鏡頭）",
      battery: "電量 N/A（固定式）",
      storage: "256GB / 512GB / 1TB / 2TB",
    },
    officialPrices: [
      { capacity: "256GB", price: 44900, type: "suggested" },
      { capacity: "512GB", price: 51900, type: "suggested" },
      { capacity: "1TB", price: 58900, type: "suggested" },
      { capacity: "2TB", price: 72900, type: "suggested" },
    ],
    market: { baseline: "256GB", suggested: 44900, eprice: 41500 },
  },
];

const capacityOrder = { "128GB": 1, "256GB": 2, "512GB": 3, "1TB": 4, "2TB": 5 };

const seriesButtons = document.querySelectorAll("[data-series-filter]");
const specTableBody = document.getElementById("spec-table-body");
const modelCardGrid = document.getElementById("model-card-grid");
const marketTableBody = document.getElementById("market-table-body");
const asOfDateElement = document.getElementById("asof-date");
const year = document.getElementById("year");

let activeSeries = "all";

function formatNTD(value) {
  if (value === null || value === undefined) {
    return "—";
  }

  return `NT$ ${Number(value).toLocaleString("zh-TW")}`;
}

function getNearestEnding99(value) {
  const hundred = Math.floor(value / 100) * 100;
  const candidates = [hundred - 1, hundred + 99, hundred + 199].filter((item) => item > 0);
  let closest = candidates[0];

  candidates.forEach((candidate) => {
    if (Math.abs(candidate - value) < Math.abs(closest - value)) {
      closest = candidate;
    }
  });

  return closest;
}

function calculateOurPrice(market) {
  const pricePool = [market.suggested, market.eprice].filter(
    (price) => Number.isFinite(price) && price > 0
  );

  if (pricePool.length === 0) {
    return null;
  }

  const minPrice = Math.min(...pricePool);
  const basePrice = minPrice * 0.97;
  const roundedInteger = Math.round(basePrice);
  const rounded99 = getNearestEnding99(basePrice);

  const finalPrice =
    Math.abs(rounded99 - basePrice) <= Math.abs(roundedInteger - basePrice)
      ? rounded99
      : roundedInteger;

  return {
    minPrice,
    basePrice,
    finalPrice,
  };
}

function getVisibleModels() {
  if (activeSeries === "all") {
    return models;
  }

  return models.filter((model) => model.series === activeSeries);
}

function getPriceTypeLabel(type) {
  if (type === "suggested") {
    return "建議售價";
  }

  return "參考價";
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizeKey(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getModelSellingPrice(model) {
  const ourPriceInfo = calculateOurPrice(model.market);

  if (ourPriceInfo?.finalPrice) {
    return ourPriceInfo.finalPrice;
  }

  const fallback = model.officialPrices.find((item) => Number.isFinite(item.price) && item.price > 0);
  return fallback ? fallback.price : null;
}

function getCartSpecLabel(model) {
  const baseline = model.market?.baseline || "標準款";
  return `${baseline} / ${model.specs.storage}`;
}

function getPriceButtonLabel(price) {
  return `只要${Number(price).toLocaleString("zh-TW")}元`;
}

function buildAddToCartButtonMarkup({ id, name, spec, price }) {
  const normalizedPrice = Number(price);

  if (!Number.isFinite(normalizedPrice) || normalizedPrice <= 0) {
    return '<span class="cart-unavailable">暫無售價</span>';
  }

  const buttonLabel = getPriceButtonLabel(Math.round(normalizedPrice));

  return `
    <button
      type="button"
      class="button button-small cart-add-button cart-price-button"
      data-add-to-cart
      data-cart-id="${escapeAttr(id)}"
      data-cart-name="${escapeAttr(name)}"
      data-cart-spec="${escapeAttr(spec)}"
      data-cart-price="${Math.round(normalizedPrice)}"
    >
      <span class="cart-button-default">${buttonLabel}</span>
      <span class="cart-button-hover">加入購物車</span>
    </button>
  `;
}

function getSpecRowButtonMarkup(model) {
  return buildAddToCartButtonMarkup({
    id: `iphone-${model.id}-spec`,
    name: model.name,
    spec: getCartSpecLabel(model),
    price: getModelSellingPrice(model),
  });
}

function getOfficialPriceRowButtonMarkup(model, priceItem) {
  return buildAddToCartButtonMarkup({
    id: `iphone-${model.id}-${normalizeKey(priceItem.capacity)}`,
    name: model.name,
    spec: `${priceItem.capacity} / 建議售價`,
    price: priceItem.price,
  });
}

function getMarketRowButtonMarkup(model, ourPriceInfo) {
  const price = ourPriceInfo?.finalPrice ?? getModelSellingPrice(model);

  return buildAddToCartButtonMarkup({
    id: `iphone-${model.id}-market-${normalizeKey(model.market.baseline)}`,
    name: model.name,
    spec: `比對容量 ${model.market.baseline}`,
    price,
  });
}

function renderSpecTable(visibleModels) {
  specTableBody.innerHTML = "";

  visibleModels.forEach((model) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${model.name}</strong></td>
      <td>${model.specs.display}</td>
      <td>${model.specs.chip}</td>
      <td>${model.specs.camera}</td>
      <td>${model.specs.battery}</td>
      <td>${model.specs.storage}</td>
      <td class="spec-action-cell">${getSpecRowButtonMarkup(model)}</td>
    `;
    specTableBody.appendChild(row);
  });
}

function renderModelCards(visibleModels) {
  modelCardGrid.innerHTML = "";

  visibleModels.forEach((model) => {
    const card = document.createElement("article");
    card.className = "model-card";

    const sortedPrices = [...model.officialPrices].sort(
      (a, b) => (capacityOrder[a.capacity] || 99) - (capacityOrder[b.capacity] || 99)
    );

    const rows = sortedPrices
      .map(
        (priceItem) => `
          <tr>
            <td>${priceItem.capacity}</td>
            <td>${formatNTD(priceItem.price)}</td>
            <td>${getPriceTypeLabel(priceItem.type)}</td>
            <td class="mini-action-cell">${getOfficialPriceRowButtonMarkup(model, priceItem)}</td>
          </tr>
        `
      )
      .join("");

    card.innerHTML = `
      <h3>${model.name}</h3>
      <p class="details-note">${model.specs.display} / ${model.specs.chip}</p>
      <table class="mini-table">
        <thead>
          <tr>
            <th>容量</th>
            <th>價格</th>
            <th>類型</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    modelCardGrid.appendChild(card);
  });
}

function renderMarketTable(visibleModels) {
  marketTableBody.innerHTML = "";

  visibleModels.forEach((model) => {
    const ourPrice = calculateOurPrice(model.market);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${model.name}</strong></td>
      <td>${model.market.baseline}</td>
      <td>${ourPrice ? `<strong>${formatNTD(ourPrice.finalPrice)}</strong>` : "—"}</td>
      <td>${formatNTD(model.market.suggested)}</td>
      <td>${formatNTD(model.market.eprice)}</td>
      <td class="spec-action-cell">${getMarketRowButtonMarkup(model, ourPrice)}</td>
    `;
    marketTableBody.appendChild(row);
  });
}

function renderAll() {
  const visibleModels = getVisibleModels();
  renderSpecTable(visibleModels);
  renderModelCards(visibleModels);
  renderMarketTable(visibleModels);
}

seriesButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeSeries = button.dataset.seriesFilter;

    seriesButtons.forEach((item) => {
      const isActive = item.dataset.seriesFilter === activeSeries;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    renderAll();
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
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

asOfDateElement.textContent = asOfDate;
year.textContent = String(new Date().getFullYear());
renderAll();
