## Importance of monitoring

Monitoring your cloud resources is important. It provides a way for you to continuously observe and analyze system activity, network traffic, and security events to detect potential threats or anomalies. Monitoring and observability are critical components for ensuring the security, availability, reliability, and performance of your cloud-based workloads and data.

![](/images/Pasted%20image%2020260302180523.png)

Monitoring is performed using real-time monitoring tools, log collection and analysis, and dashboards. In the following lessons, you will identify several different monitoring tools and what they do.

## Watch over your resources and applications

> **Amazon CloudWatch**

CloudWatch monitors your AWS resources and the applications that you run on AWS in real time. With CloudWatch, you gain system-wide visibility into resource utilization, application performance, and operational health.  CloudWatch does more than just monitor. It has several features that work together:

- CloudWatch metrics
    
- CloudWatch alarms
    
- CloudWatch dashboards
    
- CloudWatch logs
    

To learn more about each CloudWatch feature, choose each of the following four numbered markers.

![](/images/Pasted%20image%2020260302192731.png)

1.  **Metrics**
	CloudWatch collects metrics from all your AWS resources, applications, and services that run on AWS and on-premises servers.

2.  **Alarms**
	With CloudWatch alarms, you can define thresholds on CloudWatch metrics and send notifications or automatically make changes to the resources.

3.  **Dashboards**
	Dashboards are customizable home pages in the CloudWatch console that you can use to monitor your resources in a single view.

4.  **Logs**
	CloudWatch Logs centralize the logs from all of the systems, applications, and AWS services that you use.

**Benefits:** CloudWatch helps you visualize and analyze your resources, operate efficiently with automation, use an integrated view, proactively monitor, and gain insights.

**Use case:** It can be used to monitor and troubleshoot infrastructure.

**Example:** A retail company is using CloudWatch features to monitor their application running on Amazon Elastic Compute Cloud (Amazon EC2) instances. CloudWatch automatically collects metrics, like utilization, on the EC2 instances. The company sets up CloudWatch to collect logs on the application performance. They also have alarms for when the Amazon EC2 utilization gets too high for an extended period. They even have an action configured to automate and scale up the number of EC2 instances when the alarm sounds. Finally, they create a custom dashboard to visualize everything all in one place. Now they can analyze the logs to gain insights on performance issues or application errors.


## Importance of auditing

Imagine a financial company with a hybrid cloud solution trying to figure out what happened when there are changes made to their resources in the cloud and on premises. They need this information for troubleshooting and to provide detailed records for compliance. That's where CloudTrail can help.

![](/images/Pasted%20image%2020260302193427.png)

> **AWS CloudTrail**

CloudTrail tracks user activity and API usage in the AWS Cloud, on premises, and even with other cloud providers. CloudTrail provides a detailed history of API calls, so you can track changes and identify who made them and when. This helps you understand what actions were taken on your AWS resources.

**Benefits:** CloudTrail provides auditing, security monitoring, and operational troubleshooting. It also helps you prove compliance and improve your security posture.

**Use cases:** It can be used for compliance and auditing, identifying security incidents, troubleshooting operational issues.

To learn more about CloudTrail features, expand each of the following three categories.

## CloudTrail events

CloudTrail events capture details about actions performed within your AWS account, such as API calls, console actions, or other activities. Event history provides a viewable, searchable, downloadable, and immutable record of the past 90 days of management events in an AWS Region. There are no CloudTrail charges for viewing event history.

## CloudTrail logs

CloudTrail monitors events and delivers those events as log files to your Amazon Simple Storage Service (Amazon S3) bucket. Because CloudTrail logs are securely stored, they can be used to prove compliance with regulations such as Payment Card Industry (PCI) and Healthcare Insurance Portability and Accountability Act (HIPAA).

## CloudTrail Insights

CloudTrail Insights analyzes your normal patterns of API call volume and API error rates. CloudTrail Insights also generates Insights events when API call volumes and error rates deviate from these normal patterns. You can enable CloudTrail Insights in your trails or event data stores to detect anomalous behavior and unusual activity.

