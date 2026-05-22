# Types of AWS Services

AWS services are purpose-built for specific use cases. This section covers four types of specialized AWS services: Development, Business Application, End-User Computing, and IoT.

---

## Development Services

AWS offers several services to help developers automate CI/CD pipelines, monitor and debug applications, build GraphQL APIs, and deploy web and mobile applications on AWS.

### AWS CodeBuild

A fully managed continuous integration service that compiles source code, runs tests, and produces software packages for deployment. It automatically scales to meet demand, and you only pay for the build time that you use.

### AWS CodePipeline

A fully managed CI/CD service that automates the build, test, and deploy phases of your release process. This helps developers streamline software release workflows and reliably deliver new features and fixes without needing to provision servers.

CI/CD pipelines automate the integration, testing, and deployment of code changes to help provide quick and reliable software delivery.

### AWS X-Ray

A powerful tracing, debugging, and performance analysis tool that helps developers visualize application behavior. With X-Ray, developers can quickly identify performance bottlenecks, troubleshoot issues, and optimize applications for better efficiency and reliability.

### AWS AppSync

A fully managed GraphQL service. With AWS AppSync, developers can create a single GraphQL API that can securely access, manipulate, and combine data from multiple data sources. This helps developers connect frontend applications with backend data.

With GraphQL, a query language for APIs, clients request only the specific data they need.

### AWS Amplify

Helps you streamline the process of developing, deploying, and managing secure and scalable full-stack applications on AWS. With Amplify, developers can quickly add features like authentication, APIs, storage, and hosting, with minimal infrastructure management.

Full-stack applications are software systems that involve both frontend (user interface) and backend (server-side) development.

---

## Business Application Services

These services are ideal for managing business application needs such as customer service operations and email promotions.

### Amazon Connect

An AI-powered contact center service that businesses can use to efficiently set up and operate a scalable customer service call center. Amazon Connect provides capabilities for call routing, recording, and analytics while integrating seamlessly with other AWS services.

### Amazon Simple Email Service (Amazon SES)

A scalable and cost-effective email service provider that can be integrated into any application for reliable, high-volume email automation. It helps businesses optimize the delivery of transactional and marketing emails, resulting in enhanced customer engagement.

---

## End-User Computing Services

IT departments often need to provide remote access to resources like virtual desktops and applications. These AWS services can be used to set up these environments for employees.

### Amazon AppStream 2.0

A fully managed service that streams applications from the cloud directly to any compatible device. This includes SaaS applications and applications converted from desktop to SaaS without code revisions, providing instant access to powerful software without the need for high-end local hardware.

In SaaS, applications are hosted on the cloud and accessed through the internet, without the need for local installation or maintenance.

### Amazon WorkSpaces

A fully managed cloud-based desktop computing service. With WorkSpaces, employees can securely access their work environment from any device with an internet connection — performing the same tasks as if they were on a physical office computer — while companies benefit from cost-efficiency and easy administration.

### Amazon WorkSpaces Secure Browser

A fully managed remote enterprise browser that provides a protected environment for employees to access private websites, SaaS applications, and the public internet. IT departments don't need to manage specialized client software, infrastructure, or VPN connections.

---

## IoT Services

Internet of Things (IoT) is a network of connected physical devices embedded with sensors and software that collect and exchange data over the internet. These devices can be monitored and controlled remotely to improve efficiency, provide new services, and enhance quality of life.

### AWS IoT Core

A managed cloud service used to securely connect physical devices with cloud applications. It helps you create efficient IoT solutions by streamlining the complex process of ingesting, processing, and acting on device data. Device connections and data are secured with mutual authentication and end-to-end encryption, and you can choose from several communication protocols.

**IoT solution examples:**

- **Smart security cameras** — Home monitoring that sends alerts to your phone
- **Smart pet feeders** — A pet feeder that you can control remotely
- **Smart irrigation systems** — A rain machine that adjusts watering based on weather and soil conditions



# AWS Well-Architected Framework

## The Six Pillars

|Pillar|Description|
|---|---|
|**Operational Excellence**|Focuses on operations, monitoring, automation, and continuous improvement.|
|**Security**|Protects systems and data through best practices like least privilege and data integrity.|
|**Reliability**|Emphasizes recovery planning and system adaptability to meet changing demands.|
|**Performance Efficiency**|Encourages using the right resources for the job and adjusting as needs evolve.|
|**Cost Optimization**|Helps control and reduce costs through smart provisioning and resource management.|
|**Sustainability**|Promotes energy-efficient design and environmentally conscious resource usage.|

---

## AWS Well-Architected Tool (AWS WA Tool)

The AWS Well-Architected Tool (AWS WA Tool) is a free service that helps assess and improve cloud workloads based on the six key pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability. It offers workload reviews, milestone tracking, and custom lenses for tailored evaluations and improvement plans. Integrated with AWS services like AWS Identity and Access Management (IAM) and APIs, it supports team collaboration and continuous progress tracking. The AWS WA Tool is ideal for architects, engineers, and compliance teams, and it promotes consistent, actionable, and well-documented architecture reviews.

