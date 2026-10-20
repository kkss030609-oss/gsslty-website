from playwright.sync_api import sync_playwright
import os

html_path = os.path.expanduser("~/gsslty-website/report_rectification.html")
out_path = os.path.expanduser("~/Desktop/官网整改汇报方案.pdf")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("file://" + html_path)
    page.wait_for_load_state("networkidle")
    page.pdf(
        path=out_path,
        format="A4",
        print_background=True,
        margin={"top": "0", "bottom": "0", "left": "0", "right": "0"},
        prefer_css_page_size=True,
    )
    browser.close()

print("written", out_path, os.path.getsize(out_path), "bytes")
