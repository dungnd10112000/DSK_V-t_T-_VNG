const products = [
  {
    id: "khuon-550-160-inox",
    category: "Khuôn ép viên",
    name: "Khuôn 550 - 5 hàng lỗ",
    code: "环模 1.6.0 - 550",
    material: "Thép không rỉ",
    spec: "Dòng 550, 5 hàng lỗ, tỉ số nén 1.6.0",
    image: "assets/khuon-hop-kim.jpg",
    marketPrice: 27000000,
    preorderPrice: 24300000,
  },
  {
    id: "khuon-550-160-hop-kim",
    category: "Khuôn ép viên",
    name: "Khuôn 550 - 5 hàng lỗ",
    code: "环模1.6.0 - 550",
    material: "Thép hợp kim",
    spec: "Dòng 550, 5 hàng lỗ, tỉ số nén 1.6.0",
    image: "assets/khuon-hop-kim.jpg",
    marketPrice: 21000000,
    preorderPrice: 18900000,
  },
  {
    id: "khuon-550-145-hop-kim",
    category: "Khuôn ép viên",
    name: "Khuôn 550 - 5 hàng lỗ",
    code: "环模 1.4.5 - 550",
    material: "Thép hợp kim",
    spec: "Dòng 550, 5 hàng lỗ, tỉ số nén 1.4.5",
    image: "assets/khuon-hop-kim.jpg",
    marketPrice: 21000000,
    preorderPrice: 18900000,
  },
  {
    id: "khuon-550-150-hop-kim",
    category: "Khuôn ép viên",
    name: "Khuôn 550 - 5 hàng lỗ",
    code: "环模 1.5.0 - 550",
    material: "Thép hợp kim",
    spec: "Dòng 550, 5 hàng lỗ, tỉ số nén 1.5.0",
    image: "assets/khuon-hop-kim.jpg",
    marketPrice: 21000000,
    preorderPrice: 18900000,
  },
  {
    id: "khuon-560-170-hop-kim",
    category: "Khuôn ép viên",
    name: "Khuôn 560 - 6 hàng lỗ",
    code: "环模 1.7.0 - 560 - 6排孔",
    material: "Thép hợp kim",
    spec: "Dòng 560, 6 hàng lỗ, tỉ số nén 1.7.0",
    image: "assets/khuon-hop-kim.jpg",
    marketPrice: 22000000,
    preorderPrice: 19800000,
  },
  {
    id: "khuon-680-160-hop-kim",
    category: "Khuôn ép viên",
    name: "Khuôn 680",
    code: "680 - 1.6.0",
    material: "Thép hợp kim Ø8mm",
    spec: "Dòng 680, tỉ số nén 1.6.0, lỗ Ø8mm",
    image: "assets/khuon-hop-kim.jpg",
    marketPrice: 32000000,
    preorderPrice: 28800000,
  },
  {
    id: "lo-550-5-thep-han",
    category: "Lô con lăn",
    name: "Lô con lăn 550",
    code: "Roller Shell 550 - 5 排孔",
    material: "Thép hàn",
    spec: "Dòng 550, 5 hàng lỗ",
    image: "assets/lo-thep-han.jpg",
    marketPrice: 2500000,
    preorderPrice: 2375000,
  },
  {
    id: "lo-550-5-thep-o-lan",
    category: "Lô con lăn",
    name: "Lô con lăn 550",
    code: "Roller Shell 550 - 5 排孔",
    material: "Thép ổ lăn",
    spec: "Dòng 550, 5 hàng lỗ",
    image: "assets/lo-thep-o-lan.jpg",
    marketPrice: 2100000,
    preorderPrice: 1995000,
  },
  {
    id: "lo-550-6-thep-o-lan",
    category: "Lô con lăn",
    name: "Lô con lăn 550 - 6 hàng lỗ",
    code: "Roller Shell 550 - 6排孔",
    material: "Thép ổ lăn",
    spec: "Dòng 550, 6 hàng lỗ",
    image: "assets/lo-thep-o-lan.jpg",
    marketPrice: 2300000,
    preorderPrice: 2185000,
  },
  {
    id: "lo-550-6-thep-han",
    category: "Lô con lăn",
    name: "Lô con lăn 550 - 6 hàng lỗ",
    code: "Roller Shell 550 - 6 排孔",
    material: "Thép hàn",
    spec: "Dòng 550, 6 hàng lỗ",
    image: "assets/lo-thep-han.jpg",
    marketPrice: 2800000,
    preorderPrice: 2660000,
  },
  {
    id: "lo-680-thep-o-lan",
    category: "Lô con lăn",
    name: "Lô con lăn 680",
    code: "Roller Shell 680",
    material: "Thép ổ lăn",
    spec: "Dòng 680",
    image: "assets/lo-thep-o-lan.jpg",
    marketPrice: 3000000,
    preorderPrice: 2850000,
  },
];

