const puppeteer = require('puppeteer');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const orderRoom = async (room, hour) => {
    try {
        console.log('orderRoom function called');
        console.log('room:', room, 'hour:', hour);
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--allow-running-insecure-content',
                '--disable-web-security',
                '--allow-mixed-content'
            ]
        });
        const page = await browser.newPage();
        await page.goto('https://schedule.tau.ac.il/scilib/Web/index.php', { timeout: 30000 });
        console.log('Page loaded');
        await page.type('#email', 'yairb2');
        await page.type('#password', '246810yY12');
        await page.click('button[name="login"]');
        console.log('Login clicked');

        await page.waitForNavigation({ timeout: 30000 });
        console.log('Login navigation completed');

        //click on the next button
        await page.waitForSelector('button[title="Next 5 days"]', { visible: true });
        await page.click('button[title="Next 5 days"]');
        console.log('Next button clicked');
        try{
            await page.waitForNavigation({ timeout: 3000 });
            console.log('Next navigation completed');
        }
        catch{
            sleep(3000);
            console.log('Next navigation not completed, waiting three second and moving on');

        }
        
        // start time in Unix timestamps
        const startTime = new Date('2025-06-29T08:00:00').getTime();
        console.log('About to search for target element');

        // Select elements that have ALL the required attributes
        const tdElements = await page.$$eval('td[data-start][data-min][data-resourceid]', elements => 
            elements.slice(0, 10).map(el => ({
                dataStart: el.getAttribute('data-start'),
                dataMin: el.getAttribute('data-min'),
                dataResourceId: el.getAttribute('data-resourceid'),
                title: el.getAttribute('title'),
                text: el.textContent.trim()
            }))
        );

        console.log('Available td elements:', tdElements);
        
        // Click the first available td element
        if (tdElements.length > 0) {
            const firstElement = tdElements[0];
            const selector = `td[data-min="${firstElement.dataMin}"][data-resourceid="${firstElement.dataResourceId}"]`;
            console.log('Clicking element with selector:', selector);
            await page.click(selector, { clickCount: 2 });
            console.log('Element clicked successfully');
        } else {
            console.log('No td elements found');
        }
        
        // await browser.close();
        console.log('Function completed successfully');
    } catch (error) {
        console.log('Function failed with error:', error.message);
    }
}

// orderRoom('23', '17:00:00')

const startTime = new Date('2025-06-29T13:00:00').getTime();
console.log("start time in unix - " + startTime/1000);

module.exports = orderRoom

