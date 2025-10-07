
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
  const productName= "ZARA COAT 3";
  const emailId = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const loginBtn = page.locator('//input[@id="login"]');
  const allProducts= page.locator('.card-body');
  const cartBtn= page.locator('[routerlink="/dashboard/cart"]');
  const checkoutBtn=page.locator('//button[text()="Checkout"]');
  const crediCardTextBox=page.locator('//div[@class="field"]//input[@class="input txt text-validated"]');
  const expiryDatedropdown=page.locator('(//div[@class="row"]//div[@class="field small"]//select[@class="input ddl"])[1]');


  // Action methods

  await emailId.fill("mahesh.test@gmail.com");
  await password.fill("Test@123");
  await loginBtn.click();
  await allProducts.first().waitFor();
  const count=await allProducts.count();
  await console.log(count);

  for(let i=0; i<count;i++)
    {
      if(await allProducts.nth(i).locator("b").textContent() === productName )
      {
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
  const bool=await page.locator('h3:has-text(productName)').isVisible
  await expect(bool).toBeTruthy();


  await page.waitForTimeout(4000);

  console.log(await page.locator('.text-muted').allTextContents());
  await checkoutBtn.click();
  await crediCardTextBox.fill("4453 2551 7075 2022");
  await page.pause();
  await expiryDatedropdown.selectOption('03');
  

  // Fetch the first product on Homepage

});