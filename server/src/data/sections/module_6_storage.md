## Block storage

Block storage provides persistent, low-latency block-level storage volumes that attach to EC2 instances like physical hard drives. Block storage volumes can be encrypted, backed up via snapshots, and modified while in use without disrupting the instance. AWS offers two primary block storage services:

- _Amazon EC2 instance store_  
    An unmanaged non-persistent, high-performance block storage directly attached to EC2 instances for temporary data.
    
- _Amazon Elastic Block Store (EBS)_  
    A managed service that provides persistent block storage volumes for EC2 instances, offering various types for different workloads

## Object storage

Object storage is a data storage architecture that manages data as objects in a flat address space. It offers unlimited scalability so you can store vast amounts of unstructured data without worrying about capacity constraints. Object storage provides enhanced metadata capabilities to provide more efficient data management, search, and analytics across massive datasets.

The following is the primary AWS object storage service:

- _Amazon Simple Storage Service (S3)_  
    A fully managed scalable object storage service for storing and retrieving any amount of data from anywhere.

## File storage

AWS file storage services provide shared file systems accessible over networks, so multiple users and applications can access the same data simultaneously. They offer scalability and flexibility so you can expand storage capacity as needs grow without managing physical infrastructure. AWS offers two primary file storage services:

- _Amazon Elastic File System (EFS)_  
    A fully managed, scalable NFS file system for use with AWS Cloud services and on-premises resources.
    
- _Amazon FSx_  
    A fully managed file storage services for popular file systems like Windows, Lustre, and NetApp ONTAP.

## Additional storage services

These services don't fit cleanly into the categories we've defined so far, but they're important AWS storage offerings that you should be familiar with.

- _AWS Storage Gateway_  
    A fully managed, hybrid-cloud storage service that provides on-premises access to virtually unlimited cloud storage.
    
- _AWS Elastic Disaster Recovery_  
    A fully managed service that streamlines the recovery of your physical, virtual, and cloud-based servers into AWS.

## AWS shared responsibility

### AWS storage services

The AWS shared responsibility model groups services into three categories based on the ownership of administrative tasks. These categories are fully managed, managed, and unmanaged.

To learn more about how these categories relate to storage services, expand the following three categories.

#### Fully managed services

For fully managed storage services, AWS is responsible for everything from the hardware and infrastructure up through the entire storage stack. This includes data durability, availability, encryption at rest, and replication. Customers are only responsible for data management, access controls, and proper service configuration.
![](/images/Pasted%20image%2020260422162649.png)

#### Managed services

For managed storage services, AWS manages the underlying storage infrastructure, hardware redundancy, and volume replication. Customers are responsible for data backup strategies, encryption configuration, volume performance optimization, and capacity planning.

![](/images/Pasted%20image%2020260422162709.png)

#### Unmanaged services

For unmanaged storage services, customers takes full responsibility for data management, backup/recovery, encryption, performance optimization, and durability. AWS only maintains the underlying physical hardware and network infrastructure.

![](/images/Pasted%20image%2020260422162744.png)


## Amazon EC2 instance store

Amazon EC2 instance store isn't a stand-alone AWS block storage service. Rather, it refers to the block-level storage that is physically attached to the EC2 instance host computer. Depending on the type of instance, EC2 instance store might come attached as the default storage. Since its data is lost when an instance is stopped or terminated, EC2 instance store is best for temporary memory-based storage needs like buffers, caches, and scratch data. It is not recommended for applications that require data retention.

### Key takeaway: no data persistence

An Amazon EC2 instance store provides temporary block-level storage for an Amazon EC2 instance. This means that if you stop or terminate an Amazon EC2 instance, all the data written to the attached instance store is deleted.

To learn how Amazon EC2 instance store manages data when an EC2 instance is stopped, choose each of the following three numbered markers.
1. An EC2 instance is running with data being stored in an EC2 instance store.
2. The EC2 instance is stopped.
3. After the EC2 instance is stopped or terminated, all data within the EC2 instance store for that instance is lost.

