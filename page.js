module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    // Buttons
    addCardButton: 'button[name="addCard"]',
    blanketState:'div[name="blanketState"]',
    blanketCheckbox: 'input[name="blanket"]',
    carSearchModal: 'div[name="carSearchModal"]',
    callATaxiButton: 'button=Call a taxi',
    cardNumberInput: 'div[name="pp.button-filled"]',
    confirmButton: 'button=Confirm',
    cvvInput: 'input[name="cvv"]',
    driverInfo: 'div[name="driverInfo"]',
    expDateInput: 'input[name="expDate"]',
    hankerchiefCheckbox: 'input[name="handkerchiefs"]',
    iceCreamSelect: 'select[name="iceCream"]',
    messageInput: 'textarea[name="message"]',
    nextButton: 'button=Next',
    phoneNumberButton: 'div[class="np-button"]',
    planSelector: 'img[alt="Supportive"]',
    

    // Modals
    phoneNumberModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue('div[class="np-button"]');
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
};