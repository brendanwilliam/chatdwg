#API KEY = 2f19197707cd44af924d93f5b77e1ad6

import requests
import json
import os

url = ('https://newsapi.org/v2/top-headlines?'
       'country=us&'
       'apiKey=2f19197707cd44af924d93f5b77e1ad6')
response = requests.get(url)

def write_json(thedata, filename="Report.JSON"):
    new_data = thedata.json()
    desired_dir = "/Users/JackTheSon1/Desktop/GitHub/chatdwg/News API/json_responses"
    full_path = os.path.join(desired_dir, filename)
    with open(full_path, 'w') as f:
        json_string=json.dumps(new_data, indent=4)
        f.write(json_string)

write_json(response)