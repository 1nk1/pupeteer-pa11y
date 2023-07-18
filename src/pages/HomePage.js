import BaseTest from '../pages/BasePage';
import CirroSideBar from './Components/CirroSideBar';
import 'puppeteer';
import { expect } from 'chai';

class HomePage extends BaseTest {
	constructor(page) {
		super(page);
		this.page = page;
		this.USER_NAME = '[class="text-xs profile-name"]';
		this.cirroSideBar = new CirroSideBar(page)
	}

	async validateLogin() {
		await this.page.waitForSelector(this.USER_NAME); // Wait for the username element to be visible
		const heading = await this.page.$(this.USER_NAME);
		const headingText = await this.page.evaluate(name => name.innerText, heading);
		expect(headingText).to.equal('Andrey Peretyatko');
	}
}
export default HomePage;