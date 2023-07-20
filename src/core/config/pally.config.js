import { getDate } from '../../core/helper/utils';

export default async function options() {
	const date = await getDate();
	return {
		runners: [
			'axe',
			'htmlcs'
		],
		standard: ['WCAG2A', 'WCAG2AA', 'WCAG2AAA'],
		timeout: 30000,
		threshold: 0,
		viewport: {
			width: 1920,
			height: 1080,
			deviceScaleFactor: 2,
			isMobile: false
		},
		includeNotices: true,
		includeWarnings: true,
		log: {
			debug: console.log,
			error: console.error,
			info: console.info
		},
		screenCapture: `../screen/${date}.png`,
		reporter: "html-plus",
		reporterOptions: {
			"outputFile": "./reports/pa11y-report.html"
		}
	};
}
