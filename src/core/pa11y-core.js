import pa11y from 'pa11y';
import fs, { readFileSync, writeFileSync } from 'fs';
import { render } from 'ejs';
import hljs from 'highlight.js';
import { join } from 'path';
import moment from 'moment';
import cheerio from 'cheerio';
import { options } from './config/pally.config.js';

process.setMaxListeners(15);

export default async function runPa11y(pages) {
    const pageResults = [];
    const existsFolder = ['./reports'];

    for (const folder of existsFolder) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    }

    for (const url of pages) {
        const page = await browser.newPage();
        await page.goto(url);
        const html = await page.content();
        await page.close();

        const filename = `${url.replace(/[^a-zA-Z0-9]/g, '_')}.html`;

        try {
            const results = await pa11y(url, options);
            const pageTitle = getPageTitle(html);
            const creationDate = moment().format('DD-mm-YYYY HH:mm');
            const reportTemplate = readFileSync(
                join(__dirname, '..', 'views', 'report-template.ejs'),
                'utf8'
            );
            const renderedHtml = render(reportTemplate, {
                pageTitle,
                creationDate,
                url,
                errors: results.issues,
                hljs,
            });
            writeFileSync(`./reports/report_${filename}`, renderedHtml);

            pageResults.push({
                url: url,
                results: results,
                html: html,
            });
        } catch (error) {
            console.error('Error occurred during Pa11y test:', error);
        }
    }

    const finalHtml = await generateFinalHtml(pageResults);
    writeFileSync(`./reports/final_report.html`, finalHtml);

    return finalHtml;
}

function getPageTitle(html) {
    const $ = cheerio.load(html);
    return $('title').text();
}

function generateFinalHtml(pageResults) {
    const renderedResults = pageResults.map((pageResult) => {
        const { url, results } = pageResult;
        if (results && results.issues) {
            const errors = results.issues.filter((issue) => issue.type === 'error');
            const warnings = results.issues.filter((issue) => issue.type === 'warning');
            const notices = results.issues.filter((issue) => issue.type === 'notice');

            const documentTitle = results.documentTitle || '';
            const pageTitle = documentTitle.split(' | ')[0];

            const templatePath = join(__dirname, '..', 'views', 'template.ejs');
            const template = readFileSync(templatePath, 'utf8');
            const creationDate = moment().format('DD-mm-YYYY HH:mm');
            const renderedHtml = render(template, {
                pageTitle,
                creationDate,
                url,
                errors,
                warnings,
                notices,
                hljs,
                pages: pageResults,
            });
            return renderedHtml;
        } else {
            return `<h2>${url}</h2><p>No accessibility issues found.</p>`;
        }
    });
    const finalHtml = renderedResults.join('\n');

    return finalHtml;
}
