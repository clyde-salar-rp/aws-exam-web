# Amazon EC2

Amazon EC2 is more flexible, cost-effective, and faster than managing on-premises servers. It offers on-demand compute capacity that can be quickly launched, scaled, and terminated, with costs based only on active usage.

The flexibility of Amazon EC2 allows for faster development and deployment of applications. You can launch as many or as few virtual servers as needed and configure security, networking, and storage. You can also scale resources up or down based on usage, such as handling high traffic or compute-heavy tasks.

---

## On-Premises vs. Cloud Resources

**Challenges of on-premises resources** Imagine that you're responsible for designing your company's infrastructure to support new websites. With traditional on-premises resources, you must purchase hardware upfront, wait for delivery, and handle installation and configuration. This process is time-consuming, costly, and inflexible because you're locked into a specific capacity that might not align with changing demands.

**Benefits of using cloud resources** In contrast, with Amazon EC2, you can quickly launch, scale, and stop instances based on your needs without the delays and upfront costs associated with traditional on-premises resources.

---

## How Amazon EC2 Works

With Amazon EC2, you can quickly launch, connect to, and use virtual instances in the cloud. You can request EC2 instances and have them ready to use within minutes.

### Step 1 — Launch an Instance

When launching an EC2 instance, you start by selecting an Amazon Machine Image (AMI), which defines the operating system and might include additional software. You also choose an instance type, which determines the underlying hardware resources, such as CPU, memory, and network performance.

### Step 2 — Connect to the Instance

You can connect to an EC2 instance in various ways. Applications can interact with services running on the instance over the network. Users or administrators can connect using SSH for Linux instances or Remote Desktop Protocol (RDP) for Windows instances. Alternatively, AWS services like AWS Systems Manager offer a secure and simplified method for accessing instances.

### Step 3 — Use the Instance

After you are connected to the instance, you can begin using it to run commands, install software, add storage, organize files, and perform other tasks.

# EC2 Instance Types

Whether you're running a simple web service or complex data processing tasks, Amazon EC2 provides the flexibility to select the ideal instance type for your needs.

| Instance Type             | Description                                                      | Best For                                                                                     |
| ------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **General Purpose**       | Balanced mix of compute, memory, and networking resources.       | Web services, code repositories, and workloads with uncertain performance requirements.      |
| **Compute Optimized**     | Optimized for compute-intensive tasks.                           | Gaming servers, high performance computing (HPC), machine learning, and scientific modeling. |
| **Memory Optimized**      | Fast performance for memory-heavy workloads.                     | Processing large datasets, data analytics, and databases.                                    |
| **Accelerated Computing** | Uses hardware accelerators like GPUs for specialized processing. | Floating-point calculations, graphics processing, and machine learning.                      |
| **Storage Optimized**     | High performance for locally stored data.                        | Large databases, data warehousing, and I/O-intensive applications.                           |

# Interacting with AWS Services

All interactions with services are powered by APIs. You can access these APIs through three primary methods: the AWS Management Console, the AWS CLI, or the AWS SDK.

|Method|Description|Good For|
|---|---|---|
|**AWS Management Console**|A web interface for managing AWS services, offering quick access to services, search functionality, and simplified workflows. The mobile app supports monitoring resources, viewing alarms, and checking billing across multiple logged-in identities.|Users who prefer a visual, easy-to-use interface for managing and configuring AWS services.|
|**AWS CLI**|Manage multiple AWS services directly from the command line across Windows, macOS, and Linux. Automate tasks through scripts, such as launching EC2 instances.|Advanced users and developers who need to automate tasks, script actions, and manage AWS resources efficiently from the command line.|
|**AWS SDK**|Simplifies integrating AWS services into applications by providing APIs for various programming languages. AWS offers documentation and sample code for languages like C++, Java, and .NET.|Developers looking to integrate AWS services into their applications using language-specific APIs.|

---

## Compute and Shared Responsibility

The AWS Shared Responsibility Model outlines the division of duties between the customer and AWS. AWS handles the security of the cloud (hardware and infrastructure), whereas the customer is responsible for security in the cloud (applications, data, and access control).

An unmanaged service like Amazon EC2 requires you to perform all of the necessary security configuration and management tasks. When you deploy an EC2 instance, you are responsible for configuring security, managing the guest operating system (OS), applying updates, and setting up firewalls (security groups). You will learn more about managed and unmanaged services later.

## Amazon Machine Images

In the demo, you got a quick introduction to AMIs. AMIs are pre-built virtual machine images that have the basic components for what is needed to start an instance. Now, let's explore AMIs in more detail.

- ### AMI components
    
    An AMI includes the operating system, storage setup, architecture type, permissions for launching, and any extra software that is already installed. You can use one AMI to launch several EC2 instances that all have the same setup.
    
    
