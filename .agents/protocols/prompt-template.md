# Wzorzec promptu startowego — Lekki Szlak

Uniwersalny szablon promptu do dispatchu agentów w tym projekcie. Adaptuj per dispatch — zachowaj strukturę, zmień detale.

---

## Szablon

```
📋 DISPATCH — [SZLAK] [Krótki tytuł]

Przeczytaj swój task:
view_file → /home/tobroz/projects/lekki-szlak/.agents/tasks/[nazwa-pliku].md

Jesteś [CALLSIGN]. Twój deliverable: [jedno zdanie co dostarczasz].
Protokoły projektu znajdziesz w .agents/protocols/ — przeczytaj je w kroku 0 task file.
```

---

## Przykłady użycia

### Dispatch do developera
```
📋 DISPATCH — [SZLAK] Landing Page Build

Przeczytaj swój task:
view_file → /home/tobroz/projects/lekki-szlak/.agents/tasks/dispatch-szlak-dev-01-landing-build.md

Jesteś [SZLAK-DEV 01]. Twój deliverable: działający landing page na lekki-szlak.impresjapr.pl.
Protokoły projektu znajdziesz w .agents/protocols/ — przeczytaj je w kroku 0 task file.
```

### Dispatch do designera
```
📋 DISPATCH — [SZLAK] Logo & Branding

Przeczytaj swój task:
view_file → /home/tobroz/projects/lekki-szlak/.agents/tasks/dispatch-szlak-design-01-branding.md

Jesteś [SZLAK-DESIGN 01]. Twój deliverable: logo SVG + brand guidelines.
Protokoły projektu znajdziesz w .agents/protocols/ — przeczytaj je w kroku 0 task file.
```

### Dispatch do content specialisty
```
📋 DISPATCH — [SZLAK] SEO & Opisy obiektów

Przeczytaj swój task:
view_file → /home/tobroz/projects/lekki-szlak/.agents/tasks/dispatch-szlak-content-01-seo.md

Jesteś [SZLAK-CONTENT 01]. Twój deliverable: teksty dla 5 obiektów + meta tags + schema.org.
Protokoły projektu znajdziesz w .agents/protocols/ — przeczytaj je w kroku 0 task file.
```

---

## Zasady wzorca

1. **Krótki** — 4-5 linii maksymalnie. Agent czyta szczegóły z task file.
2. **Wskazuje na plik** — `view_file →` jako pierwsza instrukcja. Task file ma pełny kontekst.
3. **Jedno zdanie deliverable** — agent od razu wie co ma dostarczyć.
4. **Odwołanie do protokołów** — zamiast wklejania systemu inline, wskazujemy na `.agents/protocols/`.
5. **Pozytywny ton** — brak wielkich liter, zakazów, „MUSI/BEZ WYJĄTKÓW".

---

## Czego unikać w promptach startowych

| Nie rób | Dlaczego |
|---------|----------|
| Wklejanie pełnego bloku systemowego inline | Agent ma .agents/protocols/ — niech czyta stamtąd |
| Powtarzanie jak działa run_command | Agent to wie — środowisko WSL2 jest standardowe |
| Straszenie „PROTOKÓŁ OBOWIĄZKOWY / ZAKAZ" | Pozytywny ton + uzasadnienie daje lepsze compliance |
| Kopiowanie treści skills do promptu | Referencja (`→ skill global/vitals`) jest wystarczająca |
| Prompt dłuższy niż 10 linii | Im dłuższy prompt, tym mniej agent zapamiętuje. Lepsza krótka esencja + odwołanie do pliku. |

---

## Supervisor — kiedy i co wstrzykiwać

Supervisor przy tworzeniu dispatchu:
1. Tworzy plik task w `.agents/tasks/` z pełnym briefingiem
2. Upewnia się, że krok 0 w task file wskazuje na protokoły
3. Generuje krótki prompt startowy wg tego wzorca
4. Podaje workspace + sugerowaną nazwę konwersacji + model

```
📋 DISPATCH — [SZLAK] [Tytuł]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Workspace: lekki-szlak
🏷️ Tytuł konwersacji: [SZLAK] [Opis]
🎯 Agent: [callsign]
📌 Model: [model] — [uzasadnienie]
📄 Task file: .agents/tasks/[plik].md

📎 Prompt startowy (wklej w nowej konwersacji):

[szablon z sekcji powyżej]
```
