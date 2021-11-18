# price-tracker-bot
Price &amp; Stock tracking telegram bot deployable on Google Apps Script (GAS) for Amazon &amp; Flipkart

---

## Introduction

Source code for [@flipkartX_bot](httpg://t.me/flipkartX_bot/)

This can be deployed using [Google Apps Script (GAS)](https://script.google.com/)

The project uses 3-page spreadsheet to keep a record of all products it is tracking and trackes them in a phased manner to avoid runtime errors and track everything effectively.

---

## How to deploy


Deploy project on GAS by the following steps :

  - Open [Google Apps Script (GAS)](https://script.google.com/) and create a 'New Project'.
  - In the default `Code.gs` file copy the code contents from [Code.js script given in repo](./Code.js).
  - Create a [Google Spreadsheet](https://docs.google.com/spreadsheets/u/) and ensure it have three sheets in it, copy it's sheet id as you will be needing it for your environment variable.
  - In this file configure your environment variables ( such as `botToken` , `botName`, ... )
  - Tap on `+` along side the files to add a new file and copy-paste all the files one-by-one with any name of your choice easier for maintainence.
  - After copying the whole script, tap `Deploy` menu and select option to create a new deployment.
  - Select the type of deployment as `Web App` and choose `Anyone` in the `Who has access` dropdown menu.
  - Deploy and copy the script url and set it as your bot's webhook ( you may do it manually or use the [setWebhook.js script](./setWebhook.js) from your GAS by modifying variable `script` )
  - All set! Your bot is ready to use.

---

## License & Copyright

  - This Project is [Apache-2.0](./LICENSE) Licensed
  - Copyright 2021 [Vishal Das](https://github.com/dvishal485)
