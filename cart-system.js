(() => {
  const STORAGE_KEY = "nextpick-select-cart-v1";
  const CART_UPDATED_EVENT = "nextpick-cart:updated";
  const MAX_QTY = 20;
  const DIRECT_PURCHASE_PATH = "direct-purchase.html";

  const state = {
    items: [],
    isOpen: false,
  };

  const refs = {
    container: null,
    fabButton: null,
    countNodes: [],
    overlay: null,
    drawer: null,
    itemList: null,
    emptyHint: null,
    subtotal: null,
    clearButton: null,
  };

  function formatNTD(value) {
    return `NT$ ${Number(value).toLocaleString("zh-TW")}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getCount() {
    return state.items.reduce((acc, item) => acc + item.qty, 0);
  }

  function getSubtotal() {
    return state.items.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  function normalizeItem(rawItem) {
    const item = {
      id: String(rawItem.id || "").trim(),
      name: String(rawItem.name || "").trim(),
      spec: String(rawItem.spec || "").trim(),
      price: Number(rawItem.price),
      qty: Number(rawItem.qty ?? 1),
    };

    if (!item.id || !item.name || !Number.isFinite(item.price) || item.price <= 0) {
      return null;
    }

    if (!Number.isFinite(item.qty) || item.qty < 1) {
      item.qty = 1;
    }

    item.qty = Math.min(MAX_QTY, Math.round(item.qty));
    item.price = Math.round(item.price);

    return item;
  }

  function loadItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map((entry) => normalizeItem(entry))
        .filter((entry) => entry !== null);
    } catch (error) {
      return [];
    }
  }

  function saveItems() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      // Ignore storage failures (private mode / quota).
    }
  }

  function publishUpdate() {
    document.dispatchEvent(
      new CustomEvent(CART_UPDATED_EVENT, {
        detail: {
          items: state.items.map((item) => ({ ...item })),
          count: getCount(),
          subtotal: getSubtotal(),
        },
      })
    );
  }

  function setOpen(nextOpen) {
    state.isOpen = Boolean(nextOpen);
    refs.overlay.classList.toggle("is-open", state.isOpen);
    refs.drawer.classList.toggle("is-open", state.isOpen);
    refs.drawer.setAttribute("aria-hidden", String(!state.isOpen));
    document.body.classList.toggle("cart-open", state.isOpen);
  }

  function openCart() {
    setOpen(true);
  }

  function closeCart() {
    setOpen(false);
  }

  function updateButtonFeedback(button) {
    const original = button.textContent;
    button.classList.add("is-added");
    button.textContent = "已加入";

    window.setTimeout(() => {
      button.classList.remove("is-added");
      button.textContent = original || "加入購物車";
    }, 900);
  }

  function renderItems() {
    const count = getCount();
    const subtotal = getSubtotal();

    refs.countNodes.forEach((node) => {
      node.textContent = String(count);
    });

    refs.subtotal.textContent = formatNTD(subtotal);
    refs.clearButton.disabled = count === 0;
    refs.emptyHint.hidden = count > 0;

    if (count === 0) {
      refs.itemList.innerHTML = "";
      return;
    }

    refs.itemList.innerHTML = state.items
      .map((item) => {
        const linePrice = item.price * item.qty;
        return `
          <li class="cart-item">
            <div class="cart-item-head">
              <p class="cart-item-name">${escapeHtml(item.name)}</p>
              <button type="button" class="cart-remove" data-cart-action="remove" data-cart-id="${escapeHtml(item.id)}">
                移除
              </button>
            </div>
            <p class="cart-item-spec">${escapeHtml(item.spec)}</p>
            <div class="cart-item-foot">
              <strong class="cart-item-price">${formatNTD(linePrice)}</strong>
              <div class="cart-qty">
                <button type="button" data-cart-action="decrease" data-cart-id="${escapeHtml(item.id)}">-</button>
                <span>${item.qty}</span>
                <button type="button" data-cart-action="increase" data-cart-id="${escapeHtml(item.id)}">+</button>
              </div>
            </div>
          </li>
        `;
      })
      .join("");
  }

  function rerender() {
    saveItems();
    renderItems();
    publishUpdate();
  }

  function addItem(rawItem) {
    const item = normalizeItem(rawItem);
    if (!item) {
      return;
    }

    const existing = state.items.find((entry) => entry.id === item.id);
    if (existing) {
      existing.qty = Math.min(MAX_QTY, existing.qty + 1);
      existing.price = item.price;
      existing.spec = item.spec || existing.spec;
      existing.name = item.name || existing.name;
    } else {
      state.items.push(item);
    }

    rerender();
  }

  function removeItem(id) {
    const nextItems = state.items.filter((item) => item.id !== id);
    if (nextItems.length === state.items.length) {
      return;
    }
    state.items = nextItems;
    rerender();
  }

  function changeQty(id, step) {
    const target = state.items.find((item) => item.id === id);
    if (!target) {
      return;
    }

    target.qty += step;
    if (target.qty <= 0) {
      removeItem(id);
      return;
    }

    target.qty = Math.min(MAX_QTY, target.qty);
    rerender();
  }

  function clearCart() {
    state.items = [];
    rerender();
  }

  function buildItemFromButton(button) {
    const rawPrice = Number(button.dataset.cartPrice);
    if (!Number.isFinite(rawPrice) || rawPrice <= 0) {
      return null;
    }

    const name = button.dataset.cartName || "未命名商品";
    const spec = button.dataset.cartSpec || "標準規格";
    const fallbackId = `${name}-${spec}`.toLowerCase().replace(/\s+/g, "-");
    const id = button.dataset.cartId || fallbackId;

    return {
      id,
      name,
      spec,
      price: Math.round(rawPrice),
      qty: 1,
    };
  }

  function handleDocumentClick(event) {
    const addButton = event.target.closest("[data-add-to-cart]");
    if (addButton) {
      event.preventDefault();
      const item = buildItemFromButton(addButton);
      if (!item) {
        return;
      }

      addItem(item);
      openCart();
      updateButtonFeedback(addButton);
      return;
    }

    const actionButton = event.target.closest("[data-cart-action]");
    if (!actionButton) {
      return;
    }

    const id = actionButton.dataset.cartId;
    const action = actionButton.dataset.cartAction;

    if (!id) {
      return;
    }

    if (action === "increase") {
      changeQty(id, 1);
      return;
    }

    if (action === "decrease") {
      changeQty(id, -1);
      return;
    }

    if (action === "remove") {
      removeItem(id);
    }
  }

  function handleEscKey(event) {
    if (event.key === "Escape" && state.isOpen) {
      closeCart();
    }
  }

  function mountUi() {
    refs.container = document.createElement("div");
    refs.container.className = "cart-ui";
    refs.container.innerHTML = `
      <button class="cart-fab" type="button" aria-label="開啟購物車">
        購物車
        <span class="cart-fab-count" data-cart-count>0</span>
      </button>

      <div class="cart-overlay" aria-hidden="true"></div>

      <aside class="cart-drawer" role="dialog" aria-label="購物車明細" aria-hidden="true">
        <header class="cart-drawer-header">
          <div>
            <p class="cart-title">購物車</p>
            <p class="cart-subtitle">目前已加入 <strong data-cart-count>0</strong> 件商品</p>
          </div>
          <button type="button" class="cart-close" aria-label="關閉購物車">×</button>
        </header>

        <div class="cart-drawer-body">
          <p class="cart-empty-hint">購物車目前是空的，先把想買的規格加進來吧。</p>
          <ul class="cart-item-list"></ul>
        </div>

        <footer class="cart-footer">
          <div class="cart-subtotal-row">
            <span>小計</span>
            <strong data-cart-subtotal>NT$ 0</strong>
          </div>
          <div class="cart-footer-actions">
            <button type="button" class="button button-small cart-clear-button" data-cart-clear>
              清空購物車
            </button>
            <a class="button button-primary cart-checkout-button" href="${DIRECT_PURCHASE_PATH}">
              前往結帳
            </a>
          </div>
        </footer>
      </aside>
    `;

    document.body.appendChild(refs.container);

    refs.fabButton = refs.container.querySelector(".cart-fab");
    refs.countNodes = Array.from(refs.container.querySelectorAll("[data-cart-count]"));
    refs.overlay = refs.container.querySelector(".cart-overlay");
    refs.drawer = refs.container.querySelector(".cart-drawer");
    refs.itemList = refs.container.querySelector(".cart-item-list");
    refs.emptyHint = refs.container.querySelector(".cart-empty-hint");
    refs.subtotal = refs.container.querySelector("[data-cart-subtotal]");
    refs.clearButton = refs.container.querySelector("[data-cart-clear]");

    const closeButton = refs.container.querySelector(".cart-close");

    refs.fabButton.addEventListener("click", () => {
      if (state.isOpen) {
        closeCart();
      } else {
        openCart();
      }
    });

    refs.overlay.addEventListener("click", closeCart);
    closeButton.addEventListener("click", closeCart);
    refs.clearButton.addEventListener("click", clearCart);
  }

  function init() {
    state.items = loadItems();
    mountUi();
    renderItems();
    publishUpdate();

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleEscKey);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  window.NextPickCart = Object.freeze({
    getItems: () => state.items.map((item) => ({ ...item })),
    addItem,
    removeItem,
    clearCart,
    openCart,
    closeCart,
    eventName: CART_UPDATED_EVENT,
  });
})();
