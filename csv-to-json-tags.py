#! /usr/bin/python

'''
Author: Nafeu Nasir (github.com/nafeu)

Quickly converts csv's from the following format:

name-1,name-2,name-3,...,name-n
tag-1a,tag-2a,tag-3a,...,tag-na
tag-1b,tag-2b,tag-3b,...,tag-nb

Into the this json format:

{
  content: [
    {
      "name": "name-1",
      "tags": ["tag-1a", "tag-1b"]
    },
    {
      "name": "name-2",
      "tags": ["tag-2a", "tag-2b"]
    },
    {
      "name": "name-3",
      "tags": ["tag-3a", "tag-3b"]
    },

    ...

    {
      "name": "name-n",
      "tags": ["tag-na", "tag-nb"]
    }
  ]
}
'''

import sys, csv, json

if len(sys.argv) != 3:
    print("Error: invalid args\nUsage: csv-to-json-tags.py [SOURCE_PATH] [DESTINATION_PATH]")
else:
    csv_file = csv.reader(open(sys.argv[1], newline=''), delimiter=' ', quotechar='|')
    export = {
        "content": []
    }
    data = []
    for row_index, row in enumerate(csv_file):
        for col_index, cell in enumerate(row[0].split(',')):
            if row_index == 0:
                data.append([cell])
            else:
                data[col_index].append(cell)
    for data_index, row in enumerate(data):
        export['content'].append({
            "name": row[0],
            "tags": []
        })
        for index in range(1, len(row)):
            export['content'][data_index]['tags'].append(row[index])
    for item in export['content']:
        item["tags"] = list(filter(None, item["tags"]))
    with open(sys.argv[2], 'w') as fp:
        json.dump(export, fp)

