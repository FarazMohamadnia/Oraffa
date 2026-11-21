# هم‌افزا پرو (Hamafza Pro) — Pitch Deck & Roadmap

## فایل‌ها

| فایل | توضیح |
|------|--------|
| `hamafza-pro-pitch-deck.html` | Pitch Deck تعاملی RTL (۱۴ اسلاید) |
| `hamafza-pro-pitch-deck.pdf` | نسخه PDF سرمایه‌گذارپسند |
| `NARRATIVE.md` | روایت اصلاح‌شده + پاراگراف ایمیل + جزئیات Roadmap |

## مشاهده

```bash
# مرورگر
open pitch-deck/hamafza-pro-pitch-deck.html

# ناوبری: ← → یا دکمه‌های پایین صفحه
```

## چاپ PDF مجدد

```bash
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=pitch-deck/hamafza-pro-pitch-deck.pdf \
  --print-to-pdf-no-header \
  file://$(pwd)/pitch-deck/hamafza-pro-pitch-deck.html
```
