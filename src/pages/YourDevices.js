import 'puppeteer';
import BaseTest from '../pages/BasePage';

class YourDevice extends BaseTest {
	constructor(page) {
		super(page);
		this.page = page;
		this.edit = '[class="list-inline list-flex device_list"] [data-toggle="tooltip"] [class="icon-pencil"]';
		this.add = 'div [class="content-actionbar"] ul li';

		this.listDevicesContainer = '[class="modal-body"]'
		this.devices = this.listDevicesContainer.concat('[class="list-inline"] li');
		this.labelSearch = this.listDevicesContainer.concat('label[for="device_search"]');
		this.inputModal = this.listDevicesContainer.concat('input[autocomplete="off"]');

	}

	async EditDevice() {
		await this.page.waitForSelector(this.edit);
		const el = await this.page.$(this.edit);
		await el.hover();
		await this.page.waitForTimeout(800)
		await el.click();
	}
	async AddNewDevice() {
		await this.page.waitForSelector(this.add);
		const el = await this.page.$(this.add);
		await el.hover();
		await this.page.waitForTimeout(800);
		await el.click();
	}
} 
export default YourDevice;