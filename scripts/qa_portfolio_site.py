import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright


def run(url: str) -> int:
    root = Path(__file__).resolve().parents[1]
    qa_dir = root / "qa"
    qa_dir.mkdir(parents=True, exist_ok=True)

    failures: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for label, viewport in {
            "desktop": {"width": 1366, "height": 850},
            "mobile": {"width": 390, "height": 844},
        }.items():
            page = browser.new_page(viewport=viewport)
            console_errors: list[str] = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            page.on("pageerror", lambda exc: console_errors.append(str(exc)))

            page.goto(url, wait_until="networkidle", timeout=45_000)
            title = page.title()
            body_text = page.locator("body").inner_text(timeout=10_000)
            screenshot = qa_dir / f"{label}.png"
            page.screenshot(path=str(screenshot), full_page=True)

            required_text = [
                "AI 기능을 실제 사용자 흐름에서 검증 가능한 앱과 서비스로 만듭니다.",
                "LensOverlay Translate",
                "검증 범위 포함 case study",
                "대기업 면접에서 먼저 물어볼 질문",
                "AI Portfolio Lab",
                "ConsultFlow",
                "FairSign",
                "K-Transit",
            ]
            for text in required_text:
                if text not in body_text:
                    failures.append(f"{label}: missing text {text}")

            if "전서기" not in title or "Android AI" not in title:
                failures.append(f"{label}: unexpected title {title}")

            nav_box = page.locator(".top-nav").bounding_box()
            nav_links_box = page.locator(".nav-links").bounding_box()
            if nav_box and nav_links_box and nav_links_box["x"] + nav_links_box["width"] > nav_box["x"] + nav_box["width"] + 1:
                failures.append(f"{label}: nav links overflow top nav")

            scroll_width = page.evaluate("document.documentElement.scrollWidth")
            viewport_width = page.evaluate("window.innerWidth")
            if scroll_width > viewport_width + 1:
                failures.append(f"{label}: horizontal overflow {scroll_width}>{viewport_width}")

            visual_links = page.locator(".project-visual-link").evaluate_all("(els) => els.filter((el) => el.tagName === 'A').length")
            if visual_links:
                failures.append(f"{label}: project visual should not be a giant accessibility link")

            unnamed_controls = page.locator("a,button").evaluate_all(
                """(els) => els
                    .filter((el) => !((el.getAttribute('aria-label') || el.textContent || '').trim()))
                    .map((el) => el.tagName)
                """
            )
            if unnamed_controls:
                failures.append(f"{label}: unnamed interactive controls: {unnamed_controls}")

            if console_errors:
                failures.append(f"{label}: console errors: {' | '.join(console_errors[:5])}")

            print(f"{label} ok: {screenshot}")
            page.close()

        cache_expectations = {
            "/downloads/lens-overlay-case-study.pdf": "max-age=3600",
            "/downloads/lens-overlay-portfolio-docs-20260523.zip": "max-age=3600",
            "/project-screens/lens-overlay-home.webp": "max-age=31536000",
        }
        request_context = p.request.new_context(base_url=url)
        for path, expected_cache in cache_expectations.items():
            response = request_context.head(path)
            if not response.ok:
                failures.append(f"HEAD {path}: {response.status}")
                continue
            cache_control = response.headers.get("cache-control", "")
            if expected_cache not in cache_control:
                failures.append(f"HEAD {path}: unexpected cache-control {cache_control}")
        request_context.dispose()
        browser.close()

    if failures:
        print("\n".join(failures))
        return 1
    return 0


if __name__ == "__main__":
    target_url = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("QA_URL", "http://localhost:4321")
    raise SystemExit(run(target_url))
