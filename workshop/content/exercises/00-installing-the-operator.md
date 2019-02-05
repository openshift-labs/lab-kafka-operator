---
Title: Installing the Operator
---

Before this workshop can be used in an OpenShift cluster, the Kafka operator must first be installed globally, and configured to watch all namespaces for requests to deploy a Kafka cluster.

The steps below are not part of what a developer wanting to deploy a Kafka cluster needs to do, and they are not displayed as part of the workshop steps. The steps below will need though to be run once by someone with cluster admin access to the OpenShift cluster.

For complete details on installing the Kafka operator, see the documentation at:

* https://strimzi.io/docs/master/

### Login as a cluster admin

The workshop when deployed through the learning portal configuration provides a session using a service account with limited access to a single project. To deploy the Kafka operator, you will need to login to the OpenShift cluster as a user with cluster admin access. For RHPDS, this will be the `opentlc-mgr` user.

```execute
oc login -u opentlc-mgr
```

### Create a project for the operator

The Kafka operator should be deployed to its own project. It will be setup later to monitor all namespaces for requests to create a Kafka cluster. The project name we will use here is `kafka-operator`.

```execute
oc new-project kafka-operator
```

### Set project name in role bindings

The resource objects for any role bindings need to be updated explicitly with the namespace the role binding is being created in.

```execute
sed -i "s/namespace: .*/namespace: kafka-operator/" strimzi-kafka-operator/install/cluster-operator/*RoleBinding*.yaml
```

### Deploy the Kafka operator application

You are ready to deploy the Kafka operator.

```execute
oc apply -f strimzi-kafka-operator/install/cluster-operator
```

Wait for the initial deployment to complete.

```execute
oc rollout status deployment/strimzi-cluster-operator
```

### Configure monitoring of all namespaces

By default the Kafka operator will only monitor the project it is deployed in. To have it monitor all namespaces, it is necessary to override the `STRIMZI_NAMESPACE` environment variable in the deployment configuration, and list the projects to be monitored, or use `*` to indicate that all projects should be monitored.

```execute
oc set env deployment/strimzi-cluster-operator STRIMZI_NAMESPACE='*'
```

Wait for the re-deployment to complete.

```execute
oc rollout status deployment/strimzi-cluster-operator
```

### Per project role bindings

Although all namespaces will now be monitored, any project that wants to be able to create a Kafka cluster, must first have appropriate role bindings created in that project, as it appears that the Kafka operator itself cannot create them when monitoring projects other than the one it is deployed in.

For the learning portal configuration, this will have to be done using steps run when each project is created.