## Benefits of compliance with AWS

Compliance refers to your cloud resources and data adhering to relevant regulations, industry standards, and internal policies regarding security and data protection. AWS helps you meet compliance goals and requirements in the following ways:

- Inheriting the latest security controls that AWS uses on its own infrastructure
    
- Third-party validation for thousands of global requirements
    
- Streamlining and automating compliance
    
- On-demand compliance reports

> **AWS Artifact**

AWS Artifact is a service that provides no-cost, on-demand access to AWS security and compliance reports and select online agreements.

**Benefits:** AWS Artifact helps you manage at scale, save time with on-demand access to compliance reports, and deploy with more confidence.

**Use cases:** It can be used to manage select online agreements and assess third-party security and compliance.

**AWS Artifact consists of two types:**

AWS Artifact agreements and AWS Artifact reports.

To learn more about the two types, expand each of the following two categories.

## AWS Artifact Agreements

Suppose that your company needs to sign an agreement with AWS regarding your use of certain types of information throughout AWS services. You can do this through AWS Artifact Agreements.

In AWS Artifact Agreements, you can review, accept, and manage agreements for an individual account and for all your accounts in AWS Organizations. Different types of agreements are offered to address the needs of customers who are subject to specific regulations, such as the Health Insurance Portability and Accountability Act (HIPAA).

## AWS Artifact Reports

Next, suppose that a member of your company’s development team is building an application and needs more information about their responsibility for complying with certain regulatory standards. You can advise them to access this information in AWS Artifact Reports.

AWS Artifact Reports provide compliance reports from third-party auditors. These auditors have tested and verified that AWS is compliant with a variety of global, regional, and industry-specific security standards and regulations. AWS Artifact Reports remains up to date with the latest reports released. You can provide the AWS audit artifacts to your auditors or regulators as evidence of AWS security controls.

## AWS Compliance