const quoteItems = new Map();
const productGrid = document.querySelector("#productGrid");
const publicPriceBody = document.querySelector("#publicPriceBody");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll("[data-filter]");
const quoteList = document.querySelector("#quoteList");
const quoteTotal = document.querySelector("#quoteTotal");
const quoteOutput = document.querySelector("#quoteOutput");
const quoteForm = document.querySelector("#quoteForm");
const clearQuote = document.querySelector("#clearQuote");

let activeFilter = "all";

function money(value, currency = "đ") {
  if (value === null || value === undefined) {
    return "Đang cập nhật";
  }

  return `${Number(value).toLocaleString("vi-VN")}${currency}`;
}

function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d");
}

function textMatch(product, keyword) {
  if (!keyword) {
    return true;
  }

  const searchBase = removeVietnameseTones(
    [
      product.name,
      product.code,
      product.material,
      product.spec,
      product.category,
    ].join(" ")
  ).toLowerCase();

  return searchBase.includes(removeVietnameseTones(keyword).toLowerCase().trim());
}

function visibleProducts() {
  const keyword = searchInput ? searchInput.value : "";
  return products.filter((product) => {
    const categoryMatch = activeFilter === "all" || product.category === activeFilter;
    return categoryMatch && textMatch(product, keyword);
  });
}

function productTitle(product) {
  return `${product.name} - ${product.material}`;
}

function renderProducts() {
  if (!productGrid) return;
  const list = visibleProducts();

  productGrid.innerHTML = list
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${productTitle(product)}" />
          <div class="product-body">
            <div class="product-kicker">
              <span class="pill">${product.category}</span>
              <span class="pill copper">${product.material}</span>
            </div>
            <div>
              <h3>${product.name}</h3>
              <p>${product.spec}</p>
            </div>
            <div class="price-pair">
              <div class="price-box">
                <span>Giá tham khảo</span>
                <strong>${money(product.marketPrice)}</strong>
              </div>
              <div class="price-box">
                <span>Giá đặt trước ưu đãi</span>
                <strong>${money(product.preorderPrice)}</strong>
              </div>
            </div>
            <div class="product-actions">
              <button class="btn btn-primary" type="button" data-add="${product.id}">Thêm báo giá</button>
              <button class="btn btn-secondary" type="button" data-consult="${product.id}">Tư vấn</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  productGrid.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => addQuoteItem(button.dataset.add));
  });

  productGrid.querySelectorAll("[data-consult]").forEach((button) => {
    button.addEventListener("click", () => consultProduct(button.dataset.consult));
  });
}

function consultProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) {
    return;
  }

  const messageTextarea = document.querySelector('textarea[name="message"]');
  if (messageTextarea) {
    const defaultMsg = `Tôi cần tư vấn thêm về sản phẩm: ${productTitle(product)} (${product.spec}).`;
    messageTextarea.value = defaultMsg;
  }

  document.querySelector("#bao-gia").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPublicPrices() {
  publicPriceBody.innerHTML = products
    .map(
      (product) => `
        <tr>
          <td><strong>${product.name}</strong><br /><span>${product.code}</span></td>
          <td>${product.material}</td>
          <td>${product.spec}</td>
          <td class="price-cell">${money(product.marketPrice)}</td>
          <td class="price-cell">${money(product.preorderPrice)}</td>
        </tr>
      `
    )
    .join("");
}

