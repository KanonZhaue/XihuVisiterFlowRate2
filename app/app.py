import csv
import os

import flask 
import numpy as np
from flask_cors import CORS

TEMPLATE_DIR = os.path.abspath('./static')
STATIC_DIR = os.path.abspath('./static')
app = flask.Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR)
CORS(app, supports_credentials=True)

@app.route("/")
def index():
    """the home page
    """
    return flask.render_template("check1.html")

@app.route("/getRectData")#该算法由PYTHON的rcdRating中获得
def getRectData():
    pp=0.1
    pr=0.1
    userId = 0
    LocationData = 0
    RouteRating = np.zeros(36)
    PopulationRating = np.zeros(36)
    FavRating = np.zeros(36)
    RcdRating = np.zeros(36)

    with open('data/LocationData.csv', 'r')as f:
        reader = csv.reader(f)
        for row in reader:
            LocationData = int(row[userId])
    with open('rating/FavRating.csv', 'r')as f:
        reader = csv.reader(f)
        for i, row in enumerate(reader):
            if i == userId:
                for j, n in enumerate(row):
                    FavRating[j] = n
                break
    with open('rating/PopulationRating.csv', 'r')as f:
        reader = csv.reader(f)
        for row in reader:
            for i in range(0, 36):
                PopulationRating[i] = row[i]
    with open('rating/RouteRating.csv')as f:
        reader = csv.reader(f)
        for i, row in enumerate(reader):
            if i == LocationData:
                for j, n in enumerate(row):
                    RouteRating[j] = n
    X = []
    for i in range(0, 36):
        X.append(i)
        RcdRating[i] = round(FavRating[i] - pr * RouteRating[i] + pp * PopulationRating[i], 4)

    


if __name__ == "__main__":
    app.run(debug=True)


