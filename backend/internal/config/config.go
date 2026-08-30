package config

import (
	"os"
	"strings"
)

// Config is the backend's runtime configuration, sourced from environment
// variables. See backend/.env.example for the full list.
type Config struct {
	Port           string
	FrontendURL    string
	TrustedProxies []string
}

func Load() Config {
	return Config{
		Port:           getenv("PORT", "8080"),
		FrontendURL:    getenv("FRONTEND_URL", "http://localhost:5173"),
		TrustedProxies: splitCSV(getenv("TRUSTED_PROXIES", "127.0.0.1,::1")),
	}
}

func splitCSV(s string) []string {
	parts := strings.Split(s, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if p = strings.TrimSpace(p); p != "" {
			out = append(out, p)
		}
	}
	return out
}

func getenv(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