The [AWS Compliance portal(opens in a new tab)](https://aws.amazon.com/compliance/) contains resources to help you learn more about AWS compliance. You can read customer compliance stories to discover how companies in regulated industries have solved various compliance, governance, and audit challenges.

You can also access compliance whitepapers and documentation on topics such as the following:

- AWS answers to key compliance questions
    
- An overview of AWS risk and compliance
    
- An auditing security checklist
    

For essentials and best practices, guides, and workbooks, including training, visit [Additional compliance resources(opens in a new tab)](https://aws.amazon.com/compliance/resources/).

Most companies will want you to follow specific configuration guidelines for your different AWS resources. This means that you will want a way to assess and audit the resources that you create on AWS to help ensure that they meet those rules. That's where AWS Config can help.

> **AWS Config**

AWS Config is a service that you can use to assess, audit, and evaluate the configurations of your AWS resources.

**Benefits:** AWS Config helps evaluate configurations against a desired state, manage resource configuration changes, and simplify troubleshooting and remediation.

**Use cases:** It can be used to continually audit security monitoring and analysis and to streamline operational troubleshooting and change management.

![](/images/Pasted%20image%2020260302195748.png)

> **AWS Audit Manager**

Audit Manager is a service that continually audits your AWS usage to simplify risk and compliance assessment. It helps collect evidence and manage audit data.

**Benefits:** Audit Manager saves time with automated evidence collection, streamlines collaboration across teams, and helps ensure integrity of audits with read-only permissions.

**Use case:** It can be used to automate evidence collection, continually audit to assess compliance, and deploy internal risk assessments.

![](/images/Pasted%20image%2020260302195818.png)



As companies grow and scale, the management and governance of disparate AWS accounts can be a challenge. That's where AWS Organizations can help.

> **AWS Organizations**

Organizations helps you centrally manage and govern your environment as you grow and scale your AWS resources. It helps you manage policies for groups of accounts and automate account creation.

**Benefits:** Organizations provides several benefits like quickly scaling your environment by programmatically creating new AWS accounts for resources and teams. It also helps by simplifying permission management through SCPs and managing and optimizing costs across your AWS accounts and resources.

**Use cases:** It can be used for automating AWS account creation, providing tools and access for your security teams, controlling user access to designated services, and sharing common resources across accounts.

### **Key concepts of Organizations**

An organization is a collection of AWS accounts that you can manage centrally and organize into a hierarchical, tree-like structure with a root at the top and organizational units (OUs) nested under the root. Each account can be located directly in the root or placed in one of the OUs in the hierarchy.

To learn more about how AWS Organizations works, choose each of the following four numbered markers.

![](/images/Pasted%20image%2020260302200504.png)

1.  **AWS Organizations**
	AWS Organizations is used to consolidate and manage multiple AWS accounts within a central location. When you create an organization, it automatically creates a root, which is the parent container for all the accounts in your organization.

2.  **Management account**
	The management account is the central AWS account that creates and manages the organization. It's responsible for overall control and governance.

3.  **Organizational unit (OU)**
	An organizational unit (OU) is a logical grouping of accounts in an AWS Organization. OUs can contain member accounts or nested OUs.

4.  **Service control policies (SCP)**
	An SCP is a policy that lets you place restrictions on the AWS services, resources, and individual API actions that users and roles in each account can access. SCPs can be applied to either OUs or individual member accounts.

5.  **Member account not in an OU**
	If you have a member account that has unique requirements that do not overlap with those of an organizational unit, you can add them to the organization. They do not have to be placed under an OU. This account can still take advantage of benefits such as consolidated billing.

In designing your organization, you should consider the business, security, and regulatory needs of each department. You use this information to decide which departments group together in OUs.

To learn more about centrally managing your environment as you scale your AWS resources, refer to the [AWS Organizations User Guide.](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)

## Governance in the AWS Cloud

In this lesson, you will review the following three AWS services that can help govern and enforce services and accounts to meet your company's requirements:

- **AWS Control Tower**
    
- **AWS Service Catalog**
    
- **AWS License Manager**

If you want to enforce and manage rules across organizations and accounts for security, you can use AWS Control Tower.

> **AWS Control Tower**

AWS Control Tower is a service you can use to enforce and manage governance rules for security, operations, and compliance at scale across all your organizations and accounts in the AWS Cloud.

**Benefits:** AWS Control Tower can help you save time while providing governance. It uses preconfigured controls, which can help you to quickly set up multi-account environments, automation with built-in governance, and integration of third-party software at scale.

**Use cases:** Use AWS Control Tower to quickly deploy applications and provision compliant AWS accounts.

To learn more about AWS Control Tower features, choose each of the four numbered markers.

![](/images/Pasted%20image%2020260302202311.png)

1. Dashboard

	The AWS Control Tower dashboard provides continuous oversight to see provisioned accounts across your enterprise. AWS Control Tower also has controls for policy enforcement and can help detect noncompliant resources.

2. Account Factory

	The AWS Control Tower Account Factory is a configurable account template that standardizes the provisioning of new accounts.

3. Controls

	Controls, sometimes called guardrails, are high-level rules that provide governance for your overall AWS environment.

4. Landing zone

	A landing zone is a well-architected multi-account environment that's based on security and compliance best practices. It's the enterprise-wide container that holds all of the organizational units (OUs), accounts, users, and resources you want to regulate for compliance.

Managing employee requests for new AWS services or resources can be time consuming, but you also don't want everyone guessing which type of services and settings should be used. That's where Service Catalog can help.

> **AWS Service Catalog**

With Service Catalog, you can create, share, and organize from a curated catalog of AWS resources. You can deploy baseline networking resources and security tools for new AWS accounts so you can govern consistently.

**Benefits:** Service Catalog saves time by making it quick to find and deploy approved, self-service cloud resources. It also helps you stay agile while improving governance over resources across multiple accounts.

**Use cases:** Use it to provision resources across AWS accounts, apply access controls, and accelerate provisioning of continuous integration and continuous delivery (CI/CD) pipelines.

![](/images/Pasted%20image%2020260302202629.png)

When companies move from on premises to the cloud, they must decide how to handle their software licenses. With AWS Bring Your Own License model (BYOL), they can use existing software licenses purchased directly from vendors, such as Microsoft, on AWS services like Amazon EC2 Dedicated Hosts and Amazon WorkSpaces. This can result in significant cost savings compared to purchasing licenses directly from AWS. By using BYOL with existing licenses in a cloud environment, you get flexibility and potential optimized costs. The service that helps you manage and govern your software licenses is AWS License Manager.

> **AWS License Manager**

License Manager is a service that helps you manage your software licenses and fine-tune your licensing costs.

**Benefits:** License Manager helps with visibility and control, tracking and managing licenses, and reducing the risk of noncompliance with licenses.

**Use cases:** Use it to streamline license management and to simplify the Microsoft License Mobility through Software Assurance experience. You can also use it to automate the distribution and activation of software entitlements across AWS accounts for end users.

Managing software licenses can be time consuming, costly, and difficult to enforce. License Manager helps reduce the risk of noncompliance by enforcing license usage limits, blocking new launches, and using other controls.

To review the three governance services, choose each of the following flashcards.

1. **AWS Control Tower**  
	A service you can use to set up and govern a secure, compliant, multi-account AWS environment based on best practices

2. **Service Catalog**
	A service you can use to create, share, and organize AWS services and resources from a curated catalog that you define

3. **License Manager**
	A service that helps you manage your software licenses and fine-tune licensing costs

## Health of your AWS Cloud resources

**Notifications on service events**

AWS Health is the go-to data source for events and changes affecting the health of your AWS Cloud resources. It notifies you about service events, planned changes, and account notifications to help you manage and take actions.

> **AWS Health Dashboard**

With AWS Health Dashboard, you can view account-specific health information and get AWS Health event updates. You can also use AWS Health programmatically using the AWS Health API, which is available with AWS Premium Support.

**Benefits:** AWS Health Dashboard provides valuable information as a data source for events and changes. It gives you timely and actionable guidance to remedy issues. It also helps manage service health and is integrated and automated to use at scale.

**Use cases:** Use AWS Health Dashboard to view account-specific health information. You can also use it to plan for lifecycle events or troubleshoot an incident.

## Continuously evaluating your AWS environment

**To improve security, cost optimization, performance, and resilience**

> **Trusted Advisor**

Optimizing large scale cloud deployments is extremely important to do, and it's not a one-time thing. You must look for ways to optimize for costs, performance, security, and resilience. With AWS Trusted Advisor, you can continuously evaluate your AWS environment by using best practice checks across several categories. All AWS Support plans include access to dozens of Trusted Advisor checks. With Business Support and other advanced plans, you can benefit from hundreds of checks.

**Benefits:** Trusted Advisor helps you align with AWS best practices, prioritize recommendations, and optimize your AWS resources at scale.

**Use cases:** It can be used to optimize cost, efficiency, security, improve performance, and track service limits.

![](/images/Pasted%20image%2020260302204205.png)

Although Trusted Advisor does check to optimize security, you might need help to check the fine-grained permissions of your AWS Identity and Access Management (IAM). IAM Access Analyzer can help meet your goals for least privilege access within your AWS environment.

> **IAM Access Analyzer**

IAM Access Analyzer provides capabilities to set, verify, and refine permissions by analyzing external access and validating that your policies match your corporate security standards.

**Benefits:** IAM Access Analyzer provides benefits like refining permissions, validating IAM policies, helping you meet your least privilege goals, and automating IAM policy reviews.

**Use cases:** It can be used to set fine-grained permissions, verify who can access what, remediate unused access, and refine and remove broad access.