- ### Three ways to use AMIs
    
    AMIs can be used in three ways. First, you can create your own by building a custom AMI with specific configurations and software tailored to your needs. Second, you can use pre-configured AWS AMIs, which are set up for common operating systems and software. Lastly, you can purchase AMIs from the AWS Marketplace, where third-party vendors offer specialized software designed for specific use cases.
    
    
    
- ### AMI repeatability
    
    AMIs provide repeatability through a consistent environment for every new instance. Because configurations are identical and deployments automated, development and testing environments are consistent. This helps when scaling, reduces errors, and streamlines managing large-scale environments.

# AWS EC2 Pricing Options

By understanding the different Amazon EC2 pricing options, you can make more informed decisions and optimize your costs based on your specific usage needs.

|Pricing Option|Description|
|---|---|
|**On-Demand Instances**|Pay only for the compute capacity you consume with no upfront payments or long-term commitments required.|
|**Reserved Instances**|Save up to 75% by committing to a 1-year or 3-year term for predictable workloads using specific instance families and AWS Regions.|
|**Spot Instances**|Bid on spare compute capacity at up to 90% off the On-Demand price, with the flexibility to be interrupted when AWS reclaims the instance.|
|**Savings Plans**|Save up to 72% across a variety of instance types and services by committing to a consistent usage level for 1 or 3 years.|
|**Dedicated Hosts**|Reserve an entire physical server for your exclusive use. Ideal for workloads with strict security or licensing needs.|
|**Dedicated Instances**|Pay for instances running on hardware dedicated solely to your account. Provides isolation from other AWS customers.|

---

## Dedicated Hosts vs. Dedicated Instances

Dedicated Hosts provide exclusive use of physical servers, offering full control over instance placement and resource allocation — ideal for security- or compliance-driven workloads.

Dedicated Instances offer physical isolation from other AWS accounts while still benefiting from the flexibility and cost savings of shared infrastructure. The key difference is that Dedicated Instances provide isolation without you choosing which physical server they run on.

Ultimately, the right choice depends on your specific workload requirements and the level of control you need over your infrastructure.

---

## Cost Optimization — Deep Dive

### Savings Plans

**Good for:** Predictable workloads

Savings Plans offer discounts compared to On-Demand rates in exchange for a commitment to use a specified amount of compute power (measured per hour) over a one-year or three-year period. They provide flexible pricing for Amazon EC2, AWS Fargate, AWS Lambda, and Amazon SageMaker AI usage, regardless of instance type or AWS Region. Payment options include All upfront, Partial upfront, or No upfront.

For more information, refer to [What are Savings Plans?(opens in a new tab)](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)

### Capacity Reservations

**Good for:** Critical workloads with strict capacity requirements

With Amazon EC2 Capacity Reservations, you reserve compute capacity in a specific Availability Zone for critical workloads. Reservations are charged at the On-Demand rate, whether used or not. You only pay for the instances you run. This is ideal for strict capacity requirements for current or future business-critical workloads.

For more information, refer to [Reserve compute capacity with EC2 On-Demand Capacity Reservations(opens in a new tab)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html)

### Reserved Instance Flexibility

**Good for:** Steady-state workloads with predictable usage

RIs offer up to 75% savings over On-Demand pricing by applying discounts across instance sizes and multiple Availability Zones within a Region. When you purchase a Reserved Instance (RI), AWS automatically applies the discount to other instance sizes within the same family based on the instance size footprint. It also applies the discount across multiple Availability Zones for enhanced resource distribution and fault tolerance.

For more information, refer to [How Reserved Instance discounts are applied(opens in a new tab)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/apply_ri.html)


# Scalability and Elasticity

Scalability is about a system's potential to grow over time, whereas elasticity is about the dynamic, on-demand adjustment of resources.

**Scalability** Scalability refers to the ability of a system to handle an increased load by adding resources. You can scale up by adding more power to existing machines, or you can scale out by adding more machines. Scalability focuses on long-term capacity planning to make sure that the system can grow and accommodate more users or workloads as needed.

**Elasticity** Elasticity is the ability to automatically scale resources up or down in response to real-time demand. A system can then rapidly adjust its resources, scaling out during periods of high demand and scaling in when the demand decreases. Elasticity provides cost efficiency and optimal resource usage at any given moment.

---

## Amazon EC2 Auto Scaling

Amazon EC2 Auto Scaling automatically adjusts the number of EC2 instances based on changes in application demand, providing better availability. It offers two approaches:

- **Dynamic scaling** — adjusts in real time to fluctuations in demand.
- **Predictive scaling** — preemptively schedules the right number of instances based on anticipated demand.

### Auto Scaling Groups

With EC2 Auto Scaling, you maintain the desired amount of compute capacity by dynamically adjusting the number of EC2 instances based on demand. You can create Auto Scaling groups — collections of EC2 instances that scale in or out to meet your application's needs.

