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
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/span')).click();

        // Picking date
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div/div[2]/button[2]')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div/div[2]/button[2]')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div/div[3]/div/div[2]/button[6]')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/div/div[3]/div/div[2]/button[8]')).click();
        await driver.sleep(1000);

        // Closing calendar
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[2]/span')).click();
        
        // Enter into searchbox the region and click search
        await driver.findElement(By.className('headerSearchInput')).sendKeys('Robertson Quay, Singapore, Singapore');
        await driver.sleep(4000);
        await driver.findElement(By.className('dropdown-row')).click();
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div/div[4]/button')).click();

        // Wait for hotels page to load (it takes quite a while to search!)
        await driver.sleep(5000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[2]/div/div/div[1]/div[2]/div[2]/button')).click();

        // Navigate Down to Hotels
        await driver.sleep(5000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/button')).click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div/div[4]/div[1]/div[2]/div[2]/button')).click();
        await driver.sleep(5000);

        // Testing Payment, should return invalid test card (despite it being a Paypal Test Card)
        // Test card details generated at https://developer.paypal.com/api/rest/sandbox/card-testing/
        // Selenium hates stripe so this results in errors
        // await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div[2]/div/div/div[2]/div/div/form/div/div[1]/div[1]/div/div/div/div[1]/input')).sendKeys('4096366069619049');
        // await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div[2]/div/div/div[2]/div/div/form/div/div[1]/div[2]/div/div/div/input')).sendKeys('0126');
        // await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/div[2]/div/div/div[2]/div/div/form/div/div[1]/div[3]/div/div/div/div[1]/input')).sendKeys('132');//*[@id="button-text"]
        // await driver.findElement(By.xpath('/html/body/div[1]/div/div[3]/form/button/span')).click();
        // await driver.sleep(5000);

        // Guest Ingfo
        await driver.findElement(By.xpath('//*[@id="firstName"]')).sendKeys('John the Shjon');
        await driver.findElement(By.xpath('//*[@id="secondName"]')).sendKeys('Tan Tan Tan');
        await driver.findElement(By.xpath('//*[@id="email"]')).sendKeys('jon@gmail.com');
        await driver.findElement(By.xpath('//*[@id="phone"]')).sendKeys('69420694');
        await driver.findElement(By.xpath('//*[@id="billingAddress"]')).sendKeys('69 seggs brutal 123456');
        await driver.findElement(By.xpath('//*[@id="specialRequest"]')).sendKeys('I want to eat some pie thank you');
        await driver.sleep(1000);

        await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[1]/div[6]/button')).click();
        await driver.sleep(1000);
        await driver.switchTo().alert().accept();

        let profile_button = driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div/div/li[5]/a'));
        await driver.executeScript("arguments[0].scrollIntoView(true);", profile_button);
        await driver.sleep(1000);
        
        // Check Bookings then delete then Logout
        await profile_button.click();
        await driver.findElement(By.xpath('//*[@id="fill-tab-example-tab-bookings"]')).click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//*[@id="fill-tab-example-tabpane-bookings"]/div/div/div/div/div/button[2]')).click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//*[@id="fill-tab-example-tab-bookings"]')).click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('//*[@id="fill-tab-example-tab-profile"]')).click()

        // Log Out
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/div/div/button/a')).click();
        await driver.sleep(5000);
           
    } finally {
        await driver.close();
    }
})();


