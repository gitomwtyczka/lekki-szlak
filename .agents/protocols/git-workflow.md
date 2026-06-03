# Git Workflow — Lekki Szlak

---

## Repozytorium

| Parametr | Wartość |
|----------|---------|
| Repo | `gitomwtyczka/lekki-szlak` |
| Branch główny | `main` (stabilny, gotowy do deploy) |
| Remote URL | `git@github.com:gitomwtyczka/lekki-szlak.git` |

---

## Branch strategy

- **`main`** — zawsze stabilny, deployowalny. Commity tu trafiają po zakończeniu zadania lub milestone.
- **Feature branches** — dla większych zmian, które wymagają kilku sesji lub review. Format: `feature/[callsign]-[opis]`, np. `feature/szlak-dev-01-leaflet-map`.
- Krótkie, jednosesyjne zadania mogą iść bezpośrednio na `main`.

---

## Commit convention

Format commit message:

```
typ: krótki opis (po polsku lub angielsku)
```

Typy:
| Typ | Kiedy |
|-----|-------|
| `feat` | Nowa funkcjonalność, sekcja strony |
| `fix` | Naprawa buga |
| `style` | Zmiany CSS, formatowanie |
| `deploy` | Konfiguracja Docker, nginx, VPS |
| `docs` | Dokumentacja, protokoły |
| `refactor` | Reorganizacja kodu bez zmiany zachowania |
| `assets` | Nowe grafiki, fonty, media |

Przykłady:
```
feat: sekcja hero z parallax background
fix: responsywność kart obiektów na mobile
deploy: docker-compose + nginx vhost config
docs: protokoły onboardingu agentów
```

---

## Kiedy pushować

- Po każdym zakończonym milestone (sekcja strony, deploy, bugfix)
- Na koniec sesji — nawet jeśli praca jest częściowa (commit z prefixem `wip:`)
- Przed przerwą — żeby następny agent lub sesja miały aktualny kod

```bash
cd /home/tobroz/projects/lekki-szlak
git add -A
git commit -m "feat: [opis]"
git push origin main
```

---

## Uwagi

- Nie commituj plików secrets (`.env`, klucze) — `.gitignore` powinien je wykluczać
- `heartbeat.json` — commituj (to metadata, nie secret)
- Raporty w `.agents/reports/` — commituj (traceability)
