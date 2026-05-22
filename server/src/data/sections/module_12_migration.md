## Three phases of the migration process

AWS helps guide companies through the migration process, which can be divided into three sequential phases. From the first phase to the last, there are AWS services and tools to support your migration. Although this is not an exhaustive list of every AWS migration service, these core migration services will help get you on your way.

To learn more about the migration phases, choose each of the numbered markers.

![](/images/Pasted%20image%2020260427145955.png)

### 1. Assess

In this phase, you build the business case for the migration and assess your readiness. One of the services used in this phase is the Migration Evaluator.

### 2. Mobilize

In this phase, you prepare the organization and mobilize the resources needed for the migration. Two services you might use in this phase are AWS Application Discovery Service and the AWS Migration Hub.

### 3. Migrate and Modernize

In this phase, you use your strategy, plan, and the best practices to migrate and modernize. Tools to support you include AWS Application Migration Service and AWS Database Migration Service (AWS DMS). If you are transferring data, you might use AWS DataSync, AWS Transfer Family, and the AWS Snow Family.

While AWS Migration Hub helps you mobilize your resources, you can use it as a one-stop place to also manage during the migrate and modernize phase. You will learn more about Migration Hub and the other migration services in the next lesson.

## Improve your cloud readiness

When you migrate to the AWS Cloud, there are critical planning tasks, many groups of stakeholders, and best practices to consider. With so much to take into account, it can seem overwhelming to even know where to start. That's where the AWS CAF can help.

> **AWS CAF**

The AWS CAF is a framework that brings AWS experience and best practices to companies preparing to migrate to the AWS Cloud. The framework provides tools to help accelerate the migration journey, organize resources, and align management during the transition.

**Benefits:** AWS CAF provides benefits for migrations to reduce business risk and improve sustainability and corporate transparency. Companies can grow revenue by creating new products and services in their cloud transformation. They can also reduce operational costs, increase productivity, and improve customer experience in their new cloud environment.

**Use cases:** You can use AWS CAF to migrate technology like legacy infrastructure and applications. You can also use it to migrate and optimize business processes, operations, and even create new business models with the move to the cloud.

## Functional and business-related stakeholders

There are several groups of stakeholders and various parts of the business to consider in your migration planning and readiness.

## Business

The Business perspective makes sure that IT aligns with business needs and that IT investments link to key business results.

Use the Business perspective to create a strong business case for cloud adoption and prioritize cloud adoption initiatives. Make sure that your business strategies and goals align with your IT strategies and goals.

The following are common Business perspective roles:

- Business managers
    
- Finance managers
    
- Budget owners
    
- Strategy stakeholders
    

## People

The People perspective supports development of an organization-wide change management strategy for successful cloud adoption.

Use the People perspective to evaluate organizational structures and roles, assess new skill and process requirements, and identify gaps. This helps prioritize training, staffing, and organizational changes.

The following are common People perspective roles:

- Human resources
    
- Staffing
    
- People managers
    

## Governance

The Governance perspective focuses on skills and processes to align IT strategy with business strategy. This perspective helps you maximize business value and minimize risks.

Use it to understand how to update the staff skills and processes necessary to maintain business governance in the cloud. Manage and measure cloud investments to evaluate business outcomes.

The following are common Governance perspective roles:

- Chief information officer (CIO)
    
- Program managers
    
- Enterprise architects
    
- Business analysts
    
- Portfolio managers
    

## Platform

The Platform perspective includes principles and patterns for implementing new solutions in the cloud and migrating on-premises workloads to the cloud.

Use a variety of architectural models to understand and communicate the structure of IT systems and their relationships. Describe the architecture of the target state environment in detail.

The following are common Platform perspective roles:

- Chief technology officer (CTO)
    
- IT managers
    
- Solutions architects
    

## Security

The Security perspective makes sure that the organization meets security objectives for visibility, auditability, control, and agility.

Use AWS CAF to structure the selection and implementation of security controls that meet the organization’s needs.

The following are common Security perspective roles:

- Chief information security officer (CISO)
    
- IT security managers
    
- IT security analysts
    

## Operations

The Operations perspective helps you to enable, run, use, operate, and recover IT workloads to the level agreed upon with your business stakeholders.

Define how day-to-day, quarter-to-quarter, and year-to-year business is conducted. Align with and support the operations of the business. AWS CAF helps these stakeholders define current operating procedures and identify the process changes and training needed to implement successful cloud adoption.

The following are common Operations perspective roles:

- IT operations managers
    
- IT support managers

## Seven migration strategies

**The most common paths to the cloud**

When customers are migrating applications to the cloud, they can use seven common migration strategies. The decision on which strategy depends on factors such as the complexity of existing applications, business goals, time constraints, and available resources. Often, organizations will use a combination of these strategies across their application portfolio. By carefully considering each option and aligning it with specific applications and objectives, organizations can create a tailored migration plan that maximizes the benefits of cloud adoption while minimizing risks and disruptions.

