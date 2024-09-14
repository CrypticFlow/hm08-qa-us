const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    });

    it('should select Supportive plan', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const planSelector = await $(page.supportiveMode); 
        await planSelector.waitForDisplayed(); 
        await planSelector.click(); 
        await expect($('div=Soundproof curtain')).toBeDisplayed();
    });

    it('should save the phone number', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = await $('div[class="np-button"]');
        await page.fillPhoneNumber(phoneNumber); 
        await expect(phoneNumber).toBeExisting();
        });
   
    it('should collect credit card details', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const addCardPaymentMethod = await $(page.addCardPaymentMethod);
        await addCardPaymentMethod.waitForDisplayed();
        await addCardPaymentMethod.click();
        const addCardButton = await $(page.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumberInput = await $(page.cardNumberInput);
        await cardNumberInput.waitForDisplayed(); 
        await cardNumberInput.setValue('1234 5678 9101');
        const cvvInput = await $(page.cvvInput);
        await cvvInput.waitForDisplayed();
        await cvvInput.setValue('111');
        await browser.keys('Tab'); 
        const linkButton = await $(page.linkButton);
        await linkButton.waitForClickable(); 
        await linkButton.click(); 
        expect($('div=Card')).toBeExisting(); 
    }); 

    it('should write a message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const messageInput = await $(page.messageInput); 
        await messageInput.waitForDisplayed(); 
        await messageInput.setValue('Get some groceries');
        await expect(messageInput).toHaveValue('Get some groceries');
    });
    
    it('should order a Blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveMode = await $(page.supportiveMode); 
        await supportiveMode.waitForDisplayed();
        await supportiveMode.click();
        const blanketHankerchief = await $(page.blanketHankerchief); 
        await blanketHankerchief.waitForDisplayed();
        await blanketHankerchief.click();
        await expect($('.switch-input')).toBeChecked();
    });
    
    it('should order 2 Ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const supportiveMode = await $(page.supportiveMode); 
        await supportiveMode.waitForDisplayed();
        await supportiveMode.click();
        const iceCreamContainer = await $(page.iceCreamContainer);
        await iceCreamContainer.waitForDisplayed();
        await iceCreamContainer.click();
        const iceCreamPlusButton = await $(page.iceCreamPlusButton);
        await iceCreamPlusButton.waitForDisplayed();
        await iceCreamPlusButton.click();
        await iceCreamPlusButton.click();  
        expect($('.counter-value')).toBeDisplayed();
        expect($('.counter-plus disabled')).toBeExisting(); 
    });

    it('should display the car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const supportiveMode = await $(page.supportiveMode); 
        await supportiveMode.waitForDisplayed();
        await supportiveMode.click();
        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();
        expect(carSearchModal).toBeDisplayed(); 
      });
    
    /*
    it('should display the driver info in the modal (optional)', async () => {
        await browser.url(`/`);  
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const driverInfo = await $(page.driverInfo);
        await driverInfo.waitForDisplayed(); 
        //expect(driverInfo).toBeExisting();
    });
    */
});

