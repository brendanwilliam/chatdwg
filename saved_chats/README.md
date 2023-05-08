# How to use the `chatlogger.py` script

## Overview | *How does it work?*
`chatlogger.py` is a Python script that takes saved `.html` pages from (ChatGPT)[chat.openai.com/] and converts the chat logs into a single `.csv`.

To do this, the program loops through the `./html` directory and saves each page's chat log in the `./csv` directory under the title `<M_DD_YYYY H_MM_SS AM|PM>.csv`. This is accomplished with the `extract_all_chatlogs()` function in `chatlogger.py`.

Once each page's chat log is exported as a `.csv` in the `./csv` folder, the `combine_chat_data()` function in `chatlogger.py` will combine all the files in the `./csv` folder and save them as `full_chat_log.csv` in the `./saved_chats` directory.

## Instructions | *How can I use this?*
Using this tool is simple when set up properly, but setup does require a few steps.

### Software | *Download the SingleFile extension*
Before running this script, download the *SingleFile* extension on your browser of choice. This extension makes sure that (1) all page HTML is exported and (2) saved pages have the proper naming convention for this script.

**DOWNLOAD LINKS**
- [Chrome](https://chrome.google.com/webstore/detail/singlefile/mpiodijhokgodhhofbcjdecpffjipkle?hl=en)
- [Safari](https://apps.apple.com/us/app/singlefile-for-safari/id6444322545)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/single-file/)
- [GitHub](https://github.com/gildas-lormeau/SingleFile)

### File setup | *Organizing files to use this script*
To properly save files for this scrip, perform the following steps:
1. Open the ChatGPT chat that you want to save
2. Save the page with the SingleFile extension
3. Move the saved file into the directory `./saved_chats/html`
4. Repeat steps 1-3 for all additional chats that are being saved
5. Navigate to the `/saved_chats` directory in the terminal
6. Run the `chatlogger.py` script with the following command:
    `<your_computer_name>:saved_chats <username>$ python3 chatlogger.py`

When properly executed, the file `full_chat_log.csv` in the `/saved_chats` directory will contain all of the chats from all of the `.html` files in the `saved_chats/html` directory.

## Important | *Maintaining research integrity*
*Please do not delete any files from the `saved_chats/html` directory. These files are the foundation of the chat logs. Recovering deleted files in this directory is annoying and a waste of time, so just please keep hands off the delete key. Thank you.*
