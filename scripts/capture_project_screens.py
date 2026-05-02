from pathlib import Path

from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright


TARGETS = [
    ("ai-portfolio-lab", "https://ai-portfolio-lab.vercel.app"),
    ("consult-flow", "https://consult-flow-app.vercel.app"),
    ("fairsign", "https://fairsign-topaz.vercel.app"),
    ("k-transit", "https://k-transit.vercel.app"),
]


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    output_dir = root / "public" / "project-screens"
    output_dir.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=["--disable-blink-features=AutomationControlled"],
        )
        for name, url in TARGETS:
            context = browser.new_context(
                viewport={"width": 1366, "height": 850},
                device_scale_factor=1,
                user_agent=(
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/124.0.0.0 Safari/537.36"
                ),
            )
            page = context.new_page()
            page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
            page.goto(url, wait_until="domcontentloaded", timeout=45_000)
            try:
                page.wait_for_load_state("networkidle", timeout=10_000)
            except PlaywrightTimeoutError:
                pass
            page.wait_for_timeout(1_500)
            path = output_dir / f"{name}.png"
            page.screenshot(path=str(path), full_page=False)
            print(f"captured {name}: {path}")
            page.close()
            context.close()

        browser.close()


if __name__ == "__main__":
    main()
