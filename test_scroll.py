from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    errors = []
    page.on("pageerror", lambda exc: errors.append(str(exc)))

    page.goto('http://localhost:3000', timeout=30000)
    page.wait_for_load_state('domcontentloaded')
    page.wait_for_timeout(5000)

    # Scroll down slowly to trigger whileInView animations
    for i in range(20):
        page.mouse.wheel(0, 500)
        page.wait_for_timeout(300)

    # Scroll back to top
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)

    # Now take full page screenshot - sections should be visible
    page.screenshot(path='c:/Users/DGIST/Desktop/웹페이지/screenshot_full.png', full_page=True)

    print("=== PAGE ERRORS ===")
    for e in errors:
        print(e)
    if not errors:
        print("No page errors")

    # Check if SafetyInfoSection rendered
    info_section = page.locator('#safety-info').count()
    print(f"\n#safety-info section found: {info_section > 0}")

    # Check visible text
    body_text = page.inner_text('body')
    has_news = '안전 뉴스' in body_text or '안전정보' in body_text
    has_team = '업무 소개' in body_text
    has_contact = '연락처' in body_text
    print(f"안전정보 섹션: {has_news}")
    print(f"업무소개 섹션: {has_team}")
    print(f"연락처 섹션: {has_contact}")

    browser.close()
