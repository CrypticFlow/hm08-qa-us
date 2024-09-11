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
        const phoneNumberButton = await $(page.phoneNumberButton); 
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();

        const phoneNumberModal = await $(page.phoneNumberModal); 
        await expect(phoneNumberModal).toBeExisting();
    });

    it('should select Supportive plan', async () => {
        const planSelector = await $('select[name="tcard-i]'); 
        await planSelector.selectByVisibleText('Supportive');
        await planSelector.getValue().should.equal('Supportive');
    });

    it('should save the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });

    it('should collect credit card details', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const creditCard = helper.getCreditCardNumber();
        await page.creditCard(creditCard);
        await expect(await helper.getElementByText(creditCard)).toBeExisting();
    });

    it('should write a message to the driver', async () => {
        const messageInput = await $('textarea[name="message"]');  
        await messageInput.setValue('Hello, please arrive ASAP!');
        await messageInput.getValue().should.equal('Hello, please arrive ASAP!');
    });
    
    it('should order a Blanket and handkerchiefs', async () => {
        const blanketCheckbox = await $('input[name="blanket"]'); 
        await blanketCheckbox.click();
        await blanketCheckbox.isSelected().should.be.true;

        const handkerchiefsCheckbox = await $('input[name="handkerchiefs"]');  
        await handkerchiefsCheckbox.click();
        await handkerchiefsCheckbox.isSelected().should.be.true;
        
        const blanketState = await $('div[name="blanketState"]'); 
        await blanketState.getText().should.equal('Ordered');
    });
    
    it('should order 2 Ice creams', async () => {
        const iceCreamSelect = await $('select[name="iceCream"]');  
        await iceCreamSelect.selectByVisibleText('2');
        await iceCreamSelect.getValue().should.equal('2');
    });
    
    it('should display the car search modal', async () => {
        const carSearchModal = await $('div[name="carSearchModal"]'); 
        await carSearchModal.isDisplayed().should.be.true;
      });
    
    it('should display the driver info in the modal (optional)', async () => {
        const driverInfo = await $('div[name="driverInfo"]');  
        await driverInfo.isDisplayed().should.be.true;
        await driverInfo.getText().should.not.be.empty;
    });
})