An Auto Scaling group is configured with three key settings:

![](/images/Pasted%20image%2020260427165754.png)

|Setting|Description|Example|
|---|---|---|
|**Minimum capacity**|The least number of EC2 instances required to keep the application running. The system never scales below this threshold. Instances launch immediately after the Auto Scaling group is created.|4 EC2 instances|
|**Desired capacity**|The ideal number of instances needed to handle the current workload, which Auto Scaling aims to maintain. Defaults to minimum capacity if not specified.|6 EC2 instances|
|**Maximum capacity**|The upper limit on the number of instances that can be launched, preventing over-scaling and controlling costs.|12 EC2 instances|

Because Amazon EC2 Auto Scaling uses EC2 instances, you pay for only the instances you use, when you use them. This gives you a cost-effective architecture that provides the best customer experience while reducing expenses.

# Elastic Load Balancing (ELB)

Elastic Load Balancing (ELB) automatically distributes incoming application traffic across multiple resources, such as EC2 instances, to optimize performance and reliability. A load balancer serves as the single point of contact for all incoming web traffic to an Auto Scaling group. As the number of EC2 instances fluctuates in response to traffic demands, incoming requests are first directed to the load balancer. From there, the traffic is distributed evenly across the available instances.

Although ELB and Amazon EC2 Auto Scaling are distinct services, they work in tandem to enhance application performance and ensure high availability. Together, they enable applications running on Amazon EC2 to scale effectively while maintaining consistent performance.

---

## Benefits

|Benefit|Description|
|---|---|
|**Efficient Traffic Distribution**|Evenly distributes traffic across EC2 instances, preventing overload on any single instance and optimizing resource utilization.|
|**Automatic Scaling**|Scales with traffic and automatically adjusts to changes in demand for seamless operation as backend instances are added or removed.|
|**Simplified Management**|Decouples front-end and backend tiers and reduces manual synchronization. Handles maintenance, updates, and failover to ease operational overhead.|

---

## Routing Methods

To optimize traffic distribution, ELB uses several routing methods. These strategies work together for efficient traffic management and optimal application performance.

|Method|Description|
|---|---|
|**Round Robin**|Distributes traffic evenly across all available servers in a cyclic manner.|
|**Least Connections**|Routes traffic to the server with the fewest active connections, maintaining a balanced load.|
|**IP Hash**|Uses the client's IP address to consistently route traffic to the same server.|
|**Least Response Time**|Directs traffic to the server with the fastest response time, minimizing latency.|

---

## Example: Healthcare Appointment Portal

In hospitals and medical facilities that provide online appointment booking systems or patient portals, website traffic can vary greatly throughout the day.

1. **Low-demand period** — At the beginning of the day, only a few patients are accessing the system to book appointments or view medical records. The existing web servers are sufficient to handle the low traffic, with no need for additional resources.
2. **High-demand period** — As the day progresses, especially during peak hours such as early mornings or just before the weekend, more patients access the portal. The healthcare system automatically scales up the number of servers to ensure the system remains responsive and available for all users.
3. **Load balancing in action** — A load balancer directs incoming traffic to different web servers based on their current load. If one server starts receiving too many requests, the load balancer routes new requests to a less busy server, ensuring no single server becomes overwhelmed and traffic is evenly distributed across available EC2 instances.

By using Elastic Load Balancing and Auto Scaling, the healthcare industry can efficiently manage varying levels of patient traffic, providing reliable access to medical portals even during high-demand periods.

# Decoupling Services

In modern application development, reliability and resilience are important. One effective way to achieve this is by adopting a service-oriented approach.

## Monolithic vs. Microservices Architecture

**Monolithic applications** Application components — such as database logic, web application servers, user interfaces, and business logic — are tightly coupled. If one component fails, it can cause the failure of other components, potentially bringing down the entire application.

**Microservices architecture** Application components are loosely coupled, meaning that if one component fails, the others continue to function normally. The communication between components remains intact, and the failure of a single component does not impact the entire system. This design promotes greater flexibility and reliability.

---

## Supporting Scalable and Reliable Cloud Communication

Amazon EventBridge, Amazon SNS, and Amazon SQS help different parts of an application communicate effectively in the cloud. These services support building event-driven and message-based systems, helping create scalable, reliable applications that can handle high traffic and enhance communication between components.

---

## Amazon EventBridge

A serverless service that connects different parts of an application using events, helping to build scalable, event-driven systems. EventBridge routes events from sources like custom apps, AWS services, and third-party software to other applications. It simplifies receiving, filtering, transforming, and delivering events.

### Example: Online Food Delivery Service

When a customer places an order, several steps happen simultaneously:

