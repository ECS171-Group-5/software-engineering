import requests
import pandas as pd

def get_symbol(symbol):
    url = "http://d.yimg.com/autoc.finance.yahoo.com/autoc?query={}&region=1&lang=en".format(symbol)

    result = requests.get(url).json()

    for x in result['ResultSet']['Result']:
        if x['symbol'] == symbol:
            return x['name']


df = pd.read_csv("/Users/nathankong/software-engineering/test.csv")

names = []
for name in df['symbol']:
    names.append(get_symbol(name))

df["Names"] = pd.Series(names)
print(df["Names"])

df.to_csv("/Users/nathankong/software-engineering/result.csv")