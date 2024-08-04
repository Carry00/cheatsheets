# 检查 Elasticsearch 服务器状态
curl -X GET "localhost:9200/_cluster/health?pretty"

# 获取集群信息
curl -X GET "localhost:9200/_cluster/stats?pretty"

# 查看节点信息
curl -X GET "localhost:9200/_nodes?pretty"

# 查看所有索引
curl -X GET "localhost:9200/_cat/indices?v"

# 查看索引的详细信息
curl -X GET "localhost:9200/<index_name>?pretty"

## 索引管理

# 创建索引
curl -X PUT "localhost:9200/<index_name>?pretty"

# 删除索引
curl -X DELETE "localhost:9200/<index_name>?pretty"

# 打开索引
curl -X POST "localhost:9200/<index_name>/_open?pretty"

# 关闭索引
curl -X POST "localhost:9200/<index_name>/_close?pretty"

# 刷新索引
curl -X POST "localhost:9200/<index_name>/_refresh?pretty"

# 压缩索引
curl -X POST "localhost:9200/<index_name>/_forcemerge?pretty"

## 文档操作

# 在指定索引中创建或更新文档
curl -X PUT "localhost:9200/<index_name>/_doc/<document_id>?pretty" -H 'Content-Type: application/json' -d'
{
  "field1": "value1",
  "field2": "value2"
}'

# 获取文档
curl -X GET "localhost:9200/<index_name>/_doc/<document_id>?pretty"

# 删除文档
curl -X DELETE "localhost:9200/<index_name>/_doc/<document_id>?pretty"

# 搜索文档
curl -X GET "localhost:9200/<index_name>/_search?q=<search_term>&pretty"

## 别名管理

# 查看所有别名
curl -X GET "localhost:9200/_cat/aliases?v"

# 给索引添加别名
curl -X POST "localhost:9200/_aliases?pretty" -H 'Content-Type: application/json' -d'
{
  "actions": [
    {
      "add": {
        "index": "<index_name>",
        "alias": "<alias_name>"
      }
    }
  ]
}'

# 删除索引的别名
curl -X POST "localhost:9200/_aliases?pretty" -H 'Content-Type: application/json' -d'
{
  "actions": [
    {
      "remove": {
        "index": "<index_name>",
        "alias": "<alias_name>"
      }
    }
  ]
}'

## 模板管理

# 创建模板
curl -X PUT "localhost:9200/_template/<template_name>?pretty" -H 'Content-Type: application/json' -d'
{
  "index_patterns": ["<index_pattern>*"],
  "settings": {
    "number_of_shards": 1
  },
  "mappings": {
    "properties": {
      "field1": {
        "type": "text"
      }
    }
  }
}'

# 获取模板
curl -X GET "localhost:9200/_template/<template_name>?pretty"

# 删除模板
curl -X DELETE "localhost:9200/_template/<template_name>?pretty"

# Elasticsearch Reindex 索引命令 (使用 curl)
# 创建新索引（目标索引）
curl -X PUT "localhost:9200/<new_index_name>?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "field1": { "type": "text" },
      "field2": { "type": "keyword" }
    }
  }
}'

# 从源索引重新索引到目标索引
curl -X POST "localhost:9200/_reindex?pretty" -H 'Content-Type: application/json' -d'
{
  "source": {
    "index": "<source_index_name>"
  },
  "dest": {
    "index": "<dest_index_name>"
  }
}'

# 查看重新索引任务的状态
curl -X GET "localhost:9200/_tasks?actions=*reindex&detailed=true&pretty"
