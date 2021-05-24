import numpy as np
import csv
import tensorflow as tf
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.multiclass import OneVsRestClassifier
from sklearn.svm import SVC

import utils

r = csv.reader(open('../output/data_acb.csv'))
data_csv = np.array(list(r)[1:])

data_ai = []
data_result = []
data_result2 = []
macd, signalmacd = utils.macd(data_csv)


print(macd)
print(signalmacd)
# print(macd[0])
# print(signalmacd[0])
# print(macd[0] - signalmacd[0])

for i in range(len(data_csv) - 200):
    row = []
    predict_range = 5
    j = i + predict_range
    price_i = float(data_csv[i][16])
    price_j = float(data_csv[j][16])
    change = (utils.sma(data_csv, i, predict_range) / price_j - 1) * 100
    # if (change > 0):
    #     if change > 5:
    #         data_result.append(3)
    #     else:
    #         if change > 2:
    #             data_result.append(2)
    #         else:
    #             data_result.append(1)
    # else:
    #     if change < -5:
    #         data_result.append(-3)
    #     else:
    #         if change < -2:
    #             data_result.append(-2)
    #         else:
    #             data_result.append(-1)

    data_result.append(1 if change > 0 else 0)
    row.append(utils.sma(data_csv, j, 5) / price_j)
    row.append(utils.sma(data_csv, j, 10) / price_j)
    row.append(utils.sma(data_csv, j, 20) / price_j)
    # row.append(utils.sma(data_csv, j, 50) / price_j)
    # row.append(utils.sma(data_csv, j, 100) / price_j)
    # row.append(utils.sma(data_csv, j, 200) / price_j)

    row.append(utils.ema(data_csv, j, 5) / price_j)
    row.append(utils.ema(data_csv, j, 10) / price_j)
    row.append(utils.ema(data_csv, j, 20) / price_j)
    # row.append(utils.ema(data_csv, j, 50) / price_j)
    # row.append(utils.ema(data_csv, j, 100) / price_j)
    # row.append(utils.ema(data_csv, j, 200) / price_j)
    # row.append(price_j/float(data_csv[j + 1][16]))
    # row.append(macd[j]- signalmacd[j])
    # row.append(signalmacd[j])
    # row.append(price_j / float(data_csv[j + predict_range][16]))

    # row.append(utils.avg_volumn(data_csv, j, 5)/utils.avg_volumn(data_csv, j+5, 30))
    data_ai.append(row)

print(data_ai[50])
print(data_result)
X_train, X_test, y_train, y_test = train_test_split(data_ai, data_result, test_size=0.6, random_state=42)

## model =  LogisticRegression(solver='liblinear', random_state=0)
# model = SVC(gamma='scale')
# model.fit(X_train, y_train)
# y_pred = model.predict(X_test)
# print(classification_report(y_test, y_pred))
model = tf.keras.models.Sequential([
    # tf.keras.layers.Conv2D(filters=256, kernel_size=(6, 300)),
    # tf.keras.layers.MaxPool2D(pool_size=(5, 1), strides=None, padding='valid'),
    # tf.keras.layers.Flatten(data_format=None),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(16, activation='relu'),
    # tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam',
              loss='mean_squared_error',
              metrics=['accuracy'])


model.fit(X_train, y_train, epochs=10, batch_size=64)

evalue = model.evaluate(X_test, y_test, verbose=2)
print(evalue)

predict = model.predict(X_test)
print(classification_report(y_test, predict.round()))

model.summary()
# model.save('model_7_epoch/model_{}_{}'.format(position, k))
