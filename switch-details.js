const asOfDate = "2026-03-27";

const models = [
  {
    id: "switch2-standard",
    series: "standard",
    name: "Nintendo Switch 2（不含馬力歐賽車）",
    specs: {
      display: "7.9 吋顯示器",
      storage: "256GB",
      package: "主機、Joy-Con 2、底座、充電器、HDMI",
      note: "不含《瑪利歐賽車世界》",
    },
    officialPrices: [{ config: "標準版主機組", price: 14580, type: "official" }],
    market: { baseline: "標準版主機組", official: 14580, pchome: 14580, momo: 14680, ashop: null },
  },
  {
    id: "switch2-bundle-mkw",
    series: "bundle",
    name: "Nintendo Switch 2（含馬力歐賽車）",
    specs: {
      display: "7.9 吋顯示器",
      storage: "256GB",
      package: "主機、Joy-Con 2、底座、充電器、HDMI、瑪利歐賽車世界",
      note: "含《瑪利歐賽車世界》同捆內容",
    },
    officialPrices: [{ config: "同捆版主機組", price: 15580, type: "official" }],
    market: { baseline: "同捆版主機組", official: 15580, pchome: 15580, momo: 15780, ashop: null },
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
  const pricePool = [market.official, market.pchome, market.momo, market.ashop]
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
  return `${model.market.baseline} / ${model.specs.storage}`;
}

function buildAddToCartButtonMarkup({ id, name, spec, price }) {
  const normalizedPrice = Number(price);

  if (!Number.isFinite(normalizedPrice) || normalizedPrice <= 0) {
    return '<span class="cart-unavailable">暫無售價</span>';
  }

  return `
    <button
      type="button"
      class="button button-small cart-add-button"
      data-add-to-cart
      data-cart-id="${escapeAttr(id)}"
      data-cart-name="${escapeAttr(name)}"
      data-cart-spec="${escapeAttr(spec)}"
      data-cart-price="${Math.round(normalizedPrice)}"
    >
      加入購物車
    </button>
  `;
}

function getSpecRowButtonMarkup(model) {
  return buildAddToCartButtonMarkup({
    id: `switch-${model.id}-spec`,
    name: model.name,
    spec: getCartSpecLabel(model),
    price: getModelSellingPrice(model),
  });
}

function getOfficialPriceRowButtonMarkup(model, priceItem) {
  return buildAddToCartButtonMarkup({
    id: `switch-${model.id}-${normalizeKey(priceItem.config)}`,
    name: model.name,
    spec: priceItem.config,
    price: priceItem.price,
  });
}

function getMarketRowButtonMarkup(model, ourPrice) {
  const price = Number.isFinite(ourPrice) ? ourPrice : getModelSellingPrice(model);

  return buildAddToCartButtonMarkup({
    id: `switch-${model.id}-market-${normalizeKey(model.market.baseline)}`,
    name: model.name,
    spec: `比對方案 ${model.market.baseline}`,
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
      <td>${model.specs.storage}</td>
      <td>${model.specs.package}</td>
      <td>${model.specs.note}</td>
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
      <p class="details-note">${model.specs.display} / ${model.specs.storage}</p>
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
      <td>${formatNTD(model.market.official)}</td>
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
