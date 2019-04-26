---
Title: Creating the Cluster
PrevPage: 01-operator-prerequisites
NextPage: 03-exploring-the-resources
---

You can use the Kafka operator to deploy an ephemeral or persistent Kafka cluster to OpenShift. When deploying Kafka, the operator also installs a Zookeeper cluster and adds the necessary configuration to connect Kafka with Zookeeper.

An ephemeral (that is, temporary) Kafka cluster is suitable for development and testing purposes, not for production. This deployment uses `emptyDir` volumes for storing broker information (for Zookeeper) and topics or partitions (for Kafka). Using an `emptyDir` volume means that its content is strictly related to the pod life cycle and is deleted when the pod goes down.

A persistent Kafka cluster uses `PersistentVolumes` to store Zookeeper and Kafka data. The `PersistentVolume` is acquired using a `PersistentVolumeClaim` to make it independent of the actual type of the `PersistentVolume`. The `PersistentVolumeClaim` can use a `StorageClass` to trigger allocation of persistent storage with particular qualities.

An example of a `Kafka` CRD object definition you might use for an ephemeral cluster in development and/or testing, is:

```
apiVersion: kafka.strimzi.io/v1alpha1
kind: Kafka
metadata:
  name: my-cluster
spec:
  kafka:
    version: 2.1.0
    replicas: 1
    listeners:
      plain: {}
      tls: {}
    config:
      offsets.topic.replication.factor: 1
      transaction.state.log.replication.factor: 1
      transaction.state.log.min.isr: 1
      log.message.format.version: "2.1"
    storage:
      type: ephemeral
  zookeeper:
    replicas: 1
    storage:
      type: ephemeral
  entityOperator:
    topicOperator: {}
    userOperator: {}
```

This specifies what the Kafka cluster should look like, with the name to be given to the cluster in the `metadata.name` field. In this example, the Kafka cluster will be called `my-cluster`.

To understand what fields in a CRD are for, you will need to consult any online documentation for the CRD provided by the Kafka operator. It is not currently possible to use the `oc explain` command on CRD objects to see builtin documentation like you can with builtin resource objects types.

When the CRD object is created from this definition, the Kafka operator will create the deployments for Kafka and Zookeeper, doing all the hard work for you, by virtue of the operator containing the operational knowledge needed to deploy and manage the Kafka cluster.

To create an ephermal Kafka cluster using this definition, run:

```execute
oc apply -f kafka.yaml
```

The output you should see displayed when the Kafka cluster with name `my-cluster` is created, is:

```
kafka.kafka.strimzi.io/my-cluster created
```

Note that if you compare the contents of the `kafka.yaml` file, with the above example, you will see a bunch of resource settings for memory and CPU. The resource settings are set specific to the quota constraints of this workshop environment and not relevant to demonstrating how the Kafka operator works.

We can also verify the Kafka server resource that has been created:

```execute
oc get kafka/my-cluster -o yaml
```

Or look at the more human friendly representation of this same information:

```execute
oc describe kafka/my-cluster
```

Let's now explore our Kafka cluster.