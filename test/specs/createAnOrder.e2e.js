const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    });
    
    it('should set the phone number modal', async() => {
        await browser.url(`/`);
        const phoneNumberButton = await $(page.phoneNumberButton); 
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();

        const phoneNumberModal = await $(page.phoneNumberModal); 
        await expect(phoneNumberModal).toBeExisting();
    });

    it('should select Supportive plan', async () => {
        await browser.url(`/`);
        await planSelector.selectByVisibleText('Supportive');
        await expect(planSelector).getValue().should.equal('Supportive');
    });

    it('should save the phone number', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });

    it('should collect credit card details', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const creditCard = helper.getCreditCardNumber();
        await page.creditCard(creditCard);
        await expect(await helper.getElementByText(creditCard)).toBeExisting();
    });

    it('should write a message to the driver', async () => {
        await browser.url(`/`);
        await messageInput.setValue('Hello, please arrive ASAP!');
        await expect(messageInput).getValue().should.equal('Hello, please arrive ASAP!');
    });
    
    it('should order a Blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await blanketCheckbox.click();
        await expect(blanketCheckbox).isSelected().should.be.true; 
        await handkerchiefsCheckbox.click();
        await expect(handkerchiefsCheckbox).isSelected().should.be.true; 
        await expect(blanketState).getText().should.equal('Ordered');
    });
    
    it('should order 2 Ice creams', async () => {
        await browser.url(`/`);
        await iceCreamSelect.selectByVisibleText('2');
        await expect(iceCreamSelect).getValue().should.equal('2');
    });
    
    it('should display the car search modal', async () => {
        await browser.url(`/`);
        await expect(carSearchModal).isDisplayed().should.be.true;
      });
    
    it('should display the driver info in the modal (optional)', async () => {
        await browser.url(`/`);  
        await driverInfo.isDisplayed().should.be.true;
        await expect(driverInfo).getText().should.not.be.empty;
    });
})