###  Benefits
#### Automatically available storage
Instance store volumes come automatically attached to many EC2 instance types, providing temporary block-level storage at no additional cost. It's physically connected to the host computer, offering high I/O performance for data that disappears when the instance stops.

#### Cost effective
Because EC2 instance store is included in the EC2 instance price, you don't have to pay any additional fees for storage. It's ideal for temporary storage needs like buffers, caches, or scratch data, potentially reducing expenses for applications that don't require persistent storage.

#### High performance
EC2 instance store offers extremely low-latency storage directly attached to the host server of your EC2 instance. This proximity means exceptionally high I/O performance, making it ideal for temporary storage of data requiring fast processing.

## Amazon Elastic Block Store (EBS)

Amazon EBS provides _persistent block-level storage_ volumes for use with Amazon EC2 instances. EBS volumes act like external hard drives, offering consistent and low-latency performance for workloads like databases and file systems.

EBS volumes can be conveniently backed up, resized, and attached to different EC2 instances. To create an EBS volume, you define the configuration for things like volume size and type. After the volume has been created, it can be attached to an Amazon EC2 instance. Because EBS volumes are for data that needs to persist, it’s important to back up the data. It's recommended that you take incremental backups of EBS volumes by creating Amazon EBS snapshots.

### Key takeaway: data persistence

Amazon EBS provides block-level storage volumes that you can use with Amazon EC2 instances. If you stop or terminate an Amazon EC2 instance, all the data on the attached EBS volume remains available.

To learn how Amazon EBS manages data when an EC2 instance is stopped, choose each of the following three numbered markers.
1. An EC2 instance is running with data being stored in an attached EBS volume.
2. The EC2 instance is stopped.
3. After the EC2 instance is stopped or terminated, all data stored within the EBS volume is retained.
### Use cases
Some practical use cases of Amazon EBS include database hosting, backup storage for applications, and rapid deployment of development environments using volume snapshots.
### Benefits
EBS volumes support data portability through their ability to detach and reattach to instances as needed. There are many practical reasons you might choose to do this.
1. Data migration - EBS volumes can be easily migrated between Availability Zones using snapshots. The snapshots provide a simple way to move data across regions or create copies.
2. Instance type changes - Since EBS volumes remain independent of EC2 instances, it's not complicated to attach them to different instance types. This flexibility lets you upgrade or downgrade instances without losing data.
3. Disaster recovery - EBS snapshots provide reliable backup solutions that can be restored in different regions during emergencies. Regular automated snapshots ensure your data remains protected and quickly recoverable.
4. Cost optimization - EBS volumes can be modified to different types and sizes to match actual usage patterns. You can switch between storage types or adjust capacity without downtime.
5. Performance tuning - Amazon EBS offers various volume types to match different workload requirements and IOPS needs. You can adjust volume performance characteristics on the fly to meet changing application demands.



## EBS Snapshots

EBS snapshots are point-in-time backups of EBS volume. They can be used for disaster recovery, data migration, volume resizing, and for creating consistent backups of production workloads. EBS snapshots are incremental, so they only save the blocks on the volume that have changed after your most recent snapshot.

EBS snapshots can be used to create multiple new volumes, and new volumes created from a snapshot are an exact copy of the original volume at the time the snapshot was taken. Snapshots of EBS volumes are stored redundantly in multiple Availability Zones using Amazon S3.

### Working with EBS snapshots

In keeping with the AWS shared responsibility model, as the customer, you are responsible for scheduling and managing regular EBS snapshots as part of your backup strategy. This includes monitoring snapshot costs and deleting unnecessary snapshots to avoid excessive charges. You also need to make sure sensitive data within snapshots is encrypted, verify snapshot integrity, and test restoration procedures regularly.

