Questions:
1. We want to run this scenario automatically and frequently. What process/setup/tools would you choose to achieve this?

So in other to be able to run the process automatically and frequently, we would need to set up the code on a CI/CD pipeline; this would enable us to run this process automatically and frequently. This can be done by using the scheduling function on Gitlab.

2. On step 5, the system is supposed to send an email. How would you check if the email was really received to the email address?

Since we want to be able to send an email, cypress has integration with mailosaur, it gives you the opportunity to create a mailing account, so when we send an email to a mailosaur account we would be able to access the mail to check if you received the email also check the content of the email.

3. How would you test the same scenario on different screen sizes?

Cypress has a viewport feature that allows the QA to run the test on different screen sizes. So I can create different resolutions for the different screens and then run the test against those different screens; this can be used to test what is visible on different screen sizes.



Code Implementation
The code was written in  cypress. So to be able to run the code, use the following steps:
1. Clone the repository to your local machine
2. Run npm install; this command with install all the packages in the package.lock file. The packages are: node modules: to run the npm and npx commands and also js engine, cypress: for test automation execution and maintanance, testing library in order to use the 'findByText' feature , mailosaur: for running automated test using email and mochasome is for reporting.
3. You can use npx cypress run or npx cypress open to run the test from the terminal                                                  
