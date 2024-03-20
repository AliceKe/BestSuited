import json
import os
from flask import Flask, render_template, request
from flask_cors import CORS
from helpers.MySQLDatabaseHandler import MySQLDatabaseHandler
import pandas as pd
from enum import Enum
from sortedcontainers import SortedDict


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
def json_search(query): ...


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
    
    if param == "alphabetical":
        res = {k:v for k, v in sorted(data.items())}
    elif param == "rating":
        res = {k:v for k, v in sorted(data.items(), key = lambda x: x[1]["rating"], reverse = isDecreasingOrder)}

    return res
    

outputs = {
    "Microsoft" : {
            "description" : "SADDDD",
            "rating" : "4.0",
            "postings" : [{ 
            "company": "Charles Schwab",
            "happiness": "{'Work Happiness Score': '61', 'Learning': '73', 'Appreciation': '70', 'Compensation': '69', 'Achievement': '69', 'Support': '68', 'Inclusion': '67', 'Purpose': '66', 'Flexibility': '64', 'Trust': '64', 'Management': '62', 'Energy': '61', 'Belonging': '60'}",
            "rating": "4.0",
            "description": "Financial services can be complicated. At Charles Schwab, we\u2019re trying to fix that. We have a history of challenging the status quo and innovating in ways that help individuals create a better tomorrow.\n\nWhat We Do: Charles Schwab exists to help people achieve better financial outcomes. We offer investors a contemporary, full-service approach to build and manage their investments, providing investment-related products, services, and sophisticated financial planning that combine the best of what people and technology have to offer.\n\nMission: Our purpose is to champion every client\u2019s goals with passion and integrity, empowering them to take ownership of their financial future at every income level and life stage.\n\nValues: Our values are a way of doing business\u2014not just a plaque on the wall. We place the highest value on:\n-Constantly improving the client experience through innovation that benefits clients.\n-Respecting fellow employees and reinforcing the power of teamwork.\n-Being good stewards of our brand and stockholder value.\n-Earning our clients' trust by treating them in an ethical, empathetic, and proactive way.\n\nDisclosure\nPlease note, Content posted in the forums or reviews section on this site remains the responsibility of the party posting the content and is not adopted or endorsed by Schwab or represent Schwab viewpoints.\n\nSchwab is committed to building a diverse and inclusive workplace where everyone feels valued. As an equal employment opportunity employer, our policy is to provide equal employment opportunities to all employees and applicants without regard to any status that is protected by law (https://www.aboutschwab.com/EEO). Schwab is also an affirmative action employer, focused on advancing women, minorities, veterans, and individuals with disabilities in the workplace. We believe diversity and inclusion are part of our success as a company and our purpose of serving every client with passion and integrity.\n\u00a9 2020 Charles Schwab & Co., Inc., All rights reserved. Member SIPC - https://www.sipc.org/. (0120_9T2X) \u2013 less",
            "role": "Email Campaign Manager",
            "salary range": "$64K-$116K",
            "skills": "Email marketing strategies Email marketing platforms (e.g., MailChimp, HubSpot) Audience segmentation A/B testing Campaign analytics Copywriting HTML/CSS for email Marketing automation Communication skills Data analysis Attention to detail",
            "country": "Madagascar",
            "id": 14132,
            "city": "Antananarivo"
        }]
            },

    "JP Morgan" : {
                "description" : "SOS",
                "rating" : "2.7",
                "postings" : [{
                "company": "Chewy",
                "happiness": "{'Work Happiness Score': '50', 'Achievement': '59', 'Purpose': '54', 'Support': '54', 'Appreciation': '53', 'Learning': '53', 'Compensation': '53', 'Flexibility': '53', 'Energy': '51', 'Inclusion': '48', 'Management': '47', 'Trust': '45', 'Belonging': '44'}",
                "rating": "2.7",
                "description": "Chewy is revolutionizing the pet industry as one of the fastest growing e-commerce retailers of all time. Founded in 2011, Chewy set out to offer pet parents the expertise and service of a local pet store with the convenience of online shopping. Chewy delivers on that promise with its dedication to 24/7 customer service, the creation of cutting-edge software and technology that enhances the user experience and commitment to sourcing high-quality products.\n\nDually headquartered in Dania Beach, FL and Boston MA, Chewy employs more than 15,000 pet lovers in their headquarter offices, three customer service centers in FL, TX and KY and nine fulfillment centers in PA, AZ, TX, KY, NV, IN, OH, NC, and FL.\n\nChewy's environment is dynamic and faster than anything you've ever experienced, built for leaders who thrive on delivering results. We believe in leadership, accountability, relentlessness, and creativity. We work hard with a dogged determination, but we have fun, too! \u2013 less",
                "role": "Corporate Litigator",
                "salary range": "$61K-$101K",
                "skills": "Corporate law Commercial litigation Dispute resolution Contract law Legal strategy Negotiation",
                "country": "China",
                "id": 30299,
                "city": "Beijing"
            }]
                }
}

print(sort_by(outputs, "rating", False))

@app.route("/")
def home():
    return render_template("base.html", title="sample html")


@app.route("/episodes")
def episodes_search():
    text = request.args.get("title")
    return sort_by(outputs, "rating", False)


if "DB_NAME" not in os.environ:
    app.run(debug=True, host="0.0.0.0", port=5001)
