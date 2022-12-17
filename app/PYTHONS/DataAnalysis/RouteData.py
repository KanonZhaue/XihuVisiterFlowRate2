import csv

import numpy as np
import xlrd

xlsx = xlrd.open_workbook('data/westlake_route.xlsx')
data = xlsx.sheets()[0]
RouteData = np.zeros((36, 36),dtype=int)
for i in range(0, 36):
    for j in range(0, i + 1):
        RouteData[i][j] = int(data.row(i)[j].value)
for i in range(0, 36):
    for j in range(0, 36):
        if i < j:
            RouteData[i][j] = RouteData[j][i]
f = open('data/RouteData.csv', 'w', newline='')
with f:
    writer = csv.writer(f)
    writer.writerows(RouteData)
