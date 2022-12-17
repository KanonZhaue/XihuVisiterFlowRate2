import csv

import numpy as np
from matplotlib import pyplot as plt

RouteData = np.zeros((36, 36), dtype=int)
RouteRating = np.zeros((36, 36))
##——————##
X = []
Y = []
count = 0
for i in range(0, 21):
    X.append(i / 20)
    Y.append(0)
##——————##
f = open('data/RouteData.csv', 'r')
with f:
    reader = csv.reader(f)
    i = 0
    for row in reader:
        j = 0
        for num in row:
            RouteData[i][j] = int(num)
            j += 1
        i += 1
for i in range(0, 36):
    for j in range(0, 36):
        a = round(1.0 * RouteData[i][j] / max(RouteData[i]), 4)
        RouteRating[i][j] = a
        ##——————##
        for k in range(0, 21):
            if a <= X[k]:
                Y[k] += 1
                break
        ##——————##
f = open('rating/RouteRating.csv', 'w', newline='')
with f:
    writer = csv.writer(f)
    writer.writerows(RouteRating)
##——————##
fig = plt.figure()
plt.bar(X, Y, 0.03, color="green")
plt.xlabel("data")
plt.ylabel("count")
plt.title("NULL")
plt.show()
plt.savefig("Route.jpg")
##——————##
