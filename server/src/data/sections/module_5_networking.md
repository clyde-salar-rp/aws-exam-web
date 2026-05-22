## Networking components

So far, you've learned about the AWS Cloud, AWS Regions, and Availability Zones. Now you will review two more foundational networking components you will use in the AWS Cloud.

### Amazon Virtual Private Cloud (Amazon VPC)

An Amazon VPC lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.

![](/images/Pasted%20image%2020260304172656.png)

### Subnet

Subnets are used to organize your resources and can be made publicly or privately accessible. A private subnet is commonly used to contain resources like a database storing customer or transactional information. A public subnet is commonly used for resources like a customer-facing website.

![](/images/Pasted%20image%2020260304172714.png)

## Networking components: Understanding connections through diagrams

If you are new to IT or cloud computing, you might not have worked with architectural diagrams before. A diagram is, simply put, a schematic or map of your network in the AWS Cloud. It can provide a visual of how users or applications access services, resources, or data. A picture is worth a thousand words. With a quick glance, you can see if the network was built for redundancy, security, and even scalability. It can also serve as a blueprint so you don't forget important connections when building your solutions.

To learn more about network diagrams, choose the arrow buttons to display each of the three slides.

#### Understanding network diagrams

![](/images/Pasted%20image%2020260304172852.png)

#### AWS Cloud, Regions, Amazon VPC, and AZs

![](/images/Pasted%20image%2020260304172913.png)

The **AWS Cloud** is the outermost box in most diagrams.

**Region** is the next box. AWS Regions are separate geographic areas. You choose your Region based on your users' geographic location for lower latency, compliance and data residency requirements, available services, and cost.

**Amazon VPC** is a solid box, and it represents your isolated, logically segmented network within AWS. A VPC helps you to control your network resources and security.

**Availability Zones** are shown as separate boxes across a region. AZs consist of one or more discrete data centers, each with redundant power, networking, and connectivity, and housed in separate facilities. Using multiple AZs can protect your applications from the failure of a single location in the Region.

#### Private subnets

![](/images/Pasted%20image%2020260304172940.png)

**Subnets** are essentially segments of your VPC, allowing you to divide your VPC into smaller, manageable sections. A subnet is a range of IP addresses in your VPC.

**Private subnets** are designed to isolate resources that shouldn't be directly exposed to the public internet. In diagrams, they are illustrated with solid boxes.

#### Public subnets
![](/images/Pasted%20image%2020260304173015.png)

**Public subnets** are designed to provide direct internet access to resources placed inside them. To allow access, they are connected with an internet gateway. You will learn more about internet gateways in a later lesson. In diagrams, public subnets are drawn with dashed boxes.


## Organizing resources in the AWS Cloud

Imagine the millions of customers who use AWS services. Also imagine the millions of resources that these customers have created, such as Amazon EC2 instances. Without boundaries around all these resources, network traffic can flow between them unrestricted. In the following section you will learn about two components of the AWS Cloud.

- Amazon Virtual Private Cloud (VPC)
    
- Gateways to connect your resources

## Establishing boundaries around AWS resources

When organizing your resources in the AWS Cloud, you need to be able to group certain functions together and isolate them from the public, or make them available to the public. You've been introduced to what Amazon VPCs do. Next, you will review the benefits.

> **Amazon VPC**

With Amazon VPC, you can provision an isolated section of the AWS Cloud. In this isolated section, you can launch resources in a virtual network that you define. It provides three main benefits. It helps increase security because you can secure and monitor connections, screen traffic, and restrict instance access. Amazon VPC gives you full control over your resource placement, connectivity, and security. The convenience of using Amazon VPC means you will spend less time setting up, managing, and validating your virtual network when compared to on-premises network management.

![](/images/Pasted%20image%2020260304174308.png)

### Subnets

Within an Amazon VPC, you can organize your resources into subsections or subnets. A subnet is a section of an Amazon VPC that can contain resources, such as Amazon EC2 instances. You will learn more about subnets in the next lesson.

### Connecting your resources with an internet gateway

