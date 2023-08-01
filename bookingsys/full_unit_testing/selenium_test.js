// Require selenium webdriver
const { Builder, By, Key } = require ("selenium-webdriver");
require("chromedriver");

// Function Space
(async function trial() {
    // Build new window of chrome
    let driver =  await new Builder().forBrowser("chrome").build();
    let login_url = "/login";

    try {
        // Open the webpage
        await driver.get("http://localhost:3000");
        await driver.sleep(1000);

        // Login to the Website
        await driver.findElement(By.xpath('//a[@href="'+login_url+'"]')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[1]/input')).sendKeys('jon@gmail.com');
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[2]/input')).sendKeys('password');
        await driver.sleep(1000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[2]/form/div[3]/input')).click();
        await driver.sleep(1000);

        // Testing calendar
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[3]/span')).click();

        // Picking date
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[3]/div/div[2]/button[2]')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[3]/div/div[2]/button[2]')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[3]/div/div[3]/div/div[2]/button[6]')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[3]/div/div[3]/div/div[2]/button[8]')).click();
        await driver.sleep(1000);

        // Closing calendar
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[3]/span')).click();
        
        // Enter into searchbox the region and click search
        await driver.findElement(By.className('headerSearchInput')).sendKeys('Robertson Quay, Singapore, Singapore');
        await driver.sleep(4000);
        await driver.findElement(By.className('dropdown-row')).click();
        await driver.findElement(By.className('headerSearchItem4')).click();

        // Wait for hotels page to load (it takes quite a while to search!)
        await driver.sleep(5000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[2]/div[1]/div[2]/div[2]/button')).click();

        // Navigate Down to Hotels
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/button')).click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div/div[4]/div[1]/div[2]/div[2]/button')).click();
        await driver.sleep(2000);
           
    } finally {
        await driver.close();
    }
})();


