# services

systemd units + watchdog config for the exo server (headless Debian 12, x86-64
AMD Phenom II X4). These are deployment **templates** — adjust paths, the service
`User`, and `After=` (especially if Postgres runs in a container) for your box.

## Units

- `exo-backend.service` — runs the Go backend binary; `Restart=on-failure`,
  starts on boot (`WantedBy=multi-user.target`).
- `exo-reboot.timer` + `exo-reboot.service` — full-system `systemctl reboot`
  daily at **03:00**. `Persistent=false` so a missed window (box was off) does
  **not** fire a catch-up reboot on the next boot.

## Watchdog (`watchdog/`)

Hardware watchdog so the box self-recovers from a true hang — the smarter
complement to the blind nightly reboot.

- `watchdog/sp5100_tco.conf` → `/etc/modules-load.d/` — loads the AMD SB7x0/8x0
  TCO watchdog driver (`sp5100_tco`) at boot.
- `watchdog/watchdog.conf` → `/etc/systemd/system.conf.d/` — has systemd feed the
  watchdog (`RuntimeWatchdogSec=20s`) and guard a stalled reboot
  (`RebootWatchdogSec=2min`).

## Install

```bash
sudo cp exo-backend.service exo-reboot.service exo-reboot.timer /etc/systemd/system/
sudo cp watchdog/sp5100_tco.conf  /etc/modules-load.d/
sudo cp watchdog/watchdog.conf    /etc/systemd/system.conf.d/
sudo systemctl daemon-reload
sudo systemctl enable --now exo-backend.service
sudo systemctl enable --now exo-reboot.timer
sudo modprobe sp5100_tco          # or reboot to apply the watchdog settings
```

## Verify (do this before trusting the 3am reboot)

- `systemctl status exo-backend` — running.
- `systemctl list-timers exo-reboot.timer` — next run shows 03:00.
- `wdctl` / `dmesg | grep -i sp5100` — watchdog present and fed by systemd.
- **Cold-boot test:** actually reboot and confirm the backend, Postgres, nginx,
  cloudflared, and Tailscale all come back and the dashboard + tunnel are
  reachable. The nightly reboot is only safe if a cold boot is clean.

> If `/dev/watchdog` never appears or `sp5100_tco` errors out, your BIOS may not
> expose the TCO watchdog — fall back to the software watchdog (`softdog`), which
> still recovers from most hangs (just not a fully wedged kernel).
