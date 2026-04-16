from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # Mobile viewport (iPhone 14)
    page = browser.new_page(viewport={"width": 390, "height": 844})

    page.goto('http://localhost:3000', timeout=30000)
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # Scroll to trigger animations
    for i in range(30):
        page.mouse.wheel(0, 400)
        page.wait_for_timeout(200)

    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)

    page.screenshot(path='c:/Users/DGIST/Desktop/웹페이지/screenshot_mobile.png', full_page=True)
    print("Mobile screenshot saved")

    browser.close()
