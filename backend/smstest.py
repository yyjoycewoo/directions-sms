from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
account_sid = 'AC4ee26e79abe99cfd0ed08deb067cca91'
auth_token = '8b85f32f9e4b1c205f44ff73488a0602'
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Hello this is from smstest.py file",
                     from_='+17053006844',
                     to='+16475271499'
                 )

print(message.sid)
