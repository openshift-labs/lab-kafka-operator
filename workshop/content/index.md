---
Sort: 1
Title: Lab Overview
NextPage: exercises/01-strimzi-operator
ExitSign: Start Lab
---

The [Apache Kafka](https://kafka.apache.org/) site describes Kafka as:

> Apache Kafka® is a distributed streaming platform. What exactly does that mean?
> A streaming platform has three key capabilities:
>
> * Publish and subscribe to streams of records, similar to a message queue or enterprise messaging system.
> * Store streams of records in a fault-tolerant durable way.
> *Process streams of records as they occur.
>
> Kafka is generally used for two broad classes of applications:
>
> * Building real-time streaming data pipelines that reliably get data between systems or applications
> * Building real-time streaming applications that transform or react to the streams of data

Kafka has four core APIs:

* The __Producer API__ allows an application to publish a stream of records to one or more Kafka topics.
* The __Consumer API__ allows an application to subscribe to one or more topics and process the stream of records produced to them.
* The __Streams API__ allows an application to act as a stream processor, consuming an input stream from one or more topics and producing an output stream to one or more output topics, effectively transforming the input streams to output streams.
* The __Connector API__ allows building and running reusable producers or consumers that connect Kafka topics to existing applications or data systems. For example, a connector to a relational database might capture every change to a table.

![Kafka Architecture](kafka-apis.png)

Before you can use Kafka for your applications, you need to deploy a Kafka cluster. Kafka is run as a cluster on one or more servers that can span multiple datacenters. The Kafka cluster stores streams of _records_ in categories called __topics__. Each record consists of a key, a value, and a timestamp.

[__Strimzi__](https://strimzi.io) makes it easy to run _Apache Kafka_ on __OpenShift__ or __Kubernetes__.

Strimzi is based on Apache Kafka 2.0.1 and consists of three main components:

* __Cluster Operator__: Responsible for deploying and managing Apache Kafka clusters within OpenShift or Kubernetes cluster.
* __Topic Operator__: Responsible for managing Kafka topics within a Kafka cluster running within OpenShift or Kubernetes cluster.
* __User Operator__: Responsible for managing Kafka users within a Kafka cluster running within OpenShift or Kubernetes cluster.

In this workshop, you will learn how to create a Kafka cluster using the __Strimzi Kafka Operator__.
