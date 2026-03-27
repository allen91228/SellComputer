const asOfDate = "2026-03-27";

const models = [
  {
    id: "iphone16e",
    series: "16",
    name: "iPhone 16e",
    specs: {
      display: "6.1 吋 OLED",
      chip: "A18（4 核心 GPU）",
      camera: "48MP 融合相機（含 2 倍望遠）",
      battery: "最長 26 小時",
      storage: "128GB / 256GB / 512GB",
    },
    officialPrices: [
      { capacity: "128GB", price: 21900, type: "official-historical" },
      { capacity: "256GB", price: 25400, type: "official-historical" },
      { capacity: "512GB", price: 32400, type: "official-historical" },
    ],
    market: { baseline: "128GB", apple: 21900, pchome: null, momo: null, ashop: 21900 },
  },
  {
    id: "iphone16",
    series: "16",
    name: "iPhone 16",
    specs: {
      display: "6.1 吋 OLED",
      chip: "A18（5 核心 GPU）",
      camera: "48MP 融合 + 12MP 超廣角",
      battery: "最長 22 小時",
      storage: "128GB（官網現售）",
    },
    officialPrices: [{ capacity: "128GB", price: 25900, type: "official" }],
    market: { baseline: "128GB", apple: 25900, pchome: null, momo: null, ashop: 29900 },
  },
  {
    id: "iphone16plus",
    series: "16",
    name: "iPhone 16 Plus",
    specs: {
      display: "6.7 吋 OLED",
      chip: "A18（5 核心 GPU）",
      camera: "48MP 融合 + 12MP 超廣角",
      battery: "最長 27 小時",
      storage: "128GB / 256GB（官網現售）",
    },
    officialPrices: [
      { capacity: "128GB", price: 29900, type: "official" },
      { capacity: "256GB", price: 33400, type: "official" },
    ],
    market: { baseline: "128GB", apple: 29900, pchome: null, momo: null, ashop: 32900 },
  },
  {
    id: "iphone16pro",
    series: "16",
    name: "iPhone 16 Pro",
    specs: {
      display: "6.3 吋 OLED ProMotion",
      chip: "A18 Pro（6 核心 GPU）",
      camera: "48MP 融合 + 48MP 超廣角 + 12MP 5 倍望遠",
      battery: "最長 27 小時",
      storage: "128GB / 256GB / 512GB / 1TB",
    },
    officialPrices: [
      { capacity: "128GB", price: 36900, type: "official-historical" },
      { capacity: "256GB", price: 40400, type: "official-historical" },
      { capacity: "512GB", price: 47400, type: "official-historical" },
      { capacity: "1TB", price: 54400, type: "official-historical" },
    ],
    market: { baseline: "128GB", apple: 36900, pchome: 24490, momo: null, ashop: 36900 },
  },
  {
    id: "iphone16promax",
    series: "16",
    name: "iPhone 16 Pro Max",
    specs: {
      display: "6.9 吋 OLED ProMotion",
      chip: "A18 Pro（6 核心 GPU）",
      camera: "48MP 融合 + 48MP 超廣角 + 12MP 5 倍望遠",
      battery: "最長 33 小時",
      storage: "256GB / 512GB / 1TB",
    },
    officialPrices: [
      { capacity: "256GB", price: 44900, type: "official-historical" },
      { capacity: "512GB", price: 51900, type: "official-historical" },
      { capacity: "1TB", price: 58900, type: "official-historical" },
    ],
    market: { baseline: "256GB", apple: 44900, pchome: null, momo: null, ashop: 44900 },
  },
  {
    id: "iphone17e",
    series: "17",
    name: "iPhone 17e",
    specs: {
      display: "6.1 吋 OLED",
      chip: "A19（4 核心 GPU）",
      camera: "48MP 融合相機（含 2 倍望遠）",
      battery: "最長 26 小時",
      storage: "256GB / 512GB",
    },
    officialPrices: [
      { capacity: "256GB", price: 21900, type: "official" },
      { capacity: "512GB", price: 28900, type: "official" },
    ],
    market: { baseline: "256GB", apple: 21900, pchome: null, momo: 21900, ashop: null },
  },
  {
    id: "iphone17",
    series: "17",
    name: "iPhone 17",
    specs: {
      display: "6.3 吋 OLED",
      chip: "A19（5 核心 GPU）",
      camera: "48MP 融合 + 12MP 超廣角",
      battery: "最長 26 小時",
      storage: "256GB / 512GB",
    },
    officialPrices: [
      { capacity: "256GB", price: 29900, type: "official" },
      { capacity: "512GB", price: 36900, type: "official" },
    ],
    market: { baseline: "256GB", apple: 29900, pchome: null, momo: 29400, ashop: null },
  },
  {
    id: "iphoneair",
    series: "17",
    name: "iPhone Air",
    specs: {
      display: "6.6 吋 OLED",
      chip: "A19 Pro（6 核心 GPU）",
      camera: "48MP 融合 + 12MP 超廣角",
      battery: "最長 24 小時",
      storage: "256GB / 512GB / 1TB",
    },
    officialPrices: [
      { capacity: "256GB", price: 36900, type: "official" },
      { capacity: "512GB", price: 43900, type: "official" },
      { capacity: "1TB", price: 50900, type: "official" },
    ],
    market: { baseline: "256GB", apple: 36900, pchome: null, momo: 34099, ashop: null },
  },
  {
    id: "iphone17pro",
    series: "17",
    name: "iPhone 17 Pro",
    specs: {
      display: "6.3 吋 OLED ProMotion",
      chip: "A19 Pro（6 核心 GPU）",
      camera: "48MP 融合 + 48MP 超廣角 + 48MP 望遠",
      battery: "最長 31 小時",
      storage: "256GB / 512GB / 1TB",
    },
    officialPrices: [
      { capacity: "256GB", price: 39900, type: "official" },
      { capacity: "512GB", price: 46900, type: "official" },
      { capacity: "1TB", price: 53900, type: "official" },
    ],
    market: { baseline: "256GB", apple: 39900, pchome: 39900, momo: 39900, ashop: null },
  },
  {
    id: "iphone17promax",
    series: "17",
    name: "iPhone 17 Pro Max",
    specs: {
      display: "6.9 吋 OLED ProMotion",
      chip: "A19 Pro（6 核心 GPU）",
      camera: "48MP 融合 + 48MP 超廣角 + 48MP 望遠",
      battery: "最長 37 小時",
      storage: "256GB / 512GB / 1TB / 2TB",
    },
    officialPrices: [
      { capacity: "256GB", price: 44900, type: "official" },
      { capacity: "512GB", price: 51900, type: "official" },
      { capacity: "1TB", price: 58900, type: "official" },
      { capacity: "2TB", price: 72900, type: "official" },
    ],
    market: { baseline: "256GB", apple: 44900, pchome: null, momo: 44900, ashop: null },
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
  if (type === "official-historical") {
    return "歷史官方價";
  }

  return "官方價";
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
      <td>${formatNTD(model.market.apple)}</td>
      <td>${formatNTD(model.market.pchome)}</td>
      <td>${formatNTD(model.market.momo)}</td>
      <td>${formatNTD(model.market.ashop)}</td>
      <td>${ourPrice ? `<strong>${formatNTD(ourPrice.finalPrice)}</strong>` : "—"}</td>
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
