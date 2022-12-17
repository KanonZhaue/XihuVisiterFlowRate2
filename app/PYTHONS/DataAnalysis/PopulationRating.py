import csv

import numpy as np

a = int(5000/36)
print(a)
PopulationData = np.zeros(36, dtype=int)
PopulationRating = np.zeros(36)
f = open('data/PopulationData.csv', 'r')
with f:
    i = 0
    reader = csv.reader(f)
    for row in reader:
        for num in row:
            PopulationData[i] = num
            i += 1
Sum = sum(PopulationData)
for i in range(0, 36):
    PopulationRating[i] = round((a - PopulationData[i]) / (a-min(PopulationData)), 4)
f = open('rating/PopulationRating.csv', 'w', newline='')
with f:
    writer = csv.writer(f)
    writer.writerow(PopulationRating)