To allow public traffic from the internet to access your VPC, you attach an **internet gateway** to the VPC. An internet gateway is a connection between a VPC and the internet. You can think of an internet gateway as being similar to a doorway that customers use to enter the coffee shop. Without an internet gateway, no one can access the resources within your VPC.

![](/images/Pasted%20image%2020260304174332.png)

## Virtual private gateways

What if you have a VPC that includes only private resources? The following example shows how a virtual private gateway works. You can think of the internet as the road between your home and the coffee shop. It is open and accessible to anyone. You want a way to protect the traffic you send on the internet from the public, internet service providers, and others who might be trying to track or intercept it. This is where a virtual private network (VPN) connection comes in.

VPN creates a connection that is more like a secure tunnel through the internet. Using encryption, it hides and protects everything you send and receive from outside eyes. A virtual private gateway is the component in the AWS Cloud that makes it possible for you to connect this protected traffic to enter the VPC. With a VPN connection, your data travels privately and safely, hidden from others using the same route.

With a virtual private gateway, you can establish a VPN connection between your VPC and a private network, such as an on-premises data center or internal corporate network. A virtual private gateway allows traffic into the VPC only if it is coming from an approved network.

![](/images/Pasted%20image%2020260304174350.png)

Several of the preceding networking components have similar abbreviations and are often confused. These components are core building blocks that you'll use in many AWS Cloud solutions. To learn the differences between these acronyms:

- **Amazon Virtual Private Cloud**  
	Amazon VPC is used to establish boundaries around your AWS resources.

- **Virtual private gateway**
	A virtual private gateway allows protected internet traffic to enter into the VPC.

- **Virtual private network**
	A VPN encrypts your internet traffic, helping protect it from anyone who might try to intercept or monitor it.




# Connecting to the AWS Cloud

AWS offers four ways to connect to the AWS Cloud, covering remote workers, site-to-site connections, private resource access, and dedicated high-bandwidth links.

---

## AWS Client VPN
![](/images/Pasted%20image%2020260427141656.png)

A fully managed, elastic VPN service for connecting remote workers and on-premises networks to the cloud. Automatically scales up or down based on user demand — no hardware to install or manage.

Uses an OpenVPN-based client and works across global Regions via the AWS global network.

**Benefits:** Advanced authentication, remote access, elastic scaling, fully managed.

**Use case:** Quickly scaling secure access for remote workers.

---

## AWS Site-to-Site VPN
![](/images/Pasted%20image%2020260427141709.png)

Creates a secure, encrypted connection between on-premises networks — such as data centers or branch offices — and AWS Cloud resources in an Amazon VPC.

**Benefits:** High availability, secure and private sessions, application acceleration.

**Use cases:** Application migration, secure communication between remote locations.

---

## AWS PrivateLink

A highly available, scalable service for privately connecting your VPC to services and resources as if they were inside your own VPC. No internet gateway, NAT device, public IP, Direct Connect, or Site-to-Site VPN required.

**Benefits:** Secure traffic, simplified management rules, no public internet exposure.

**Use case:** Connecting clients in your VPC to resources, other VPCs, and endpoints.

---

## AWS Direct Connect
![](/images/Pasted%20image%2020260427141752.png)
Establishes a **dedicated private connection** between your on-premises network and your VPC in the AWS Cloud — bypassing the public internet entirely for consistent, high-bandwidth performance.

**Benefits:** Reduced network costs, increased bandwidth, consistent low-latency experience.

### Use Cases

| Use Case                           | Description                                                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Latency-sensitive applications** | Bypasses the internet for consistent, low-latency performance — ideal for video streaming and other real-time workloads.  |
| **Large-scale data migration**     | Ensures smooth, reliable transfers at massive scale for real-time analysis, rapid backups, or broadcast media processing. |
| **Hybrid cloud architectures**     | Links AWS and on-premises networks to build applications that span environments without compromising performance.         |

---
## Additional Gateway Services

### AWS Transit Gateway

Connects Amazon VPCs and on-premises networks through a central hub. As cloud infrastructure expands globally, inter-Region peering connects transit gateways together using the AWS Global Infrastructure.