1. **Payment processing** — The payment service verifies and processes the customer's payment.
2. **Restaurant notification** — The restaurant receives a notification to start preparing the meal.
3. **Inventory management** — The inventory system checks if the ingredients for the order are available.
4. **Delivery dispatch** — A delivery driver is notified to pick up and deliver the meal.

**How EventBridge helps:** EventBridge routes events like _order placed_ or _payment completed_ to the relevant services (payment, restaurant, inventory, and delivery). It handles high volumes of events during peak times, making sure each service works independently. Even if one service fails, EventBridge stores the event and processes it as soon as the service is available again.

---

## Amazon SQS

A message queuing service that facilitates reliable communication between software components. It can send, store, and receive messages at any scale, making sure messages are not lost and that other services don't need to be available for processing. An application places messages into a queue, and a user or service retrieves the message, processes it, and then removes it from the queue.

### Example: Customer Support Team

1. **Scenario** — A support agent receives customer issues and a technical specialist resolves them. This works well as long as both are available and coordinated.
2. **Challenge** — If the specialist is busy or unavailable when the agent creates a ticket, the agent must wait, causing delays and longer customer wait times. As issue volume increases, this process becomes inefficient.
3. **Solution** — Using Amazon SQS, the support agent adds customer issues to a queue, creating a backlog. Even if the specialist is busy, the agent can continue adding new issues. The specialist checks the queue, resolves issues, and updates the agent — providing a smooth workflow without delays or bottlenecks.

---

## Amazon SNS

A publish-subscribe service that publishers use to send messages to subscribers through SNS topics. Subscribers can include web servers, email addresses, Lambda functions, and various other endpoints.

### Example: Product Update Notifications

A company was sending a single email to all customers covering new products, special offers, and upcoming events. Customers were receiving irrelevant updates, causing dissatisfaction and lower engagement.

1. **Segment the communication** — The company divides communication into three separate topics: new products, special offers, and events.
2. **Let customers choose topics** — Customers subscribe only to topics they care about. One customer might subscribe only to new product updates; another only to event notifications; a third to both new products and special offers.
3. **Send tailored notifications** — With Amazon SNS, the company sends personalized notifications to subscribers based on their specific interests, improving efficiency and relevance of communication.

## IAM: Identity & Access Management

### What Is IAM?

- **Identity and Access Management (IAM)** is a web service for securely controlling access to AWS resources.
- Allows you to manage Users, Groups, and Roles.

### IAM Users & Groups

- **Users**: Represent individual identities that interact with AWS services.
- **Groups**: Logical grouping of users to simplify permission management. Permissions assigned to a group are inherited by its users.

### IAM Permissions & Policies

- **Permissions** are defined using policies (JSON documents).
- Policies specify what actions are allowed or denied on specific resources.
- Policies can be attached to Users, Groups, or Roles.

**Key elements of a policy:** Version, Statement, Action, Resource, Effect (Allow/Deny).

### IAM Roles for Services

IAM roles grant permissions to AWS services to perform actions on behalf of users or applications (e.g., an EC2 instance assuming a role to access S3).

### IAM Security Tools

- **IAM Credential Report**: Lists all IAM users and status of credentials.
- **IAM Access Advisor**: Shows service permissions and when they were last used.
- **IAM Policy Simulator**: Tests IAM policies before applying them.

### IAM Guidelines & Best Practices

1. Follow the Principle of Least Privilege
2. Enable Multi-Factor Authentication (MFA)
3. Use IAM Roles instead of IAM Users for applications
4. Rotate credentials regularly
5. Use AWS Managed Policies for common use cases

### Multi-Factor Authentication (MFA)

MFA adds a second layer of security beyond a username and password.

| MFA Device Type | Description |
|---|---|
| **Virtual MFA Device** | Apps like Google Authenticator. Generates a TOTP on a smartphone. |
| **Hardware MFA Device** | Physical devices like Gemalto tokens. |
| **U2F Security Key** | USB devices for browser-based sign-ins. |

### How Can Users Access AWS?

| Access Method | Description |
|---|---|
| **AWS Management Console** | Web-based UI for managing AWS resources. |
| **AWS CLI** | Unified tool to interact with AWS from the terminal. Automates tasks via scripts. |
| **AWS SDK** | Language-specific APIs (Python boto3, JavaScript aws-sdk, Java, .NET, etc.). |

### Advanced Identity

- **AWS STS (Security Token Service)**: Provides temporary, limited-privilege credentials for AWS resource access.
- **Amazon Cognito**: Manages identity for web and mobile application users instead of creating IAM users.
- **AWS Directory Services**: Integrates Microsoft Active Directory in AWS (Managed Microsoft AD, AD Connector, Simple AD).
- **AWS IAM Identity Center**: Single sign-on (SSO) for AWS accounts, business cloud applications (Salesforce, Microsoft 365), SAML 2.0 apps.