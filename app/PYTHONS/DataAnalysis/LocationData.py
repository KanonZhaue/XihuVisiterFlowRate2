# ArrivedData为二维数组，[x,y]为0表示没去过，反之为去过
# PopulationData 为一维数组，表示某个景区的人数
# LocationData 为一维数组，表示游客当前所在位置
import csv
import random

import numpy as np

ArrivedData = np.zeros((5000, 36), dtype=int)
PopulationData = np.zeros(36, dtype=int)
LocationData = np.zeros(5000, dtype=int)
# 以游客为基准创建数据
for i in range(0, 5000):
    # 游客抵达已经的景区个数
    a = random.randint(1, 3)
    b = 0
    for j in range(1, a+1):
        b = int((random.randint(0, 35**2))**0.5)
        ArrivedData[i][b] = 1
    PopulationData[b] += 1
    LocationData[i] = b
f = open('data/ArrivedData.csv', 'w', newline='')
with f:
    writer = csv.writer(f)
    writer.writerows(ArrivedData)

f = open('data/PopulationData.csv', 'w', newline='')
with f:
    writer = csv.writer(f)
    writer.writerow(PopulationData)

f = open('data/LocationData.csv', 'w', newline='')
with f:
    writer = csv.writer(f)
    writer.writerow(LocationData)
