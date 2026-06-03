# Credentials — dostęp do kluczy i haseł

Ekosystem ImpresjaAI zarządza credentials centralnie. Wartości nigdy nie leżą w repozytoriach — tylko metadane (co istnieje, gdzie szukać, kto używa).

---

## Architektura credentials

| Warstwa | Co zawiera | Gdzie |
|---------|-----------|-------|
| **Registry** (metadane) | Lista credentials, typy, ścieżki, kto używa | `sonic-void/.agents/credentials/registry.yaml` |
| **Secrets** (wartości) | Pliki .env, tokeny OAuth, service accounts | `~/.impresja/secrets/` |
| **SSH keys** | Klucze prywatne do serwerów | `~/.ssh/` |

### Registry — szybkie wyszukiwanie

```bash
grep -A5 "oracle-crimson" /home/tobroz/projects/sonic-void/.agents/credentials/registry.yaml
grep -A5 "OPENAI" /home/tobroz/projects/sonic-void/.agents/credentials/registry.yaml
```

Registry nie zawiera wartości — tylko metadane. Jest bezpiecznie commitowany do repo.

---

## SSH do serwerów

Projekt Lekki Szlak korzysta z Oracle VPS. SSH jest skonfigurowany przez `~/.ssh/config`:

```bash
# Oracle VPS (główny serwer) — alias:
ssh oracle-crimson "komenda"

# Pełna forma (jeśli alias nie działa):
ssh -i ~/.ssh/oracle-crimson.key ubuntu@147.224.162.100 "komenda"
```

Inne serwery w ekosystemie:

| Alias | Host | Użycie |
|-------|------|--------|
| `oracle-crimson` | 147.224.162.100 | Główny VPS — Docker, nginx, deploy |
| `vultr-llm` | 95.179.201.157 | AI Router, modele LLM |
| `cyberfolks` | 185.25.150.27:222 | Shared hosting (WordPress sites) |

---

## Pliki secrets — lokalizacja

| Typ | Ścieżka |
|-----|---------|
| SSH klucz Oracle | `~/.ssh/oracle-crimson.key` |
| SSH config (aliasy) | `~/.ssh/config` |
| API keys (OpenAI, Perplexity, GitHub PAT) | `~/.impresja/secrets/shared.env` |
| Postgres password | `~/.impresja/secrets/crimson.env` |
| SSH hasło shared hosting | `~/.impresja/secrets/shared-hosting.env` |
| Google Service Accounts | `~/.impresja/secrets/gsc/`, `gdrive/`, `youtube/` |

Aby załadować zmienne środowiskowe:
```bash
source ~/.impresja/secrets/shared.env
echo "Klucz załadowany: ${OPENAI_API_KEY:0:8}..."  # pokaż tylko prefix
```

---

## Zasady bezpieczeństwa

- **Loguj metadane, nie wartości** — w raportach pisz „użyłem klucza Oracle SSH", nie wklejaj klucza
- **Wartości pozostają w ~/.impresja/secrets/** — nie kopiuj ich do repo ani do raportów
- **Nowe credentials zgłaszaj Supervisorowi** — format:

```
📋 NOWY CREDENTIAL:
- Nazwa: [opis, np. "OAuth token dla lekki-szlak.pl"]
- Typ: ssh_key / api_key / oauth_token / password
- Plik docelowy: ~/.impresja/secrets/[plik]
- Używany przez: lekki-szlak
```

Supervisor doda wpis do registry i zabezpieczy plik.

---

## Kto zarządza credentials

**[Supervisor 01]** w workspace `sonic-void` jest custodianem credentials ekosystemu. Potrzebujesz nowego klucza, dostępu do serwera, lub masz wątpliwość — raportuj do Supervisora.
