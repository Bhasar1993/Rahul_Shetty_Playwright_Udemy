
const{test,expect}=require('@playwright/test');

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
  const emailId = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const loginBtn = page.locator('//input[@id="login"]');
  // Action methods

  await emailId.fill("mahesh.test@gmail.com");
  await password.fill("Test@123");
  await loginBtn.click();

  const pageTitle = await page.title();
  console.log(pageTitle);
  await expect(page).toHaveTitle("Let's Shop")

  await page.waitForTimeout(4000);

  console.log(await page.locator('.text-muted').allTextContents());

  // Fetch the first product on Homepage

});