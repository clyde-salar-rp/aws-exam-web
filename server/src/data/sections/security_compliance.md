# Security & Compliance

- [Security \& Compliance](#security--compliance)
  - [Authentication and Authorization](#authentication-and-authorization)
  - [AWS Shared Responsibility Model](#aws-shared-responsibility-model)
  - [AWS Security Controls](#aws-security-controls)
  - [AWS Identity and Access Management (IAM)](#aws-identity-and-access-management-iam)
  - [Additional Access Management Services](#additional-access-management-services)
  - [Network and Application Attacks](#network-and-application-attacks)
  - [AWS Network and Application Protection](#aws-network-and-application-protection)
  - [AWS Shield](#aws-shield)
  - [AWS WAF](#aws-waf)
  - [Data Encryption](#data-encryption)
  - [AWS Built-in Data Protection](#aws-built-in-data-protection)
  - [AWS Data Protection Services](#aws-data-protection-services)
  - [Detection and Response Services](#detection-and-response-services)
  - [Summary](#summary)

## Authentication and Authorization

_Authentication_ is the process of verifying the identity of a user or entity through credentials like a username and password combination.

- **Use case:** An employee logs in to an employee portal.

_Authorization_ grants users certain access rights and permissions that determine which actions they can perform in a system or application.

- **Use case:** An employee can only access their own employee records inside the employee portal.

<img src="/images/auth_authentication_authorization.png">

## AWS Shared Responsibility Model

Cloud security is a shared responsibility between customers and AWS.

**Customers: Security _in_ the cloud**
When using AWS services, customers maintain complete control over their content. As a result, customers are responsible for securing everything they create and manage in the AWS Cloud. This includes the following:

- Managing the security of data, systems, and applications
- Deciding what data and workloads to store or run in AWS
- Determining which AWS services to use
- Controlling who has access to environments and resources

**AWS: Security _of_ the cloud**
AWS is responsible for security _of_ the cloud. AWS operates, manages, and controls the components at all layers of the infrastructure. This includes securing the following:

- The foundational software that powers AWS services
- The virtualization layer
- The hardware and global infrastructure that supports the data centers from which services operate. This includes protection for AWS Regions, Availability Zones, and edge locations.

<img src="/images/shared_responsibility_model_overview.png">

## AWS Security Controls

AWS offers multiple security mechanisms to protect your cloud resources. These controls can help you do the following:

- _Prevent_ security incidents through proper permission and access management.
- _Protect_ networks, applications, and data.
- _Detect and respond_ to security incidents as they occur.

<img src="/images/security_controls.png">

## AWS Identity and Access Management (IAM)

**Securely manage identities and access to AWS services and resources.**

One of the best ways to prevent security incidents before they happen is through proper permission and access management. With IAM, by default, all actions are denied. You must explicitly grant permission to someone before they can perform any actions in your account.

When you grant permissions, you should provide access only on a need-to-have basis. This concept is called the principle of least privilege.

> _The **principle of least privilege** dictates that you should only give people and systems access to what they need and nothing else._

IAM provides users, groups, and roles so you can configure access based on your company's specific operational and security needs. IAM policies define the needed access for these identities.

<img src="/images/iam_identities.png">

### IAM Identities

1. **AWS account root user** - The root user is the account owner and has permission to do anything inside the AWS account. You should associate a strong password with this powerful account and turn on multi-factor authentication (MFA), which requires at least two verification methods to log in. To handle daily tasks, you should create other IAM identities, such as IAM users.

2. **IAM users** - An IAM user represents a person or application that interacts with AWS services and resources. It consists of a name and credentials. AWS recommends creating individual IAM users for each person who needs to access the AWS account, so they have their own unique set of security credentials.

3. **IAM groups** - An IAM group is a collection of IAM users. When you assign permissions to a group, all users in the group inherit the permissions. For example, you might assign standard access permissions to a group called **employees** so all your employees receive the same generic access.

4. **IAM roles** - An IAM role is an identity you can assume to gain temporary access to permissions. When someone assumes an IAM role, they abandon all previous permissions they had under a previous role and assume the permissions of the new role.

5. **IAM policies** - An IAM policy is a JSON document that allows or denies permission to access AWS services and resources. IAM policies can also define the level of access to resources. For example, you can allow employees to access all the Amazon S3 buckets in your AWS account or only a specific bucket.

## Additional Access Management Services

### AWS IAM Identity Center

IAM Identity Center centralizes identity and access management across AWS accounts and applications. IAM Identity Center can also connect to an existing identity source and provide your workforce with single sign-on access to all your connected AWS services and accounts. This is called federated identity management.

> _**Federated identity management** is a system that allows users to access multiple applications, services, or domains using a single set of credentials._

### AWS Secrets Manager

Secrets Manager provides a secure way to manage, rotate, and retrieve database credentials, API keys, and other secrets throughout their lifecycle. This helps keep your applications, services, and IT resources safe.

> _**Secrets** are confidential or private information intended to be known only to specific individuals or groups. Examples include passwords, database credentials, and API keys._

### AWS Systems Manager

Systems Manager provides a centralized view of nodes across your organization's accounts and Regions and multi-cloud and hybrid environments. With this service, you can quickly access node information, such as ID and operating system details, and automate registry edits, user management, and security patching.

> _**Nodes** are connection points in a network, system, or structure._

## Network and Application Attacks

Network and application protection is another vital component of a secure environment on AWS. Denial of service attacks might be used against your enterprise.

<img src="/images/dos_attack.png">

<img src="/images/ddos_attack.png">

## AWS Network and Application Protection

AWS automatically protects against low-level, brute-force attacks, such as DDoS, through its built-in infrastructure and network architecture. AWS infrastructure reaches across the globe and includes multiple Regions, Availability Zones, and edge locations. It is designed to make it difficult for attackers to overwhelm the system.

### AWS Protection Through Infrastructure

<img src="/images/aws_infrastructure_protection.png">

- **Security groups** - Security groups only allow in proper request traffic. They operate at the AWS network level so they can shrug off massive attacks using the entire AWS Region's capacity.
- **Elastic Load Balancing (ELB)** - ELB handles traffic first before handing it off, so your frontend server is not overwhelmed. Like security groups, it runs at the Region level.
- **AWS Regions** - The enormous capacity of Regions makes them extremely difficult to overwhelm. It would be massively expensive to achieve.

## AWS Shield

- _AWS Shield Standard_ is designed to automatically protect AWS customers from the most common, frequently occurring types of DDoS attacks at no cost. It uses a variety of analysis techniques to detect and mitigate incoming malicious network traffic in real time.
- _AWS Shield Advanced_ is a paid service that provides detailed attack diagnostics and the ability to detect and mitigate sophisticated DDoS attacks. It also integrates with other services, such as Amazon CloudFront, Amazon Route 53, and ELB.
- You can integrate AWS Shield with AWS WAF by writing custom rules to mitigate complex DDoS attacks.

## AWS WAF

AWS WAF is a web application firewall that monitors network requests that come into your web applications. When a request comes into AWS WAF, it checks the IP address against a web access control list (web ACL). If the request comes from a blocked IP address on the web ACL, AWS WAF denies access. Legitimate requests are allowed access.

## Data Encryption

Encryption is a key component of data protection. Data encryption works like a lock and key mechanism. If you have the right key, you can access the encrypted data. Otherwise, you cannot access the data.

<img src="/images/encryption_basics.png">

### Types of Data Encryption

- **Data encryption at rest**: The data is idle and not moving, like when it's stored in a database.
- **Data encryption in transit:** The data is moving between locations, like when it's being sent from a database to an application. SSL/TLS certificates are used to establish encrypted network connections from one system to another.

<img src="/images/encryption_at_rest_in_transit.png">

## AWS Built-in Data Protection

<img src="/images/builtin_data_protection.png">

- **Amazon S3** - By default, all new S3 buckets have encryption configured, and all uploaded objects are encrypted at rest.
- **Amazon EBS** - Amazon EBS volumes and snapshots can be encrypted at rest, including both boot and data volumes of an Amazon EC2 instance.
- **Amazon DynamoDB** - Server-side encryption at rest is enabled on all DynamoDB table data using encryption keys stored in AWS Key Management Service (AWS KMS).

## AWS Data Protection Services

### AWS Key Management Service (AWS KMS)

You can use AWS KMS to create and manage cryptographic keys. These keys can then be used to encrypt and decrypt your data. You can also control the use of keys across a wide range of services and in your applications. Your keys never leave AWS KMS, and you can temporarily disable them so they can no longer be used.

> _A **cryptographic key** is a random string of digits used for locking (encrypting) and unlocking (decrypting) data._

### Amazon Macie

With Amazon Macie, you can monitor your sensitive data at rest to make sure it's safe. Macie uses machine learning (ML) and automation to discover sensitive data stored in Amazon S3. You can use Macie to assess your security posture, which is especially helpful for meeting compliance requirements.

### AWS Certificate Manager (ACM)

ACM centralizes the management of your SSL/TLS certificates that provide data encryption in transit. It can be used to protect various AWS services and your connected on-premises resources.

> _**SSL/TLS certificates** are used to establish encrypted network connections from one system to another._

## Detection and Response Services

Preventing and protecting against security threats are two methods for securing your AWS resources. You should also be prepared to detect and respond to security incidents that might occur.

### Amazon Inspector

Amazon Inspector helps improve the security and compliance of applications by running automated security assessments for Amazon EC2 instances, containers, and Lambda functions. It checks applications for security vulnerabilities and deviations from security best practices, such as open access to EC2 instances and installations of vulnerable software versions.

You can view completed assessments in the Amazon Inspector console. These assessments include a list of security findings prioritized by severity level. Each identified security issue includes a detailed description and a recommendation for how to fix it. You can also retrieve these findings through an API.

### Amazon GuardDuty

Amazon GuardDuty provides intelligent threat detection across your infrastructure and resources. GuardDuty identifies threats by continuously monitoring streams of your account metadata and network activity in your environment. It uses known malicious IP addresses, anomaly detection, and machine learning to identify threats more accurately.

You can review detailed findings about any GuardDuty detected threats in the AWS Management Console. Findings include recommended steps for remediation. You can also configure AWS Lambda functions to perform remediation steps automatically.

### Amazon Detective

After a threat has been detected, you can use Amazon Detective to further investigate the root cause. Detective helps you analyze threats with interactive visualizations contained in a unified AWS Management Console view. These visualizations include resource and user interactions over a configurable timeline with recommended steps for remediation.

### AWS Security Hub

Security Hub brings multiple security services together into a single place and format. With this service, you can quickly see your security and compliance state in one comprehensive view. Security Hub automatically aggregates security findings from AWS and partner services and organizes them into actionable, meaningful groupings called insights. It can accelerate time to resolution (TTR) with automated remediation.

## Summary

| Resource | Description |
| --- | --- |
| AWS Identity and Access Management (IAM) | Securely manage identities and access to AWS services and resources. |
| AWS IAM Identity Center | Connect your existing workforce identity source and centrally manage access to AWS with single sign-on. |
| AWS Secrets Manager | Centrally store and manage credentials, API keys, and other secrets. |
| AWS Systems Manager | Manage nodes, or connection points, at scale on AWS and in multi-cloud and hybrid environments. |
| AWS Shield | Protect your network and applications from the most common, frequently occurring types of DDoS attacks. |
| AWS WAF | Protect your network and applications from blocked IP addresses defined by a web ACL. |
| AWS Key Management Service (AWS KMS) | Create and manage cryptographic keys to encrypt and decrypt your data. |
| Amazon Macie | Certify that sensitive data is discovered and protected in Amazon S3. |
| AWS Certificate Manager (ACM) | Create and manage SSL/TLS certificates that provide data encryption in transit. |
| Amazon Inspector | Check applications for security vulnerabilities and deviations from security best practices. |
| Amazon GuardDuty | Continuously monitor the AWS environment with intelligent threat detection. |
| Amazon Detective | Analyze threats with interactive visualizations contained in a unified view. |
| AWS Security Hub | Aggregate security findings and organize them into actionable insights. |
