import pandas as pd
import numpy as np
import json
import csv

def convert_to_csv(input_json, output_csv):
    with open(input_json, "r", encoding="utf-8") as jsonf:
        data = json.load(jsonf)

    header = list(data.keys())[0]

    with open(output_csv, "w", newline="", encoding="utf-8") as csvf:
        csv_writer = csv.writer(csvf)
        
        csv_writer.writerow(data[header][0].keys())
        
        for item in data[header]:
            csv_writer.writerow(item.values())

def remove_non_letters_from_set(input_set):
    res = set()
    for item in input_set:
        while item and not item[0].isalpha():
            item = item[1:]

        while item and not item[-1].isalpha():
            item = item[:-1]
            
        res.add(item)
    return res

def createVocab(csvFilePath, outputTxtFilePath):
    dataset = pd.read_csv(csvFilePath)

    skills = dataset['skills'].str.split(" ").explode()
    skills = set(skills)
    titles = dataset['role'].explode()
    titles = set(titles)
    vocab = skills.union(titles)
    vocab = set(vocab)

    vocab = remove_non_letters_from_set(vocab)

    with open(outputTxtFilePath, 'w') as f:
        for word in vocab:
            word = word.lower()
            f.write(word + '\n')


convert_to_csv("../data/data.json", "../data/final_data.csv")
createVocab("../data/final_data.csv", "../data/vocab.txt")
