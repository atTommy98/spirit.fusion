# Sprit - 2 Screen App

## The Setup
### Screen 1 - Display
Runs on a computer that is hooked up to the display screen. This screen is not interactable by a user.
### Screen 2 - Controller
Runs on an iPad using a kiosk app such as Kiosk+. This screen allows a user to play a video that will also play on that display screen.

## How to enable autoplay for videos with sound
In order for the videos to play on separate screens, autoplay must be enabled on the browser. This only needs to be enabled on the browser being controlled (The LED screen) and not the iPad.

### Chrome
1. Open the website where the videos will play (http://localhost:3000)
2. Click on the "i" icon next to the URL inside the URL bar.
3. Click "Site settings
4. Scroll down to "Sound" and from the dropdown on the right, select "Allow"

### Firefox
1. Open the browser settings
2. Click "Privacy & Security" on the left.
3. Scroll down to "Autoplay" and click the setting button.
4. In the new window, select "Allow Audio and Video" from the dropdown.


---

## Setup and Run
You will need node installed on your machine.

1. Either recieve this code in a zip file or clone it from the repository. Unzip the folder into a folder on the desktop.
2. Open a terminal or command line interface. The easiest way to do this on Windows is to open the folder containing this file, right click in a blank space in the folder and click 'Open in Terminal'

3. In the terminal, run these commands one line at a time (Some may take a minute or two to complete.):
```
npm install
cd client
npm install
cd ../server
npm install
cd ..
```
This will install all the dependencies.

4. Find your local ip address. If you already know this, you can skip this step. You can do this by running:
```
node server/local-ip.js
```
This will return an ip address that may look like this: '192.168.0.10'

5. Out of the terminal. In the client folder, copy and paste the '.env.example' file and name it '.env'. This new .env file should be in the client folder.
6. In the new .env file, replace the placeholder ip address with yours.

7. In the terminal. To start the servers, run:
```
npm run start
```

8. Open a browser and open the page 'http://localhost:3000'.
9. Follow the instructions above under 'How to enable autoplay for videos with sound' to ensure that the videos play correctly.

The display screen should now be ready.

10. Go to the iPad and open the kiosk app.
11. In the url field, type the local ip address you got earlier like this: `http://192.168.0.0:3000/display'. Just replace the ip address with yours. (Bare in mind that both the iPad and the display screen should be connected to the same network)

---
