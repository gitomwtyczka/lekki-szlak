# AGENTS.md — lekki-szlak (Lekki Szlak workspace)

> Uzupełnia `RULE[user_global]`. Nie zastępuje.
> Ostatnia aktualizacja: 2026-10-15 [worker-deploy]

---

## 🧭 PROJEKT — METADANE & ARCHITEKTURA

| Parametr | Wartość |
|---|---|
| **Projekt** | Lekki Szlak — sieć schronisk slow travel w Bieszczadach i Beskidzie Niskim |
| **Workspace Windows** | `C:\Users\tomas2\.gemini\antigravity\playground\lekki-szlak` |
| **Repozytorium** | `gitomwtyczka/lekki-szlak` (publiczne) |
| **Branch główny** | `main` |
| **Materiały źródłowe** | `D:\Biblioteki\lekki szlak` (branding, `fb-assets`, zdjęcia `galeria-lupkow`, audyty) |
| **Powiązane obiekty** | `D:\Biblioteki\lupkow.pl` (obiekt sieci: Schronisko w Łupkowie) |

---

## 🌐 INFRASTRUKTURA PRODUKCYJNA (Oracle VPS)

| Komponent | Konfiguracja |
|---|---|
| **Serwer** | Oracle ARM VPS (`147.224.162.100`, OS: Ubuntu, user: `ubuntu`) |
| **Klucz SSH** | `C:\Users\tomas2\.ssh\oracle-crimson.key` |
| **Kontener www** | `lekki-szlak-web` (port hosta: `:8084` → port kontenera: `80/tcp`) |
| **Katalog na VPS** | `/home/ubuntu/lekki-szlak` (repozytorium git, docker-compose.yml) |
| **Reverse Proxy** | Kontener `crimson-nginx` (Nginx na Oracle VPS) |
| **Domeny produkcyjne** | `https://lekki-szlak.pl` oraz `https://www.lekki-szlak.pl` |
| **Domena staging / alternatywna** | `https://lekki-szlak.impresjapr.pl` |
| **SSL (lekki-szlak.pl)** | Let's Encrypt (`/etc/letsencrypt/live/lekki-szlak.pl/fullchain.pem`) |
| **DNS** | OVH (`dns109.ovh.net`): rekordy A `@` i `www` → `147.224.162.100` (brak AAAA) |

---

## 🔧 DOSTĘP DO VPS & ZASADY OPERACYJNE Z WINDOWS

### SSH i SCP z PowerShell

Dostęp do serwera produkcyjnego odbywa się wyłącznie przez SSH z użyciem dedykowanego klucza.

```powershell
# Bezpośrednie połączenie SSH:
ssh -i C:\Users\tomas2\.ssh\oracle-crimson.key -o StrictHostKeyChecking=no ubuntu@147.224.162.100 "komenda"
```

### ⚠️ ZNANE PUŁAPKI (przeczytaj ZANIM wykonasz operację)
1. **GitHub MCP:** Po edycji plików zweryfikuj spójność nowolinii (`get_file_contents`). W razie braku aktywnego tokenu PAT, do synchronizacji z `git@github.com:gitomwtyczka/lekki-szlak.git` używaj gita via SSH w WSL.
2. **SSH / PowerShell escaping:** Złożone skrypty (szczególnie zawierające `$host`, `$uri`, pętle czy zmienne shella) **ZAWSZE** przesyłaj wzorcem:
   `write_to_file` (lokalny plik tymczasowy) → `scp` → `ssh "bash /tmp/skrypt.sh"`.
   NIGDY nie buduj inline stringów z `$zmiennymi` w PowerShell.
3. **SCP na Windows:** **NIGDY** nie używaj znaku tyldy `~` w lokalnych ścieżkach Windows!
   Zawsze podawaj pełną ścieżkę do klucza: `C:\Users\tomas2\.ssh\oracle-crimson.key`.
4. **Deploy na VPS:** Po zmianach w kodzie strony na VPS:
   ```bash
   cd /home/ubuntu/lekki-szlak && git pull origin main && docker compose restart
   ```

---

## 👥 ROSTER AGENTÓW PROJEKTU

| Callsign | Rola | Zakres odpowiedzialności |
|---|---|---|
| `[SZLAK-STRATEG 01]` | Strateg projektu | Roadmapa, koordynacja z obiektami, priorytety |
| `[SZLAK-DEV 01]` | Developer | Kod HTML/CSS/JS, Leaflet mapy, Docker, Nginx, deploy |
| `[SZLAK-DESIGN 01]` | Designer | UI/UX, oprawa wizualna, branding, grafika |
| `[SZLAK-CONTENT 01/02]` | Content / Social | Treści, audyty social media, opisy schronisk i tras |

---

## 👑 TOŻSAMOŚĆ SYSTEMOWA (SUPER-ADMIN)

Wszelkie usługi, formularze kontaktowe, rejestracje certyfikatów SSL oraz konta administracyjne powiązane z projektem posługują się tożsamością:
👉 **tobroz@gmail.com** (Tomasz Brzozowski)
