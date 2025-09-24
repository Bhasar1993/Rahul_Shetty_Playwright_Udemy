const { test, expect } = require('@playwright/test');
const { log } = require('console');




// Login with valid credentials
test('Login with valid data', async ({ page }) => {


  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // const context = await browser.newContext();
  // const page = await context.newPage();
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("#signInBtn")
  const cardTitles = page.locator(".card-body .card-title")
  const blinkingElement = page.locator('//a[contains(text(),"London QA Meetup")]');



  console.log("Rahul Shetty's title: " + await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  await userName.fill("rahulshettyacademy");
  await password.fill("learning");

  await signIn.click();


  expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");
  await page.waitForTimeout(5000);
  console.log(await cardTitles.first().textContent());
  console.log("All the products name: " + await cardTitles.allTextContents());
  await expect(blinkingElement).toHaveAttribute('class', 'blinkingText');

});

// Login with invalid credentials
test('Login with invalid data', async ({ page }) => {

  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("#signInBtn")
  const cardTitles = page.locator(".card-body .card-title")
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  //    console.log("Rahul Shetty's title: "+await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  await userName.fill("rahulshetty");
  await password.fill("learning");

  await signIn.click();
  console.log(await page.locator('[style*="block"]').textContent())

  await expect(await page.locator('[style*="block"]')).toContainText("Incorrect");
  await page.waitForTimeout(4000)

});

test.only('Child Window Handle', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  const blinkingElement = page.locator('//a[contains(text(),"Free Access to InterviewQues/ResumeAssistance/Mate")]');


  const [newPage] = await Promise.all(
    [
      context.waitForEvent('page'),
      blinkingElement.click(),
    ]
  )
  const text=await newPage.locator('.red').textContent();
  console.log(text);
  await newPage.waitForTimeout(4000);



});

