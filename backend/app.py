import json
import os
from flask import Flask, render_template, request
from flask_cors import CORS
from helpers.MySQLDatabaseHandler import MySQLDatabaseHandler
import pandas as pd
from enum import Enum
from sortedcontainers import SortedDict
from flask import session


os.environ["ROOT_PATH"] = os.path.abspath(os.path.join("..", os.curdir))

current_directory = os.path.dirname(os.path.abspath(__file__))

json_file_path = os.path.join(current_directory, "data/data.json")

with open(json_file_path, "r") as file:
    data = json.load(file)

job_postings = data.get("job_postings")

app = Flask(__name__)
CORS(app)


class SortParam(Enum):
    alphabetical: str
    rating: str

# Sample search using json with pandas
def json_search(query, sorting_by):
    if sorting_by in ["decreasing-order", "increasing-order"]:
        sorting_bool = sorting_by == "decreasing-order"
        sorted_data = sort_by(outputs, "rating", sorting_bool)
    else:
        sorted_data = outputs
    if query is None:
        return sorted_data
    matches = [(key, value) for key, value in sorted_data.items() if query.lower() in key.lower()]
    matches_filtered = [(key, value) for key, value in matches]
    return matches_filtered


def group_postings_by_company(postings):
    """

    "Microsoft" : {
                   "description" : .....
                   "postings" : [posting1, posting2, postings3]
                  },

     "JP Morgan" : {
                   "description" : .....
                   "postings" : [posting1, posting2, postings3]
                  }

    """
    groups = {}

    for p in postings:
        company = p["company"]

        if company in groups:
            groups[company]["postings"].append(p)
        else:
            groups[company] = {
                "description": p["description"],
                "rating": p["happine"],
                "happiness": p["happiness"],
                "postings": [p],
            }

    return groups


def sort_by(data: dict, param: SortParam = "alphabetical", isDecreasingOrder=True):
    res = {}
    
    # if param == "alphabetical":
    #     res = {k:v for k, v in sorted(data.items())}
    if param == "rating":
        res = {k:v for k, v in sorted(data.items(), key = lambda x: x[1]["rating"], reverse = isDecreasingOrder)}
    else:
        res = {k:v for k, v in sorted(data.items())}
    return res
    

