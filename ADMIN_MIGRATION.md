# Admin Portal Migration Guide

## 📋 Tổng Quan

Dự án migration admin portal từ HTML/CSS thuần sang Next.js với Tailwind CSS.

## ✅ Đã Hoàn Thành

### 1. **Layout & Components** ✨
- ✅ Admin Layout với Sidebar responsive
- ✅ Starry Background với shooting stars animation
- ✅ Reusable Components:
  - `StatCard` - Hiển thị thống kê
  - `StatusBadge` - Badge trạng thái với nhiều màu
  - `ProgressBar` - Thanh tiến trình
  - `Tabs` - Tab navigation
  - `SearchBar` - Thanh tìm kiếm với icon
  - `ActionButton` - Nút action với nhiều variants
  - `PageTitle` - Tiêu đề trang

### 2. **Pages Đã Migrate** 🎯
- ✅ `/admin` - Dashboard (admin.html)
- ✅ `/admin/users` - User Management (adminusermanage.html)
- ✅ `/admin/distributions` - Distributions & Capital Calls (admincallsdistributions.html)
- ✅ `/admin/settings` - System Settings (adminsettings.html)

## 📁 Cấu Trúc Thư Mục

```
mogul-next/
├── src/
│   ├── app/
│   │   └── admin/
│   │       ├── layout.tsx          # Admin layout chung
│   │       ├── page.tsx             # Dashboard
│   │       ├── users/
│   │       │   └── page.tsx         # User Management
│   │       ├── distributions/
│   │       │   └── page.tsx         # Distributions & Capital Calls
│   │       └── settings/
│   │           └── page.tsx         # Settings
│   └── components/
│       └── admin/
│           ├── AdminSidebar.tsx
│           ├── StarryBackground.tsx
│           ├── StatCard.tsx
│           ├── StatusBadge.tsx
│           ├── ProgressBar.tsx
│           ├── Tabs.tsx
│           ├── SearchBar.tsx
│           ├── ActionButton.tsx
│           ├── PageTitle.tsx
│           └── index.ts
```

## 🎨 Tailwind CSS Configuration

Đã cấu hình các custom colors và animations trong `tailwind.config.js`:

```js
colors: {
  'mogul-gold': '#D4AF37',
  'mogul-dark': '#0a192f',
  'mogul-darker': '#112240',
  'mogul-blue': '#172a45',
}

animations: {
  'shooting-star': 'shooting-star linear infinite',
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
}
```

## 📝 Pages Cần Migrate Tiếp

### Ưu Tiên Cao:
- [ ] `/admin/kyc` - KYC & Accreditation (adminkycmanage.html)
- [ ] `/admin/crm` - Investor Relations / CRM (admininvestorcrm.html)
- [ ] `/admin/offerings` - Offerings & Syndications (adminofferingssyndications.html)
- [ ] `/admin/documents` - Documents & Reports (admindocumentmanager.html)

### Ưu Tiên Trung Bình:
- [ ] `/admin/notifications` - Notifications (adminnotificationsmanager.html)
- [ ] `/admin/messaging` - Secure Messaging (adminmessaging.html)
- [ ] `/admin/events` - Events & Webinars (admineventswebinars.html)
- [ ] `/admin/resources` - Resource Library (adminresourcemanager.html)
- [ ] `/admin/analytics` - Analytics & Reporting (adminreporting.html)
- [ ] `/admin/compliance` - Compliance & Moderation (adminmoderation.html)

### Các Pages Khác:
- [ ] Activity Audit (adminactivityaudit.html)
- [ ] Automations (adminautomations.html)
- [ ] Billing (adminbilling.html)
- [ ] CMS (admincms.html)
- [ ] Contact Lists (admincontactlists.html)
- [ ] Campaign SMS/Voice (admincreatecampaignsmsvoice.html)
- [ ] Document Upload (admindocupload.html)
- [ ] Fund Performance (adminfundperformance.html)
- [ ] Integration Management (adminintegrationmanagement.html)
- [ ] IR (adminir.html)
- [ ] Newsletters (adminnewsletters.html)
- [ ] Sub Wire Tracking (adminsubwiretracking.html)
- [ ] Support (adminsupport.html)
- [ ] Tax Docs K1 (admintaxdocsk1.html)
- [ ] User Roles (adminuserroles.html)
- [ ] Voice/SMS Manager (adminvoicesmsmanager.html)
- [ ] Social Media Manager (asminsocialmediamanager.html)
- [ ] Traffic Analytics (trafficanalytics.html)

## 🚀 Cách Chạy

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🎯 Pattern Migration

Khi migrate một HTML page mới:

1. **Tạo file page.tsx** trong folder tương ứng
2. **Import components** cần thiết từ `@/components/admin`
3. **Sử dụng Tailwind CSS** thay vì inline styles
4. **Responsive design** với breakpoints: `sm:`, `md:`, `lg:`, `xl:`
5. **Animations** sử dụng `animate-pulse-glow` và `transition-*`

### Example Template:

```tsx
'use client';

import { PageTitle, StatCard, SearchBar } from '@/components/admin';
import { useState } from 'react';

export default function NewPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pb-20">
      <PageTitle>Page Title</PageTitle>
      
      {/* Your content here */}
    </div>
  );
}
```

## 🎨 Design System

### Colors:
- Primary Gold: `text-mogul-gold` / `bg-mogul-gold`
- Dark Background: `bg-mogul-dark`
- Darker Cards: `bg-mogul-darker`
- Blue Accent: `bg-mogul-blue`

### Typography:
- Headings: `font-display` (Playfair Display)
- Body: `font-body` (Inter)

### Spacing:
- Cards: `p-8` (padding)
- Gaps: `gap-6`, `gap-8`
- Margins: `mb-12`, `mb-8`

### Animations:
- Glow effect: `animate-pulse-glow`
- Transitions: `transition-all duration-300`
- Hover effects: `hover:bg-*`, `hover:text-*`

## 📦 Dependencies

- Next.js 15+
- React 19+
- Tailwind CSS 3+
- react-icons
- TypeScript

## 🔗 Navigation Structure

Sidebar navigation được định nghĩa trong `AdminSidebar.tsx`:

```tsx
const navItems = [
  { href: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
  { href: '/admin/users', icon: FaUsers, label: 'User Management' },
  // ... thêm các items khác
];
```

## 💡 Tips

1. **Reuse Components**: Sử dụng lại components đã có thay vì tạo mới
2. **Consistent Styling**: Giữ consistent với design system
3. **Mobile First**: Design cho mobile trước, sau đó scale up
4. **TypeScript**: Định nghĩa interfaces cho data types
5. **State Management**: Sử dụng useState cho local state

## 📞 Support

Nếu có vấn đề gì trong quá trình migration, hãy tham khảo:
- Tailwind CSS docs: https://tailwindcss.com/docs
- Next.js docs: https://nextjs.org/docs
- React Icons: https://react-icons.github.io/react-icons/

---

**Last Updated**: 2026-01-31
**Status**: 🚧 In Progress (4/33 pages completed)