The following illustration shows how EBS snapshots are created from an EBS volume over time. To learn more about how EBS snapshots interact with EBS volumes, choose each of the following three markers.
#### Initial snapshot

When you create the first snapshot of an EBS volume, a full copy of all the data on the volume at that point in time is included.

This initial snapshot serves as the baseline and contains all the data blocks that were in use on the volume.

#### Subsequent incremental snapshots

For all snapshots after the initial one, only the blocks that have changed since the last snapshot are captured and stored.

These are called _incremental snapshots_. They're much smaller and faster to create than full snapshots.

Each incremental snapshot contains references to the previous snapshots, creating a chain that allows for point-in-time recovery.

#### Snapshot consolidation and management

Despite being incremental, each snapshot appears as a full point-in-time copy of your volume.

The relationship between multiple snapshots of the same volume are managed automatically.

When you delete a snapshot, only the data unique to that snapshot is removed. Data referenced by other snapshots is preserved.

### Benefits

Review the main benefits of EBS Snapshots and how it improves your data protection strategy in Amazon EBS.
#### Data protection and recovery

Snapshots enable fast data recovery from corruption, accidental deletion, or system failures using point-in-time backups.

#### Operational flexibility

Snapshots enable operations like cross-Region data migration, volume resizing, volume cloning, and sharing data across AWS accounts.

#### Cost effective

Snapshots use incremental backup technology, storing only changed blocks after the initial backup, reducing storage costs and backup time.

## Amazon Data Lifecycle Manager

You can automate the creation, retention, and deletion of EBS snapshots using Amazon Data Lifecycle Manager. Amazon Data Lifecycle Manager can schedule snapshots during off-peak hours to minimize performance impact and automatically delete outdated backups to control storage costs. It's particularly valuable for large-scale deployments where manual snapshot management would be time-consuming and error-prone.

To learn how you can use Data Lifecycle Manager to create custom EBS Snapshots policies, choose the arrow buttons to display each of the following five steps.
### Amazon Data Lifecycle Manager Workflow

By reducing manual effort and establishing consistent backup policies, Amazon Data Lifecycle Manager helps maintain compliance requirements by scheduling regular backups and enforcing retention rules. 
1. Create an EBS snapshots policy - Create an EBS snapshots policy using the Amazon EC2 console, API calls, AWS Command Line Interface (AWS CLI), SDKs, or AWS CloudFormation.
2. Select target resource type - Choose either an EBS volume or an EC2 instance as the target for the snapshot.
3. Exclude volumes - Narrow down the data to be included in the snapshot by choosing options to exclude either the root volume or data volumes.
4. Set custom schedules - Automate the creation, retention, and deletion of EBS snapshots by setting up custom schedules.
5. Apply additional actions - Before finalizing the policy, you can apply additional actions. These include configuring elements of the snapshots like tags, snapshot archiving, Amazon EBS fast snapshot restore, cross-Region copying, and cross-account sharing.

## Amazon Simple Storage Service (S3)

Amazon S3 is a fully managed, highly-available object storage service for storing and retrieving any amount of data as objects. It offers 99.999999999 percent durability, meaning your data is highly protected against loss, and offers features like versioning, lifecycle management, and various storage classes to optimize costs.

Amazon S3 stores files as objects in containers known as buckets, and each object can range in size from a few bytes to several terabytes. It integrates seamlessly with other AWS services and supports a wide range of use cases, from basic backups to complex data lakes.

### Elements
#### S3 objects

An object in Amazon S3 is the fundamental unit of data storage. When you upload a file to Amazon S3, it becomes an object and is stored durably across multiple facilities within your chosen Region.

Each object typically includes the _data_ itself, _metadata_, and a unique identifier, or _key_. Objects can be of any file type, such as images, videos, documents, or application data, and can range in size from a few bytes to several terabytes.

Each Amazon S3 object is uniquely identified within a bucket by its key, which is essentially its file name. Objects also have properties like version ID, access control information, and user-defined metadata.
![](/images/Pasted%20image%2020260422172314.png)