outputs = {
    "Microsoft" : {
            "description" : "We believe in what people make possible\n\nMicrosoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Our mission is to empower every person and every organization on the planet to achieve more.",
            "rating" : "4.0",
            "postings" : [{ 
            "company": "Microsoft",
            "happiness": "{'Work Happiness Score': '83', 'Learning': '85', 'Appreciation': '84', 'Purpose': '84', 'Flexibility': '84', 'Achievement': '83', 'Inclusion': '82', 'Support': '82', 'Energy': '81', 'Trust': '79', 'Compensation': '79', 'Belonging': '78', 'Management': '77'}",
            "rating": "4.2",
            "description": "We believe in what people make possible\n\nMicrosoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Our mission is to empower every person and every organization on the planet to achieve more.",
            "role": "Network Security Engineer",
            "salary range": "$60K-$108K",
            "skills": "Network security protocols and technologies Firewalls and intrusion detection systems Vulnerability assessment and penetration testing Security policy development and enforcement Incident response and recovery",
            "country": "Oman",
            "id": 98145,
            "city": "Muscat"
        },
        {
            "company": "Microsoft",
            "happiness": "{'Work Happiness Score': '83', 'Learning': '85', 'Appreciation': '84', 'Purpose': '84', 'Flexibility': '84', 'Achievement': '83', 'Inclusion': '82', 'Support': '82', 'Energy': '81', 'Trust': '79', 'Compensation': '79', 'Belonging': '78', 'Management': '77'}",
            "rating": "4.2",
            "description": "We believe in what people make possible\n\nMicrosoft enables digital transformation for the era of an intelligent cloud and an intelligent edge. Our mission is to empower every person and every organization on the planet to achieve more.",
            "role": "Crisis Communication Manager",
            "salary range": "$63K-$90K",
            "skills": "Crisis communication planning Crisis response Media relations Reputation management Stakeholder communication",
            "country": "St. Martin (French part)",
            "id": 96663,
            "city": "Marigot"
        }]
            },

    "JP Morgan" : {
                "description" : "For over 200 years, JPMorgan Chase & Co has provided innovative financial solutions for consumers, small businesses, corporations, governments and institutions around the world.Today, we're a leading global financial services firm with operations servicing clients in more than 100 countries. Whether we are serving customers, helping small businesses, or putting our skills to work with partners, we strive to identify issues and propose solutions that will propel the future and strengthen both our clients and our communities.\n\n\u00a9 2019 JPMorgan Chase & Co. JPMorgan Chase is an equal opportunity and affirmative action employer Disability/Veteran. \u2013 less",
                "rating" : "3.9",
                "postings" : [{
                "company": "JPMorgan Chase",
                "happiness": "{'Work Happiness Score': '66', 'Learning': '73', 'Achievement': '73', 'Purpose': '71', 'Appreciation': '71', 'Flexibility': '70', 'Support': '69', 'Compensation': '68', 'Inclusion': '68', 'Energy': '67', 'Trust': '64', 'Belonging': '64', 'Management': '63'}",
                "rating": "3.9",
                "description": "For over 200 years, JPMorgan Chase & Co has provided innovative financial solutions for consumers, small businesses, corporations, governments and institutions around the world.Today, we're a leading global financial services firm with operations servicing clients in more than 100 countries. Whether we are serving customers, helping small businesses, or putting our skills to work with partners, we strive to identify issues and propose solutions that will propel the future and strengthen both our clients and our communities.\n\n\u00a9 2019 JPMorgan Chase & Co. JPMorgan Chase is an equal opportunity and affirmative action employer Disability/Veteran. \u2013 less",
                "role": "UI/UX Developer",
                "salary range": "$65K-$104K",
                "skills": "User interface (UI) design User experience (UX) design Web design principles Prototyping and wireframing Front-end development languages (e.g., HTML, CSS, JavaScript) Interaction design User testing Responsive design Usability testing Collaboration Attention to detail",
                "country": "Cyprus",
                "id": 289597,
                "city": "Nicosia"
            }, 
            {
                "company": "JPMorgan Chase",
                "happiness": "{'Work Happiness Score': '66', 'Learning': '73', 'Achievement': '73', 'Purpose': '71', 'Appreciation': '71', 'Flexibility': '70', 'Support': '69', 'Compensation': '68', 'Inclusion': '68', 'Energy': '67', 'Trust': '64', 'Belonging': '64', 'Management': '63'}",
                "rating": "3.9",
                "description": "For over 200 years, JPMorgan Chase & Co has provided innovative financial solutions for consumers, small businesses, corporations, governments and institutions around the world.Today, we're a leading global financial services firm with operations servicing clients in more than 100 countries. Whether we are serving customers, helping small businesses, or putting our skills to work with partners, we strive to identify issues and propose solutions that will propel the future and strengthen both our clients and our communities.\n\n\u00a9 2019 JPMorgan Chase & Co. JPMorgan Chase is an equal opportunity and affirmative action employer Disability/Veteran. \u2013 less",
                "role": "Usability Analyst",
                "salary range": "$64K-$117K",
                "skills": "Usability evaluation User interface assessment Usability testing tools and techniques",
                "country": "Mexico",
                "id": 288296,
                "city": "Mexico City"
            }]
        }
}

# print(sort_by(outputs, "rating", False))

@app.route("/")
def home():
    return render_template("base.html", title="sample html")


@app.route("/episodes")
def episodes_search():
    text = request.args.get("title")
    sort_param = request.args.get("filter_opt_ratings")
    # print("SORTED DATA")
    # print(sorted_data, sort_param)
    return json_search(text, sort_param)



if "DB_NAME" not in os.environ:
    app.run(debug=True, host="0.0.0.0", port=5001)
