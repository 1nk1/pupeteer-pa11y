import { launch } from 'puppeteer';
import { isHeadless, ignoreHTTPSErrors as _ignoreHTTPSErrors, getChromiumArgs } from "../core/config/config";
require("dotenv").config();
import { findChromiumPath } from "../utils/find-chromium-path";

class BaseTest {
	constructor() {
		this.browser = null;
		this.page = null;
		this.pages = [];
	}
	getChromePath() {
		const opsys = process.platform;
		let chromePath = null;
		if (opsys == "linux")
			return chromePath = findChromiumPath("node_modules/puppeteer", "chrome-linux") + "/chrome";
		else if (opsys == "win32" || opsys == "win64")
			return chromePath = findChromiumPath(path.normalize("node_modules/puppeteer"), "chrome-win") + "\\chrome.exe";
	}
	async setup() {
		const chromePath = this.getChromePath()
		// Launch puppeteer
		return browser = await launch({
			channel: "chrome",
			executablePath: chromePath,
			ignoreHTTPSErrors: _ignoreHTTPSErrors,
			// slowMo: 25,
			headless: isHeadless(),
			args: getChromiumArgs(),
			defaultViewport:
			{
				width: 1600,
				height: 900
			}
		})
	}
	async teardown() {
		if (this.page) await this.page.close();
		if (this.browser) await this.browser.close();
	}
	async open(url) {
		return this.page.goto(url, { waitUntil: 'domcontentloaded' })
	}
	async getTitle() {
		return this.page.title();
	}
	async waitForNavigationAndElement(selector, timeout = 17000) {
		await Promise.all([
			this.page.waitForNavigation({ timeout }),
			this.page.waitForSelector(selector, { visible: true, timeout }),
		]);
	}
	addPageUrl() {
		
	}
	async waitForPageNavigation(browser, timeout = 17000) {
		const targetPromise = new Promise(resolve => browser.once('targetcreated', resolve));
		const newTarget = await Promise.race([
			targetPromise,
			new Promise((_, reject) => setTimeout(() => reject(new Error('Page navigation timeout')), timeout))
		]);
		const newPage = await newTarget.page();

		if (!newPage) {
			throw new Error('New page is not available.');
		}

		await newPage.waitForNavigation({ waitUntil: 'load' });
		await newPage.bringToFront();

		this.pages.push(newPage);
	}
	async getCurrentPage(browser, tabIndex = null) {
		const pageList = await browser.pages();
		// console.log("NUMBER TABS:", pageList.length);
		if (tabIndex !== null) return (pageList)[tabIndex];
		else return (pageList)[0];
	}
	async switchToTab(browser, tabIndex) {
		const pages = await browser.pages();
		if (tabIndex < 0 || tabIndex >= pages.length) {
			throw new Error(`Tab with index ${tabIndex} does not exist.`);
		}
		const targetPage = pages[tabIndex];
		if (!targetPage) {
			throw new Error('Page does not exist.');
		}
		await targetPage.bringToFront();
		return this.getCurrentPage(browser, tabIndex);
	}
	async getPages() {
		return this.pages;
	}
}

export default BaseTest;
