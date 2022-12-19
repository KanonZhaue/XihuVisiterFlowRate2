import csv
import os
import json
import flask 
import numpy as np
from flask_cors import CORS
import random

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

@app.route("/getRectData",methods=['POST'])#该算法由PYTHON的rcdRating中获得
def getRectData():
    requests = json.loads(flask.request.form.get('data'))
    print(requests)
    pp = requests['pp']
    pr = requests['pr']
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

    returnData = {}
    returnData['data']=RcdRating.tolist()

    
    return json.dumps(returnData)
    
@app.route("/getRiverData",methods=['POST'])#该算法由PYTHON的riverdata中获得
def getRiverData():
    requests = json.loads(flask.request.form.get('data'))
    RouteRating = np.zeros((36, 36))  # 距离评分
    PopulationData = np.zeros(36, dtype=int)  # 景区人口数量
    PopulationRating = np.zeros(36)  # 人口推荐评分
    FavRating = np.zeros((5000, 36))  # 喜爱评分
    LocationData = np.zeros(5000, dtype=int)  # 游客所在位置
    ArrivedData = np.zeros((5000, 36), dtype=int)  # 游客是否抵达过景区
    RcdRating = np.zeros((5000, 36))  # 推荐评分计算
    WP = int(5000 / 36)  # 人口预警值
    Batch = requests['batch']  # 分批次走(1~3~5~10)
    PR = requests['pr']  # 路径权重(0~0.1~0.2~0.3~0.5)
    PP = requests['pp']  # 人口权重(0~0.1~0.2~0.3~0.5)
    AP = requests['ap']  # 游客接受意愿(70~80~90~100)
    timesssss = 10
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

    returnData = {}
    returnData['data']=RiverData.tolist()

    
    return json.dumps(returnData)

@app.route("/getPointsData",methods=['POST'])
def getPointsData():
    with open("./static/data/points.csv",encoding='utf-8')as f:
        textLabel = ['label','x','y','name']
        returnData=[]
        reader = csv.reader(f)
        for row in reader:
            print(row)
            temp={}
            for i in range(len(textLabel)):
                temp[textLabel[i]] = (row[i])
            returnData.append(temp)
    
    return json.dumps(returnData)


@app.route("/getPolygonData",methods=['POST'])
def getPolygonData():
    with open("./static/data/radar.csv",encoding='utf-8')as f:
        textLabel = ['id','name','age','sex','cost','exerciseAbility','travelType']
        returnData=[]
        reader = csv.reader(f)
        for row in reader:
            print(row)
            temp={}
            for i in range(len(textLabel)):
                temp[textLabel[i]] = (row[i])
            returnData.append(temp)
    
    return json.dumps(returnData)


if __name__ == "__main__":
    app.run(debug=True)


