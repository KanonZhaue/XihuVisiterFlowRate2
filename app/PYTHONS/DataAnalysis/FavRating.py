import csv
import numpy as np
import torch
import matplotlib.pyplot as plt

PATH = "data/lgn-111-6-64.pth.tar"
model = torch.load(PATH, map_location='cpu')

# print(model)
T_user = model["embedding_user.weight"]
T_item = model["embedding_item.weight"]
rating_data = []
X = []
Y = []
for i in range(-20, 21):
    X.append(i / 20)
    Y.append(0)
print(X)
print(Y)
for count, i in enumerate(T_user):
    rating_l = []
    if count % 100 == 0:
        print("数据分析中:" + str(count) + '/5000')
    for j in T_item:
        a = np.round(torch.cosine_similarity(i, j, 0).numpy(), 4)
        for k in range(0, 41):
            if a <= X[k]:
                Y[k] += 1
                break
        rating_l.append(a)
    rating_data.append(rating_l)
f = open('rating/FavRating.csv', 'w', newline='')
with f:
    writer = csv.writer(f)
    writer.writerows(rating_data)
f = open('rating/FavRating_one.csv', 'w', newline='')
with f:
    writer = csv.writer(f)
    writer.writerow(rating_data[0])
print(Y)
fig = plt.figure()
plt.bar(X, Y, 0.03, color="green")
plt.xlabel("data")
plt.ylabel("count")
plt.title("NULL")
plt.show()
plt.savefig("Fav.jpg")
