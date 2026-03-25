# VPC

- [VPC](#vpc)
  - [Introduction to Networking](#introduction-to-networking)
  - [Amazon Virtual Private Cloud (Amazon VPC)](#amazon-virtual-private-cloud-amazon-vpc)
  - [Subnets](#subnets)
  - [Understanding Network Diagrams](#understanding-network-diagrams)
  - [Organizing Resources in the AWS Cloud](#organizing-resources-in-the-aws-cloud)
  - [Establishing Boundaries Around AWS Resources](#establishing-boundaries-around-aws-resources)
  - [Connecting Your Resources with an Internet Gateway](#connecting-your-resources-with-an-internet-gateway)
  - [Virtual Private Gateways](#virtual-private-gateways)

## Introduction to Networking

So far, you've learned about the AWS Cloud, AWS Regions, and Availability Zones. Now you will review two more foundational networking components you will use in the AWS Cloud.

## Amazon Virtual Private Cloud (Amazon VPC)

An Amazon VPC lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.

<img src="/images/vpc_overview.png">

- VPC provides three main benefits:
  - Increases security because you can secure and monitor connections, screen traffic, and restrict instance access
  - Gives you full control over your resource placement, connectivity, and security
  - Convenience means you will spend less time setting up, managing, and validating your virtual network compared to on-premises network management

## Subnets

Subnets are used to organize your resources and can be made publicly or privately accessible.

<img src="/images/subnets_overview.png">

- A **private subnet** is commonly used to contain resources like a database storing customer or transactional information.
- A **public subnet** is commonly used for resources like a customer-facing website.
- Within an Amazon VPC, you can organize your resources into subsections or subnets.
- A subnet is a section of an Amazon VPC that can contain resources, such as Amazon EC2 instances.

## Understanding Network Diagrams

A diagram is a schematic or map of your network in the AWS Cloud. It can provide a visual of how users or applications access services, resources, or data. With a quick glance, you can see if the network was built for redundancy, security, and even scalability.

<img src="/images/network_diagram_intro.png">

<img src="/images/aws_regions_vpc_azs.png">

- **AWS Cloud** is the outermost box in most diagrams.
- **Region** is the next box. AWS Regions are separate geographic areas. You choose your Region based on your users' geographic location for lower latency, compliance and data residency requirements, available services, and cost.
- **Amazon VPC** is a solid box, and it represents your isolated, logically segmented network within AWS. A VPC helps you to control your network resources and security.
- **Availability Zones** are shown as separate boxes across a region. AZs consist of one or more discrete data centers, each with redundant power, networking, and connectivity, and housed in separate facilities. Using multiple AZs can protect your applications from the failure of a single location in the Region.
- **Subnets** are essentially segments of your VPC, allowing you to divide your VPC into smaller, manageable sections. A subnet is a range of IP addresses in your VPC.
- **Private subnets** are designed to isolate resources that shouldn't be directly exposed to the public internet. In diagrams, they are illustrated with solid boxes.

<img src="/images/private_subnets_diagram.png">

- **Public subnets** are designed to provide direct internet access to resources placed inside them. To allow access, they are connected with an internet gateway. In diagrams, public subnets are drawn with dashed boxes.

<img src="/images/public_subnets_diagram.png">

## Organizing Resources in the AWS Cloud

Imagine the millions of customers who use AWS services. Also imagine the millions of resources that these customers have created, such as Amazon EC2 instances. Without boundaries around all these resources, network traffic can flow between them unrestricted.

## Establishing Boundaries Around AWS Resources

When organizing your resources in the AWS Cloud, you need to be able to group certain functions together and isolate them from the public, or make them available to the public.

<img src="/images/vpc_benefits.png">

### Internet Gateway

To allow public traffic from the internet to access your VPC, you attach an **internet gateway** to the VPC. An internet gateway is a connection between a VPC and the internet. You can think of an internet gateway as being similar to a doorway that customers use to enter the coffee shop. Without an internet gateway, no one can access the resources within your VPC.

<img src="/images/internet_gateway.png">

## Virtual Private Gateways

What if you have a VPC that includes only private resources?

- A **virtual private network (VPN)** creates a connection that is more like a secure tunnel through the internet. Using encryption, it hides and protects everything you send and receive from outside eyes.
- A **virtual private gateway** is the component in the AWS Cloud that makes it possible for you to connect this protected traffic to enter the VPC. With a VPN connection, your data travels privately and safely, hidden from others using the same route.
- With a virtual private gateway, you can establish a VPN connection between your VPC and a private network, such as an on-premises data center or internal corporate network. A virtual private gateway allows traffic into the VPC only if it is coming from an approved network.

<img src="/images/virtual_private_gateway.png">

### Key Acronym Differences

- **Amazon Virtual Private Cloud (Amazon VPC):** Used to establish boundaries around your AWS resources.
- **Virtual private gateway:** Allows protected internet traffic to enter into the VPC.
- **Virtual private network (VPN):** Encrypts your internet traffic, helping protect it from anyone who might try to intercept or monitor it.
