from twilio.rest import Client
import os

# Your Account Sid and Auth Token from twilio.com/console
account_sid = os.environ['TWILIOASID']
auth_token = os.environ['TWILIOATOKEN']
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Hello this is from smstest.py file",
                     from_='+17053006844',
                     to='+16475271499'
                 )

print(message.sid)
