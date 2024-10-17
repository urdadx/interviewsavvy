import pandas as pd


def convert_parquet_to_json(data):
    df = pd.read_parquet(data)
    df.to_json("train.json", orient="records")


convert_parquet_to_json("train.parquet")