---

## Optimizing a Cloud Architecture — Online Florist Example

Imagine you own a bustling online florist business, with orders flowing in during peak times like Valentine's Day or Mother's Day. Let's use the Well-Architected Framework to optimize the system for reliability, performance, security, cost savings, and sustainability.

### Step 1 — Starting Architecture

A classic ecommerce architecture with Amazon EC2 instances for the website, Amazon RDS databases to handle orders and customer data, and an Amazon S3 bucket for product images. It's functional, but needs evaluation for scaling and traffic handling — especially during busy times.

### Step 2 — Operational Excellence

If an EC2 instance crashes during a rush of orders, you need resilience. Automate scaling with EC2 Auto Scaling, use infrastructure as code, and implement self-healing mechanisms like auto-rollback to help your system adapt during high-demand periods and operate efficiently over time.

**Enhancement:** EC2 Auto Scaling

### Step 3 — Security

A secure foundation with an Amazon VPC is a good start, but more is needed. Ensure EC2 instances are regularly patched, IAM policies follow least privilege, and customer data — names, addresses, payment info — is protected with strong encryption for data at rest and in transit, along with fine-grained access controls.

**Enhancement:** Strengthening encryption and IAM policies

### Step 4 — Reliability

During busy seasons, availability is everything. Deploying resources across multiple Availability Zones is a great step, but you can increase reliability further. Use Amazon CloudWatch to monitor system health and set up automated recovery actions.

**Enhancement:** Amazon CloudWatch

### Step 5 — Performance Efficiency

As your business scales, your system should scale with it. AWS Compute Optimizer helps ensure EC2 and RDS instances are rightsized for your workload. AWS Lambda handles event-driven tasks like image processing for flexible scaling. Amazon CloudFront delivers product images quickly to global customers for a smooth shopping experience.

**Enhancement:** AWS Compute Optimizer

### Step 6 — Cost Optimization

On-Demand EC2 instances are a good starting point, but switching to Spot Instances for variable traffic and Savings Plans for steady workloads can cut costs significantly. Track and manage cloud spending in real time with AWS Budgets and AWS Cost Explorer.

**Enhancement:** Savings Plans, AWS Budgets, AWS Cost Explorer

### Step 7 — Sustainability

Using serverless and elastic resources already reduces your environmental footprint. Continue optimizing workloads to minimize resource waste — benefiting both the planet and your bottom line.

**Enhancement:** AWS Cost & Usage Report

### Final Architecture

By applying the Well-Architected Framework, the infrastructure becomes resilient, secure, efficient, and future-ready. With each pillar, the architecture is built to grow right alongside the business.

# Specialized Use Cases — Architecture Diagrams

Demonstrating how AWS services can be combined to solve specific business problems.

---

## Serverless Web Backend Monitored by X-Ray

![](/images/Pasted%20image%2020260427154738.png)

A typical serverless web backend with X-Ray monitoring the environment.

**Step 1 — Receive traffic** An Amazon API Gateway receives and validates HTTP requests.

**Step 2 — Trigger Lambda function** The API Gateway triggers a Lambda function that sends requests to Amazon DynamoDB.

**Step 3 — Monitor traffic** X-Ray traces requests through API Gateway, Lambda, DynamoDB and back to the client. This helps developers troubleshoot any problems.

---

## Serverless Static Website with Contact Form

![](/images/Pasted%20image%2020260427154800.png)

A serverless setup demonstrating a static website with a contact form hosted on Amazon S3.

**Step 1 — Accept customer input** Customers submit questions using a contact form housed on a static Amazon S3 website.

**Step 2 — Receive request** An API Gateway receives and validates the contact form request.

**Step 3 — Send email** The API Gateway invokes a Lambda function that sends an email to the business owner using Amazon SES.

---

## Customer Support with Callback Option

![](/images/Pasted%20image%2020260427154815.png)


A customer support solution that provides an alternate channel and callback option so customers can avoid long wait times.

**Step 1 — Initiate contact** A customer calls or texts a customer support center. Calls are placed into the Amazon Connect interactive voice response (IVR) system. Text messages are routed to Amazon Connect from CloudFront.

**Step 2 — Connect to agent** Amazon Connect tries to connect the customer with a live agent.

**Step 3 — Provide options** For calls with long wait lines, customers can choose to receive an agent callback or they can switch to text through a Lambda function.

## Other AWS Services

### Amazon WorkSpaces
A fully managed cloud-based desktop computing service for secure remote access to a work environment from any device.

### Amazon AppStream 2.0
Streams applications from the cloud directly to any compatible device without local installation.

### AWS IoT Core
Managed cloud service to securely connect physical IoT devices with cloud applications using mutual authentication and end-to-end encryption.

### AWS Step Functions
Serverless workflow service for coordinating distributed applications using visual workflows.

### Amazon Pinpoint
Targeted messaging service for marketing and transactional communications across email, SMS, and push notifications.

### AWS Fault Injection Service (FIS)
Managed service for running fault injection experiments to improve application resilience and test recovery procedures.