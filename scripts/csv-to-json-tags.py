#! /usr/bin/python

'''
Author: Nafeu Nasir (github.com/nafeu)
'''

import sys, csv, json, datetime

if len(sys.argv) != 3:
    print("Error: invalid args\nUsage: python csv-to-json-converter.py [SOURCE_PATH] [DESTINATION_PATH]")
else:
    csv_file = csv.reader(open(sys.argv[1]), delimiter=',', quotechar='|')
export = {
    "phonemes": [],
    "meta": {
        "lastUpdate": str(datetime.datetime.now().strftime("%B %d, %Y - %I:%M%p")),
        "contributors": []
    }
}
data = []
for row_index, row in enumerate(csv_file):
    for col_index, cell in enumerate(row):
        # Contributors
        if col_index == 0 and row_index != 0 and len(cell) > 0:
            export["meta"]["contributors"].append(cell)

        # Phonemes
        elif col_index > 0 and row_index == 0:
            data.append([cell])

        elif col_index > 0 and row_index > 0:
            data[col_index - 1].append(cell)

for row_index, row in enumerate(data):
    for item_index, item in enumerate(row):
        if item_index == 0:
            export["phonemes"].append({
                "id": row_index,
                "name": item,
                "features": [],
                "categories": []
            })
        elif len(item) > 0:
            if (item[0] == "["): # features
                export["phonemes"][row_index]["features"].append(item[1:-1])
            elif (item[0] == "#"):
                export["phonemes"][row_index]["categories"].append(item[1:])

with open(sys.argv[2], 'w') as fp:
    json.dump(export, fp)

