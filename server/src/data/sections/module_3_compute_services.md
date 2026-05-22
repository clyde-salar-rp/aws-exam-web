# Unmanaged and Managed Services

AWS offers both unmanaged and managed services to suit different levels of control and responsibility. By understanding this model, you will know which tasks AWS manages and which you are responsible for, helping you secure and manage your cloud resources effectively.

## Unmanaged and Managed Services

![](/images/Pasted%20image%2020260427173221.png)

With unmanaged compute services like Amazon EC2, AWS takes care of the underlying physical infrastructure, but you're responsible for setting up, securing, and maintaining the operating system, network configurations, and applications on your instances. Managed services, on the other hand, reduce the amount of infrastructure you need to manage. While AWS handles much of the operational overhead, you might still need to perform some provisioning or configuration depending on the service.

## Fully Managed Services

![](/images/Pasted%20image%2020260427173236.png)

Fully managed services — like serverless ones — take abstraction even further, eliminating the need to provision or manage any servers at all. The underlying infrastructure is fully managed by AWS, so you can focus entirely on writing and deploying code. Later in this module, you will explore Lambda. Lambda is a serverless compute service where AWS handles the infrastructure, scaling, and availability, while you remain responsible for securing and managing your application code.



# AWS Lambda

Lambda is a serverless compute service that runs code in response to events without the need to provision or manage servers. It automatically manages the underlying infrastructure, scaling resources based on the volume of requests. You are charged only for the compute time consumed, down to the millisecond. Lambda handles execution, scaling, and resource allocation. You can optimize performance by configuring the appropriate memory size for your function.

---

## How Lambda Works

![](/images/Pasted%20image%2020260427173817.png)
### Step 1 — Upload Code to Lambda

Upload the code to Lambda, which uploads as a Lambda function.

### Step 2 — Set Code to Trigger from an Event Source

Configure your code to be triggered by events, like AWS services, mobile apps, or HTTP requests.

### Step 3 — Run Code When Triggered

Your code runs only when an event occurs, like a file upload or user action. Lambda automatically handles all the server management, scaling, and infrastructure. The Lambda runtime executes your function code using the event data passed to it. This way, your code runs reliably, securely, and efficiently — without you managing the servers or environment it runs in.

### Step 4 — Pay Only for the Compute Time Used

You are charged only for the compute time consumed, down to the millisecond. The price depends on the amount of memory that you allocate to your function.

---

## Use Cases

Lambda is ideal for building responsive, event-driven applications across a wide range of industries.

### Real-Time Image Processing — Social Media Application

A social media company uses Lambda to process images uploaded by users. When a photo is uploaded, Lambda is triggered to resize the image, apply filters, and save it in an optimized format to storage. This event-driven, serverless approach makes sure that the application can handle high volumes of uploads without needing to manage infrastructure.

**Why Lambda:** It automatically scales based on uploads and charges only for the time spent processing each image.

### Personalized Content Delivery — News Aggregator

A news aggregator uses Lambda to fetch and process news articles from multiple sources, then tailors recommendations based on user preferences. When a user opens the application or performs a search, Lambda functions are triggered to retrieve data, run personalization logic, and return relevant content.

**Why Lambda:** It automatically scales with user traffic and reduces costs by running code only when users interact.

### Real-Time Event Handling — Online Game

A gaming company uses Lambda to handle in-game events like player actions, game state changes, and real-time leaderboard updates. Each event (like scoring a point or unlocking an achievement) triggers a Lambda function that updates player data and game status.

**Why Lambda:** It handles thousands of events in real time with no need to manage servers. Costs scale with usage, which is ideal for peak gaming times.

# Containers and AWS Container Services

---

## Key Concepts

### Containers vs. Virtual Machines

A container packages your application with everything it needs to run, so it works the same on any computer. This helps with moving, updating, and managing applications. Containers are faster and lighter than virtual machines (VMs) because they share the host computer's operating system. VMs use a hypervisor to run full, separate operating systems, which makes them less resource-efficient and have longer startup times.

![](/images/Pasted%20image%2020260427174945.png)
### Deployment Consistency with Containers

When a developer's environment differs from staging or production, deployments can fail and become difficult to debug. Containers solve this by keeping the application's environment consistent everywhere, making deployments smoother and assisting troubleshooting.

