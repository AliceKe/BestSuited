import csv
import json


def make_json(csvFilePath, jsonFilePath):
    data = {"postings": []}

    with open(csvFilePath, encoding="utf-8") as csvf:
        csvReader = csv.DictReader(csvf)

        for rows in csvReader:
            data["postings"].append(rows)

    with open(jsonFilePath, "w", encoding="utf-8") as jsonf:
        jsonf.write(json.dumps(data, indent=4))


csvFilePath = r"data.csv"
jsonFilePath = r"data.json"

make_json(csvFilePath, jsonFilePath)
