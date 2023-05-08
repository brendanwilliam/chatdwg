# Date: Feb 24, 2023
# Author: Brendan Keane
# Description: Takes '.html' files from saved ChatGPT chats and converts them to
#              a single '.csv' file with the following columns: 'author',
#              'message', 'datetime'


# Imports ======================================================================
import re
import os
import pandas as pd
from bs4 import BeautifulSoup

# Functions ====================================================================

def extract_chatlog(filepath):

  # Opens and parses the html file
  with open(filepath) as fp:
    soup = BeautifulSoup(fp, 'html.parser')

  # Regex match between parentheses to get the file name
  file_name = re.search(r'\((.+)\)', filepath).group(1)
  print(file_name)

  # Gets all chatgpt responses as DOM elements
  chats = soup.find_all('div', class_='min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap')

  # Version number
  version = soup.find('a').text
  print('Messages saved: ' + str(len(chats)))

  # Creates an empty dataframe to store the chatlog
  chat_list = pd.DataFrame(columns=['datetime', 'chat_index', 'author', 'message', 'version'])

  # Loops through the chatgpt responses and adds them to the dataframe
  for i in range(len(chats)):
    chat = chats[i]
    user = ''
    if i%2 == 0:
      user = 'human'
    else:
      user = 'chatgpt'

    chat_list.loc[i] = [file_name, i, user, chat.text, version]

  # Saves dataframe to csv in the csv folder
  chat_list.to_csv('./csv/' + file_name + '.csv', index=False)

def extract_all_chatlogs():
  # Gets all the html files in the saved_chats folder
  html_files = os.listdir('./html')

  # Loops through the html files and extracts the chatlog
  for html_file in html_files:
    print('=====================')
    extract_chatlog('./html/' + html_file)
    print('=====================\n\n')


def combine_chat_data():
  # Gets all the csv files in the csv folder
  csv_files = os.listdir('./csv')

  # Creates an empty dataframe to store the chatlog
  chat_list = pd.DataFrame(columns=['datetime', 'chat_index', 'author', 'message', 'version'])

  # Loops through the csv files and adds them to the dataframe
  for csv_file in csv_files:
    chat_file = pd.read_csv('./csv/' + csv_file)
    chat_list = pd.concat([chat_list, chat_file])

  # Saves dataframe to csv in the csv folder
  chat_list.to_csv('./full_chat_log.csv', index=False)


# Main ==========================================================================
extract_all_chatlogs()
combine_chat_data()
