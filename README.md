# Designli Technical test

Sample app built using React Native and TypeScript. It is a simple stock market app that allows users to check the stock prices.

## How to run

### Step 1

Clone the repo by running `git clone https://github.com/lmajano07/DesignliTechTest.git`

### Step 2

Use `yarn` or `npm i` to install neecessary packages

## Step 3

Add your secret values in the .env file. Use .env.template to name your values

# Android

Open the Android emulator or connect a physical device with the developer options enabled

Then Run `npm start` to start the Metro Bundler and when loaded press the letter "a" on your keyboard to start the app

In case there are any issues refer to (https://reactnative.dev/docs/running-on-device?platform=android)

# iOS - Only if working on MacOS

Open the iOS emulator or connect a physical device with the developer options enabled or with the recognized key

Then Run `npm run ios` to start the Metro Bundler and when loaded press the letter "i" on your keyboard to start the app

Please make sure you have Xcode and Cocoapods installed on your machine for this to work.

In case there are any issues please refer to (https://reactnative.dev/docs/running-on-device?platform=ios)

## More information

### Troubleshooting on device

Please refer to (https://reactnative.dev/docs/running-on-device) for troubleshooting.

### NOTES

1. **Market Hours**:

   - The market is closed during the day and opens at night.
   - It is also closed on weekends, which affected the functionality of the websocket.
   - A websocket was added to the project, making it work before the market closed, but it wasn't tested for notifications.

2. **API Rate Limits**:

   - The API is a free service and may be subject to rate limits.
   - Be patient and avoid overloading the server, as you might encounter errors or slowdowns (e.g., a 429 error) during testing.

3. **OAuth Issue**:

   - There is an issue with the `react-native-auth0` package.
   - Given this project was developed on Windows, I'll omit his feature

4. **Environment Setup**:
   - Ensure you've completed the [React Native - Environment Setup](https://reactnative.dev/docs/getting-started-without-a-framework) instructions up to the "Creating a new application" step before proceeding.

# GENERAL DOCUMENTATION

### Structure

Applied clean architecture principles, using a simpler approach due to the size of the project.
