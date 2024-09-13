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
    });

    it('should collect credit card details', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 

        const addCardButton = await $('img[alt="Icon"]');
        await expect(addCardButton).toBeExisting(); 
        await addCardButton.click();

        const cardNumberInput = await $('input[number="number.card-input"]');
        await expect(cardNumberInput).toBeExisting();
        await expect(await cardNumberInput.setValue('1234 5678 9101'));

        const expDateInput = await $('div[class="plc"]');
        await expect(expDateInput).toBeExisting();
        await expect(await expDateInput.setValue('12/28'));

        const cvvInput = await $('input[card.code-input]');
        await expect(cvvInput).toBeExisting();
        await expect(await cvvInput.setValue('111'));
        //await cvvInput.keys('Tab'); 

        const linkButton = await $('button[class="button full"]');
        await linkButton.click();
    });

    /*
    it('should write a message to the driver', async () => {
        await browser.url(`/`);
        const messageInput = await $('textarea[name="message"]'); 
        await messageInput.setValue('Hello, please arrive ASAP!');
        await expect(messageInput).getValue().should.equal('Hello, please arrive ASAP!');
    });
    
    it('should order a Blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        const blanketCheckbox = await $('input[name="blanket"]'); 
        await blanketCheckbox.click();
        await expect(blanketCheckbox).isSelected().should.be.true; 
        await expect(blanketCheckbox).getText().should.equal('Ordered');
        const handkerchiefCheckbox = await $('input[name="handkerchiefs"]'); 
        await handkerchiefCheckbox.click();
        await expect(handkerchiefCheckbox).isSelected().should.be.true; 
        await expect(handkerchiefCheckbox).getText().should.equal('Ordered');
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
    */
});

