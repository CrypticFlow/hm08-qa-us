1. Test Automation for Urban Routes App using WebDriver.IO
2. > > In this projet we got hands on experience writing our own automated test code. We wrote tests for each of the requirements for the full stack of the app and how to order a taxi. From inputing a from and to address, adding a phone number, selecting which ride plan the user needs, adding a credit card, writing extra messages to the driver and more. We even secured the app could do extra services like order ice cream, blankets and hankerchiefs.

3. > > The main technology used is WebDriver.IO a framework built on top of Selenium and run in Javsascript with Node.js.

4. > > Each test was used with the it() function inside of a describe() parent function; thus in other words every requirement we received in the DOCS was translated into an it() function inside of our overall describe() parent.  Furthermore, we made use of the async and await keywords because this entire project relies on "moving" data or data which is not static. Users are entering data in real time to order their taxi, and thus we are calling data from the client which we must wait for, and do not want our app to break so we have to write asynchronous code. Thus async/await functions inside of describe() => it().

5. > > Once all the code was ready we run npm run wdio in our terminal to execute the code. It's pretty beautiful to watch, as it spins up our app and executes actions as a user would on the webpage all without touching anything more than our command line. Full automation.

6. >> STEPS: Clone the repository from GitHub to your local system. Write your Automation code in VS Code, it is the best editor for modern Web Development and QA Automation. It allows us to run the terminal right in the editor so you can run your scripts and see any errors in real time. Use npm run wdio to run the automated tests. 