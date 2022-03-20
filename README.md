# Loop Machine Project

## Project Description
In this project i was asked to create a looping machine which composed
by 8 channels which represent an audio loop.
The channels are controlled by 3 buttons: play, stop and loop
In addition a cursor that displays the current playing position
in real time, and can move forward and backward, and change respectively
the chennels current playing time.  

## Installations
note: this app was create by react-create-app
1. clone the repository `git clone https://github.com/LidorAmitay/LoopMachine.git`
2. run `npm install` to install all project dependencies
3. run `npm start` to run the project

## Dependencies
* bootstrap 5.1.3
* react-bootstrap 2.2.1
* @mui/icons-material 5.5.1

## Components
**ChannelList** component called in App.js
ChannelList is composed by N Channel components, control buttons, and a progress bar.
ChannelList is responsible to create and build the Channels
ChannelList also responsible control all channels using 3 buttons:
play - start playing all channels simultaneously
stop - stop playing all channels and go back to the start
loop - if on, start over all channels when the loop ends
ChannelList also have progress bar (range input) 
that shows the current playing position in real time and a timer.

**Channel** component is created in createChannels function on the ChannelList component
Channel is responsible to play his audio file, and mute/unmute functionality
Channel have one button, which mute/unmute his audio file,
and disabled progress bar, that shows the current playing position in real time.
Channel recieve the following props from ChannelList:
playing - a boolean that indicate if the channel should play
setPlaying - playing setter
looping - a boolean that indicate if the channel should loop
newTime - integer that updates his playing time according to changes in ChannelList component
setDuration, setCurTime - setters to update data in parent component 
trackName - the relevant track name for the channel