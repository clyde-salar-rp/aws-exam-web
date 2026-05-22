# AWS Shared Responsibility Model

The AWS shared responsibility model groups services into three categories based on ownership of administrative tasks: **fully managed**, **managed**, and **unmanaged**.

---

## Service Categories

### Fully Managed

AWS handles nearly all operational tasks — provisioning, scaling, patching, backups, performance optimization, and security. Built-in monitoring and metrics are also provided. Customers are only responsible for designing data structures and managing access controls.
![](/images/Pasted%20image%2020260424171501.png)

---

### Managed

AWS handles routine tasks like backups, patching, and hardware provisioning. Customers are responsible for database configuration, query optimization, and performance tuning decisions.
![](/images/Pasted%20image%2020260424171517.png)

---

### Unmanaged

Customers are responsible for installation, configuration, patching, maintenance, security, backups, high availability setup, and performance optimization. A typical example is a database system like MySQL installed directly on an Amazon EC2 instance.

![](/images/Pasted%20image%2020260424171532.png)


# Relational Databases

Relational databases store data in a way that relates it to other pieces of data, using structured query language (SQL) to manage and query it. This approach works well for applications requiring structured, consistent, and scalable data management.

AWS offers fully managed relational database solutions that remove the burden of database administration while maintaining high availability and security. Supported engines include MySQL, PostgreSQL, and Oracle, making it easier to migrate existing databases to AWS.

**Example — restaurant inventory system:**

|ID|Product Name|Size|Price|
|---|---|---|---|
|1|Medium roast ground coffee|12 oz.|$13.95|
|2|Single-origin whole bean coffee|12 oz.|$21.95|

---

## Amazon Relational Database Service (Amazon RDS)

Amazon RDS is a _managed_ relational database service that handles routine tasks such as backups, patching, and hardware provisioning. It supports multiple instance class types optimized for memory, performance, or I/O.

RDS offers Multi-AZ deployment, automated backups, and manual DB snapshots for point-in-time recovery or long-term archiving. Security features include network isolation, encryption in transit, and encryption at rest. Database resources can be scaled vertically or horizontally as needed.

**Supported engines:** Amazon Aurora, MySQL, PostgreSQL, Microsoft SQL Server, MariaDB, and Oracle Database.

**Use cases:** Web applications, enterprise workloads, and e-commerce product inventories.

### Benefits

|Benefit|Description|
|---|---|
|**Cost Optimization**|No upfront hardware costs — pay only for compute and storage consumed. Automated administration reduces operational expenses.|
|**Multi-AZ Deployment**|Automatically replicates data to a standby instance in a different AZ and fails over without manual intervention during outages or maintenance.|
|**Performance Optimization**|Automates resource allocation, monitoring, and optimization. Read replicas offload traffic from the primary instance, and Performance Insights provide real-time bottleneck analysis.|
|**Security Controls**|Multiple protection layers including VPC isolation, encryption at rest and in transit, automated backups, and Multi-AZ resiliency.|

---

## Amazon Aurora

Aurora is a _managed_ relational database designed to minimize unnecessary I/O operations. Compatible with MySQL and PostgreSQL, it automatically scales with your workloads and replicates data across multiple Availability Zones for durability and fault tolerance. It includes automated backups, encryption at rest, and continuous monitoring.

**Use cases:** Gaming applications, media and content management, and real-time analytics.

### Benefits

| Benefit                                      | Description                                                                                                                                                                  |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High Performance and Availability**        | Delivers up to 5× the throughput of standard MySQL and 3× that of PostgreSQL, using a distributed storage system across multiple nodes.                                      |
| **Automated Storage and Backup**             | Storage scales automatically from 10 GB to 128 TB based on actual usage. Continuously backs up to Amazon S3 with point-in-time recovery.                                     |
| **Advanced Replication and Fault Tolerance** | Replicates data across three AZs with six copies, providing 99.99% availability. Automatically detects failures and redirects traffic to healthy replicas without data loss. |


# NoSQL Databases

