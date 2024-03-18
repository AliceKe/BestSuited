import csv
import json
import pandas as pd


def merge_csv_files(file1, file2, merge_column, needed_columns, output_file):
    df1 = pd.read_csv(file1)
    df2 = pd.read_csv(file2)

    merged_df = pd.merge(df1, df2, on=merge_column)[needed_columns]
    merged_df.to_csv(output_file, index=False)


def convert_to_json(input_csv, key, check_fields, check_values, output_json):
    data = {key: []}

    i = 0
    with open(input_csv, encoding="utf-8") as csvf:
        csvReader = csv.DictReader(csvf)

        for row in csvReader:
            flag = True
            if check_fields:
                for field, value in zip(check_fields, check_values):
                    if row[field] == value:
                        flag = False
                        break

            if flag:
                data[key].append({key.lower(): value for key, value in row.items()})
            i += 1

    with open(output_json, "w", encoding="utf-8") as jsonf:
        jsonf.write(json.dumps(data, indent=4))


needed_fields = [
    "Company",
    "happiness",
    "rating",
    "description",
    "Role",
    "Salary Range",
    "skills",
]


merge_csv_files(
    "company_reviews_old.csv",
    "job_postings_old.csv",
    "Company",
    needed_fields,
    "data_old.csv",
)

convert_to_json(
    r"data_old.csv",
    "job_postings",
    ["Company", "happiness", "rating"],
    ["", "{}", ""],
    r"data_new.json",
)
