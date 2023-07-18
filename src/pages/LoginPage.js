import 'puppeteer';
import BaseTest from "../pages/BasePage.js";

class LoginPage extends BaseTest {
	constructor(page) {
		super(page);
		this.page = page;
		this.LOGIN_INPUT = 'form[class="form-grid-single"] input[type="email"]'
		this.PASSWORD_INPUT = 'form[class="form-grid-single"] input[type="password"]'
		this.SUBMIT_BUTTON = 'form[class="form-grid-single"] input[type="submit"]'
	}

	async login(login, password) {
		await this.page.waitForSelector(this.LOGIN_INPUT, { timeout: 5000 })
		let loginInput = await this.page.$(this.LOGIN_INPUT);
		let passwordInput = await this.page.$(this.PASSWORD_INPUT)
		let submitButton = await this.page.$(this.SUBMIT_BUTTON)
		await loginInput.type(login)
		await passwordInput.type(password)
		await submitButton.click()
	}
}
export default LoginPage;
