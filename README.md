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

## Current features

- **Return Loss Calculator**:
  - Tính lợi nhuận đơn hàng thành công & % Margin
  - Tính số tiền tổn thất nếu khách trả hàng
  - Tách gross return loss, bồi hoàn áp dụng và net return loss
  - Xác định điểm hòa vốn: Giá bán hòa vốn, CPA Quảng cáo hòa vốn, Affiliate % tối đa
  - Tự động phát hiện rò rỉ dòng tiền (Money Leak Detector warnings)
  - Hỗ trợ preset minh họa
  - Chia sẻ kết quả qua URL search parameters
  - Lưu trạng thái gần nhất vào LocalStorage

- **Fee Engine V1**:
  - Chọn Shopee hoặc TikTok Shop
  - Chọn Shop thường / Mall
  - Chọn ngành hàng có trong snapshot
  - Tự áp hoa hồng ngành hàng + phí giao dịch + phí cố định theo đơn
  - Có nguồn và ngày hiệu lực trên giao diện
  - Có chế độ nhập phí thủ công khi shop có ưu đãi/chương trình riêng

## Fee data policy

Fee Engine V1 chỉ tự áp các ngành hàng mà project đang có một mức phí cụ thể được đối chiếu. TikTok Shop dùng các dòng Level-3 được lấy từ bảng commission chính thức đang lưu trong snapshot. Shopee V1 hiện mới có một nhóm ngành đã đối chiếu; các ngành chưa có phải dùng chế độ thủ công.

Fee Engine **không tự áp** các khoản tùy chọn hoặc phụ thuộc shop như Affiliate, Voucher Xtra, PiShip, mission/ưu đãi seller mới, quảng cáo hoặc các chương trình riêng. Khi chính sách thực tế trên Seller Center khác snapshot, dữ liệu Seller Center phải được ưu tiên.

## Architecture

- Client-side only
- No backend
- No database
- No runtime external APIs
- Modular domain structure (`src/features/return-loss`, `src/features/fee-engine`)
- Independent financial calculation engine decoupled from UI components
- Fee rules are versionable data, not hard-coded inside React components

## Next planned experiments

- Expand full Level-3 category coverage
- Profit calculator
- ROAS break-even
- Affiliate guard
- CSV/XLSX shop audit
