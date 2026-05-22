## AWS pricing, AWS support, and cost optimization

In these next lessons, you will learn about essential pricing concepts, tools, and strategies for effectively tracking and controlling your AWS spending.

In the first section, you learn about key pricing concepts. You are also introduced to tools like the AWS Billing Dashboard, AWS Budgets, and AWS Cost Explorer to help you track, manage, and forecast AWS costs.

In the next section, you learn about options for support. This section provides information on AWS Support plans and other resources, including the AWS Marketplace and AWS Partner Network.

The final section applies concepts to the real world by thinking about cost optimization. This section provides a practical example to help you efficiently manage cloud costs and optimize AWS service expenses.

# AWS Pricing

## Key Concepts

|Concept|Description|
|---|---|
|**Pay as you go**|Adapt to changing business needs and reduce the risk of overprovisioning or missing capacity.|
|**Save when you commit**|Savings Plans for compute services offer reduced rates over On-Demand pricing when you commit to a 1-year or 3-year plan.|
|**Pay less by using more**|Pricing for some services is tiered — the more you use, the less you pay per unit.|

---

## Drivers of Cost

AWS pricing varies based on service type, configuration, Region, and pricing model. Three fundamental drivers affect cost across all services:

### Compute

You pay by a unit of time (per hour or per second) from the moment you launch a resource until you stop it. Reserved instances have a pre-agreed cost.

### Storage

Pricing depends on how much storage you have provisioned or are actively using. For tiered services like Amazon S3, costs can be optimized based on how frequently and quickly you need to access data.

**Amazon S3 cost components:**

- Storage pricing
- Request and data retrieval pricing
- Data transfer and transfer acceleration pricing
- Data management and analytics pricing
- Replication pricing
- Amazon S3 Object Lambda processing

→ [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing/?nc=sn&loc=4)

### Data Transfer

Inbound data transfer and transfers between AWS services within the same Region are generally free (verify exceptions before starting). **Outbound data transfer** is aggregated across services and charged per gigabyte — the more you transfer, the less you pay per GB.

---

## Pricing Scenario — Amazon EC2

A nonprofit organization provisions an EC2 instance to run a donation processing application. Here's how the three cost drivers apply:

|Driver|Example|
|---|---|
|**Compute**|Over 500 EC2 instance types are available, each with different CPU and memory specs. The organization chose a _t4g.nano_ — the lowest-cost option that still meets their needs.|
|**Storage**|The application requires storage, so an Amazon EBS volume is attached. Cost is determined by the amount of capacity configured.|
|**Data transfer**|Processed data is transferred from EC2 to an analytics solution — this counts as outbound data transfer. Cost depends on the volume transferred and the destination Region or internet source.|

