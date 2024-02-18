#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <input_video_path> <output_path> <filename>"
    exit 1
fi

# Extract arguments
input_path="$1"
output_gltf_path="$2"
filename="$3"

# Create a temporary directory to store image frames
temp_dir=$(mktemp -d)

# Use FFMPEG to extract frames from the video
./ffmpeg -i "$input_path" -r 2 "$temp_dir/output_frame_%04d.png"

# Run Photogrammetry on the extracted frames
# photogrammetry_output_dir="./outputs"

./HelloPhotogrammetry "$temp_dir" "/Users/nathill/Desktop/photogrammetry_output_dir/$filename.usdz" -d raw -o sequential -f normal
# for image_file in "$temp_dir"/*.png; do
#     image_folder=$(dirname "$image_file")
#     image_filename=$(basename -- "$image_file")
#     image_filename_noext="${image_filename%.*}"
#     output_usdz_path="$photogrammetry_output_dir/${image_filename_noext}.usdz"
# done

# Convert USDZ to GLTF
usd2gltf -i "/Users/nathill/Desktop/photogrammetry_output_dir/$filename.usdz" -o "$output_gltf_path"

# Clean up temporary directory
rm -r "$temp_dir"

echo "GLTF file generated: $output_gltf_path"