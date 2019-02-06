---
Title: Creating the Cluster
PrevPage: 01-operator-prerequisites
NextPage: 03-exploring-the-resources
---

You can use the Kafka operator to deploy an ephemeral or persistent Kafka cluster to OpenShift. When deploying Kafka, the operator also installs a Zookeeper cluster and adds the necessary configuration to connect Kafka with Zookeeper.

An ephemeral (that is, temporary) Kafka cluster is suitable for development and testing purposes, not for production. This deployment uses `emptyDir` volumes for storing broker information (for Zookeeper) and topics or partitions (for Kafka). Using an `emptyDir` volume means that its content is strictly related to the pod life cycle and is deleted when the pod goes down.

A persistent Kafka cluster uses `PersistentVolumes` to store Zookeeper and Kafka data. The `PersistentVolume` is acquired using a `PersistentVolumeClaim` to make it independent of the actual type of the `PersistentVolume`. The `PersistentVolumeClaim` can use a `StorageClass` to trigger allocation of persistent storage with particular qualities.

To see an example of the `Kafka` CRD object that needs to be created for an ephemeral cluster, run:

```execute
cat strimzi-kafka-operator/examples/kafka/kafka-ephemeral.yaml
```

The contents should be similar to:

```
apiVersion: kafka.strimzi.io/v1alpha1
kind: Kafka
metadata:
  name: my-cluster
spec:
  kafka:
    version: 2.1.0
    replicas: 3
    listeners:
      plain: {}
      tls: {}
    config:
      offsets.topic.replication.factor: 3
      transaction.state.log.replication.factor: 3
      transaction.state.log.min.isr: 2
      log.message.format.version: "2.1"
    storage:
      type: ephemeral
  zookeeper:
    replicas: 3
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
```

This specifies what the Kafka cluster should look like, with the name to be given to the cluster in the `metadata.name` field. In this example, the Kafka cluster will be called `my-cluster`.

To understand what fields in a CRD are for, you will need to consult any online documentation for the CRD provided by the Kafka operator. It is not currently possible to use the `oc explain` on CRD objects to see builtin documentation like you can with builtin resource objects types.

When the CRD object is created from this definition, the Kafka operator will create the deployments for Kafka and Zookeeper, doing all the hard work for you, by virtue of the operator containing the operational knowledge needed to deploy and manage the Kafka cluster.

To create an ephermal Kafka cluster using this definition, run:

```execute
oc apply -f strimzi-kafka-operator/examples/kafka/kafka-ephemeral.yaml
```

The output you should see displayed when the Kafka cluster with name `my-cluster` is created, is:

```
kafka.kafka.strimzi.io/my-cluster created
```