To learn more about the migration strategies, choose each of the seven markers.
### 1. Relocate

Relocating is changing the hosting location to the cloud. This could be if applications are already virtual machines (VMs) or containers running on premises and then moving to the cloud.

### 2. Rehost

Rehosting, also known as lift-and-shift, involves moving applications without changes.

In a scenario of a large legacy migration, in which the company is looking to implement its migration and scale quickly to meet a business case, the majority of applications are rehosted.

### 3. Replatform

Replatforming, also known as lift, tinker, and shift, involves making a few cloud optimizations to realize a tangible benefit. Optimization is achieved without changing the core architecture of the application.

### 4. Refactor

Refactoring, also known as re-architecting, involves reimagining how an application is architected and developed by using features built for the cloud. Refactoring is driven by a strong business need to add features, scale, or improve performance that would otherwise be difficult to achieve in the application's existing environment.

### 5. Repurchase

Repurchasing involves moving from a traditional license to a software-as-a-service (SaaS) model.

For example, a business might choose to implement the repurchasing strategy by migrating from a customer relationship management (CRM) system to a new sales force software.

### 6. Retain

Retaining consists of keeping applications that are critical for the business in the source environment. This might include applications that require major refactoring before they can be migrated or work that can be postponed until a later time.

### 7. Retire

Retiring is the process of removing applications that are no longer needed.

# AWS Migration Services

---

## Assess Phase

### Migration Evaluator

A migration assessment service that helps you create a business case for AWS Cloud planning and migration. It uses a data-driven approach, analyzing your current state, target state, and developing a migration readiness plan with projected cloud costs.

**Benefits:** Removes the guesswork when migrating. Provides visibility into multiple cost-effective cloud migration scenarios. Gives insights on reusing existing software licensing, which can further reduce costs.

**Use cases:** Conduct broad-based discovery, take a snapshot of your current on-premises footprint to fine-tune licensing, view server dependencies, and gain visibility into multiple migration scenarios. Estimate and reduce your cloud costs.

---

## Mobilize Phase

### AWS Application Discovery Service

Discovers on-premises server inventory and connections. Gathers configuration, performance, and connection details for both servers and databases to create a detailed migration plan.

**Benefits:** Provides a comprehensive snapshot of your on-premises inventory. Integrates discovery data with other services like Migration Hub and protects the data it collects.

**Use cases:** Conduct discovery and inventory, map connections and dependencies, and generate a migration plan.

### AWS Migration Hub

A centralized hub to take you from discovery, assessment, planning, and execution of your migration. Provides tools, guidance, and automated recommendations to collaborate with your team and track your migration.

**Benefits:** One location for your entire migration journey with expert guidance in the form of prescriptive journey templates. No charge to use Migration Hub.

**Use cases:** Migration assessment and planning, migration completion and team collaboration, and modernization efforts like fast-tracking application refactoring.

---

## Migrate and Modernize Phase

### AWS Application Migration Service

A tool to move and improve your on-premises and cloud-based applications. Helps customers streamline, expedite, and reduce the cost of migrating and modernizing applications.

**Benefits:** Supports migration from any source infrastructure running a supported OS. Makes it possible to modernize applications during migration. Maintains normal business operations during the application replication process. Reduces costs by using one tool for a wide range of applications.

**Use cases:** On-premises applications running on physical servers, cloud-based applications, moving between AWS Regions, and modernizing applications.

---

## Migration Resources

### AWS Migration and Modernization Competency Partners

When migrating to the AWS Cloud, you can work with the AWS Competency Partner Program. Search for AWS Migration and Modernization Service Partners who specialize in specific phases of the migration or the type of help you need. To learn more, refer to AWS Migration and Modernization Competency Partners(opens in a new tab).

# Migrating Databases

Migrating your database to the cloud can provide an opportunity to redesign and improve your database architecture. Because legacy systems and requirements change over time, you might also consider whether to migrate to an AWS managed database service or an open source database to reduce licensing costs. It is fairly simple to migrate data from one server to another when both are using the same database engine, known as homogeneous migration. Going to a different engine, or heterogeneous migration, is more complex and might require changes in your application. The good news is, whether your migration is homogenous (from same type of database to same type) or heterogenous (from one type of database to a different type), there are AWS services to support you.

---

## AWS Database Migration Service (AWS DMS)

The AWS Database Migration Service (AWS DMS) makes it possible to quickly and securely migrate databases and perform ongoing data replication tasks for live databases and data warehouses. It provides a way to plan, assess, convert, and migrate databases even with data warehouses in one central tool.

