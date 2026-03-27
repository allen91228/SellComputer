# NextPick Select

這是一個純 `HTML + CSS + JavaScript` 的單頁官網示意版，主題是販售：

- iPhone
- MacBook
- Nintendo Switch

## 使用方式

直接用瀏覽器打開 `index.html` 即可預覽。

## Vercel 一鍵部署

這個專案已經加上 `vercel.json`，可直接作為靜態網站部署到 Vercel。

### 方式 1：GitHub 匯入後一鍵部署

1. 把這個資料夾推到 GitHub
2. 到 Vercel 選擇 `Add New Project`
3. 匯入你的 GitHub repo
4. 直接按 `Deploy`

這個專案不需要額外 build 指令，也不需要另外設定 output directory。

### 方式 2：Vercel CLI

在專案根目錄執行：

```powershell
vercel --prod
```

### Deploy Button 範本

把專案推到 GitHub 後，把下面的 `YOUR_GITHUB_REPO_URL` 換成你的 repo 網址：

```md
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_REPO_URL)
```

例如：

```md
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-name/nextpick-select)
```

## 檔案說明

- `index.html`: 首頁結構與內容
- `iphone-details.html`: iPhone 16~17 規格與價格詳細頁
- `macbook-air-details.html`: MacBook Air 規格與價格詳細頁
- `direct-purchase.html`: 直接購買中轉頁（付款串接中）
- `styles.css`: 視覺設計、排版、動畫與響應式樣式
- `script.js`: 商品篩選、詢價清單計數與互動摘要卡
- `iphone-details.js`: 詳細頁的規格資料、價格資料與表格渲染
- `macbook-air-details.js`: MacBook Air 詳細頁資料與表格渲染
- `cart-system.js`: 共用購物車系統（加入購物車、數量調整、刪除、localStorage）
- `direct-purchase.js`: 直接購買頁互動腳本
- `vercel.json`: Vercel 靜態部署設定

## GitHub 參考方向

以下 repo 是我在 2026-03-27 搜尋 GitHub 時挑出的相近參考，主要用來抓風格方向與區塊安排，沒有直接複製內容：

- `sanidhyy/apple-clone`
  - <https://github.com/sanidhyy/apple-clone>
  - Apple 風格產品展示頁，偏重 GSAP 與視覺呈現。

- `Aclaputra/company-profile`
  - <https://github.com/Aclaputra/company-profile>
  - 純 HTML/CSS 的 Apple 風格網站，適合當簡單首頁參考。

- `picoders1/E-commerce-Website-Clone`
  - <https://github.com/picoders1/E-commerce-Website-Clone>
  - 一般電商 landing page 結構參考，包含商品展示與 CTA 排列。

- `Bridgetamana/Nintendo-clone`
  - <https://github.com/Bridgetamana/Nintendo-clone>
  - Switch 商店頁風格參考，用來抓遊戲主機區塊的色彩語言。

## 後續可擴充

- 商品詳細頁
- 後台訂單管理
- 後台管理商品資料
- 串接表單、LINE 或金流
