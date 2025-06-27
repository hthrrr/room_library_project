const puppeteer = require('puppeteer');


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const orderRoom = async (roomId, unixDate) => {
    console.log('ordering room number - ' + roomId + "at unix time - " + unixDate)
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--allow-running-insecure-content',
                '--disable-web-security',
                '--allow-mixed-content'
            ]
        });

        //going to login page
        const page = await browser.newPage();
        await page.goto('https://schedule.tau.ac.il/scilib/Web/index.php', { timeout: 30000 });
        console.log('Page loaded');

        //login
        await page.type('#email', 'yairb2');
        await page.type('#password', '246810yY12');
        await page.click('button[name="login"]');
        console.log('Login clicked');

        await page.waitForNavigation({ timeout: 30000 });
        
        //click on the next 5 days button
        try{
            await page.waitForSelector('button[title="Next 5 days"]', { visible: true, timeout: 3000 });
        }
        catch{
            console.log('still waiting for the next 5 days button, waiting three second and moving on');
            await sleep(3000);
        }
        await page.click('button[title="Next 5 days"]');
        console.log('Next button clicked');
        
        
        try{
            await page.waitForNavigation({ timeout: 3000 });
            console.log('Next navigation completed');
        }
        catch{
            await sleep(1000);
            console.log('Next navigation not completed, waiting three second and moving on');

        }
        
        // // Select elements that have ALL the required attributes
        // const tdElements = await page.$$eval(`td[data-start="${unixDate}"][data-min][data-resourceid]`, elements => 
        //     elements.slice(0, 10).map(el => ({
        //         dataStart: el.getAttribute('data-start'),
        //         dataMin: el.getAttribute('data-min'),
        //         dataResourceId: el.getAttribute('data-resourceid'),
        //         title: el.getAttribute('title'),
        //         text: el.textContent.trim()
        //     }))
        // );
        // console.log('Available td elements:', tdElements);
        
        // Try to find the specific element with matching unix time and room ID
        const specificElements = await page.$$eval(`td[data-min="${unixDate}"][data-resourceid="${roomId}"]`, elements => 
            elements.map(el => ({
                dataStart: el.getAttribute('data-start'),
                dataMin: el.getAttribute('data-min'),
                dataResourceId: el.getAttribute('data-resourceid'),
                title: el.getAttribute('title'),
                text: el.textContent.trim()
            }))
        );
        console.log('Specific matching elements:', specificElements);
        
        // Click the specific element if found
        if (specificElements.length > 0) {
            const selector = `td[data-min="${unixDate}"][data-resourceid="${roomId}"]`;
            await page.click(selector, { clickCount: 2 });
            console.log('room clicked successfully');
        } else {
            console.log('No matching room found for the specified time and room-id');
        }

        try{
        await page.waitForNavigation({ timeout: 30000 });
        }
        catch{
            await sleep(3000);
            console.log('Next navigation not completed, waiting three second and moving on');
        }
        await page.click('button[class="btn btn-primary"]');

        
        await browser.close();
        console.log('Function completed successfully');
    } catch (error) {
        console.log('Function failed with error:', error.message);
    }
}


const startTime = new Date('2025-06-29T13:00:00').getTime();
console.log("start time in unix - " + startTime/1000);

module.exports = orderRoom

