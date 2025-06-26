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
}

module.exports = orderRoom

