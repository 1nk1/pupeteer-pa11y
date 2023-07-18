import 'puppeteer';
import BaseTest from '../pages/BasePage';

class TestIOMainPage extends BaseTest {
	constructor(page) {
		super(page)
		this.page = page;
		this.yourDevice = '[class="testio-navbar"][id="top-nav-bar"] span[class="icon icon-devices mr-0"]';
	}

	async openYourDevice() {
		await this.page.waitForSelector(this.yourDevice);
		const el = await this.page.$(this.yourDevice);
		await el.click();
	}
}
export default TestIOMainPage;