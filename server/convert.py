import pandas as pd

def convert_parquet_to_json(data):
    df = pd.read_parquet(data)
    df.to_json('data.json', orient='records')
    

convert_parquet_to_json('test.parquet')