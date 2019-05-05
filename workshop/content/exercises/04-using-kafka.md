---
Title: Using Kafka
PrevPage: 03-exploring-the-resources
NextPage: ../finish
---

Kafka is a distributed messaging system which uses a pub-sub model. All messages are organized into topics. If you wish to send a message, you send it to a specific topic, and, if you wish to read a message, you read it from a specific topic. A consumer pulls messages off of a Kafka topic while producers push messages into a Kafka topic.

An example of a `Kafka Topic` Custom Resource object definition you might use is as follows:

```
apiVersion: kafka.strimzi.io/v1alpha1
kind: KafkaTopic
metadata:
  name: my-topic
  labels:
    strimzi.io/cluster: my-cluster
spec:
  partitions: 1
  replicas: 1
```

To create a Kafka Topic using this definition, run:

```execute
oc apply -f topic.yaml
```

The output you should see displayed when the Kafka cluster with name `my-cluster` is created, is:

```
kafkatopic.kafka.strimzi.io/my-topic created
```

We can verify the existing topics on the server easily:

```execute
oc get kafkatopics
```

Depending on your Kafka server configuration, Topics don't need to be pre-created. The Topic Operator will be in charge of keeping the topics created on the server and the _KafkaTopic_ definitions in sync.

Let's now create a __Topic__ directly with the _Kafka_ client. We'll use a Kafka container from our Kafka cluster pod, and execute a command from there:

```execute
oc exec -it my-cluster-kafka-0 \
   -c kafka \
   -- bin/kafka-topics.sh \
   --create \
   --zookeeper localhost:2181 \
   --replication-factor 1 \
   --partitions 1 \
   --topic example-cli
```

We can verify that the topic we have created programatically (`example-cli`) by running this application also exists as a `KafkaTopic` resource:

```execute
oc get kafkatopics
```

We should now see both topics created:

```
NAME          AGE
example-cli   3s
my-topic      38s
```

Let's now test our server by running a simple application. On one terminal, we're going to run a _Producer Application_ that will read messages from the command line and send them to a KafkaTopic on the Kafka Server.

```execute-1
oc run kafka-producer -ti \
   --image=strimzi/kafka:0.11.1-kafka-2.1.0 \
   --rm=true \
   --restart=Never \
   -- bin/kafka-console-producer.sh \
   --broker-list my-cluster-kafka-bootstrap:9092 \
   --topic my-topic
```

On a second terminal, we wil now run a _Consumer Application_ that will write to the console the messages read from the same KafkaTopic as they arrive.

```execute-2
oc run kafka-consumer -ti \
   --image=strimzi/kafka:0.11.1-kafka-2.1.0 \
   --rm=true \
   --restart=Never \
   -- bin/kafka-console-consumer.sh \
   --bootstrap-server my-cluster-kafka-bootstrap:9092 \
   --topic my-topic \
   --from-beginning
```

To test this application, just write some messages into the first terminal (Producer application). You should see them being written into the second terminal (Consumer application).

```execute-1
This is one message
```

```execute-1
This is a second message
```

```execute-1
We're sending these to a KafkaTopic
```

Now that we've verified how we have sent and consumed messaged to/from Kafka, let's terminate the applications.

```execute-1
<ctrl+c>
```

```execute-2
<ctrl+c>
```
