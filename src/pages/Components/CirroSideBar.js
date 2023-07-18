import 'puppeteer';
import BaseTest from '../../pages/BasePage';

class CirroSideBar extends BaseTest {
	constructor(page) {
		super(page)
		this.page = page;
		this.TEST_IO = 'nav[class="sidebar sidebar-apps"] [title="test IO"]';
		this.EWORK = 'nav[class="sidebar sidebar-apps"] [title="EWORK"]';
		this.LOCALIZE = 'nav[class="sidebar sidebar-apps"] [title="Localize"]';
	}

	async openNetwork() {
		await this.page.waitForSelector(this.TEST_IO, { timeout: 6000 });
		const el = await this.page.$(this.TEST_IO);
		el.click();
	}
}
export default CirroSideBar;