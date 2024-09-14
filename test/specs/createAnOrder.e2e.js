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
        const planSelector = await $('img[alt="Supportive"]'); 
        await expect(planSelector).toBeExisting(); 
        const planImage = await $('img[alt="Supportive"]');
        await expect(await planImage.getAttribute('alt')).toBe('Supportive');
        await planImage.waitForExist({ timeout: 5000 }); 
        await expect(planImage).toBeExisting();
    });

    it('should save the phone number', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = await $('div[class="np-button"]');
        await page.fillPhoneNumber(phoneNumber); 
        await phoneNumber.waitForExist({ timeout: 5000 }); 
        await expect(phoneNumber).toBeExisting();
        });
   
    it('should collect credit card details', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const addCardPaymentMethod = await $(page.addCardPaymentMethod);
        await addCardPaymentMethod.waitForDisplayed();
        await addCardPaymentMethod.click();
        const cardNumberInput = await $(page.cardNumberInput);
        await cardNumberInput.waitForDisplayed(); 
        await cardNumberInput.waitForExist({timeout: 5000})
        await expect(await cardNumberInput.setValue('1234 5678 9101'));
        await cardNumberInput.click(); 
        const expDateInput = await $(page.expDateInput);
        await expDateInput.waitForDisplayed();
        await expDateInput.waitForExist({timeout: 5000});
        await expect(await expDateInput.setValue('12/28'));
        await expDateInput.click(); 
        const cvvInput = await $(page.cvvInput);
        await cvvInput.waitForDisplayed();
        await cvvInput.waitForExist({timeout: 5000});
        await expect(await cvvInput.setValue('111'));
        await cvvInput.click(); 
        //await cvvInput.keys('Tab'); 
        const linkButton = await $(page.linkButton);
        await linkButton.click(); 
    }); 

    it('should write a message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const messageInput = await $(page.messageInput); 
        await messageInput.waitForDisplayed(); 
        await messageInput.waitForExist({ timeout: 5000 }); 
        await expect(messageInput).toBeExisting();
    });
    
    it('should order a Blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const blanketCheckbox = await $(page.blanketCheckbox); 
        await blanketCheckbox.waitForDisplayed();
        await blanketCheckbox.waitForExist({ timeout: 10000 }); 
        await blanketCheckbox.click();
        await expect(blanketCheckbox).toBeExisting();
        const handkerchiefCheckbox = await $(page.hankerchiefCheckbox); 
        await handkerchiefCheckbox.waitForDisplayed(); 
        await handkerchiefCheckbox.waitForExist({ timeout: 10000 }); 
        await handkerchiefCheckbox.click();
        await expect(handkerchiefCheckbox).toBeExisting();
    })
    
    it('should order 2 Ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const iceCreamSelect = await $(page.iceCreamSelect);
        await iceCreamSelect.waitForDisplayed();
        await iceCreamSelect.waitForExist({ timeout: 10000 }); 
        await iceCreamSelect.selectByVisibleText('2');
        await expect(iceCreamSelect).toBeExisting();
    });
    
    it('should display the car search modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const carSearchModal = await $(page.carSearchModal);
        await carSearchModal.waitForDisplayed();
        await carSearchModal.waitForExist({ timeout: 5000 }); 
        await expect(carSearchModal).toBeExisting(); 
      });
    
    /*
    it('should display the driver info in the modal (optional)', async () => {
        await browser.url(`/`);  
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        const driverInfo = await $(page.driverInfo);
        await driverInfo.waitForDisplayed(); 
        await driverInfo.waitForExist({ timeout: 5000 });
        await expect(driverInfo).toBeExisting();
    }); */
});

