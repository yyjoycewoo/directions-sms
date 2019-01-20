from flask import Flask, request
from html.parser import HTMLParser
import requests, os, asyncio
from twilio.twiml.messaging_response import MessagingResponse

from twilio.rest import Client
import os

# Your Account Sid and Auth Token from twilio.com/console
account_sid = os.environ['TWILIOASID']
auth_token = os.environ['TWILIOATOKEN']
client = Client(account_sid, auth_token)


app = Flask(__name__)
gKey = os.environ['GMAPTOKEN'] #google api key
#HTML Stripper
class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.strict = False
        self.convert_charrefs= True
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)
def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()

#Routes
@app.route("/sms", methods=['GET', 'POST'])
def run_after_GET():
    return sms_ahoy_reply()

# 1600 char limit
def sms_ahoy_reply():
    """Respond to incoming messages with a friendly SMS."""
    # Start our response

    # Add a message
    body = request.args.get('Body')
    body=body.split()
    number=body[0]
    longLat = body[-1]
    dest=body[3:len(body)-2]
    destination="+".join(dest)


    message = client.messages \
                    .create(
                         body=body[1:],
                         from_='+17053006844',
                         to=number
                     )
    return


@app.route("/stdlib", methods=['POST'])
def sms_stdlib():
    """Respond to incoming messages with a friendly SMS."""
    # Start our response

    # Add a message
    body = request.json
    incoming = body['msg'];
    reply=""
    if incoming=="Get me directions":
        reply=getRespfromGoogle()
    # extra if conditions
    message = client.messages \
                    .create(
                         body=reply,
                         from_='+17053006844',
                         to=body['number']
                     )
    return 'done'

def sms_direction_reply():
    """Respond to incoming messages with a friendly SMS."""
    # Start our response
    resp = MessagingResponse()

    # Add a message
    body = request.args.get('Body')
    body=body.split()
    longLat = body[-1]
    if 'Take me to' in body:
      #route api to find directions
      #eg. Take me to Eaton Center from 43.659624,-79.39849007
      dest=body[3:len(body)-2]
      destination="+".join(dest)
      resp.message(getRespfromGoogle(origin=longLat,destination=destination))
    elif 'where am' in  body:
      #geocoding api
      resp.message(getLocation(origin=longLat))
    elif "weather" in body:
      #weather api
      resp.message("It's currently -15C.")
    elif 'time in body':
      #timezone api
      resp.message("It's current 3:43pm")

    return str(resp)

def getRespfromGoogle(origin = "bahen+uoft", destination = "hart+house", travelType = "walking"):
    #Using Google maps API to retreive directions from origin to destination
    map = "" #our string to request from Google maps
    map += "https://maps.googleapis.com/maps/api/directions/json?origin="+origin
    map += "&destination=" + destination
    map += "&mode=" + travelType
    map += "&key="+gKey
    req = requests.get(map)

    if req.status_code!=200: #if response was unsucessful
        return ["error"]

    directionsJson = req.json()

    for i in directionsJson['geocoded_waypoints']: #check if valid origin and destination
        if i['geocoder_status']!="OK":
            return ["direction error"]
    # directions now gives us a JSON of directions to reach the dest.
    directions = directionsJson['routes'][0]['legs'][0]
    statement = "\nFrom your location, you are " + directions['distance']['text'] + ", away.\n"
    statement+= "\n It will take "+directions['duration']['text'] + ", to reach " + directions['end_address']+".\n\n"
    step_count = 1
    steps = statement #steps is a list of directions to reach dest.

    for i in directions['steps']:
        step = "Step " + str(step_count) + ": "
        instructions = strip_tags(i['html_instructions'])
        step+= instructions + " "
        step+= "for "+i['distance']['text'] + " which will take " +i['duration']['text'] + "\n";
        step_count+=1
        steps+= step

    return steps

def getLocation (origin = "40.714224,-73.961452"):
    location = "" #our string to request from Google maps
    location += "https://maps.googleapis.com/maps/api/geocode/json?"
    location += "latlng=" + origin
    location += "&key=" + gKey
    req = requests.get(location)

    if req.status_code!=200: #if response was unsucessful
        return ["error"]

    locationJson = req.json()
    general = locationJson['plus_code']
    cityUncleaned = general['compound_code']
    city = cityUncleaned[8:]
    message = "You are currently in " + city
    return message