![](/images/Pasted%20image%2020260427175000.png)
### Scaling Containers with Orchestration

As containerized applications scale, managing them becomes more complex. A setup that began with a few containers on a single host can quickly grow into hundreds or thousands of containers across multiple hosts. At that scale, manually handling container lifecycle, monitoring, and general operations becomes unsustainable. Orchestration tools automate deployment, scaling, and management to keep everything running smoothly.

![](/images/Pasted%20image%2020260427175023.png)

---

## AWS Container Services

AWS container tools fit into three categories: orchestration, registry, and compute.

---

### Amazon ECS (Elastic Container Service)

A scalable container orchestration service for running and managing containers on AWS, like Docker containers. Docker is a software platform for building, testing, and deploying applications quickly.

|Launch Type|Best For|
|---|---|
|**ECS with Amazon EC2**|Small-to-medium businesses needing full control over infrastructure. Suitable for custom applications requiring specific hardware or networking configurations.|
|**ECS with AWS Fargate**|Startups or small teams building web applications with variable traffic. Serverless — no server management required — so teams can focus on development while ECS handles scaling and orchestration.|

---

### Amazon EKS (Elastic Kubernetes Service)

A fully managed service for running Kubernetes on AWS. Simplifies deploying, managing, and scaling containerized applications using open-source Kubernetes, with ongoing support and updates from the broader community.

|Launch Type|Best For|
|---|---|
|**EKS with Amazon EC2**|Enterprises needing full control over infrastructure. Offers deep customization of EC2 instances alongside Kubernetes scalability — ideal for complex, large-scale workloads.|
|**EKS with AWS Fargate**|Teams wanting Kubernetes flexibility without managing servers. Combines Kubernetes power with serverless simplicity, helping to scale applications quickly across various use cases.|

---

### Amazon ECR (Elastic Container Registry)

A service for storing, managing, and deploying container images. Supports container images that follow Open Container Initiative (OCI) standards. You can push, pull, and manage images in your ECR repositories using standard container tooling and CLIs.

---

### AWS Fargate

A serverless compute engine for containers that works with both Amazon ECS and Amazon EKS. Unlike ECS and EKS — which are container orchestration services — Fargate is a container hosting platform.

When using Fargate, you do not need to provision or manage servers. Fargate manages your server infrastructure for you, so you can focus on innovating and developing your applications. You pay only for the resources required to run your containers.

# Additional Compute Services

AWS offers purpose-built services for specific needs, such as streamlining web application deployment, managing batch workloads, providing virtual servers, and extending cloud infrastructure to on-premises data centers.

| Service               | Description                                                                                                                                                                                                                                                                                                                                                                                                       | Good For                                                                                                                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Elastic Beanstalk** | A fully managed service that streamlines the deployment, management, and scaling of web applications. Developers upload their code, and Elastic Beanstalk automatically handles infrastructure provisioning, scaling, load balancing, and health monitoring. Supports Java, .NET, Python, Node.js, Docker, and more. Provides full control over underlying AWS resources while automating many operational tasks. | Deploying and managing web applications, RESTful APIs, mobile backend services, and microservices architectures, with automated scaling and simplified infrastructure management.      |
| **AWS Batch**         | A fully managed service for running batch computing workloads on AWS. Automatically schedules, manages, and scales compute resources for batch jobs, optimizing resource allocation based on job requirements.                                                                                                                                                                                                    | Processing large-scale, parallel workloads in scientific computing, financial risk analysis, media transcoding, big data processing, machine learning training, and genomics research. |
| **Amazon Lightsail**  | A cloud service offering virtual private servers (VPSs), storage, databases, and networking at a predictable monthly price. Ideal for small businesses, basic workloads, and developers seeking a straightforward AWS experience without the complexity of the full AWS Management Console.                                                                                                                       | Basic web applications, low-traffic websites, development and testing environments, small business websites, blogs, and learning cloud services.                                       |
| **AWS Outposts**      | A fully managed hybrid cloud solution that extends AWS infrastructure and services to on-premises data centers. Provides a consistent experience between on-premises and the AWS Cloud, offering compute, storage, and networking components.                                                                                                                                                                     | Low-latency applications, data processing in remote locations, migrating and modernizing legacy applications, and meeting regulatory compliance or data residency requirements.        |