### NAT Gateway

A NAT service that allows instances in a private subnet to connect to services outside your VPC, while preventing external services from initiating connections back to those instances.

### Amazon API Gateway

An AWS service for creating, publishing, maintaining, monitoring, and securing APIs at any scale. APIs define how different software systems interact and communicate with each other.
## Quick Reference

| Service                  | Description                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------- |
| **AWS Client VPN**       | Connects your remote workforce to AWS or on-premises via VPN.                          |
| **AWS Site-to-Site VPN** | Encrypted network connection between on-premises sites and Amazon VPCs.                |
| **AWS PrivateLink**      | Connects your VPC privately to services and resources as though they were in your VPC. |
| **AWS Direct Connect**   | A private, dedicated connection between your data center or office and AWS.            |

# VPC Networking: Subnets, Network ACLs, and Security Groups

---

## Subnets

![](/images/Pasted%20image%2020260427202143.png)

A **subnet** is a section of a VPC in which you can group resources based on security or operational needs. Subnets can be public or private.

**Public subnets** contain resources that need to be accessible by the public, such as an online store's website.

**Private subnets** contain resources that should be accessible only through your private network, such as a database that contains customers' personal information and order histories.

In a VPC, you can define rules to allow resources in different subnets to communicate with each other. For example, you might have an application that uses Amazon EC2 instances in a public subnet communicating with databases in a private subnet.

---

## Network Traffic in a VPC

When a customer requests data from an application hosted in the AWS Cloud, the request is sent as a **packet** — a unit of data sent over the internet or a network.

The packet enters the VPC through an internet gateway. Before it can enter or exit a subnet, it runs through permission checks. One of these checks is a **network ACL** associated with the subnet the packet is being routed to. Network ACL permissions indicate what is allowed or denied based on who sent the packet and how it is trying to communicate with resources in the subnet.
![](/images/Pasted%20image%2020260427202317.png)

A **network ACL** is a virtual firewall that controls inbound and outbound traffic at the **subnet level**.

---

## Network ACLs

Think of travelers at passport control — travelers are packets, and the passport control officer is the network ACL. The officer checks credentials both when entering and exiting, just as a network ACL checks permissions every time a packet crosses a subnet boundary.

**Default network ACL** — Allows all inbound and outbound traffic by default. You can modify it by adding your own rules.

![](/images/Pasted%20image%2020260427202451.png)

**Custom network ACLs** — All inbound and outbound traffic is denied until you add rules to specify which traffic to allow. All network ACLs also have an explicit deny rule: if a packet doesn't match any other rule, it is denied.

![](/images/Pasted%20image%2020260427202522.png)
### Stateless Packet Filtering

Network ACLs perform **stateless** packet filtering — they remember nothing. Every time a packet crosses a subnet boundary (in either direction), the network ACL checks it against its rules, regardless of any previous requests.

![](/images/Pasted%20image%2020260427202616.png)

When a packet response for that request comes back to the subnet, the network ACL does not remember your previous request. The network ACL checks the packet response against its list of rules to determine whether to allow or deny.

---

## Security Groups

**Control inbound and outbound traffic at the resource level**

After a packet has entered a subnet, its permissions are evaluated for specific resources within the subnet. A **security group** is a virtual firewall that controls inbound and outbound traffic for specific AWS resources, like Amazon EC2 instances — operating at the **instance level**.

Think of an apartment building door attendant — guests are packets, and the attendant is the security group. By default, the security group denies all inbound traffic and allows all outbound traffic.

![](/images/Pasted%20image%2020260427202729.png)

With custom rules, you can configure which inbound traffic is allowed. Any traffic not matching a rule is denied. The door attendant checks the list on the way in, but does not check again when guests are leaving.

![](/images/Pasted%20image%2020260427202825.png)

**Note:** Multiple Amazon EC2 instances within the same VPC can share the same security group, or each can use a different security group.

### Stateful Packet Filtering

