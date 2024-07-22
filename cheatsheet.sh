#!/bin/bash

# 映射 URL 的接口
mapping_url="https://gist.githubusercontent.com/Carry00/6e526b8751f667f667a9be540d015939/raw/fd8b0224f17ef3c4d2d49e2196bafc2f82dba1a1/command_mapping"

# 函数：获取所有命令及其对应的 Gist URL
get_all_commands() {
  curl -s "${mapping_url}" | jq -r 'keys[]'
}

# 函数：获取命令对应的 Gist URL
get_gist_url() {
  command=$1
  curl -s "${mapping_url}" | jq -r --arg cmd "$command" '.[$cmd]'
}

# 检查输入参数
if [ $# -eq 0 ]; then
  # 获取所有命令
  commands=$(get_all_commands)
  echo "Available commands:"
  echo "$commands" | xargs -n 10
  exit 0
elif [ $# -ne 1 ]; then
  echo "Usage: $0 <command>"
  exit 1
fi

# 获取输入命令
command=$1

# 获取对应的 Gist URL
gist_url=$(get_gist_url "$command")

if [ -z "$gist_url" ]; then
  echo "Command not found."
  exit 1
fi

# 使用 curl 请求 Gist 内容并显示
curl -s "$gist_url"
