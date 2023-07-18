import { URL, LOGIN, PASS } from '../../core/config/credentials';
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';

async function login(currentPage) {
	await currentPage.goto(URL);
	const pageTitle = await currentPage.title();
	expect(pageTitle).toBe('Sign-In | Cirro');

	let loginPage = new LoginPage(currentPage);
	let homePage = new HomePage(currentPage);

	await loginPage.login(LOGIN, PASS);
	await homePage.validateLogin();
	return currentPage;
}

export default login;
