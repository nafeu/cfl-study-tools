#! /usr/bin/python

'''
Author: Nafeu Nasir (github.com/nafeu)
'''

import sys, json

export = {"content": []}
with open('../data/lenape-english-dictionary.txt', 'r') as fp:
    for line in fp:
        out = line.split(" ", 1)
        if len(out) > 1:
            out[0] = out[0].rstrip(",")
            out[1] = out[1].rstrip("\n")
            export["content"].append({
              "name": out[0].decode('utf8'),
              "def": out[1].decode('utf8')
            })
with open('../data/dict-export.json', 'w') as fp:
    json.dump(export, fp)
