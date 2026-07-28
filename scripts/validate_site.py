#!/usr/bin/env python3
"""Validate the KylianSu personal site without requiring Node dependencies.

Data source:
  - app/page.jsx, app/layout.jsx, and app/guestbook.jsx
  - files under public/
Output:
  - concise pass/fail report on stdout
Concurrency:
  - single process
Resume strategy:
  - not applicable; this is a fast deterministic validation
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "app" / "page.jsx"
LAYOUT = ROOT / "app" / "layout.jsx"
GUESTBOOK = ROOT / "app" / "guestbook.jsx"

REQUIRED_FILES = [
    ROOT / "package.json",
    ROOT / "next.config.mjs",
    PAGE,
    LAYOUT,
    GUESTBOOK,
    ROOT / "app" / "globals.css",
    ROOT / "public" / "assets" / "profile" / "github-avatar.jpg",
    ROOT / "public" / "assets" / "papers" / "btecf-main.png",
    ROOT / "public" / "assets" / "papers" / "rcar-main.png",
    ROOT / "public" / "assets" / "institutions" / "hsfz.jpg",
    ROOT / "public" / "assets" / "football" / "zhicheng.jpg",
    ROOT / "public" / "assets" / "contact" / "wechat.jpg",
]

FORBIDDEN_PUBLIC_PATTERNS = {
    "GPA": re.compile(r"\bGPA\b", re.IGNORECASE),
    "rank": re.compile(r"\brank(?:ed|ing)?\b", re.IGNORECASE),
    "phone number": re.compile(r"135[\s-]?7016[\s-]?3396"),
    "plain email": re.compile(r"12311316\s*@\s*mail\.sustech\.edu\.cn", re.IGNORECASE),
}


def main() -> int:
    errors: list[str] = []
    for path in REQUIRED_FILES:
        if not path.is_file() or path.stat().st_size == 0:
            errors.append(f"missing or empty: {path.relative_to(ROOT)}")

    source = ""
    for path in (PAGE, LAYOUT, GUESTBOOK):
        if path.is_file():
            source += path.read_text(encoding="utf-8") + "\n"

    for label, pattern in FORBIDDEN_PUBLIC_PATTERNS.items():
        if pattern.search(source):
            errors.append(f"privacy check failed ({label})")

    css_path = ROOT / "app" / "globals.css"
    if css_path.is_file():
        css = css_path.read_text(encoding="utf-8")
        hidden_reveal = re.search(
            r"\[data-reveal\]\s*\{[^}]*opacity\s*:\s*0\s*;",
            css,
            re.DOTALL,
        )
        if hidden_reveal:
            errors.append("progressive enhancement failed: reveal content hidden by default")
        if ".modal-backdrop:target" not in css:
            errors.append("contact fallback failed: CSS target modal is missing")
        if "@keyframes guestbook-scroll" not in css:
            errors.append("guestbook failed: continuous-scroll animation is missing")
        if ".team-identity" not in css or "align-self: center" not in css:
            errors.append("football layout failed: team identity is not vertically centered")

    if 'href="#contact"' not in source or 'id="contact"' not in source:
        errors.append("contact fallback failed: contact anchor or target is missing")
    if "contactOpen" in source:
        errors.append("contact fallback failed: modal still depends on React state")

    required_sections = {
        "publications",
        "education",
        "research",
        "football",
        "awards",
        "guestbook",
    }
    ids = set(re.findall(r'id="([^"]+)"', source))
    missing_sections = sorted(required_sections - ids)
    if missing_sections:
        errors.append("missing sections: " + ", ".join(missing_sections))

    if GUESTBOOK.is_file():
        guestbook_source = GUESTBOOK.read_text(encoding="utf-8")
        if "KylianSu/guestbook/issues/1" not in guestbook_source:
            errors.append("guestbook failed: posting issue URL is missing")
        if "repos/KylianSu/guestbook/issues/1/comments" not in guestbook_source:
            errors.append("guestbook failed: comments API endpoint is missing")
        if "dangerouslySetInnerHTML" in guestbook_source:
            errors.append("guestbook safety failed: message HTML injection is enabled")

    internal_assets = set(re.findall(r'["\'](/assets/[^"\']+)["\']', source))
    for asset in sorted(internal_assets):
        path = ROOT / "public" / asset.lstrip("/")
        if not path.is_file():
            errors.append(f"broken local asset: {asset}")

    if errors:
        print("SITE VALIDATION: FAILED")
        for error in errors:
            print(f"- {error}")
        return 1

    print("SITE VALIDATION: PASSED")
    print(f"- required files: {len(REQUIRED_FILES)}")
    print(f"- local assets referenced: {len(internal_assets)}")
    print("- privacy: no GPA, rank, phone number, or plain-text email in public source")
    print("- progressive enhancement: reveal content is visible without client JavaScript")
    print("- contact: Email / WeChat panel opens through a CSS target fallback")
    print("- guestbook: GitHub issue source, plain-text messages, and scrolling UI")
    print("- sections: publications, education, research, football, awards, guestbook")
    return 0


if __name__ == "__main__":
    sys.exit(main())