NoSQL databases are sometimes referred to as non-relational databases because their structures are different than relational databases like Amazon RDS. Instead of row and column relationships, NoSQL databases build a structure for the data that they contain using key-value pairs instead. With key-value pairs, data is organized into items identified by unique keys.

Each key has one or more associated attributes, or values, that represent various characteristics of the data. You can think of a key as a word entry in a dictionary, and the value as its associated definition. Not every item in the table has to have the same attributes, and you can add or remove attributes at any time.

**Example — key-value data structure:**

|Key|Value|
|---|---|
|1|Name: John Doe, Address: 123 Any Street, Favorite drink: Medium latte|
|2|Name: Mary Major, Address: 100 Main Street, Birthday: July 5, 1994|

---

## Amazon DynamoDB

DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance for both document and key-value data structures. It's a powerful and incredibly fast database option for use cases that require a flexible schema, and is ideal for applications that require high performance and seamless scaling.

DynamoDB seamlessly scales alongside your data without impacting performance, which means that you only pay for the resources that you use. It also includes built-in security features for enhanced protection, and automatically spreads your data across multiple servers to handle your workload.

**Use cases:** Gaming platforms, financial service applications, and mobile applications with global user bases.

### Benefits

|Benefit|Description|
|---|---|
|**Scalability with Provisioned Capacity**|Automatically scales throughput up or down based on actual usage, ensuring consistent performance without manual intervention. You can specify target utilization levels, and DynamoDB provisions capacity to maintain those targets. No practical limits on table size or amount of data stored.|
|**Consistent High Performance**|Delivers single-digit millisecond response times at any scale. Maintains consistent performance by automatically distributing data across multiple servers and SSDs.|
|**High Availability and Durability**|Delivers 99.999% data availability by replicating data across three distinct facilities within each AWS Region. Maintains multiple copies in separate AWS Regions for built-in fault tolerance and data durability.|
|**Data Encryption**|Offers comprehensive encryption at rest and in transit. All data is automatically encrypted before being written to the storage layer, with flexibility to choose between different encryption key types for customized security control.|

# In-Memory Caches

An in-memory cache is a high-speed storage layer that temporarily stores frequently accessed data in RAM. Retrieval from RAM is often hundreds or thousands of times faster than traditional disk-based storage.

When applications need data, they check the cache first before querying the original source. This reduces load on primary databases and speeds up response times. In-memory caches are ideal for session data, API responses, database query results, and other repeatedly accessed information.

---

## Amazon ElastiCache

ElastiCache is a fully managed in-memory caching service that reduces the complexity of administering caching systems. It supports Redis, Valkey, and Memcached — allowing you to use existing tools and configurations while scaling your workloads. It automatically detects and replaces failed nodes, making it well-suited for applications that require consistent high performance.

**Use cases:** Session data management, database query enhancement, and gaming leaderboards.

### Benefits

|Benefit|Description|
|---|---|
|**High Performance**|Streamlines deployment and maintenance of Redis, Valkey, and Memcached environments by automating hardware provisioning, software patching, and monitoring. Supports seamless scaling by adding or removing nodes as demand changes.|
|**High Availability**|Continuously monitors primary nodes for failures. When issues are detected, automatically promotes a replica to primary without manual intervention — typically completing recovery within minutes.|
|**Multi-AZ Replication**|Automatically replicates data across multiple Availability Zones. Primary and replica nodes can be configured across different AZs to ensure data remains accessible even if one zone goes down.|
|**Data Encryption**|Supports encryption at rest (covering disk storage and automated backups) and in-transit encryption via TLS between clients and cache nodes.|


# Amazon DocumentDB

Amazon DocumentDB (with MongoDB compatibility) is a fully managed service designed for semistructured data — information that doesn't conform to rigid relational schemas. It manages JSON-like documents with dynamic schemas, making it ideal for applications that require frequent schema changes and document-oriented data.

Unlike relational or nonrelational databases, DocumentDB lets you iterate quickly without predefined schemas. It stores, queries, and indexes JSON data while providing automatic scaling, continuous backup, and enterprise-grade security.

**Use cases:** Content management systems, catalog and inventory management, and user profile and personalization systems.

## Benefits

