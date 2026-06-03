# Komunikacja w projekcie Lekki Szlak

Standardy komunikacji pomagają zespołowi pracować sprawnie i widzieć nawzajem postępy. Każda z poniższych praktyk ma uzasadnienie — stosuj je, bo ułatwiają życie.

---

## Callsign

Każda wiadomość zaczyna się i kończy callsignem — dzięki temu Supervisor i user od razu wiedzą kto pisze i w jakim kontekście.

**Format:**
```
[SZLAK-DEV 01 | lekki-szlak 03.06.2026 20:00] online
...treść...
[SZLAK-DEV 01 | lekki-szlak 03.06.2026 20:30] — zadanie zakończone
```

Callsign to: `[twój identyfikator | workspace data godzina]`. Naturalnie, bez militarnego tonu.

---

## Heartbeat

Heartbeat to krótki sygnał życia — dzięki niemu dashboard widzi kto pracuje, nad czym, i od kiedy. Zapisz go na starcie sesji:

```bash
echo '{"callsign":"[TWÓJ-CALLSIGN]","status":"working","current_task":"[OPIS]","timestamp":"'$(date -Iseconds)'"}' > .agents/heartbeat.json
```

Na koniec sesji zaktualizuj status na `"done"` i dodaj `report_pending`:

```bash
echo '{"callsign":"[TWÓJ-CALLSIGN]","status":"done","current_task":"[OPIS]","timestamp":"'$(date -Iseconds)'","report_pending":true,"report_file":"YYYY-MM-DD_callsign_opis.md"}' > .agents/heartbeat.json
```

---

## Raportowanie

### Raport lokalny

Po zakończeniu zadania zapisz raport w folderze projektu:

```
.agents/reports/YYYY-MM-DD_[callsign]_[temat].md
```

Format raportu:
```markdown
# Raport: [tytuł]

- **Agent:** [callsign]
- **Data:** YYYY-MM-DD
- **Workspace:** lekki-szlak
- **Status:** done / partial / blocked

## Co osiągnięto
- ...

## Deliverables
- [ścieżki do plików/artefaktów]

## Następne kroki
- ...

## Blokery (jeśli są)
- ...
```

### Raport do Supervisora

Na końcu sesji dołącz na chacie blok:
```
📨 RAPORT DO [Supervisor 01]:
[callsign] zakończył [opis zadania]. Wynik: [plik/status].
```

Supervisor czyta raporty z `sonic-void/.agents/reports/inbox/` — jeśli chcesz, aby raport dotarł szybciej, możesz umieścić go tam przez GitHub MCP.

---

## Vitals — self-monitoring

Vitals to 5 wskaźników, które pomagają ci ocenić własną kondycję w sesji. Nie są narzędziem kontroli — są sygnałem ostrzegawczym, żebyś nie tracił kontekstu.

| # | Wskaźnik | 🟢 OK | 🟡 Uwaga | 🔴 Czas się zatrzymać |
|---|----------|-------|----------|----------------------|
| V1 | Liczba kroków | 0–25 | 26–40 | 41+ |
| V2 | Strumienie pracy | 1–2 | 3–4 | 5+ |
| V3 | Dotknięte pliki | 1–5 | 6–12 | 13+ |
| V4 | Pewność kontekstu | Jasny plan | Muszę re-czytać | Nie pamiętam ustaleń |
| V5 | Koszt odtworzenia | task.md wystarczy | +1-2 pliki | handoff >100 linii |

**Kiedy reagować:**
- Gdy jakikolwiek wskaźnik jest 🟡 lub 🔴 — dołącz blok vitals do odpowiedzi
- Gdy 2+ wskaźniki 🔴 — zapisz handoff i zaproponuj nową sesję (to chroni jakość pracy)
- Co 20 kroków — checkpoint (aktualizuj task.md)

Format:
```
📊 VITALS [krok XX]: V1:🟢22 V2:🟢1str V3:🟢3pl V4:🟢stabilny V5:🟢ok
```

Pełna dokumentacja: → skill `global/vitals`

---

## Checkpoint gate — kiedy pytać, kiedy działać

Masz inicjatywę — to filar naszej pracy. Inicjatywa oznacza propozycję i konsultację, nie samodzielną implementację poza scope.

| Sytuacja | Co robisz |
|----------|-----------|
| Rutyna, kontynuacja planu | Działaj swobodnie |
| Krótka piłka (1-2 kroki, banalnie proste) | Możesz sam, jeśli nie pojawi się komplikacja |
| Krótka piłka napotyka komplikację | Zatrzymaj się → raport blokera |
| Nowe podejście, niestandardowe obejście | Napisz zamiar, poczekaj na OK |
| Zmiana architektury, usunięcie danych | Skonsultuj z Supervisorem |

**Wzorzec ogłaszania zamiaru:**
```
🚦 ZAMIAR: Planuję [działanie] ponieważ [powód].
Jeśli nie zatrzymasz mnie w ciągu [N wiadomości] — przystępuję.
```

Pełna dokumentacja: → skill `global/checkpoint-gate`

---

## Pozytywne formułowanie instrukcji — wzorce

Zamiast negatywnych zakazów, stosujemy pozytywne wskazówki z uzasadnieniem:

| ❌ Nie tak | ✅ Tak lepiej |
|-----------|--------------|
| „NIE nadpisuj pliku nginx" | „Dopisz nowy server block na końcu — istniejące serwisy pozostają nienaruszone" |
| „ZAKAZ używania X" | „Używaj Y, bo działa stabilniej w naszym środowisku" |
| „MUSI być callsign" | „Callsign na początku wiadomości pomaga Supervisorowi widzieć kto pisze" |
| „Bez wyjątków" | „To ważne, bo [konkretny powód]" |

Ton komunikacji: profesjonalny, spokojny, konkretny. Piszemy po polsku.
