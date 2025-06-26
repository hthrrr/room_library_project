const puppeteer = require('puppeteer');

const orderRoom = async (room, hour) => {
    console.log('orderRoom function called');
    console.log('room:', room, 'hour:', hour);
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://schedule.tau.ac.il/scilib/Web/index.php');
    await page.type('#email', 'yairb2');
    await page.type('#password', '246810yY12');
    await page.click('button[name="login"]');

    await page.waitForNavigation();

    //click on the next button
    await page.waitForSelector('button[title="Next 5 days"]', { visible: true });
    await page.click('button[title="Next 5 days"]');
    await page.waitForNavigation();
    
    // start time in Unix timestamps
    const startTime = new Date('2023-12-20T08:00:00').getTime();

    await page.waitForSelector('td[data-start="2025-06-29 17:00:00"][data-resourceid="23"]', { visible: true });
    await page.click('td[data-start="2025-06-29 17:00:00"][data-resourceid="23"]', { clickCount: 2 });

    // page.click(`[data-min='${1751205600}']`)


}

module.exports = orderRoom

