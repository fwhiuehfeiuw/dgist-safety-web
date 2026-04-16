from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Capture console errors
    errors = []
    page.on("console", lambda msg: errors.append(f"[{msg.type}] {msg.text}") if msg.type in ["error", "warning"] else None)
    page.on("pageerror", lambda exc: errors.append(f"[PAGE ERROR] {exc}"))

    page.goto('http://localhost:3000', timeout=30000)
    page.wait_for_timeout(5000)  # Wait for JS to execute

    page.screenshot(path='c:/Users/DGIST/Desktop/웹페이지/screenshot.png', full_page=True)

    print("=== CONSOLE ERRORS ===")
    for e in errors:
        print(e)

    if not errors:
        print("No console errors found")

    browser.close()
