import { URL, LOGIN, PASS } from '../core/config/credentials';
import BaseTest from '../pages/BasePage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import runPa11y from '../core/pa11y-core';

describe('Login', () => {
	let baseTest;
	let loginPage;
	let homePage;
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

	it('Should SignIn on the -> [Login page]', async () => {
		await currentPage.goto(URL);
		pageUrl.push(await currentPage.url())
		const pageTitle = await currentPage.title();
		expect(pageTitle).toBe('Sign-In | Cirro');

		loginPage = new LoginPage(currentPage);
		homePage = new HomePage(currentPage);

		await loginPage.login(LOGIN, PASS);
		await homePage.validateLogin();
		await runPa11y(pageUrl)
	}, 30000);
});