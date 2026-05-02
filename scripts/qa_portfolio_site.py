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
                "AI 기능을 만들고",
                "AI Portfolio Lab",
                "ConsultFlow",
                "FairSign",
                "K-Transit",
                "작게 맡겨도 끝까지",
            ]
            for text in required_text:
                if text not in body_text:
                    failures.append(f"{label}: missing text {text}")

            if "전서기" not in title:
                failures.append(f"{label}: unexpected title {title}")

            if console_errors:
                failures.append(f"{label}: console errors: {' | '.join(console_errors[:5])}")

            print(f"{label} ok: {screenshot}")
            page.close()
        browser.close()

    if failures:
        print("\n".join(failures))
        return 1
    return 0


if __name__ == "__main__":
    target_url = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000"
    raise SystemExit(run(target_url))
