
# COLUMN_CHECK
SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE table_name='my_table_name' 
  AND COLUMN_NAME IN ('my_column_name1', 'my_column_name2');

# Get Table Sizes in MB
SELECT table_name AS `Table`, 
       ROUND((data_length + index_length) / 1024 / 1024, 2) AS `Size (MB)` 
FROM information_schema.tables 
WHERE table_schema = 'your_schema_name' 
ORDER BY data_length DESC;

# Count Distinct Values
SELECT COUNT(DISTINCT your_column) AS distinct_count, 
       COUNT(*) AS total_count, 
       COUNT(DISTINCT your_column) / COUNT(*) AS distinctiveness 
FROM your_table;

# Convert Character SET
SELECT TABLE_SCHEMA AS '数据库', 
       TABLE_NAME AS '表', 
       TABLE_COLLATION AS '排序规则', 
       CONCAT('ALTER TABLE ', TABLE_SCHEMA, '.', TABLE_NAME, ' CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;') AS '修正表规则SQL' 
FROM information_schema.TABLES 
WHERE TABLE_COLLATION != 'utf8mb4_unicode_ci' 
  AND TABLE_SCHEMA NOT IN ('sys', 'mysql', 'performance_schema', 'information_schema');


# Kill Processes Exceeding 20 Seconds (Not in SLEEP State)
SELECT user,CONCAT('KILL ', id, ';') kill_command,time   FROM information_schema.processlist  WHERE COMMAND != 'Sleep'    AND TIME > 10 ;

# 双1
set global  innodb_flush_log_at_trx_commit=1;
set global  sync_binlog=1;