#### S3 buckets

An S3 bucket is a container for storing objects in Amazon S3. Buckets have a globally unique name across all of AWS, which helps to identify and organize your stored data.

Buckets serve as the basic unit for access control and can hold a virtually unlimited number of objects. They play a crucial role in data management by making it possible to group related objects and apply policies at the bucket level.

When creating a bucket, you specify its name and the Region where it will reside. Buckets can be configured with various settings, including versioning, logging, and access permissions.

### Benefits

#### Virtually unlimited storage
Amazon S3 has no fixed storage limit, scaling automatically to accommodate any amount of data you need to store. Since you only pay for the storage you use, it's a cost-effective solution for growing data needs.
#### Object lifecycle management
Amazon S3 lifecycle policies automatically move objects between storage classes based on your defined rules, optimizing costs over time. You can set up automatic transitions and expirations to manage data throughout its entire lifecycle.

#### Broad range of use cases
Amazon S3 supports a wide range of use cases for both cloud-based applications and traditional on-premises workloads. Amazon S3 is commonly used for _content distribution_, _hosting static websites_, and delivering _media files_. It's also a popular choice for things like _application data storage_, _archiving_, _data lakes_, and compliance-driven _data retention_.

### Security and privacy management
Everything you store in Amazon S3 is _private by default_. You must explicitly grant permissions to access these resources. If you want your Amazon S3 data to be available to everyone on the internet, you can choose to make your buckets and objects public. To more granularly define who can do what with your Amazon S3 resources, Amazon S3 provides several security management features.

To learn more about Amazon S3 security management features, choose each of the following three tabs.
1. Amazon S3 bucket policies are _resource-based policies_ that can only be attached to S3 buckets. An S3 bucket policy specifies which actions are allowed or denied on the bucket, in addition to every object in that bucket.
2. Permissions that control what actions users, groups, or roles can perform on S3 resources are configured using _identity-based policies_. These policies attach directly to identities rather than to the S3 resources themselves. You can use these policies to specify which S3 buckets and objects users can access and what actions they can perform.
3. Amazon S3 provides encryption capabilities to protect data both at rest and in transit. These encryption features help maintain data confidentiality and comply with various security standards and regulations. These capabilities are as follows:
	- Encryption at rest_ secures data stored in S3 buckets, preventing unauthorized access to stored objects.
	- _Encryption in transit_ safeguards data traveling to and from Amazon S3, maintaining secure communication between clients and the service.



## Amazon S3 storage classes and use cases

Amazon S3 offers various storage classes to suit a variety of workloads with specific performance, access, resiliency, and cost requirements. They're also designed to address data residency requirements, unpredictable access patterns, archival storage needs, and offer the most cost-effective options for different access patterns.

To learn about each storage class and when it's practical to use them, choose the arrow buttons to display each of the following nine slides.
### S3 Standard

S3 Standard is considered general-purpose storage for cloud applications, dynamic websites, content distribution, mobile and gaming applications, and big data analytics. When you upload an object to Amazon S3 without specifying a storage class, the object is added to S3 Standard by default.

### S3 Intelligent-Tiering

This tier is useful if your data has unknown or changing access patterns. S3 Intelligent-Tiering stores objects in three tiers: a frequent access tier, an infrequent access tier, and an archive instant access tier. Amazon S3 monitors access patterns of your data and automatically moves your data to the most cost-effective storage tier based on frequency of access.

### S3 Standard Infrequent Access (Standard-IA)

S3 Standard-Infrequent Access (S3 Standard-IA) is for data that is accessed less frequently but requires rapid access when needed. S3 Standard-IA offers the high durability, high throughput, and low latency of S3 Standard, with a low per-GiB storage price and per-GiB retrieval fee. This storage tier is ideal if you want to store long-term backups, disaster recovery files, and so on.

