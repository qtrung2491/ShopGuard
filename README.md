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

## Test

```bash
npx vitest run
```

## Current feature

- **Return Loss Calculator**:
  - Tính lợi nhuận đơn hàng thành công & % Margin
  - Tính chính xác số tiền tổn thất thực tế nếu khách trả hàng (Return Loss)
  - Xác định điểm hòa vốn: Giá bán hòa vốn, CPA Quảng cáo hòa vốn, Affiliate % tối đa
  - Tự động phát hiện rò rỉ dòng tiền (Money Leak Detector warnings)
  - Hỗ trợ Preset mẫu (case Áo 19k, Thời trang Shopee, Mỹ phẩm TikTok)
  - Chia sẻ kết quả qua URL search parameters
  - Lưu trạng thái gần nhất vào LocalStorage

## Architecture

- Client-side only.
- No backend.
- No database.
- No external APIs.
- Modular domain structure (`src/features/return-loss`).
- Independent financial calculation engine decoupled from UI components.

## Next planned experiments

- Profit calculator
- ROAS break-even
- Affiliate guard
- CSV/XLSX shop audit
