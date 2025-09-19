const{test,expect}=require('@playwright/test');
const { log } = require('console');


test('Playwright first script',async({browser})=>
    {
        const context=await browser.newContext();
        const page=await context.newPage();
        await page.goto("https://www.amazon.in/");
         console.log("Amazon Title is : "+await page.title());
        //  expect(page).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");
    });
        
// Login with valid credentials
    test.only('Login with valid data',async({page})=>
        {
           await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
           console.log("Rahul Shetty's title: "+await page.title());
          await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

          await page.locator("#username").fill("rahulshettyacademy");
          await page.locator("#password").fill("learning");

          await page.locator("#signInBtn").click();
          expect (page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");
          await page.waitForTimeout(5000);

        });

        // Login with invalid credentials
        test('Login with invalid data',async({page})=>
        {
           await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
        //    console.log("Rahul Shetty's title: "+await page.title());
          await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

          await page.locator("#username").fill("rahulshetty");
          await page.locator("#password").fill("learning");

          await page.locator("#signInBtn").click();
         console.log( await page.locator('[style*="block"]').textContent())

        await expect(await page.locator('[style*="block"]')).toContainText("Incorrect");
          await page.waitForTimeout(4000)

        });