# Dispatch — Social Media Audit + Strategia Lekki Szlak

| Pole | Wartość |
|------|---------|
| **Do** | `[SZLAK-CONTENT 02]` |
| **Od** | `[Supervisor 01]` |
| **Workspace** | `lekki-szlak` |
| **Priorytet** | 🔴 HIGH |

---

## ⚡ Krok 0 — zapoznaj się z projektem

```
view_file → .agents/agent.md
view_file → .agents/protocols/communication.md
```

Po przeczytaniu: zapisz heartbeat i wyślij callsign.

---

## 🎯 Deliverable

Dwuczęściowy raport:
1. **Audit** — diagnoza obecności social media 5 schronisk partnerskich
2. **Strategia** — plan budowy profili Lekki Szlak na social media

---

## 📋 Obiekty do zbadania

| # | Obiekt | Lokalizacja |
|---|--------|-------------|
| 1 | Schronisko w Łupkowie na Końcu Świata | Łupków Stary |
| 2 | Szczerbanówka na Maniowie | Maniów |
| 3 | K85 w Komańczy | Komańcza |
| 4 | Stare Schronisko w Komańczy | Komańcza |
| 5 | Cicha Dolina | Roztoki Górne |

---

## 🔍 Część 1 — Audit social media schronisk

Dla każdego obiektu zbadaj:

### Facebook
- URL fanpage/profilu
- Liczba fanów/followers
- Ostatni post (data, typ)
- Częstotliwość: ile postów/miesiąc
- Engagement: lajki, komentarze — czy ludzie reagują?
- Ton komunikacji: profesjonalny/osobisty/żaden

### Instagram
- URL profilu
- Followers
- Jakość zdjęć — czy warto regramować
- Hashtagi jakich używają

### Inne platformy
- TikTok, YouTube, Google Maps reviews, Tripadvisor
- Portale noclegowe (booking.com, noclegi.pl, e-turysta.pl)

### Format tabeli audytowej

| Obiekt | FB | IG | TikTok | Google Maps | Booking | Aktywność | Ocena |
|--------|----|----|--------|-------------|---------|-----------|-------|
| Łupków | [url] ~N fans | [url/brak] | brak | ⭐X.X (N) | [url/brak] | aktywne | 8/10 |

---

## 🔍 Część 2 — Strategia social media Lekki Szlak

### A. Wybór platform

Zarekomenduj na których platformach startujemy. Uzasadnij:
- Facebook (audience: 35-55, lokalni turyści)
- Instagram (audience: 25-40, zdjęcia krajobrazów = naturalny content)
- TikTok (audience: 18-30, reels z tras = viralowy potencjał)
- Inne?

### B. Naming — sprawdzenie dostępności

Sprawdź dostępność nazw na FB, IG, TikTok:
- `@lekkiszlak`
- `@lekki.szlak`
- `@lekkiszlak_pl`
- `@lekkiszlakbieszczady`
- inne warianty

Narzędzia: namecheckr.com, bezpośrednie szukanie na platformach.

### C. Content plan

Zaproponuj 3 filary treści:

| Filar | Opis | Przykład posta |
|-------|------|----------------|
| 🏔️ Krajobraz | Piękno regionu, pory roku, pogoda | „Wrześniowe mgły nad Osławą..." |
| 🏡 Obiekt | Portret schroniska, kuchnia, ludzie | „W K85 poranek zaczyna się od..." |
| 🥾 Szlak + Ludzie | Trasy, wędrowcy, zdjęcia gości | „3 dni, 45 km, 0 ciężkich plecaków" |

### D. Współpraca z obiektami

Jak wykorzystać istniejące social media schronisk:
- Cross-posting / wzajemne tagowanie
- Wspólne hashtagi — zaproponuj zestaw (#LekkiSzlak #BieszczadyNaLekko itp.)
- Stories/Reels ze schronisk na profilu Lekki Szlak
- Czy obiekty zgodzą się na współdzielenie treści? (to pytanie do CEO, ale zaproponuj model)

### E. Quick wins

Co można zrobić natychmiast, bez czekania na stronę WP:
- Założyć konta
- Pierwszy post (announcing the concept)
- Zacząć budować audience organicznie

---

## 📊 Format raportu

Zapisz raport w:
```
.agents/reports/YYYY-MM-DD_szlak-content-02_social-audit.md
```

---

## ✅ Definition of Done

1. [ ] Tabela audytowa social media 5 obiektów
2. [ ] Karta social per obiekt (FB, IG, engagement, ton)
3. [ ] Rekomendacja platform dla Lekki Szlak
4. [ ] Sprawdzone nazwy / handles na platformach
5. [ ] Content plan (3 filary + przykłady)
6. [ ] Model współpracy z obiektami
7. [ ] Quick wins — co zrobić od razu
8. [ ] Raport w `.agents/reports/`
9. [ ] Git commit + push

---

## 📨 Raport

```
📨 RAPORT DO [Supervisor 01]:
[SZLAK-CONTENT 02] zakończył audit social + strategię.
Raport: .agents/reports/[plik]. Commit: [hash].
```
