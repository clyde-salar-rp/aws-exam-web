# Key Concepts

## Artificial Intelligence (AI)

A broad field focused on the development of intelligent computer systems capable of performing humanlike tasks.

## Machine Learning (ML)

A type of AI that trains machines to perform complex tasks without explicit instructions. ML training finds patterns hidden in vast amounts of historical data to produce an ML model, which can then be applied to new data to make predictions or decisions based on what it has learned.

# Key Concepts

AI/ML helps solve many common business use cases. At AWS, these solutions are offered through the AWS AI/ML stack.

---

## Common ML Business Use Cases

ML models power applications like the Amazon.com recommendations engine, and can address a wide range of business needs:

- **Predict trends** — such as future stock prices
- **Make decisions** — like routing callers to the right department
- **Detect anomalies** — such as bank fraud
![](/images/Pasted%20image%2020260424194535.png)
---

## AWS AI/ML Stack

The AWS AI/ML stack is composed of three tiers:

| Tier                               | Description                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Services**                    | Pre-built models already trained to perform specific functions.                                                                       |
| **ML Services**                    | A more customized approach using Amazon SageMaker AI — build, train, and deploy your own ML models with fully managed infrastructure. |
| **ML Frameworks & Infrastructure** | A fully custom approach to building models using purpose-built chips that integrate with popular ML frameworks.                       |
![](/images/Pasted%20image%2020260424194553.png)



# AWS AI/ML Stack

---

## Tier 1: Pre-Built AI Services

Pre-built models already trained to perform specific functions. Grouped into three categories:

---

### Language Services

Interpret text or speech and transform it into something meaningful.

|Service|Description|Use Cases|
|---|---|---|
|**Amazon Comprehend**|Uses natural language processing to extract key insights from documents — recognizing key phrases, language, sentiment, and other common elements.|Content classification, customer sentiment analysis, compliance monitoring|
|**Amazon Polly**|Converts text into lifelike speech. Supports multiple languages, genders, and accents.|Virtual assistants, e-learning applications, accessibility for visually impaired users|
|**Amazon Transcribe**|Converts speech into text with support for multiple languages, speaker identification, custom vocabulary, and real-time transcription.|Customer call transcription, automated subtitling, media metadata generation|
|**Amazon Translate**|Real-time and batch text translation across multiple languages.|Document translation, multi-language application integrations|

---

### Computer Vision & Search Services

Answer questions and gather insights from documents, images, videos, and other content sources.

|Service|Description|Use Cases|
|---|---|---|
|**Amazon Kendra**|Uses NLP to search for answers within large amounts of enterprise content. Understands query context to return precise, relevant answers rather than just keyword matches.|Intelligent search, chatbots, application search integration|
|**Amazon Rekognition**|Identifies objects, people, text, scenes, and activities within images and videos stored in Amazon S3.|Content moderation, identity verification, media analysis, home automation|
|**Amazon Textract**|Detects and extracts typed and handwritten text from documents, forms, and tables.|Financial, healthcare, and government form processing|

---

### Conversational AI & Personalization Services

Enable text and voice interactions with your apps, and deliver personalized experiences to customers.

|Service|Description|Use Cases|
|---|---|---|
|**Amazon Lex**|Adds voice and text conversational interfaces to applications using natural language understanding (NLU) and automatic speech recognition (ASR).|Virtual assistants, FAQ natural language search, automated bots|
|**Amazon Personalize**|Uses historical data to build intelligent applications with personalized recommendations.|Personalized streaming, product, and trending recommendations|

---

## Tier 2: ML Services

A more customized approach for teams who want greater control over their ML solutions without managing infrastructure.

### Amazon SageMaker AI

A fully managed service for building, training, and deploying your own ML models without infrastructure overhead. The SageMaker AI IDE provides simplified access control, experiment tracking, data visualization, and workflow debugging and monitoring — all in one environment. Also offers access to hundreds of pre-trained models deployable in a few steps.

**Key benefits:**

- **Choice of ML tools** — supports a wide range of frameworks and tooling
- **Fully managed infrastructure** — no need to provision or maintain compute resources
- **Repeatable ML workflows** — standardized pipelines for consistent, reproducible results

---

## Tier 3: ML Frameworks & Infrastructure

For organizations with specialized needs that require complete control over the ML training process. Teams use in-house expertise alongside AWS infrastructure to build fully custom solutions.

### ML Frameworks

Software libraries providing pre-built, optimized components for building ML models. AWS supports **PyTorch**, **Apache MXNet**, and **TensorFlow**.

### AWS ML Infrastructure

Purpose-built infrastructure to support custom ML solutions, including ML-optimized **Amazon EC2 instances**, **Amazon EMR**, and **Amazon ECS** — providing high performance and flexibility for advanced workloads.



# Generative AI — Key Concepts

## Deep Learning (DL)

A subset of machine learning where models are trained using layers of artificial neurons that mimic the human brain. Each layer summarizes and feeds information to the next until a final model is produced.
![](/images/Pasted%20image%2020260424195325.png)
## Generative AI

A type of deep learning powered by extremely large ML models known as **foundation models (FMs)**. FMs are pre-trained on vast collections of data and — unlike traditional ML models trained for singular tasks — can be adapted to perform multiple tasks.

**Large language models (LLMs)** are a popular type of FM trained to work with human language. FMs can also generate videos, images, music, and more.
![](/images/Pasted%20image%2020260424195401.png)

---

## Generative AI on AWS

| Service                        | Description                                                                                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------- |
| **Amazon SageMaker JumpStart** | An ML hub with foundation models and pre-built ML solutions deployable with a few clicks.          |
| **Amazon Bedrock**             | A fully managed service for adapting and deploying FMs from Amazon and other leading AI companies. |
| **Amazon Q**                   | An interactive AI assistant that can be integrated with a company's information repositories.      |
![](/images/Pasted%20image%2020260424195419.png)