|Benefit|Description|
|---|---|
|**MongoDB Compatibility**|Fully compatible with MongoDB APIs, drivers, and tools, so existing code and skills transfer without modification. Migrate MongoDB applications with minimal code changes.|
|**Performance and Scalability**|Automatically scales storage up to 64 TB in 10 GB increments. Handles millions of requests per second with consistent performance, and supports scaling compute resources up or down as needed.|
|**Increased Read Throughput**|Supports up to 15 replica instances sharing underlying storage to improve read throughput for high-volume applications.|

---

# AWS Backup

AWS Backup streamlines data protection across AWS resources and on-premises deployments through a single dashboard for monitoring and managing backups. It supports multiple storage types — including EBS volumes, EFS file systems, and various databases — eliminating the complexity of managing multiple backup strategies.

AWS Backup centralizes and automates data protection, improving consistency and reducing administrative overhead. It offers flexible scheduling, encryption, and cross-Region backup support for enhanced disaster recovery.

**Use cases:** Centralized disaster recovery, enforcing consistent backup policies for compliance, and consolidating multiple backup processes through a single interface.

## Benefits

|Benefit|Description|
|---|---|
|**Centralized Backup Management**|Single dashboard to manage backups across multiple AWS services and accounts. Monitor jobs, restore points, and compliance status from one place. Automated backup schedules can be set to protect new resources as they're created.|
|**Cross-Region Redundancy**|Automatically replicates backup data across AWS Regions for disaster recovery. Enables fast restoration from secondary Regions and helps meet compliance requirements during Regional failures.|
|**Streamlined Regulatory Compliance**|Maintains detailed audit logs and reports to demonstrate compliance. Enforces backup policies across your organization and tracks backup activity for security purposes.|

---

# Amazon Neptune

Neptune is a fully managed, purpose-built graph database service for highly connected datasets — such as those used in social networking applications. It excels at identifying complex relationships that are difficult to model in traditional relational databases, like user connections, friend networks, and interaction patterns. Neptune maintains high performance as data complexity grows, with automatic failover and backups.

**Use cases:** Social network connection mapping, fraud detection systems, and search and recommendation systems.

## Benefits

| Benefit                                     | Description                                                                                                                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose-Built for Complex Relationships** | Optimized for storing and querying highly connected data using graph models. Supports both property graph and RDF models, making it ideal for relationship mapping and pattern matching.             |
| **High Performance and Scalability**        | Processes billions of relationships in milliseconds with consistent performance. Automatically grows storage up to 64 TB, with a purpose-built engine that optimizes graph query traversal at scale. |


## Key concepts

Both AI/ML and data analytics are supported by good data. Let's review ways in which data is prepared and used by analysts.

- ### Data pipelines for ETL processes
    
    Both AI/ML and traditional data analytics need clean and accessible data in a format that's usable by analytics tools and AI algorithms. ETL processes are used for this purpose. With ETL, you perform the following steps:
    
    1. _Extract_ the data from various sources and store it.
        
    2. _Transform_ it into a consistent, usable format for downstream tools to consume.
        
    3. _Load_ it into a destination system, like a data warehouse or analytics platform.
        
    
    Data pipelines are automated assembly lines used to make the ETL process efficient and repeatable. AWS has a suite of integrated services so you can build your own data pipelines. ![](/images/Pasted%20image%2020260424195751.png)
- ### Data analytics
    
    Data analytics is when analysts transform raw historical data to uncover valuable insights and trends. This traditional data analysis can apply to important use cases, such as the following:
    
    - Loan companies explaining lending decisions to customers.
        
    - Medical researchers analyzing clinical trial data through hypothesis testing.
        
    - Insurance companies making their risk assessment models transparent for regulators.
    ![](/images/Pasted%20image%2020260424195827.png)


# AWS Data Pipeline Services

---

## Data Ingestion
![](/images/Pasted%20image%2020260424200919.png)
Data ingestion moves data from source systems into your chosen storage solution. Use **real-time ingestion** when data is needed immediately; use **batch ingestion** when some latency is tolerable.