### S3 One Zone Infrequent Access (One Zone-IA)

S3 One Zone-Infrequent Access (S3 One Zone-IA) stores data in a single Availability Zone, reducing costs compared to S3 Standard-IA, which uses three zones. This storage class suits customers seeking affordable storage for infrequently accessed data without high availability needs. It's perfect for storing secondary backups or easily recreatable data.

### S3 Express One Zone

S3 Express One Zone stores data in a single Availability Zone. It was purpose-built to deliver consistent single-digit millisecond data access for your most frequently accessed data and latency-sensitive applications. S3 Express One Zone delivers data access speed up to 10x faster and request costs up to 80% lower than S3 Standard.

### S3 Glacier Instant Retrieval

Use S3 Glacier Instant Retrieval for archiving data that is rarely accessed and requires millisecond retrieval. Data stored in this storage class offers a cost savings of up to 68 percent compared to the S3 Standard-IA storage class, with the same latency and throughput performance.

### S3 Glacier Flexible Retrieval

S3 Glacier Flexible Retrieval offers low-cost storage for archived data that is accessed 1–2 times per year. With S3 Glacier Flexible Retrieval, your data can be accessed in as little as 1–5 minutes using an expedited retrieval. You can also request bulk retrievals in up to 5–12 hours at no additional cost. It's an ideal solution for backup, disaster recovery, offsite data storage needs, and for when some data occasionally must be retrieved in minutes.

### S3 Glacier Deep Archive

S3 Glacier Deep Archive is the lowest-cost Amazon S3 storage class. It supports long-term retention and digital preservation for data that might be accessed once or twice per year. Data stored in the S3 Glacier Deep Archive storage class has a default retrieval time of 12 hours. It is designed for customers that retain data sets for 7–10 years or longer, to meet regulatory compliance requirements. Examples include those in highly regulated industries, such as financial services, healthcare, and public sectors.

### S3 Outposts

Amazon S3 Outposts delivers object storage to your on-premises AWS Outposts environment using Amazon S3 APIs and features, and serves workloads with local data residency requirements. It also helps maintain optimal performance when data must remain in close proximity to on-premises applications.

## S3 Lifecycle

To avoid manually managing your object storage tier configurations, you can use S3 Lifecycle configurations to automate the process. When you define a lifecycle configuration for an object or group of objects, you can choose to automate between two types of actions, as follows:

- _Transition actions:_ define when objects should transition to another storage class.
    
- _Expiration actions:_ define when objects expire and should be permanently deleted.
    

For example, you might transition objects to S3 Standard-IA storage class 30 days after you create them. Or you might archive objects to the S3 Glacier Deep Archive storage class 1 year after creating them.

To learn more about an example S3 Lifecycle configuration, choose each of the three numbered markers.
1.  After 30 days - After 30 days without being accessed, the object is moved from the Amazon S3 Standard storage class to the Amazon S3 Standard-IA storage class.
2. After 60 days - After the object has been in the S3 Standard-IA storage class for 60 days without being accessed, it's moved to the Amazon S3 Glacier Instant Retrieval storage class.
3.  After 365 days - Finally, after 365 days in the Amazon S3 Glacier Instant Retrieval storage class without being accessed, the object is deleted.
### Use cases

The following situations are candidates for the use of S3 lifecycle configuration rules:

- **Periodic logs:** If you upload periodic logs to a bucket, your application might need them for a week or a month. After that, you might want to delete them.
    
- **Data that changes in access frequency:** Some documents are frequently accessed for a limited period of time. After that, they are infrequently accessed. At some point, you might not need real-time access to them. However, your organization or regulations might require you to archive them for a specific period. After that, you can delete them.

# Amazon Elastic File System (EFS)

Amazon EFS is a fully managed, scalable file storage service for use with AWS cloud services and on-premises resources. It operates using the Linux Network File System (NFS) protocol, and automatically scales to petabytes as you add or remove files without disrupting applications. EFS is designed to support a wide variety of workloads and can be accessed by multiple EC2 instances simultaneously.

