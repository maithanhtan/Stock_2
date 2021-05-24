import numpy
import numpy as np
import pandas

def sma(input, begin, range):
    # item = input[1]
    # print(item)
    data = input[begin:begin + range, 16]
    # print(data)
    sum = 0
    for i in data:
        sum += float(i)
    return sum / range


def ema(input, begin, range):
    # item = input[1]
    # print(item)
    sma_yesterday = sma(input, begin + 1, range)
    # print(sma_yesterday)
    price_today = float(input[begin, 16])
    # print(price_today)
    k = 2 / (range + 1)
    return price_today * k + sma_yesterday * (1 - k)


def avg_volumn(input, begin, range):
    # item = input[1]
    # print(item)
    data = input[begin:begin + range, 18]
    # print(data)
    sum = 0
    for i in data:
        sum += float(i)
    sum = sum / 1000000
    return sum / range

def macd(input):
    input_df = pandas.DataFrame(data=input)
    ticker = input_df.filter([16]).copy()
    ticker = pandas.DataFrame(data=ticker[16].values[::-1])
    exp1 = ticker.ewm(span=12, adjust=False).mean()
    exp2 = ticker.ewm(span=26, adjust=False).mean()
    # macd
    macd = exp1 - exp2
    # tín hiệu
    signal = macd.ewm(span=9, adjust=False).mean()
    return numpy.array(macd)[::-1][:,0], numpy.array(signal)[::-1][:,0]