|Service|Description|
|---|---|
|**Amazon Kinesis Data Streams**|Real-time ingestion of terabytes of data from applications, streams, and sensors. Serverless with automatic provisioning and scaling in on-demand mode.|
|**Amazon Data Firehose**|Near real-time ingestion with automatic provisioning and scaling. Delivers data within seconds to data lakes, warehouses, and analytics services.|

---

## Data Storage
![](/images/Pasted%20image%2020260424200931.png)
Data from multiple sources is commonly consolidated into a single location. Two main options: **data lakes** for vast amounts of raw data, or **data warehouses** for structured, BI-optimized data.

|Service|Description|
|---|---|
|**Amazon S3**|Popular choice for data lakes. Stores virtually any amount of structured or unstructured data securely. Fully elastic — scales automatically as data is added or removed.|
|**Amazon Redshift**|Fully managed data warehouse storing petabytes of structured or semistructured data. Pay-as-you-go pricing makes large-scale analysis cost-effective.|

---

## Data Cataloging
![](/images/Pasted%20image%2020260424200939.png)
Cataloging data with metadata creates an inventory of your organization's data assets and improves discoverability across pipelines.

|Service|Description|
|---|---|
|**AWS Glue Data Catalog**|Centralized, scalable, managed metadata repository. Improves data pipeline efficiency by delivering metadata to various data stores and analytics services.|

---

## Data Processing
![](/images/Pasted%20image%2020260424200947.png)
Processing services clean and transform data so it's ready for analysis.

|Service|Description|
|---|---|
|**AWS Glue**|Fully managed ETL service for simpler, faster, and cost-effective data preparation. ETL jobs can use the Glue Data Catalog to access metadata and inform transformations.|
|**Amazon EMR**|Ideal for large-scale data processing and teams with existing big data expertise. Handles infrastructure provisioning, cluster management, and scaling. Supports Apache Spark, Hadoop, and Hive.|

---

## Data Analysis & Visualization
![](/images/Pasted%20image%2020260424200955.png)
Query and visualization tools help surface important insights from your data.

| Service                       | Description                                                                                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Amazon Athena**             | Serverless SQL query service for analyzing data in relational, nonrelational, object, and custom sources — including S3, on-premises, and multi-cloud. Pay only for queries you run.             |
| **Amazon Redshift**           | Columnar storage and massively parallel processing make it ideal for complex SQL queries on large datasets with frequent, high-performance analytical workloads.                                 |
| **Amazon QuickSight**         | Interactive dashboards and reports for both technical and non-technical users — no infrastructure to manage. Amazon Q in QuickSight enables natural language queries for fast insight discovery. |
| **Amazon OpenSearch Service** | Search via precise keyword matching or natural language queries. Unified dashboards provide real-time visualization for monitoring logs, traces, and metrics.                                    |


## 

Data analytics and AI/ML architecture diagram

**Delivering customer data for analysis and ML model training**

Let's review the solution discussed in the video. An e-commerce company uses an automated data pipeline to ingest, process, and deliver data to multiple stakeholders. As a result, data scientists and ML engineers can use the same data set for analysis and ML model training.

To review the steps that make up the solution, choose each of the eight numbered markers.
![](/images/Pasted%20image%2020260424200727.png)
1. ### Make recommendations

An e-commerce company uses an ML model to make product recommendations.
2. ### Store app data

An Amazon DynamoDB database stores the historical customer data gathered through the app. This makes sense for low-latency reads and writes but isn't ideal for ML model training.
3. ## Ingest data

Kinesis Data Streams ingests the data from DynamoDB. Amazon Data Firehose then aggregates the data.
4. ## Process data

The data is in JSON format, so Firehose invokes an AWS Lambda function that transforms the data into .csv format.
5. ## Deliver data

Firehose then delivers the data to the company's Amazon S3 data lake, where it is available for multiple consumers.
6. ## Catalog data

AWS Glue Data Catalog serves as a metadata repository with tables that describe the schema and location of the Amazon S3 data.
7. ## Perform data analytics

Data scientists use Athena to gather insights through queries.
8. ## Train model

SageMaker AI reads the same dataset directly from Amazon S3. ML engineers can then train new versions of the recommendation model using the latest information.