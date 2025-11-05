# Hopping_Turtle
A project for the Mobile Systems class in AUT. The simple PoC will feature real-time pace-detection which updates a displayed ETA for users on a Navigation (Map) App. This ETA calculation is based on the user's walking pace (taken from the last 5 seconds) and uses the GPS data taken from the phone's sensors as well as the pinpointed destination on the map they have selected.

## Steps to Running the App
**Note:** Make sure to install the mobile app - "Expo Go" from the appstore or playstore. This is where mobile testing was done in order to be able to view the app on the phone as well as access its sensors. As well, ensure that your device running this program and your mobile phone are connected to the SAME wifi.

1) To run this app, cd into "hopping-turtle", then run on the command line:
"npx expo start"

This command will start the app and generate a QR code on the command terminal, scan this QR code to be redirected to the Expo Go app and connect with the running instance of Hopping Turtle.

2) You will see the login screen, as a dummy account for PoC purposes, the login details for:
username = myname
password = 1234
Press login once completed.

3) You will see the main screen with a map in the center. There are details such as:
- Dummy data for a test user and their usual pace. 
- A notice to tap on the map to drop a point where you would like to set your destination to (note that this information is shown as lattitude and longitude coordinates).
-  Automatically updating ETA, Speed and Pace information.

4) Even if the phone is still, it is possible for the Speed  value to be updated - this may be due to sensor sensitivity or similar, but the system's programmed to not show anything significant if your speed is less than 0.5m/s i.e. "N/A".