function addQuoteItem(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  const current = quoteItems.get(productId);
  quoteItems.set(productId, {
    product,
    qty: current ? current.qty + 1 : 1,
  });

  renderQuote();
  document.querySelector("#bao-gia").scrollIntoView({ behavior: "smooth", block: "start" });
}

function removeQuoteItem(productId) {
  quoteItems.delete(productId);
  renderQuote();
}

function renderQuote() {
  if (!quoteList || !quoteTotal || !quoteOutput) return;
  const items = Array.from(quoteItems.values());

  if (items.length === 0) {
    quoteList.innerHTML = "<li>Chưa chọn sản phẩm nào.</li>";
    quoteTotal.textContent = "0đ";
    quoteOutput.value = "";
    return;
  }

  quoteList.innerHTML = items
    .map(
      ({ product, qty }) => `
        <li>
          <strong>${productTitle(product)}</strong>
          <span>${product.spec} | SL: ${qty} | ${money(product.preorderPrice)}</span>
          <button type="button" data-remove="${product.id}">Bỏ khỏi danh sách</button>
        </li>
      `
    )
    .join("");

  quoteList.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => removeQuoteItem(button.dataset.remove));
  });

  const total = items.reduce((sum, item) => sum + item.product.preorderPrice * item.qty, 0);
  quoteTotal.textContent = money(total);
}

function buildQuoteText(formData) {
  const items = Array.from(quoteItems.values());
  const productLines = items.length
    ? items.map(({ product, qty }) => `- ${productTitle(product)} | ${product.spec} | SL: ${qty}`).join("\n")
    : "- Khách chưa chọn sản phẩm từ catalog";

  return [
    "YÊU CẦU BÁO GIÁ VẬT TƯ MÁY ÉP VIÊN",
    `Khách hàng: ${formData.get("name") || "Chưa nhập"}`,
    `Số điện thoại/Zalo: ${formData.get("phone") || "Chưa nhập"}`,
    "",
    "Sản phẩm cần tư vấn:",
    productLines,
    "",
    "Ghi chú:",
    formData.get("message") || "Chưa nhập",
  ].join("\n");
}

if (filterButtons) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      renderProducts();
    });
  });
}

if (searchInput) {
  searchInput.addEventListener("input", renderProducts);
}

if (clearQuote) {
  clearQuote.addEventListener("click", () => {
    quoteItems.clear();
    renderQuote();
  });
}

if (quoteForm) {
  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = buildQuoteText(new FormData(quoteForm));
    quoteOutput.value = text;

    try {
      await navigator.clipboard.writeText(text);
      quoteOutput.dataset.copied = "true";
    } catch {
      quoteOutput.dataset.copied = "false";
    }
  });
}

function handleInternalNav() {
  const urlParams = new URLSearchParams(window.location.search);
  const noInternal = urlParams.has("no-internal") || urlParams.get("internal") === "0" || window.location.hash === "#no-internal";
  const internalLink = document.querySelector("#nav-internal");
  if (internalLink) {
    if (noInternal) {
      internalLink.style.display = "none";
    } else {
      internalLink.style.display = "";
    }
  }
}
window.addEventListener("hashchange", handleInternalNav);

function highlightActiveNav() {
  // Chuẩn hóa: bỏ phần thư mục, bỏ đuôi .html, coi "index" như trang chủ ("")
  const normalize = (p) =>
    p.replace(/^.*\//, "").replace(/\.html$/, "").replace(/^index$/, "");
  const currentPath = normalize(window.location.pathname);
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = normalize(link.getAttribute("href"));
    if (href === currentPath) {
      link.classList.add("active-nav");
    } else {
      link.classList.remove("active-nav");
    }
  });
}

renderProducts();
renderPublicPrices();
renderQuote();
handleInternalNav();
highlightActiveNav();
