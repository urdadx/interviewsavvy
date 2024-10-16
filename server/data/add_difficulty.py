import pandas as pd
import json
import Levenshtein
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

# Read CSV files
q_meta = pd.read_json("q_meta_merged.json")
q_diff = pd.read_csv("q_diff.csv")


# Function to find the closest match using Levenshtein distance
def find_closest_match(title, q_diff):
    closest_match = None
    smallest_distance = float("inf")

    logging.info(f"Finding closest match for title: {title}")

    for _, row in q_diff.iterrows():
        distance = Levenshtein.distance(title, row["Question"])
        logging.debug(
            f"Comparing with question: {row['Question']}, distance: {distance}"
        )
        if distance < smallest_distance:
            smallest_distance = distance
            closest_match = row

    logging.info(
        f"Closest match found: {closest_match['Question']} with distance: {smallest_distance}"
    )
    return closest_match


# Merge data
merged_data = []

for index, meta_row in q_meta.iterrows():
    logging.info(f"Processing row {index + 1}/{len(q_meta)}: {meta_row['title']}")
    closest_match = find_closest_match(meta_row["title"], q_diff)
    if closest_match is not None:
        merged_row = meta_row.to_dict()
        merged_row["Difficulty"] = closest_match["Difficulty"]
        merged_data.append(merged_row)
    else:
        logging.warning(f"No match found for title: {meta_row['title']}")

# Write merged data to JSON file
with open("q_dump.json", "w") as f:
    json.dump(merged_data, f, indent=2)

logging.info("Merged data has been written to q_dump.json")
