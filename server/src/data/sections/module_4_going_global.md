# Going Global with AWS Infrastructure

---

## How to Choose a Region or Set of Regions

If we were to expand our coffee shop by opening new locations, there would be multiple things to consider, like customer demand and development cost. Similarly, you have several factors to consider when selecting a Region or set of Regions for your real-life resources.

## AWS Edge Locations

Like our coffee franchise could expand with smaller versions of the shop such as mobile coffee carts, AWS has smaller footprint facilities called edge locations. Edge locations cache items like images, videos, and other resources, so that users can access the content they need with lower latency.

## Infrastructure as Code and CloudFormation

Another important consideration of a coffee shop expansion would be to maintain a consistent product from location to location. AWS has services, such as CloudFormation, that you can use to help automate the deployment of your cloud resources. These services use infrastructure as code, or IaC, helping you achieve a consistent, reliable set up each time your business grows.


# Key Considerations When Choosing Regions

## 1. Compliance

Compliance is an important consideration when selecting Regions for deploying business resources. Different geographical locations have varying regulatory requirements and data protection laws that organizations must follow. For example, the General Data Protection Regulation (GDPR) is designed to protect the personal data and privacy of individuals within the European Union (EU). An online retail company operating in the EU would be required to meet GDPR compliance to protect customer data. GDPR compliance includes obtaining proper consent for data collection and providing mechanisms for data access and deletion.

## 2. Proximity

When selecting a Region, you also want to consider how to achieve low latency for your users. Regions closer to your user base minimize data travel time, which reduces latency and enhances application responsiveness. Choosing a Region or set of Regions farther away from customers could introduce delays, which might impact user satisfaction and overall system efficiency.

## 3. Feature Availability

You also want to consider which specific features and services are available in each Region. AWS is constantly expanding features and services to multiple locations, but not all Regions contain all AWS offerings. For example, AWS GovCloud Regions are specifically designed to meet the compliance and security requirements of US government agencies and their contractors. These Regions have stringent physical, operational, and personnel security controls in place. These controls are only available in specific Regions to meet certain governmental regulatory requirements.

## 4. Pricing

When selecting a Region, pricing is also a factor that can influence your decision. Some Regions have lower operational costs than others. These operational costs can impact the overall expenses for hosting applications and services. Tax laws and regulations can also play a role in cost. Some Regions might offer tax incentives or have lower tax rates, which can affect customer pricing. Additionally, data sovereignty laws in certain Regions might require data to be stored locally, affecting both compliance and cost.

# Designing Highly Available Architectures

## Deploying Multi-Region and Multi-AZ Resources

You've learned how deploying your cloud resources to multiple Regions can achieve high availability. In addition to deploying to multiple Regions, you also want to deploy resources to multiple Availability Zones. By building redundant architectures or replicating your resources across multiple levels of AWS infrastructure, you can improve application reliability so that your users have access to your content when they need it.

In addition to high availability, the AWS Global Infrastructure also helps you achieve agility and elasticity for your business.

**High availability:** High availability refers to the capability of a system to operate continuously without failing. In the context of AWS infrastructure, it means that your applications can handle the failure of individual components without significant downtime.

**Agility:** Agility refers to the ability to quickly adapt to changing requirements or market conditions. With AWS infrastructure in place, you can modify and deploy services rapidly.

**Elasticity:** Elasticity refers to the ability of a system to scale resources up or down automatically in response to changes in demand. AWS infrastructure is set up for you to scale resources up and down on demand.

---

## Edge Locations

In addition to AWS Regions that contain Availability Zones, AWS has a global edge network that provides quicker content access to users outside of standard Regions. These edge locations are strategically placed in areas like Atlanta, Georgia, USA or Shanghai, China to provide low-latency access to AWS services and content delivery. Edge locations offer multiple services to run closer to end users, including AWS networking services like Amazon CloudFront. CloudFront is a content delivery network (CDN) and caching system that you learn more about later in this training.

---

## Key Elements of AWS Global Infrastructure

![](/images/Pasted%20image%2020260427191811.png)
### AWS Regions

Regions are geographical areas around the world that are made up of multiple data centers. These data centers provide scalable and redundant infrastructure for hosting cloud services. Each Region consists of multiple, isolated locations known as Availability Zones. Each Region has three or more Availability Zones.

### Availability Zones

Availability Zones are distinct locations within a Region, each designed as an independent zone with its own power, networking, and connectivity. Availability Zones maintain high availability and fault tolerance for applications. Each Availability Zone consists of one or more data centers.

