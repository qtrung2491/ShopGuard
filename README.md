# ShopGuard V0

Công cụ kiểm soát tổn thất đơn hoàn và phát hiện rò rỉ lợi nhuận dành cho người bán Shopee & TikTok Shop tại Việt Nam.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Type check

```bash
npm run lint
```

## Test

```bash
npm run test
```

## Current feature

- **Return Loss Calculator**:
  - Tính lợi nhuận đơn hàng thành công & % Margin
  - Tính số tiền tổn thất nếu khách trả hàng
  - Tách gross return loss, bồi hoàn áp dụng và net return loss
  - Xác định điểm hòa vốn: Giá bán hòa vốn, CPA Quảng cáo hòa vốn, Affiliate % tối đa
  - Tự động phát hiện rò rỉ dòng tiền (Money Leak Detector warnings)
  - Hỗ trợ preset minh họa (case Áo 19k, Thời trang Shopee, Mỹ phẩm TikTok)
  - Chia sẻ kết quả qua URL search parameters
  - Lưu trạng thái gần nhất vào LocalStorage

## Fee behavior in V0

ShopGuard V0 **không tự áp biểu phí chính thức của Shopee hoặc TikTok Shop**. Người dùng tự nhập tỷ lệ phí thực tế đang áp dụng cho shop/đơn hàng. Các con số trong preset chỉ là dữ liệu minh họa và cần được chỉnh lại trước khi dùng để ra quyết định.

## Architecture

- Client-side only
- No backend
- No database
- No external APIs
- Modular domain structure (`src/features/return-loss`)
- Independent financial calculation engine decoupled from UI components

## Next planned experiments

- Profit calculator
- ROAS break-even
- Affiliate guard
- CSV/XLSX shop audit
