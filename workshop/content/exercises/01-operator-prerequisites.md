---
Title: Operator Prerequisites
PrevPage: ../index
NextPage: 02-creating-the-cluster
---

Before you can use the Kafka operator to deploy a Kafka cluster into OpenShift, the operator needs to be installed by a cluster admin. The Kafka operator can be installed to monitor requests to create a Kafka cluster, in the project it is deployed to, a set of named projects, or all projects in a cluster.

Even when deployed, only a cluster admin, or users who have been nominated as Kafka admins, will be able to create requests to deploy a Kafka cluster.

In this workshop environment, the Kafka operator has been pre-installed ready for use, and is monitoring all projects for requests to create a Kafka cluster. The user you are running the workshop as, has also been delegated the appropriate roles to allow it to act as a Kafka admin.

To validate that your user has been granted the appropriate roles, you can use the `oc auth can-i` command to see whether you can create the custom resource definition (CRD) objects the Kafka operator responds to.

The primary CRD object you need to create to request the creation of a Kafka cluster is the `Kafka` object in the `kafka.strimzi.io` api group. To check that you can create this, run:

```execute
oc auth can-i create kafkas.kafka.strimzi.io
```

Where the response is `yes`, you are good to go and have the appropriate role access.

You can see a list of all the CRD objects used by the Kafka operator by running:

```execute
oc api-resources --api-group kafka.strimzi.io
```