→ [Data Transfer pricing on Amazon EC2](https://aws.amazon.com/ec2/pricing/on-demand/)

![](/images/Pasted%20image%2020260427143203.png)


## AWS pricing and billing services

You learned about various AWS pricing and billing services and tools. These services are purpose-built to help you forecast, track, manage, and view your AWS costs. When you are first starting out with the AWS Cloud, they can be hard to tell apart. To help you differentiate the services, let's review these services and their key uses cases.

> **AWS Organizations**

AWS Organizations provides centralized management and governance of your AWS environment. Using AWS Organizations, you can create, group, and manage accounts. You can also apply security policies at the account level and consolidate billing with multiple accounts using a single payment method.

Use cases:

- Consolidate multiple AWS accounts into one central organization.
    
- Implement organization-wide policies.
    

To learn more about AWS Organizations, refer to the [AWS Organizations User Guide(opens in a new tab)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html).

> **AWS Billing and Cost Management dashboard**

The AWS Billing and Cost Management dashboard centralizes cost management, showing current charges, usage, forecasts, and detailed breakdowns. It also provides tools to manage payments, view invoices, set budgets, and consolidate billing.

Use cases:

- Use helpful visualizations and billing reports of monthly AWS spend.
    
- Set up and manage payment methods.
    

To learn more about the AWS Billing and Cost Management dashboard, refer to the [AWS Billing User Guide(opens in a new tab)](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/view-billing-dashboard.html).

> **AWS Budgets**

AWS Budgets helps set custom budgets and sends alerts when costs, usage, or Savings Plans and Reserved Instances (RIs) utilization or coverage exceed defined thresholds.

Use cases:

- Set up alerts for when projected costs exceed predefined thresholds.
    
- Forecast future expenses based on current usage trends.
    

To learn more, refer to [Managing your costs with AWS Budgets(opens in a new tab)](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html).

> **AWS Cost Explorer**

AWS Cost Explorer helps visualize, analyze, and manage AWS costs and usage with interactive graphs, reports, and forecasts. It provides insights into spending patterns, trends, and Reserved Instance recommendations.

Use cases:

- Analyze historical spending trends to identify cost-saving opportunities.
    
- Forecast future AWS costs based on current usage patterns to budget effectively.
    

To learn more, refer to [Analyzing your costs and usage with AWS Cost Explorer(opens in a new tab)](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html).

> **AWS Pricing Calculator**

Another helpful tool is the AWS Pricing Calculator. The AWS Pricing Calculator is a web-based planning tool that you can use to create estimates. You input specific configurations such as instance types, storage options, and data transfer volumes. Then, based on your configurations, you receive a detailed cost breakdown to help you budget for your AWS resource allocation.

Use cases:

- Estimate potential costs before deployment.
    
- Compare costs of different AWS services and configurations.
    

To learn more, refer to [Generating estimates with AWS Pricing Calculator(opens in a new tab)](https://docs.aws.amazon.com/cost-management/latest/userguide/pricing-calculator.html).

# Types of AWS Support

AWS offers a range of support plans tailored to meet the needs of different customers, from those just getting started to large enterprises with complex requirements. Each plan builds onto the previous one, adding more advanced tools, personalized support, and faster response times to help you get the most out of your AWS experience.

---

## Support Plans

  

|Basic Support|Developer Support *|Business Support *|Enterprise On-Ramp Support *|Enterprise Support|
|---|---|---|---|---|
|Included for all AWS customers|Recommended for experimenting or testing in AWS|Recommended minimum tier for production workloads in AWS|Recommended for production and business critical workloads in AWS|Recommended for business critical and mission critical workloads in AWS|
|Includes access to documentation, whitepapers, and AWS re:Post|Response times:  <br>• < 24 hours for general guidance• < 12 hours when systems impaired|Response times:  <br>• _Includes previous plan response times_  <br>• < 4 hours when production system impaired  <br>• < 1 hour when production system is down|Response times:  <br>• _Includes previous plan response times_  <br>• < 30 minutes when business-critical system is down|Response times:  <br>• _Includes previous plan response times_  <br>• < 15 minutes when business- or mission-critical system is down|
|Core AWS Trusted Advisor checks|Core AWS Trusted Advisor checks|Full set of AWS Trusted Advisor checks|Full set of AWS Trusted Advisor checks|Full set of AWS Trusted Advisor checks and prioritized recommendations by AWS account team|
|Technical Account Management not included|Technical Account Management not included|Technical Account Management not included|A pool of technical account managers (TAMs) provide proactive guidance|A designated TAM provides consultative architectural and operational guidance|

### Response Times (Full Detail)

- **Basic** — No response time SLA
- **Developer** — < 24 hours general guidance; < 12 hours when systems impaired
- **Business** — Includes previous plan + < 4 hours when production system impaired; < 1 hour when production system is down
- **Enterprise On-Ramp** — Includes previous plan + < 30 minutes when business-critical system is down
- **Enterprise** — Includes previous plan + < 15 minutes when business- or mission-critical system is down

### End of Support Notice

Developer Support, Business Support, and Enterprise On-Ramp Support plans will be discontinued January 1, 2027. To learn more, refer to [AWS Support Plans(opens in a new tab)](https://docs.aws.amazon.com/awssupport/latest/user/aws-support-plans.html). To learn about and compare new support plan options, refer to [Compare AWS Support plans(opens in a new tab)](https://aws.amazon.com/premiumsupport/plans/).

---

### Technical Account Manager (TAM)

A **technical account manager (TAM)** is included with the Enterprise On-Ramp and Enterprise Support plans. The TAM serves as your primary AWS contact, offering expert guidance on using AWS services, optimizing architectures, managing costs, and connecting you with AWS programs and experts. For example, if you're building an app using multiple AWS services, your TAM can advise on the best integration approach.

---

## Additional Resources for Your Cloud Journey

In addition to AWS Support plans, AWS also provides access to other teams, resources, and documentation that you can use to support your cloud journey.

### AWS re:Post

AWS re:Post is a community-driven, question-and-answer platform where users can seek help, share knowledge, and find solutions related to AWS services and technologies.

AWS re:Post also houses AWS Knowledge Center. AWS Knowledge Center contains articles and videos covering the most frequently asked questions and requests from AWS customers. To learn more about AWS re:Post, refer to [AWS re:Post(opens in a new tab)](https://repost.aws/). To learn more about AWS Knowledge Center, refer to [AWS Knowledge Center(opens in a new tab)](https://repost.aws/knowledge-center).

### AWS Trust and Safety Center

The AWS Trust and Safety Center provides information on how to report activity or content on AWS that you suspect is abusive. To learn more about this service, refer to [AWS Trust and Safety Center(opens in a new tab)](https://repost.aws/aws-trust-and-safety).

### AWS Solutions Architects

For Business and Enterprise Support customers, AWS solutions architects (SAs) provide architectural guidance, best practice recommendations, and help in designing scalable and secure applications.

### AWS Professional Services

AWS Professional Services is a consulting service that offers deeper, project-based support. They help with complex migrations, security audits, performance tuning, and more. To learn more about this service, refer to [AWS Professional Services(opens in a new tab)](https://aws.amazon.com/professional-services/).

### Self-Support at AWS

AWS also provides extensive documentation and self-support resources that you can use to research, answer a question, or troubleshoot an issue. Documentation includes user guides for AWS services, SDK guides, blog posts, and whitepapers for specific solutions.

To learn more about these resources, refer to [AWS documentation(opens in a new tab)](https://docs.aws.amazon.com/index.html).

## AWS Marketplace and AWS Partner Network

### **AWS Marketplace**

The AWS Marketplace is a digital catalog that includes thousands of software listings from independent software vendors. You can use AWS Marketplace to find, test, and buy software that runs on AWS. For each listing in AWS Marketplace, you can access detailed information on pricing options and reviews from other AWS customers. Solutions and services offered in the AWS Marketplace include the following:
- •
    
    **Software as a service (SaaS):**
    
    - Business applications such as project management tools
        
    - Marketing tools such as customer engagement platforms
        
    - Collaboration tools such as file sharing services
        
    
- •
    
    **Machine learning (ML) and AI**:
    
    - Prebuilt models for image recognition, natural language processing, and more
        
    - ML algorithms for training custom models
        
    
- •
    
    **Data and analytics**:
    
    - Business intelligence platforms for visualization and reporting
        
    - Data integration tools
        
    

You can also explore software solutions by industry and use case. For example, suppose your company is in the healthcare industry. In AWS Marketplace, you can review use cases that software helps you to address, such as implementing solutions to protect patient records or using machine learning models to analyze a patient’s medical history and predict possible health risks.

To explore more offerings and find the right fit for your business, refer to [AWS Marketplace(opens in a new tab)](https://aws.amazon.com/marketplace).

### **AWS Partner Network**

The AWS Partner Network (APN) is a global community that uses AWS technologies, programs, expertise, and tools to build solutions and services for customers. Together, partners and AWS provide innovative solutions, solve technical challenges, and deliver customer value.

You can work with AWS Partners to create or use specialized solutions that are tailored to your unique business needs. For example, a retail company might use AWS to host their website. They could then work with an AWS Partner who specializes in advanced analytics and machine learning to improve customer personalization on that website. To learn more about working with AWS Partners, refer to [Engage with AWS Partners(opens in a new tab)](https://partners.amazonaws.com/).

You can also become an AWS Partner. There are many benefits to becoming a partner, including the following:

- •
    
    **Funding benefits:** As businesses join the AWS Partner Network and participate in specific programs available to AWS Partners, they can unlock various funding benefits to help build, market, and sell with AWS. To learn more, refer to [AWS Partner Funding(opens in a new tab)](https://aws.amazon.com/partners/funding/).
    
- •
    
    **AWS Partner events:** AWS Partner events include webinars, virtual workshops, and in-person learning opportunities. You can use AWS Partner events to network with other partners, learn more about new or current offerings, and collaborate with AWS experts. To learn more, refer to [AWS Partner Events(opens in a new tab)](https://aws.amazon.com/events/aws-partner-events/). 
    
- •
    
    **AWS Partner Training and Certification:** Take advantage of unique, partner-centered offerings from AWS Training and Certification. From certification to a specific service or learning objective, the AWS Partner training portfolio has numerous opportunities to upskill your cloud knowledge. To learn more, refer to [AWS Partner Training(opens in a new tab)](https://aws.amazon.com/partners/training/).

## Cost optimization architecture diagram

Let's review the solutions discussed in the video. The following architecture diagram demonstrates a few different ways for optimizing costs in the cloud. To learn more about this architecture focused on cost optimization, choose each of the four numbered markers.

![](/images/Pasted%20image%2020260427145343.png)

1.  Amazon EC2

	One way to optimize cost with Amazon EC2 instances is to rightsize your resources. This means that you analyze and adjust your resources to meet the needs of your workload. Services such as AWS Compute Optimizer can help rightsize your compute resources.
	
	Also, using Spot Instances can help optimize for cost. Spot Instances work well for workloads that are tolerant to interruptions. Spot Instances use spare Amazon EC2 capacity for a significant discount compared to On-Demand instances.

2.  Auto scaling

	Another way to help optimize cost with compute resources is auto scaling. When demand drops, AWS Auto Scaling will automatically remove any excess resource capacity, so you avoid overspending. Application load balancing also helps distribute traffic across EC2 instances.

3.  Amazon RDS

	Rightsizing is an important piece of cost optimization in your Amazon Relational Database Service (Amazon RDS) instances. Amazon RDS can scale storage using storage autoscaling which prevents over- or underprovisioning.
	
	Read replicas scale capacity horizontally, meaning your resources won't need to a scale up into a larger instance. Instead of scaling the primary instance, read replicas are used to store data and can be used for heavy read workloads which in turn reduces the strain on the primary instance. Similarly, using something like Amazon Elasticache for caching can also reduce the load on your primary instance and optimize for cost.

4.  Amazon S3

	Using the right storage class is key to optimizing cost in the cloud.
	
	For example, you might use S3 Glacier Deep Archive as a low-cost storage tier ideal for data that is accessed once or twice a year. For data with unknown or changing access patterns, S3 Intelligent-Tiering is a great choice.
	
	You can also use VPC endpoints to help optimize for cost as well, as using VPC endpoints for Amazon S3 access can help reduce data transfer costs.