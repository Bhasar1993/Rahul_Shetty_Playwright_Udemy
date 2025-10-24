
const { test, expect } = require('@playwright/test');

test('Rahul Shetty client dashboard SignUp', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator('.login-wrapper-footer-text').click();

  //  Locators
  const firstName = page.locator('#firstName');
  const lastName = page.locator('#lastName');
  const emailId = page.locator('//input[@type="email"]');
  const mobileNumber = page.locator('#userMobile');
  const occupationDropDown = page.locator('//select[@formcontrolname="occupation"]');
  const genderCheckbox = page.locator('//input[@value="Male"]');
  const password = page.locator('#userPassword');
  const C_password = page.locator('#confirmPassword');
  const checkBox = page.locator('//input[@type="checkbox"]');
  const signUpBtn = page.locator("#login");

  // Action methods
  await firstName.fill("Mahesh");
  await lastName.fill("Test");
  await emailId.fill("mahesh.test@gmail.com");
  await mobileNumber.fill("1234567899");
  await occupationDropDown.selectOption("Student");
  await genderCheckbox.click();
  await expect(genderCheckbox).toBeChecked();    //Assertion for the checkbox
  await password.fill("Test@123");
  await C_password.fill("Test@123");
  await checkBox.click();
  await signUpBtn.click();


  await page.waitForTimeout(4000);

});

test.only('Rahul Shetty client dashboard Login', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  // Locators
  const productName = "ZARA COAT 3";
  const emailId = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const loginBtn = page.locator('//input[@id="login"]');
  const allProducts = page.locator('.card-body');
  const cartBtn = page.locator('[routerlink="/dashboard/cart"]');
  const checkoutBtn = page.locator('//button[text()="Checkout"]');
  const crediCardTextBox = page.locator('//div[@class="field"]//input[@class="input txt text-validated"]');
  const expiryDatedropdown = page.locator('(//div[@class="row"]//div[@class="field small"]//select[@class="input ddl"])[1]');
  const expiryDatedropdown1 = page.locator('(//div[@class="row"]//div[@class="field small"]//select[@class="input ddl"])[2]');
  const cvvTextBox = page.locator('//div[@class="field small"]//input[@class="input txt"]');
  const nameOnCardTextBox = page.locator('//div[@class="field"]//input[@class="input txt"]');
  const countryTextBox = page.locator('//input[@placeholder="Select Country"]');
  const placeOrderBtn = page.locator('//a[@class="btnn action__submit ng-star-inserted"]');
  const dropDownValues = page.locator('//button[@class="ta-results list-group ng-star-inserted"]');


  //  // Action methods

  await emailId.fill("mahesh.test@gmail.com");
  await password.fill("Test@123");
  await loginBtn.click();
  await allProducts.first().waitFor();
  const count = await allProducts.count();
  await console.log(count);

  for (let i = 0; i < count; i++) {
    if (await allProducts.nth(i).locator("b").textContent() === productName) {
      //add product to tha cart
      await allProducts.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  const pageTitle = await page.title();
  console.log(pageTitle);
  await expect(page).toHaveTitle("Let's Shop")

  await cartBtn.click();
  await page.locator('div li').first().waitFor();
  const bool = await page.locator('h3:has-text(productName)').isVisible
  await expect(bool).toBeTruthy();


  await page.waitForTimeout(4000);

  console.log(await page.locator('.text-muted').allTextContents());
  await checkoutBtn.click();
  await crediCardTextBox.fill("4453 2551 7075 2022");

  await expiryDatedropdown.selectOption('03');
  await expiryDatedropdown1.selectOption('20');
  await nameOnCardTextBox.fill("Mahesh Test");
  await cvvTextBox.fill("123");

  await countryTextBox.pressSequentially("Ind", { delay: 150 });
  await page.waitForSelector('section.ta-results');
  // await dropDownValues.first().waitFor();
  const options = page.locator('section.ta-results button.ta-item span');
  const optionsCount = await options.count();

  for (let i = 0; i < optionsCount; i++) {
    const text = (await options.nth(i).textContent()).trim();
    console.log(text);
    if (text === 'India') {
      await options.nth(i).click();
      break;
    }
  }

  await placeOrderBtn.click();



  //Assertion for the order confirmation
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  //Fetch the order Id
  console.log(await page.locator("label[class='ng-star-inserted']").textContent());

  //Click on ORders button
  await page.locator('text="  ORDERS"').click();

  await page.pause();

  //take the order id value
  const orderId = await page.locator('.col-text.-main').textContent();
  //Search the order in the orders table
  const orderRows = page.locator('tbody tr');
  const orderRowsCount = await orderRows.count();
  for (let i = 0; i < orderRowsCount; i++) {
    const rowOrderId = await orderRows.nth(i).locator('th').textContent();
    if (rowOrderId.includes(orderId)) {
      await orderRows.nth(i).locator('.btn.btn-primary').first().click();
      break;
    }}
    await page.pause();
});