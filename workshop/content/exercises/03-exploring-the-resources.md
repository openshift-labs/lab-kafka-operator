The `kafka/my-cluster` object created in the prior step is only that for the CRD object describing the Kafka cluster. Behind the scenes, the Kafka operator will create additional resource objects corresponding to the deployments for the ZooKeeper and Kafka instances, service objects which allow them to be accessed within the cluster, as well as config maps, secrets, service accounts, role bindings etc.

The Kafka operator will add labels to the resources created so those for a specific instance can be queried using a label selector.

To query the resources related to `my-cluster` using a label selector, use:

```execute
oc get all,configmap,secret,serviceaccount,rolebinding -o name --selector strimzi.io/cluster=my-cluster
```

Before the cluster can be used, we need to wait until it is fully deployed and running. To monitor the status of the Kafka related deployments, run:

```execute
watch oc get deployment,statefulset --selector strimzi.io/cluster=my-cluster
```

You should see something similar to:

```
NAME                                               READY   UP-TO-DATE   AVAILABLE   AGE
deployment.extensions/my-cluster-entity-operator   1/1     1            1           2m30s

NAME                                    READY   AGE
statefulset.apps/my-cluster-kafka       1/1     3m5s
statefulset.apps/my-cluster-zookeeper   1/1     3m37s
```

__NOTE:__ Deploying a Kafka cluster can take some time, if you don't see the previous output with the 3 deployments _Ready_ , wait for a moment (can take up to a couple of minutes to start the whole cluster). The command will refresh it's output every 2 seconds.

Once you have the desired state, you can just exit the _watch_ command.

```execute
<ctrl+c>
```

First thing we should notice is that the Cluster Operator (_strimzi-cluster-operator_) will deploy a Kafka Server(_my-cluster-kafka_) as a StatefulSet with one instance, a Zookeper Cluster (_my-cluster-zookeeper_) as a StatefulSet with one instance and an Entity Operator (_my-cluster-entity-operator_) for this cluster. This entity operator provides a specific Topic Operator and User Operator for this specific Kafka cluster.

__NOTE__: We're using a single instance cluster for this lab to keep resource usage low, but in a real cluster you should have at least 3 replicas of each Kafka and Zookeper.

Now that we know what has been deployed and that we have verified that our Kafka cluster is up and running, let's move ahead to use it.
