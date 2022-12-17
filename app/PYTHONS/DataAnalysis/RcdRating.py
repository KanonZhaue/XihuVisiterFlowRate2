import csv

import numpy as np
from matplotlib import pyplot as plt

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
    RcdRating[i] = round(FavRating[i] - 0.1 * RouteRating[i] + 0.1 * PopulationRating[i], 4)
with open('rating/RcdRating_one.csv', 'w', newline='')as f:
    writer = csv.writer(f)
    writer.writerow(RcdRating)
fig = plt.figure()
ax1 = fig.add_subplot(2, 2, 1)
ax2 = fig.add_subplot(2, 2, 2)
ax3 = fig.add_subplot(2, 2, 3)
ax4 = fig.add_subplot(2, 2, 4)
ax1.bar(X, RcdRating, 0.5, color="green")
ax2.bar(X, FavRating, 0.5, color="green")
ax3.bar(X, RouteRating, 0.5, color="green")
ax4.bar(X, PopulationRating, 0.5, color="green")
plt.show()
