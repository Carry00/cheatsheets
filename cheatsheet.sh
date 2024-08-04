#!/bin/bash

# 检查是否传入参数
if [ $# -eq 0 ]; then
    echo "Usage: $0 <parameter>"
    exit 1
fi

# 获取传入的参数
param=$1

# 构建URL
url="https://raw.githubusercontent.com/Carry00/cheatsheets/master/${param}"

# 使用curl请求URL并输出内容
response=$(curl -s "$url")

# 输出响应内容
echo "$response"