### Edge Locations

Edge locations are strategically placed sites around the world that cache content to deliver data, video, and applications with lower latency and higher transfer speeds. Edge locations are considered a vital part of the AWS content delivery network (CDN) and use services like CloudFront to efficiently distribute data to end users.

# CloudFormation

CloudFormation is a service that helps you model and set up your AWS resources so that you can spend less time managing those resources and more time focusing on your applications that run in AWS. With CloudFormation, you can define your infrastructure as code. You create a template that describes all the AWS resources that you want (like Amazon EC2 instances), and CloudFormation takes care of provisioning and configuring those resources for you.

To learn more, refer to [AWS CloudFormation(opens in a new tab)](https://aws.amazon.com/cloudformation/).

---

## Interacting with AWS Resources

To interact with AWS resources, you must invoke AWS APIs. You can do this using the AWS SDKs, the AWS CLI, the AWS Management Console, or IaC tools such as CloudFormation.

### Programmatic Access (AWS CLI and SDKs)

Programmatic access includes options like the AWS CLI and AWS SDKs. These options are best suited for developers and those familiar with coding languages.

With the AWS CLI, you manage multiple AWS services directly from the command line and can automate tasks through scripts. AWS SDKs help integrate AWS services into your applications by providing APIs for various programming languages, with documentation and sample code to help you get started.

**Use cases:**

- **AWS CLI** — Automate routine tasks. For example, write a script to provide routine backups for a service such as Amazon EBS.
- **SDKs** — Invoke APIs for one part of an application process. For example, use an SDK to store user data in a storage service such as Amazon S3.

### AWS Management Console

A web interface for managing AWS services, offering quick access to services, search functionality, and simplified workflows. The console is a great option for those new to the cloud or users with minimal or no development experience.

**Use cases:**

- Billing and cost optimization dashboards and visualizations
- Services focused on graphical representations, like Amazon QuickSight and Amazon Neptune

### Infrastructure as Code (IaC)

With IaC tools such as CloudFormation, you can automate resource management across your organization with AWS service integrations offering efficient and repeatable resource creation and management.

**Use cases:**

- Managing infrastructure with DevOps such as continuous integration and delivery (CI/CD) pipelines
- Scaling resources such as Amazon EC2 instances to multi-Region applications in a consistent, repeatable way

## Deploying and Managing Infrastructure at Scale

### AWS CloudFormation

CloudFormation is a declarative way of outlining your AWS Infrastructure. You define resources in a template, and CloudFormation provisions them in the right order.

**Benefits:**
- Infrastructure as code — no resources are manually created
- Cost: each resource in a stack is tagged with an identifier for cost tracking
- Productivity: ability to destroy and re-create infrastructure on the fly
- Supports almost all AWS resources

### AWS Cloud Development Kit (CDK)

Define your cloud infrastructure using a familiar programming language (JavaScript/TypeScript, Python, Java, .NET). The code is compiled into a CloudFormation template (JSON/YAML).

### AWS Elastic Beanstalk

A developer-centric Platform as a Service (PaaS) for deploying web applications. Uses EC2, ASG, ELB, RDS under the hood, but manages them automatically. Free service — you pay for underlying instances.

**Architecture models:** Single Instance (dev), LB + ASG (production web apps), ASG only (non-web production).

### AWS CodeDeploy

Deploys applications automatically to EC2 instances and on-premises servers. Hybrid service.

### AWS CodeCommit

Source-control service that hosts Git-based repositories. Private, secured, and integrated with AWS.

### AWS CodeBuild

Compiles source code, runs tests, and produces deployment-ready packages. Fully managed and serverless.

### AWS CodePipeline

Orchestrates CI/CD pipeline steps: Code → Build → Test → Provision → Deploy.

### AWS CodeArtifact

Secure, scalable artifact management for software packages and dependencies.

### AWS CodeStar

Unified UI to manage all developer services (CodeCommit, CodePipeline, CodeBuild, CodeDeploy) in one place.

### AWS Cloud9

Cloud IDE for writing, running, and debugging code in a browser. Supports real-time pair programming.

### AWS Systems Manager (SSM)

Manages EC2 and on-premises systems at scale. Key features: patching automation, run commands across server fleets, SSM Parameter Store.

**SSM Session Manager**: Secure shell access to EC2 without SSH access, bastion hosts, or port 22.

### AWS OpsWorks

Managed Chef & Puppet for server configuration automation. Alternative to SSM.