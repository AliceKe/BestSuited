import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrape_overall_rating(url):
    # Send a GET request to the URL
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the element containing the overall rating
        overall_rating_element = soup.find('span', class_='ratingTrends__RatingTrendsStyle__overallRatingNum')

        # Extract the overall rating
        overall_rating = overall_rating_element.text.strip()

        return overall_rating
    else:
        print("Failed to fetch data from the URL:", url)
        return None

# Input URL
url = "https://www.glassdoor.com/Overview/Working-at-IBM-EI_IE354.11,14.html"

# Scrape overall rating
overall_rating = scrape_overall_rating(url)

if overall_rating:
    print("Overall Rating:", overall_rating)