---

## Benefits

### Multi-AZ Redundancy

Amazon EFS automatically replicates data across multiple Availability Zones in a region for high availability. This built-in redundancy protects against AZ failures and provides continuous access to your file systems.

### Shared Access

Amazon EFS supports thousands of concurrent NFS connections, so multiple EC2 instances can access the same file system simultaneously. This shared access model makes EFS ideal for collaborative workloads and distributed applications.

### Elastic Storage

Amazon EFS automatically grows and shrinks as you add and remove files, with no need to provision or manage storage capacity. And since you only pay for the storage you use, it's cost-effective for varying workload demands.

---

## Storage Classes

With Amazon EFS, you can create and configure file systems quickly without any minimum fee or setup cost. You pay only for the storage used and you can choose from a range of storage classes designed to fit your use case.

|Storage Class|Description|Best For|
|---|---|---|
|**EFS Standard** & **Standard-IA**|Multi-AZ resilience with the highest durability and availability|Frequently accessed or mission-critical data|
|**EFS One Zone** & **One Zone-IA**|Data stored in a single Availability Zone at reduced cost|Non-critical data where lower cost outweighs redundancy|
|**EFS Archive**|Cost-optimized; up to 50% lower price vs. Infrequent Access|Rarely accessed data that doesn't need sub-millisecond latency|

---

## Data Lifecycle Management

You can further optimize Amazon EFS storage costs by automatically moving data between storage classes based on usage patterns. Lifecycle policies determine when and how files transition between storage tiers, ensuring data resides in the most cost-effective class without manual intervention.

### Transition to IA

Moves files into the **Infrequent Access** storage class, optimized for data accessed only a few times per quarter. By default, files not accessed in Standard storage for **30 days** are transitioned to IA.

### Transition to Archive

Moves files into the **Archive** storage class, optimized for data accessed only a few times per year or less. By default, files not accessed in Standard storage for **90 days** are transitioned to Archive.

### Transition to Standard

Controls whether files are moved out of IA or Archive and back into **Standard** storage upon access. By default, files are **not** moved back to Standard — they remain in IA or Archive even when accessed.

# Amazon FSx

---

## Benefits

|Benefit|Description|
|---|---|
|**File System Integration**|Supports industry-standard file system protocols for convenient integration with existing applications, workflows, and development tools.|
|**Managed Infrastructure**|Reduces the complexity of managing infrastructure while delivering the features and capabilities of traditional file systems.|
|**Scalable Storage**|Adjusts resources dynamically, eliminating the need for complex capacity planning and manual infrastructure management.|
|**Cost Effective**|Charges only for used storage and automatically moves infrequently accessed data to lower-cost tiers.|

---

## File Systems

### FSx for Windows File Server

Fully managed shared storage built on Windows Server, delivering a wide range of data access, management, and administrative capabilities.

**Use cases:**

- Migrate Windows file servers to AWS
- Accelerate hybrid workloads
- Reduce SQL Server deployment cost
- Streamline virtual desktops and streaming

---

### FSx for NetApp ONTAP

Fully managed shared storage in the AWS Cloud with the popular data access and management capabilities of ONTAP.

**Use cases:**

- Migrate workloads to AWS seamlessly
- Build modern applications
- Modernize your data management
- Streamline business continuity

---

### FSx for OpenZFS

Fully managed shared file storage built on the OpenZFS file system, accessible through the NFS protocol (v3, v4, v4.1, and v4.2).

**Use cases:**

- Migrate workloads to AWS seamlessly
- Deliver insights faster for data analytics workloads
- Accelerate content management
- Increase dev/test velocity

---

### FSx for Lustre

Fully managed shared storage with the scalability and performance of the popular Lustre file system.

**Use cases:**

- Accelerate machine learning (ML)
- Enable high performance computing (HPC)
- Unlock big data analytics
- Increase media workload agility

