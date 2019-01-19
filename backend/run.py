from flask import Flask, request
from html.parser import HTMLParser
import requests, os
from twilio.twiml.messaging_response import MessagingResponse

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
def sms_ahoy_reply():
    """Respond to incoming messages with a friendly SMS."""
    # Start our response
    resp = MessagingResponse()

    # Add a message
    destination = resp.message(request.args.get('Body'))

    return str(resp)

@app.route("/directions", methods=['GET'])
def getRespfromGoogle(origin = "bahen+uoft", destination = "hart+house", travelType = "walking"):
    #Using Google maps API to retreive directions from origin to destination
    map = "" #our string to request from Google maps
    map += "https://maps.googleapis.com/maps/api/directions/json?origin="+origin
    map += "&destination=" + destination
    map += "&mode=" + travelType + gKey
    req = requests.get(map)

    if req.status_code!=200: #if response was unsucessful
        return "error"

    directionsJson = (req.json())

    for i in directionsJson['geocoded_waypoints']: #check if valid origin and destination
        if i['geocoder_status']!="OK":
            return "direction error"
    # directions now gives us a JSON of directions to reach the dest.
    directions = directionsJson['routes'][0]['legs'][0]
    statement = "From your location, you are " + directions['distance']['text'] + " away."
    statement+= "\n It will take "+directions['duration']['text'] + " to reach " + directions['end_address']
    count = 1
    steps = [] #steps is a list of directions to reach dest.
    for i in directions['steps']:
        step = "Step " + str(count) + ":" + "\n"
        step+= "For" + i['distance']['text']
        instructions = strip_tags(i['html_instructions'])
        step+= instructions + " \n"
        step+= "For " +i['duration']['text']
        steps.append(step)






getRespfromGoogle()
