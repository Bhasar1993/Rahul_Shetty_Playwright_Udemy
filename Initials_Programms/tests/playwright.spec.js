const{test,expect}=require('@playwright/test');


test('Playwright first script',async({browser})=>
    {
        const context=await browser.newContext();
        const page=await context.newPage();
        await page.goto("https://www.amazon.in/");
         console.log("Amazon Title is : "+await page.title());
        //  expect(page).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");
    });
        

    test('Page laywright test',async({page})=>
        {
           await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
           console.log("Rahul Shetty's title: "+await page.title());
          await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        });