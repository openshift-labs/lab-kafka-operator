---
Title: Exploring the Resources
PrevPage: 02-creating-the-cluster
---

The:

```
kafka.kafka.strimzi.io/my-cluster
```

object created in the prior step is only that for the CRD object describing the Kafka cluster. Behind the scenes, the Kafka operator will create additional resource objects corresponding to the deployments for the ZooKeeper and Kafka instances, service objects which allow them to be accessed within the cluster, as well as config maps, secrets, service accounts, role bindings etc.

To see the list of resource objects created, start out by running:

```execute
oc get all -o name
```

This should display output similar to:

```
pod/my-cluster-entity-operator-c578d9645-nmdgc
pod/my-cluster-kafka-0
pod/my-cluster-zookeeper-0
service/my-cluster-kafka-bootstrap
service/my-cluster-kafka-brokers
service/my-cluster-zookeeper-client
service/my-cluster-zookeeper-nodes
deployment.apps/my-cluster-entity-operator
replicaset.apps/my-cluster-entity-operator-c578d9645
statefulset.apps/my-cluster-kafka
statefulset.apps/my-cluster-zookeeper
```

It may take a while before all the objects listed here are created. If you keep running the command, you may see the additional objects added over time, up till the point that the deployment is fully complete.

When using `all` with the `oc get` command though, `all` doesn't actually mean all objects. So also run:


```execute
oc get configmap,secret -o name
```

to see the list of config maps and secrets created:

```
configmap/my-cluster-entity-topic-operator-config
configmap/my-cluster-entity-user-operator-config
configmap/my-cluster-kafka-config
configmap/my-cluster-zookeeper-config
secret/my-cluster-clients-ca
secret/my-cluster-clients-ca-cert
secret/my-cluster-cluster-ca
secret/my-cluster-cluster-ca-cert
secret/my-cluster-cluster-operator-certs
secret/my-cluster-zookeeper-nodes
```

Run:

```execute
oc get serviceaccount,rolebinding -o name
```

to see the service accounts and rolebindings created in the project:

```
serviceaccount/my-cluster-entity-operator
serviceaccount/my-cluster-kafka
rolebinding.authorization.openshift.io/strimzi-my-cluster-entity-topic-operator
rolebinding.authorization.openshift.io/strimzi-my-cluster-entity-user-operator
```

Except for the service accounts and role bindings, the Kafka operator will add labels to the resources created so those for a specific instance can be queried using a label selector.

To query the resources related to `my-cluster` using a label selector, use:

```execute
oc get all,configmap,secret,serviceaccount,rolebinding -o name --selector strimzi.io/cluster=my-cluster
```
