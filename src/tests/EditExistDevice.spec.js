import BaseTest from '../pages/BasePage';
import login from '../core/helper/loginHelper';
import HomePage from '../pages/HomePage';
import TestIOMainPage from '../pages/TestIOMainPage';
import YourDevice from '../pages/YourDevices';
import runPa11y from '../core/pa11y-core';
import { SECOND_TAB } from '../core/helper/tabEnum';

describe('Edit exist device', () => {
	let baseTest;
	let homePage;
	let testPage;
	let yourDevice;
	let currentPage;
	let pageUrl = [];

	beforeAll(async () => {
		baseTest = new BaseTest();
		browser = await baseTest.setup();
		currentPage = await baseTest.getCurrentPage(browser);
	});

	afterAll(async () => {
		await baseTest.teardown();
		await browser.close();
	});

	it(`Should Edit exist device on -> '[Your device page]`, async () => {
		currentPage = await login(currentPage);
		homePage = new HomePage(currentPage);
		await homePage.cirroSideBar.openNetwork();
		await baseTest.waitForPageNavigation(browser);

		//Navigate to second tab in browser (for correct work...)
		let secondTab = await baseTest.switchToTab(browser, SECOND_TAB);

		testPage = new TestIOMainPage(secondTab);
		await testPage.openYourDevice();
		pageUrl.push(await secondTab.url());
		yourDevice = new YourDevice(secondTab);
		await yourDevice.EditDevice();
		pageUrl.push(await secondTab.url());
		await runPa11y(pageUrl);
	}, 60000);
});
