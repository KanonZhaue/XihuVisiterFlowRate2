import csv
import random
import numpy as np

RouteRating = np.zeros((36, 36))  # 距离评分
PopulationData = np.zeros(36, dtype=int)  # 景区人口数量
PopulationRating = np.zeros(36)  # 人口推荐评分
FavRating = np.zeros((5000, 36))  # 喜爱评分
LocationData = np.zeros(5000, dtype=int)  # 游客所在位置
ArrivedData = np.zeros((5000, 36), dtype=int)  # 游客是否抵达过景区
RcdRating = np.zeros((5000, 36))  # 推荐评分计算
WP = int(5000 / 36)  # 人口预警值
Batch = 5  # 分批次走(1~3~5~10)
PR = 0.1  # 路径权重(0~0.1~0.2~0.3~0.5)
PP = 0.1  # 人口权重(0~0.1~0.2~0.3~0.5)
AP = 80  # 游客接受意愿(70~80~90~100)
timesssss=10
RiverData = np.zeros((Batch * timesssss, 37), dtype=int)  # 河流图数据（景区人口数量的集合）

with open("rating/RouteRating.csv")as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        for j, n in enumerate(row):
            RouteRating[i][j] = n
with open("data/PopulationData.csv")as f:
    reader = csv.reader(f)
    for row in reader:
        for i, n in enumerate(row):
            PopulationData[i] = row[i]
with open("rating/FavRating.csv")as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        for j, n in enumerate(row):
            FavRating[i][j] = n
with open("data/LocationData.csv")as f:
    reader = csv.reader(f)
    for row in reader:
        for i, n in enumerate(row):
            LocationData[i] = row[i]
with open("data/ArrivedData.csv")as f:
    reader = csv.reader(f)
    for i, row in enumerate(reader):
        for j, n in enumerate(row):
            ArrivedData[i][j] = n

for time in range(0, timesssss):
    for batch in range(0, Batch):
        print("第" + str(time) + "次人口分布,第" + str(batch) + "批次移动,第" + str(time * Batch + batch) + "次移动")
        # 记录上次的人口布局
        RiverData[time * Batch + batch][0] = time * Batch + batch + 1
        RiverData[time * Batch + batch][1:] = PopulationData
        print(np.var(PopulationData))
        # 计算人口评分
        for i in range(0, 36):
            PopulationRating[i] = round((WP - PopulationData[i]) / (WP - min(PopulationData)), 4)
        # 计算推荐评分
        for i in range(batch, 5000, Batch):
            # 游客i对j景区的评分推荐
            for j in range(0, 36):
                # 推荐评分=喜爱评分-距离评分（游客当下的位置信息）+（去往景区的）人口评分
                RcdRating[i][j] = round(
                    FavRating[i][j] - PR * RouteRating[LocationData[i]][j] + PP * PopulationRating[j],
                    4)
        # 对于下一个景区进行选择
        for i in range(batch, 5000, Batch):
            if random.randint(0, 100) <= AP:
                Max = -99.0
                MaxId = 0
                # 寻找推荐评分最大的景区且其并未被浏览过
                for j in range(0, 36):
                    if RcdRating[i][j] >= Max and ArrivedData[i][j] != 1:
                        Max = RcdRating[i][j]
                        MaxId = j
                # 游客发生移动，原景区人数减少，目标景区人数增加，并且标记原景区，游客移动完成
                PopulationData[LocationData[i]] -= 1
                PopulationData[MaxId] += 1
                ArrivedData[i][MaxId] = 1
                LocationData[i] = MaxId

# 全部游客移动完成
with open('rating/RiverData.csv', 'w', newline='')as f:
    fnames = ['index'
        , '1', '2', '3', '4', '5', '6'
        , '7', '8', '9', '10', '11', '12'
        , '13', '14', '15', '16', '17', '18'
        , '19', '20', '21', '22', '23', '24'
        , '25', '26', '27', '28', '29', '30'
        , '31', '32', '33', '34', '35', '36']
    writer = csv.DictWriter(f, fieldnames=fnames)
    writer.writeheader()
    for i in range(0, timesssss * Batch):
        writer.writerow({'index': str(RiverData[i][0]),
                         '1': RiverData[i][1], '2': RiverData[i][2], '3': RiverData[i][3], '4': RiverData[i][4],
                         '5': RiverData[i][5], '6': RiverData[i][6],
                         '7': RiverData[i][7], '8': RiverData[i][8], '9': RiverData[i][9], '10': RiverData[i][10],
                         '11': RiverData[i][11], '12': RiverData[i][12],
                         '13': RiverData[i][13], '14': RiverData[i][14], '15': RiverData[i][15], '16': RiverData[i][16],
                         '17': RiverData[i][17], '18': RiverData[i][18],
                         '19': RiverData[i][19], '20': RiverData[i][20], '21': RiverData[i][21], '22': RiverData[i][22],
                         '23': RiverData[i][23], '24': RiverData[i][24],
                         '25': RiverData[i][25], '26': RiverData[i][26], '27': RiverData[i][27], '28': RiverData[i][28],
                         '29': RiverData[i][29], '30': RiverData[i][30],
                         '31': RiverData[i][31], '32': RiverData[i][32], '33': RiverData[i][33], '34': RiverData[i][34],
                         '35': RiverData[i][35], '36': RiverData[i][36]})