# AWS Storage Gateway

Storage Gateway is a hybrid cloud storage service that seamlessly integrates on-premises environments with AWS Cloud storage. It extends local storage to the cloud while maintaining low-latency access to frequently used data — supporting use cases like cloud backups, on-premises file shares backed by cloud storage, and low-latency access to AWS data for on-premises applications.

---

## Benefits

|Benefit|Description|
|---|---|
|**Seamless Integration**|Enables smooth connectivity between on-premises applications and AWS Cloud storage, preserving existing workflows and minimizing disruption.|
|**Improved Data Management**|Provides centralized management of hybrid storage environments, enhancing accessibility, security, and compliance.|
|**Local Caching**|Keeps frequently accessed data locally for quick access while offloading less-used data to the cloud.|
|**Cost Optimization**|Reduces on-premises storage costs by leveraging cloud storage for archiving, backup, and disaster recovery.|

---

## Gateway Types

### S3 File Gateway

Bridges your local environment with Amazon S3, giving on-premises applications access to virtually unlimited cloud storage through familiar file protocols.

When deployed, S3 File Gateway appears to local systems as a standard file server. Files written to it are automatically uploaded to Amazon S3, while recently accessed data is kept available locally through intelligent caching — allowing applications to work with files as usual while data is securely stored in AWS.

---

### Volume Gateway

Creates virtual storage volumes that bridge on-premises infrastructure and AWS Cloud storage, presenting cloud data as iSCSI volumes mountable by existing applications.

Volume Gateway operates in two configurations:

- **Cached volume mode** — primary data is stored in the cloud; frequently accessed data is cached locally for low-latency access.
- **Stored volume mode** — the complete dataset is kept locally and asynchronously backed up to the cloud as EBS snapshots.

---

### Tape Gateway

Replaces physical tape infrastructure with virtual tape capabilities, backed by the durability and scalability of AWS Cloud storage.

When deployed, Tape Gateway presents itself to backup applications as standard tape hardware. Backup software writes data to virtual tapes just as it would to physical ones, with data stored in Amazon S3. Tape Gateway can also be configured to automatically transition infrequently accessed data to a lower-cost storage class for long-term retention.

## Benefits

|Benefit|Description|
|---|---|
|**Business Resilience**|Maintain business operations with continuous block-level data replication and the ability to recover workloads within minutes during disruptions.|
|**Streamlined Disaster Recovery**|Automate disaster recovery processes through an intuitive console, reducing complex manual configurations and minimizing the risk of human error.|
|**Cost Optimization**|Eliminate expensive secondary data centers and pay only for what you use, with minimal upfront investment and no standby infrastructure costs.|

---

## Use Cases

### Healthcare Data Protection

Hospital systems can use Elastic Disaster Recovery to maintain compliance while protecting patient records by replicating on-premises servers to AWS. This ensures critical medical data remains accessible during outages, and regular DR testing helps validate recovery procedures against strict healthcare regulations.

### Financial Services Continuity

Regional banks can protect core banking applications by continuously replicating transaction processing systems to AWS. This enables quick recovery if a primary data center fails, helping maintain customer trust and regulatory compliance.

### Manufacturing Operations Recovery

Global manufacturers can protect production planning systems by replicating factory management servers to AWS, ensuring minimal supply chain disruption during disasters. Regular failover testing validates the overall recovery strategy.

## AWS Snow Family

The AWS Snow Family provides physical devices for offline data migration when internet connectivity is not an option (limited bandwidth, remote locations, or large data volumes).

### AWS Snowball Edge Storage Optimized

Delivers high performance NVMe storage for multi-petabyte data migrations from on-premises locations to AWS.

**Benefits:** Better compute performance and larger storage capacity with gigabytes of data per second for offline migration workloads.

**Use cases:** Data migration when offline migration is required; edge computing when a secure, rugged device is needed.