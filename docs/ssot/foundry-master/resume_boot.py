#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
resume_boot.py — Outcome-Foundry session resume (FM-04)
=======================================================
Zero-dependency, READ-ONLY, Truth-Lock session resumer. Run at the start of any
session to instantly re-orient: git state, latest handoff, SSOT map, product
status (from README), and (optionally) live route HTTP status. Never modifies
the repo, never calls paid APIs, never reads secrets.

Doctrine: MASTER-ARCHITECT-PROMPT v8.0 (FM-01) · D-1 Truth-Lock · credit-aware
Owner: Reza Estes / Haidar Faras — Sovereign AI Dev (Purwokerto)
Adapted from Barberkas-foundry to the LIVE product repo Outcome-Foundry.

Usage:
    python3 docs/ssot/foundry-master/resume_boot.py            # human-readable
    python3 docs/ssot/foundry-master/resume_boot.py --json      # machine/agent inject
    python3 docs/ssot/foundry-master/resume_boot.py --check-live # + verify live route HTTP
"""
import json
import os
import re
import subprocess
import sys

# ---- locate repo root (this file lives in docs/ssot/foundry-master/) ----
THIS = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(THIS, "..", "..", ".."))
HANDOFFS_DIR = os.path.join(THIS, "handoffs")

# ---- live product facts (Truth-Lock: match CODEBASE-TRUTH-RECONCILIATION.md) ----
LIVE_BASE_URL = "https://outcome-foundry.biz.id"
LIVE_ROUTES = [
    "/", "/foundry", "/checkout", "/admin",
    "/api/health", "/api/offers", "/api/stats", "/api/sub-brands",
]

HARD_CONSTRAINTS = [
    "100% genspark.ai/ai_developer + Cloudflare Workers/Pages (zero VPS/AWS/GCP/Azure)",
    "Niche-first: UMKM Indonesia (barbershop -> retail/jasa -> Indonesia), outcome-first",
    "Horizontal-play (blueprint replicable: multi sub-brand via MoR fan-out)",
    "D-1 Truth-Lock (maksimum jujur; verifikasi sebelum klaim; KODE LIVE MENANG)",
    "MoR = Oasis BI Pro (Duitku PRODUCTION, merchant D20919)",
    "OVERRIDE-CLOSE-OUT (scope locked -> eksekusi langsung, kecuali GATE HITL)",
]

WAJIB_ORDER = [
    "TRUTH-LOCK: nyatakan yang belum diketahui; jangan mengarang status",
    "RESUME: jalankan script ini / baca handoff terakhir",
    "PLAN: tulis SPRINT-KAS (FM-03) + anggaran kredit",
    "EXECUTE: kerjakan sesuai scope (tambah, jangan hancurkan kode live)",
    "VERIFY: build/test nyata (npm run build + curl route -> bukti, bukan klaim)",
    "HANDOFF: tulis FM-02 handoff baru di akhir sesi + commit + push",
]

HITL_GATES = ["payment/Duitku/MoR", "legal/garansi", "secrets/credential",
              "custom domain/DNS", "harga publik (src/data/offers.ts)",
              "migrasi D1 destruktif"]


def _git(args):
    """Run a git command read-only; return stripped stdout or '' on failure."""
    try:
        out = subprocess.run(
            ["git", "-C", REPO_ROOT] + args,
            capture_output=True, text=True, timeout=15,
        )
        return out.stdout.strip()
    except Exception:
        return ""


def collect_git():
    branch = _git(["rev-parse", "--abbrev-ref", "HEAD"]) or "unknown"
    last = _git(["log", "-1", "--pretty=%h %s"]) or "(no commits)"
    recent = _git(["log", "-5", "--pretty=%h %s"]).splitlines()
    status = _git(["status", "--porcelain"]).splitlines()
    return {
        "branch": branch,
        "last_commit": last,
        "recent_commits": recent,
        "uncommitted_files": len([s for s in status if s.strip()]),
        "uncommitted_sample": [s.strip() for s in status[:10] if s.strip()],
    }


def latest_handoff():
    if not os.path.isdir(HANDOFFS_DIR):
        return None
    files = [f for f in os.listdir(HANDOFFS_DIR)
             if f.upper().startswith("HANDOFF-") and f.endswith(".md")]
    if not files:
        return None
    files.sort()
    latest = files[-1]
    path = os.path.join(HANDOFFS_DIR, latest)
    try:
        with open(path, "r", encoding="utf-8") as fh:
            content = fh.read()
    except Exception:
        content = ""
    # extract NEXT STEP section if present
    next_step = ""
    m = re.search(r"##\s*7\.\s*NEXT STEP.*?\n(.*?)(\n##\s|\Z)", content, re.S | re.I)
    if m:
        next_step = m.group(1).strip()
    return {"file": latest, "path": os.path.relpath(path, REPO_ROOT),
            "next_step": next_step, "chars": len(content)}


def ssot_map():
    ssot_dir = os.path.join(REPO_ROOT, "docs", "ssot")
    groups = {
        "foundry-master (FM)": [],
        "Batch 2 (operasional)": [],
        "Batch 3 (skala)": [],
        "Batch 4 (reposition)": [],
        "Batch 5 (Outcome Foundry)": [],
        "Batch 8 (ECC reference)": [],
        "Batch 10 (launch-zero)": [],
        "standards (R6)": [],
        "truth-anchor": [],
        "root/index": [],
        "lain": [],
    }
    if not os.path.isdir(ssot_dir):
        return groups
    for root, _dirs, files in os.walk(ssot_dir):
        for f in sorted(files):
            if not f.endswith(".md"):
                continue
            rel = os.path.relpath(os.path.join(root, f), REPO_ROOT)
            if f.startswith("FM-"):
                groups["foundry-master (FM)"].append(rel)
            elif f.startswith("B2-"):
                groups["Batch 2 (operasional)"].append(rel)
            elif f.startswith("B3-"):
                groups["Batch 3 (skala)"].append(rel)
            elif f.startswith("B4-"):
                groups["Batch 4 (reposition)"].append(rel)
            elif f.startswith("B5-"):
                groups["Batch 5 (Outcome Foundry)"].append(rel)
            elif f.startswith("B8-"):
                groups["Batch 8 (ECC reference)"].append(rel)
            elif f.startswith("B10-"):
                groups["Batch 10 (launch-zero)"].append(rel)
            elif f.startswith("R6-") or "SKILL-AUTHORING" in f:
                groups["standards (R6)"].append(rel)
            elif "CODEBASE-TRUTH" in f:
                groups["truth-anchor"].append(rel)
            elif f.startswith("00-") or f.startswith("01-") or "INDEX" in f.upper():
                groups["root/index"].append(rel)
            else:
                groups["lain"].append(rel)
    return groups


def product_status():
    """Read product facts ONLY from README (Truth-Lock: no guessing)."""
    readme = os.path.join(REPO_ROOT, "README.md")
    facts = {}
    if not os.path.isfile(readme):
        return {"note": "README.md not found — cek manual"}
    try:
        with open(readme, "r", encoding="utf-8") as fh:
            txt = fh.read()
    except Exception:
        return {"note": "README unreadable — cek manual"}
    for label, pat in [
        ("production_url", r"Production URL\**:?\s*\**\s*(https?://\S+)"),
        ("github", r"GitHub\**:?\s*\**\s*(https?://\S+)"),
        ("status", r"Status\**:?\s*\**\s*([^\n]+)"),
    ]:
        m = re.search(pat, txt, re.I)
        if m:
            facts[label] = m.group(1).strip().rstrip("*").strip()
    if not facts:
        facts["note"] = "tidak ada fakta produk terbaca di README — cek manual"
    return facts


def find_skill():
    skill = os.path.join(REPO_ROOT, "skills",
                         "sovereign-outcome-foundry-context-injection", "SKILL.md")
    return os.path.relpath(skill, REPO_ROOT) if os.path.isfile(skill) else None


def check_live_routes():
    """Optional: HTTP GET each public route (read-only, stdlib only, no secret)."""
    import urllib.request
    import urllib.error
    results = {}
    for route in LIVE_ROUTES:
        url = LIVE_BASE_URL + route
        try:
            req = urllib.request.Request(url, method="GET",
                                         headers={"User-Agent": "resume_boot/1.0"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                results[route] = resp.status
        except urllib.error.HTTPError as e:
            results[route] = e.code
        except Exception as e:
            results[route] = f"err: {type(e).__name__}"
    return results


def build_report(check_live=False):
    report = {
        "repo_root": REPO_ROOT,
        "git": collect_git(),
        "latest_handoff": latest_handoff(),
        "ssot_map": ssot_map(),
        "product_status": product_status(),
        "context_injection_skill": find_skill(),
        "live_base_url": LIVE_BASE_URL,
        "hard_constraints": HARD_CONSTRAINTS,
        "urutan_wajib": WAJIB_ORDER,
        "hitl_gates": HITL_GATES,
    }
    if check_live:
        report["live_routes"] = check_live_routes()
    return report


def print_human(r):
    line = "=" * 64
    print(line)
    print(" OUTCOME-FOUNDRY · RESUME-BOOT (FM-04) · D-1 Truth-Lock")
    print(line)
    g = r["git"]
    print(f"\n[REPO]   {os.path.basename(r['repo_root'])}  (branch: {g['branch']})")
    print(f"         last: {g['last_commit']}")
    print(f"         uncommitted files: {g['uncommitted_files']}")
    if g["uncommitted_sample"]:
        for s in g["uncommitted_sample"]:
            print(f"           - {s}")
    print("\n[RECENT COMMITS]")
    for c in g["recent_commits"]:
        print(f"   {c}")

    h = r["latest_handoff"]
    print("\n[HANDOFF TERAKHIR]")
    if h:
        print(f"   file: {h['path']}")
        if h["next_step"]:
            print("   NEXT STEP:")
            for ln in h["next_step"].splitlines():
                print(f"     {ln}")
    else:
        print("   (belum ada handoff — sesi pertama / mulai bersih)")

    print("\n[PETA SSOT]")
    for grp, files in r["ssot_map"].items():
        if files:
            print(f"   {grp}:")
            for f in files:
                print(f"     - {f}")

    print("\n[STATUS PRODUK] (fakta dari README)")
    for k, v in r["product_status"].items():
        print(f"   {k}: {v}")

    if "live_routes" in r:
        print(f"\n[ROUTE LIVE] ({r['live_base_url']})")
        for route, code in r["live_routes"].items():
            print(f"   {code}  {route}")

    print("\n[SKILL CONTEXT-INJECTION]")
    print(f"   {r['context_injection_skill'] or '(belum ada)'}")

    print("\n[HARD CONSTRAINTS]")
    for i, c in enumerate(r["hard_constraints"], 1):
        print(f"   {i}. {c}")

    print("\n[URUTAN WAJIB]")
    for i, c in enumerate(r["urutan_wajib"], 1):
        print(f"   {i}. {c}")

    print("\n[GATE HITL — minta izin owner sebelum]")
    print("   " + " · ".join(r["hitl_gates"]))
    print("\n" + line)
    print(" NEXT: tulis SPRINT-KAS (FM-03), eksekusi, lalu HANDOFF (FM-02) + push.")
    print(line)


def main():
    check_live = "--check-live" in sys.argv
    report = build_report(check_live=check_live)
    if "--json" in sys.argv:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print_human(report)


if __name__ == "__main__":
    main()
