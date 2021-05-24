import csv
import numpy as np
import pandas
import pandas_datareader as pdr
import datetime as dt
import matplotlib.pyplot as plt

start = dt.datetime(2020, 1, 1)
end = dt.datetime.now()

# r = csv.reader(open('../output/data_acb.csv'))
data_csv = pandas.read_csv('../output/data_acb.csv')

ticker = data_csv.filter([ 'close']).head(100).copy()
ticker = pandas.DataFrame(data=ticker['close'].values[::-1])
exp1 = ticker.ewm(span=12, adjust=False).mean()
exp2 = ticker.ewm(span=26, adjust=False).mean()
#macd
macd = exp1 - exp2
#tín hiệu
signal = macd.ewm(span=9, adjust=False).mean()
print(macd)
print(signal)

print(macd - signal)