**Benefits:** AWS DMS provides benefits for migrating databases including maintaining high availability and low downtime during the migration process. It supports homogenous and heterogenous migrations. It also makes it possible to migrate terabyte sized databases at a low cost.

**Use cases:** You can use AWS DMS to move to managed databases, remove licensing costs, replicate ongoing changes in your database, and improve integration with data lakes.

---

## AWS Schema Conversion Tool (AWS SCT)

If you want to change from a commercial database to an open source database during your migration, there are a few important logistics. When the databases you are migrating have different source and target engines, you need to consider how to recreate existing resources, like the database schema, in the target. A schema defines the structure and organization of data inside the database and acts like a blueprint for things like table structures, field types, and relationships between items. It can be time consuming to recreate everything manually. That's where AWS Schema Conversion Tool (AWS SCT) can help.

AWS SCT makes it possible to convert database schemas and code objects (like stored procedures, views, and functions) from one database engine to another. AWS SCT can even give you estimates of how big of an effort a conversion is, which helps with planning.

**Benefits:** AWS SCT provides benefits to simplify database migrations by automating schema analysis, recommendations, and conversion at scale. It is compatible with popular databases and analytics services as source and target engines. It can save weeks or months of manual time and resources, which are typically required in conversions.

**Use cases:** You can use AWS SCT to move from commercial databases to open source databases. You can also use it for migrating large data warehouse workloads and modernizing or updating database schemas in place.

# Transferring Data to and from the AWS Cloud

## Online Data Transfer

Several AWS services facilitate online data transfer to the AWS Cloud. In the last lesson, you learned that AWS Database Migration Service (AWS DMS) transfers the database and its data to the AWS Cloud. In this lesson, you will identify services that can help with the considerations of online transfer for other types of data and files.

When you migrate data to the AWS Cloud, there are a few considerations to keep in mind. You need to ensure security (will it get there safely), data validation (will it get there in one piece), scheduling (when is the best time). You would also confirm bandwidth requirements. For the majority of data migration workloads, AWS DataSync will do the job.

---

## AWS DataSync

AWS DataSync is specifically designed for automating and accelerating data transfer. DataSync simplifies and accelerates moving large amounts of data between on-premises storage and AWS storage services like Amazon Simple Storage Service (Amazon S3). It automates many aspects of the transfer process, including running instances, encryption, and network optimization.

**Benefits:** The benefits include streamlining and accelerating secure data migrations. DataSync manages data movement workloads with bandwidth throttling, migration scheduling, task filtering, and task reporting. It also provides rapid data replication.

**Use cases:** You can use DataSync to migrate your data, archive your cold data, and manage hybrid data workflows.

---

## AWS Transfer Family

The AWS Transfer Family makes it possible to seamlessly manage and share data with simple, secure, and scalable file transfers. This service provides fully managed support for secure file transfers over FTP, Secure File Transfer Protocol (SFTP), File Transfer Protocol Secure (FTPS), and other protocols. It helps you transfer files directly into and out of AWS storage services like Amazon S3 and Amazon EFS.

**Benefits:** The benefits include simplifying the process of setting up and managing file transfers and reducing the need for complex infrastructure management. The Transfer Family provides secure data transfer with encryption and authentication, to ensure data integrity and confidentiality. It is built to scale and streamline workflows.

**Use cases:** You can use the Transfer Family to modernize and manage your file transfers, simplify data sharing with your workforce and partners, and integrate transactional business data into a unified data lake.

---

## AWS Direct Connect

AWS Direct Connect is a service that makes it possible for you to establish a dedicated private connection between your network and virtual private cloud (VPC) in the AWS Cloud. Because it is your dedicated connection, it is a fast, reliable, and secure way to transfer your data or files. With the bandwidth of a dedicated connection, it is also a great solution for moving your data online to the AWS Cloud when migrating.

**Benefits:** Direct Connect helps reduce network costs and increase amount of bandwidth.

# Alternatives for Data Migration

## Transferring Data Offline

Many customers prefer online migrations, but there are some customers who need to transfer data offline. An example would be if bandwidth is limited, or in remote locations with no internet and Direct Connect is not an option. Or, in cases with large data volumes, sending petabytes of data over the internet would take longer than simply sending a physical device.

---

## AWS Snowball Edge Storage Optimized

AWS Snowball Edge Storage Optimized devices are a great solution for offline data migration where connecting to the internet might not be an option. These devices deliver high performance NVMe storage, making it possible to simplify multi-petabyte data migrations from on-premises locations to AWS.

**Benefits:** The benefits include delivering better compute performance and larger storage capacity with gigabytes of data per second for data migration workloads with offline requirements.

**Use cases:** You can use Snowball Edge devices for data migration when offline migration is required. They can also be used for edge computing when a secure, rugged device is needed.