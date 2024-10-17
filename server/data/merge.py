import json

# Load the first JSON file
with open("q_meta.json", "r") as file1:
    q_meta = json.load(file1)

# Load the second JSON file
with open("q_meta_xtra.json", "r") as file2:
    q_meta_xtra = json.load(file2)

# Concatenate the two lists of data
merged_data = q_meta + q_meta_xtra

# Save the merged data into a new JSON file
with open("q_meta_merged.json", "w") as merged_file:
    json.dump(merged_data, merged_file, indent=4)

print("Files merged successfully!")