Security groups perform **stateful** packet filtering — they remember previous decisions made for incoming packets. When a packet response returns to an EC2 instance, the security group remembers the original request and allows the response through, regardless of inbound rules.

![](/images/Pasted%20image%2020260427202900.png)


---

## Security Groups vs. Network ACLs

|Feature|Security Groups|Network ACLs|
|---|---|---|
|**Scope**|Instance level (attached to EC2 instances)|Subnet level (associated with subnets)|
|**State**|Stateful (remembers state)|Stateless (doesn't remember state)|
|**Rule types**|Allow rules only|Both allow and deny rules|
|**Return traffic**|Automatically allowed if inbound traffic is allowed|Must be explicitly allowed in both directions|
|**Uses**|Fine-grained control of traffic for individual EC2 instances|Broad control of traffic in and out of subnets|

---

## Shared Responsibility

Configuring and securing network ACLs and security groups is **your responsibility** as the customer. These components make up networking traffic protection and are critical defenses for protecting your applications in the cloud.

![](/images/Pasted%20image%2020260427202948.png)



## Building an Amazon VPC in the AWS Cloud

**Core components covered in this demonstration**

It's helpful to understand how resources are created using the AWS Management Console. The following is a high-level overview of the resources and core components created in the preceding demonstration.

- ### Create the Amazon VPC
    
    Before you can create resources in the AWS Cloud, the first step is to create your own Amazon VPC.  You will also specify the Region best located for your resources.
    
- ### Create the subnets
    
    You will create two public and private subnets across two availability zones. This is a best practice to achieve high availability.
    
- ### Create an internet gateway and route traffic
    
    Without an internet gateway, your users can't get to your resources. First, you create the internet gateway. Then, you create route tables to route traffic to allow internet traffic in and local traffic out.

You are well on your way to creating your resources in your Amazon VPC. At this point, you would consider what type of security you need and filter the traffic coming in and out. Remember security groups and network ACLs? That's where they come in handy! And finally, you'd be ready to add your resources like EC2 instances or databases in your subnets.

# Edge Networking Services

Edge networking is the process of bringing information storage and computing abilities closer to the devices that produce that information and the users who consume it. Edge computing is important because organizations often need lower latency access to their data and content. By performing tasks or caching data locally or closer to users, organizations can deliver faster, more responsive experiences while maintaining better control over their infrastructure. There are also many different services that are hosted on the edge, like the DNS service, Amazon Route 53.

---

## DNS: Translating Domain Names to IP Addresses

DNS resolution is the process of translating a domain name to an IP address. You can think of DNS as being the phone book of the internet.

Suppose that AnyCompany has a website hosted in the AWS Cloud. Customers enter the web address into their browser and are able to access the website. This happens because of DNS resolution — a customer DNS resolver communicating with a company DNS server.
![](/images/Pasted%20image%2020260427212703.png)

1. **Customer and laptop** — When you enter the domain name into your browser, this request is sent to a customer DNS resolver.
2. **Customer DNS resolver** — The customer DNS resolver asks the company DNS server for the IP address that corresponds to AnyCompany's website.
3. **AnyCompany's DNS server** — The AnyCompany DNS server responds by providing the IP address for AnyCompany's website, 192.0.2.0.

---

## Amazon Route 53

Route 53 is a DNS that provides a reliable and cost-effective way to route end users to internet applications.

Route 53 directs end users to your resources with globally dispersed DNS servers and automatic scaling. It gives developers and businesses a reliable way to route end users to internet applications hosted in AWS. It connects user requests to infrastructure running in AWS, such as Amazon EC2 instances and load balancers. It also routes users to infrastructure outside of AWS.

Another feature of Route 53 is the ability to manage the DNS records for domain names. You can register new domain names directly in Route 53. You can also transfer DNS records for existing domain names managed by other domain registrars. This makes it possible for you to manage all of your domain names within a single location.

---

## Amazon CloudFront

CloudFront is a content delivery network (CDN) service that delivers your content with faster loading times, cost savings, and reliability.

CloudFront is like a global network of delivery trucks that quickly brings web content to users around the world. Instead of all requests traveling back to one central warehouse (your original server), CloudFront stores copies of your content at locations closer to your users. This means websites, videos, images, and applications load much faster, no matter where your customers are located.

**Use cases:**

- **Streaming video service** — A company that offers online workout videos uses CloudFront to make sure videos play smoothly without buffering, even during peak exercise times when thousands of users log in simultaneously.
- **Ecommerce website** — An online store uses CloudFront to deliver product images and web pages quickly during busy shopping seasons. This faster experience keeps customers engaged and reduces abandoned shopping carts.
- **Mobile app** — A travel app uses CloudFront to deliver map data and images to users' phones quickly to help travelers navigate new cities without frustrating delays.

### How Route 53 and CloudFront Work Together

![](/images/Pasted%20image%2020260427212153.png)

1. **Customer request** — A customer requests data from the application by going to AnyCompany's website.
2. **Amazon Route 53** — Amazon Route 53 uses DNS resolution to identify AnyCompany.com's corresponding IP address, 192.0.2.0. This information is sent back to the customer.
3. **CloudFront** — The customer's request is sent to the nearest edge location through CloudFront.
4. **Application Load Balancer** — Amazon CloudFront connects to the Application Load Balancer, which sends the incoming packet to an Amazon EC2 instance.

---

## AWS Global Accelerator

Global Accelerator is a service that uses the AWS global network to improve application availability, performance, and security. It uses intelligent traffic routing and fast failover if something goes wrong in one of your application locations.

Global Accelerator helps your applications run faster and more reliably across the globe. Think of it like creating express lanes on the internet highway specifically for your application's traffic. Instead of your users' requests taking the regular, sometimes congested internet routes, Global Accelerator directs traffic through the AWS private global network — getting your users to your application faster and more reliably.

**Use cases:**

- **Global gaming company** — A gaming company uses Global Accelerator to reduce lag and provide smoother gameplay for players around the world. Players in Tokyo, New York, and London all experience similar, responsive gameplay because their connections are optimized.
- **Financial services application** — A banking app uses Global Accelerator to ensure their customers always have fast, reliable access to their accounts. Even during peak times or when network conditions in one area are poor, customers can check balances and make transactions without frustrating delays.

---

## Quick Reference

| Service                    | Description                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| **Amazon Route 53**        | A highly available and scalable cloud DNS service.                                          |
| **Amazon CloudFront**      | A CDN service that delivers your content with low latency and high speeds.                  |
| **AWS Global Accelerator** | Uses the AWS global network to improve application availability, performance, and security. |

# Cloud in Real Life: Networking Examples

---

## Example 1 — Direct Connect Failover with High Bandwidth

A company with clients and servers that demand high bandwidth connections for large data transfers and critical application performance chose to access their AWS resources securely with multiple Direct Connect connections for failover.

![](/images/Pasted%20image%2020260427221330.png)

1. **Customer network** — The customer network clients and servers need a secure, high-bandwidth connection for large data transfers and critical application performance.
2. **Content router or firewall** — The customer has a content router or firewall connecting their network to Direct Connect.
3. **Multiple Direct Connect connections** — In addition to fault tolerance, the customer wanted increased bandwidth. They can even combine multiple connections to achieve higher aggregate bandwidth.
4. **Virtual private gateway** — Using a virtual private gateway, the clients can securely access the private resources in the Amazon VPC.

---

## Example 2 — Delivering Content to Multiple Regions Globally

A company with offices around the world delivers content with low latency for a seamless experience across multiple Regions.

![](/images/Pasted%20image%2020260427221346.png)

1. **Users** — The users access the company's website using a custom domain. The request is first sent to a Route 53 DNS record.
2. **Routing policy** — Route 53 uses a routing policy to determine which Region is closest to the user. Route 53 directs the user to the appropriate CloudFront edge location.
3. **Direct to edge locations** — Route 53 directs the user to the CloudFront edge location in the appropriate Region.
4. **Content in multiple AZs** — The content is fetched from the designated origin server in the chosen Region. The website was also built with resources in multiple Availability Zones for high availability.