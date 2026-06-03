# Dispatch — Media & Zdjęcia obiektów partnerskich

| Pole | Wartość |
|------|---------|
| **Do** | `[SZLAK-CONTENT 01]` |
| **Od** | `[Supervisor 01]` |
| **Workspace** | `lekki-szlak` |
| **Priorytet** | 🔴 HIGH |

---

## ⚡ Krok 0 — zapoznaj się z projektem

```
view_file → .agents/agent.md
view_file → .agents/protocols/communication.md
view_file → .agents/protocols/credentials.md
```

Po przeczytaniu: zapisz heartbeat i wyślij callsign.

---

## 🎯 Deliverable

Kompletna baza mediów i obecności online dla 5 potwierdzonych obiektów partnerskich Lekkiego Szlaku.

---

## 📋 Obiekty do zbadania

| # | Obiekt | Lokalizacja | Znane źródła |
|---|--------|-------------|-------------|
| 1 | Schronisko w Łupkowie na Końcu Świata | Łupków Stary | [lupkow.pl](https://lupkow.pl), [Google Photos album](https://photos.google.com/u/0/share/AF1QipNoiclITW4nXDtHSHkHinXXiCjDgBa2VuQKcBrfjLwhk76Ab5N9rnLAF0V9ZzoaKA?hl=pl&key=WHRCbG41NU5DSUJmMHhyMzdMMlRYR2FMa0pJT2pn) |
| 2 | Szczerbanówka na Maniowie | Maniów | do znalezienia |
| 3 | K85 w Komańczy | Komańcza | do znalezienia |
| 4 | Stare Schronisko w Komańczy | Komańcza | do znalezienia |
| 5 | Cicha Dolina | Roztoki Górne | do znalezienia |

---

## 🔍 Co zbadać dla każdego obiektu

1. **Strona www** — URL, stan (aktywna/martwa/brak), jakość
2. **Facebook** — URL profilu/fanpage, followers, częstotliwość postów
3. **Instagram** — URL, followers, jakość zdjęć
4. **Google Maps** — czy ma wizytówkę, ocena, liczba opinii
5. **Booking.com / Noclegi.pl** — obecność, ceny orientacyjne
6. **Zdjęcia** — zidentyfikuj 3-5 najlepszych zdjęć na obiekt:
   - Budynek z zewnątrz (hero shot)
   - Wnętrze / pokój
   - Otoczenie / widok
   - Jedzenie / kuchnia (jeśli dostępne)
   - Szlak w okolicy

### Dla Łupkowa — album Google Photos

Album jest dostępny publicznie. Przejrzyj go i wybierz 5-8 najlepszych zdjęć. Zanotuj URL każdego wybranego zdjęcia.

---

## 📊 Format raportu

Zapisz raport w:
```
.agents/reports/YYYY-MM-DD_szlak-content-01_media-audit.md
```

Raport powinien zawierać:

### Tabelę zbiorczą

| Obiekt | WWW | Facebook | Instagram | Google Maps | Booking | Zdjęcia |
|--------|-----|----------|-----------|-------------|---------|---------|
| Łupków | lupkow.pl | [link] | [link/brak] | ⭐4.8 (120) | [link/brak] | 8 wybranych |
| ... | ... | ... | ... | ... | ... | ... |

### Kartę obiektu (per obiekt)

```markdown
## [Nazwa obiektu]
- **WWW:** [url]
- **Facebook:** [url] — [followers], [aktywność]
- **Instagram:** [url/brak]
- **Google Maps:** [ocena], [opinii]
- **Charakter:** [2-3 zdania — co wyróżnia, klimat, USP obiektu]
- **Wybrane zdjęcia:**
  1. [url/opis] — hero shot
  2. [url/opis] — wnętrze
  3. ...
```

### Rekomendacje

- Które zdjęcia najlepsze na stronę (hero, karty obiektów, galeria)
- Gdzie brakuje materiału i co z tym zrobić (sesja foto? poprosić obiekt?)
- Jakość obecności online — kto potrzebuje pomocy

---

## ✅ Definition of Done

1. [ ] Tabela zbiorcza z obecnością online 5 obiektów
2. [ ] Karta obiektu z wybranymi zdjęciami dla każdego
3. [ ] Rekomendacje do dalszych działań
4. [ ] Raport w `.agents/reports/`
5. [ ] Git commit + push

---

## 📨 Raport

```
📨 RAPORT DO [Supervisor 01]:
[SZLAK-CONTENT 01] zakończył audit mediów 5 obiektów.
Raport: .agents/reports/[plik]. Commit: [hash].
```
