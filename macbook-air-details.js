const asOfDate = "2026-03-27";

const models = [
  {
    id: "mba13-10c8g",
    series: "13",
    name: "MacBook Air 13 吋 (M4, 10C CPU / 8C GPU)",
    specs: {
      display: "13.6 吋 Liquid Retina",
      chip: "Apple M4（10 核心 CPU / 8 核心 GPU）",
      memory: "16GB 統一記憶體",
      battery: "最長 18 小時",
      storage: "256GB SSD",
    },
    officialPrices: [{ config: "16GB + 256GB SSD", price: 35900, type: "official" }],
    market: { baseline: "13 吋 / 16GB / 256GB", apple: 35900, pchome: 32900, momo: 29999, ashop: null },
  },
  {
    id: "mba13-10c10g",
    series: "13",
    name: "MacBook Air 13 吋 (M4, 10C CPU / 10C GPU)",
    specs: {
      display: "13.6 吋 Liquid Retina",
      chip: "Apple M4（10 核心 CPU / 10 核心 GPU）",
      memory: "16GB 統一記憶體",
      battery: "最長 18 小時",
      storage: "512GB SSD",
    },
    officialPrices: [{ config: "16GB + 512GB SSD", price: 39400, type: "official" }],
    market: { baseline: "13 吋 / 16GB / 512GB", apple: 39400, pchome: null, momo: null, ashop: null },
  },
  {
    id: "mba15-10c10g",
    series: "15",
    name: "MacBook Air 15 吋 (M4, 10C CPU / 10C GPU)",
    specs: {
      display: "15.3 吋 Liquid Retina",
      chip: "Apple M4（10 核心 CPU / 10 核心 GPU）",
      memory: "16GB 統一記憶體",
      battery: "最長 18 小時",
      storage: "256GB SSD",
    },
    officialPrices: [{ config: "16GB + 256GB SSD", price: 42900, type: "official" }],
    market: { baseline: "15 吋 / 16GB / 256GB", apple: 42900, pchome: null, momo: 35900, ashop: null },
  },
];

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
  const pricePool = [market.apple, market.pchome, market.momo, market.ashop]
    .filter((price) => Number.isFinite(price) && price > 0);

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

  return finalPrice;
}

function getVisibleModels() {
  if (activeSeries === "all") {
    return models;
  }

  return models.filter((model) => model.series === activeSeries);
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
  const ourPrice = calculateOurPrice(model.market);
  if (Number.isFinite(ourPrice) && ourPrice > 0) {
    return ourPrice;
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
    id: `macbook-air-${model.id}-spec`,
    name: model.name,
    spec: getCartSpecLabel(model),
    price: getModelSellingPrice(model),
  });
}

function getOfficialPriceRowButtonMarkup(model, priceItem) {
  return buildAddToCartButtonMarkup({
    id: `macbook-air-${model.id}-${normalizeKey(priceItem.config)}`,
    name: model.name,
    spec: priceItem.config,
    price: priceItem.price,
  });
}

function getMarketRowButtonMarkup(model, ourPrice) {
  const price = Number.isFinite(ourPrice) ? ourPrice : getModelSellingPrice(model);

  return buildAddToCartButtonMarkup({
    id: `macbook-air-${model.id}-market-${normalizeKey(model.market.baseline)}`,
    name: model.name,
    spec: `比對配置 ${model.market.baseline}`,
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
      <td>${model.specs.memory}</td>
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
    const rows = model.officialPrices
      .map(
        (priceItem) => `
          <tr>
            <td>${priceItem.config}</td>
            <td>${formatNTD(priceItem.price)}</td>
            <td>${priceItem.type === "official" ? "官方價" : "歷史官方價"}</td>
            <td class="mini-action-cell">${getOfficialPriceRowButtonMarkup(model, priceItem)}</td>
          </tr>
        `
      )
      .join("");

    const card = document.createElement("article");
    card.className = "model-card";
    card.innerHTML = `
      <h3>${model.name}</h3>
      <p class="details-note">${model.specs.display} / ${model.specs.chip}</p>
      <table class="mini-table">
        <thead>
          <tr>
            <th>配置</th>
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
      <td>${ourPrice ? `<strong>${formatNTD(ourPrice)}</strong>` : "—"}</td>
      <td>${formatNTD(model.market.apple)}</td>
      <td>${formatNTD(model.market.pchome)}</td>
      <td>${formatNTD(model.market.momo)}</td>
      <td>${formatNTD(model.market.ashop)}</td>
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
