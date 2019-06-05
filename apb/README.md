# Lab- Kafka Operator

The provided Ansible Playbook Bundle automates preparing an OpenShift cluster for the __Kafka Operator Homeroom lab__ by deploying required services which are used during the labs.

## Use an installed APB on OpenShift
Select the item from the catalog.

## Development
When you develop the APB you can test on a platform in the following ways.

### Install the apb tool
The new `apb` tool will help you develop your APB in an easy way. Download the latest apb tool 
from here: [https://github.com/automationbroker/apb/releases](https://github.com/automationbroker/apb/releases)

The [README.md](https://github.com/automationbroker/apb/blob/master/README.md) in that repository will give you a short getting started very insightful.

If you're starrting a new APB, you should look into the workflow in the [Getting started doc](https://github.com/automationbroker/apb/blob/master/docs/getting_started.md)

### Create a namespace to test
Once logged into your OCP cluster, you must first create a project:

```bash
oc new-project homeroom-labs
```

### Update the com.redhat.apb.spec LABEL
If you've changed the apb.yml you will need to update the `com.redhat.apb.spec` LABEL with a base64 encoded version of apb.yml. To do this we need to run `apb bundle prepare`

```bash
apb bundle prepare
```

### Building your lab image for testing
We need to build our lab application in order to be able to test it when we run our APB. For that, do:

```bash
oc new-build --binary=true --name kafka-operator-lab
```

To start the build from the current directory and follow the logs:

```bash
oc start-build --follow --from-dir .. kafka-operator-lab
```

And finally, let's tag it so we can use it in our APB:

```bash
oc tag homeroom-labs/kafka-operator-lab:latest homeroom-labs/kafka-operator-lab:development
```

This is the image we will use when we run the APB bundle.

__image-registry.openshift-image-registry.svc:5000/homeroom-labs/kafka-operator-lab:development__

### Building and publishing your APB for testing

At this point we have a fully formed APB that we can build. In this example, we'll build an APB using the OpenShift build system. Let's first create a `buildconfig` for the APB. Perform this step when you're building a new APB that you haven't previously built on OpenShift:

```bash
oc new-build --binary=true --name kafka-operator-lab-apb
```

To start the build from the current directory and follow the logs:

```bash
oc start-build --follow --from-dir . kafka-operator-lab-apb
```

If the build completes successfully, you'll see some newly available imagestreams:

```bash
oc get is
NAME                     IMAGE REPOSITORY                                                                        TAGS                 UPDATED
kafka-operator-lab       image-registry.openshift-image-registry.svc:5000/homeroom-labs/kafka-operator-lab       development,latest   4 minutes ago
kafka-operator-lab-apb   image-registry.openshift-image-registry.svc:5000/homeroom-labs/kafka-operator-lab-apb   latest               About a minute ago
```

We can now add the internal OpenShift registry to our list of configured registries:

```bash
apb registry add my-registry --type local_openshift --namespaces homeroom-labs
Getting specs for registry: [my-registry]
INFO Empty AuthType. Assuming credentials are defined in the config...
INFO == REGISTRY CX ==
INFO Name: my-registry
INFO Type: local_openshift
INFO Url:
INFO Validating specs...
INFO All specs passed validation!
INFO Registry my-registry has 1 valid APBs available from 1 images scanned
 APB                         IMAGE                                                                 REGISTRY
 ----------------------- -+- ----------------------------------------------------------------- -+- -----------
 kafka-operator-lab-apb   |  docker-registry.default.svc:5000/homeroom-labs/kafka-operator-lab  |  my-registry
```

### Running the APB
Now that `apb` is aware of the `kafka-operator-lab-apb` APB in the registry, we can perform any supported action against the APB. The `apb bundle` subcommand gives you some actions you can perform on a specific bundle in a registry.

We can `provision` the `kafka-operator-lab-apb` that now exists in the registry by running:

```bash
apb bundle provision kafka-operator-lab-apb -n homeroom-labs --follow
```

The provision command will prompt you for all required parameters to your APB.

__NOTE__: The `--follow` flag used above will show logs produced by the running APB.

You can `deprovision` the `kafka-operator-lab-apb` that now exists in the registry by running:

```bash
apb bundle deprovision kafka-operator-lab-apb -n homeroom-labs --follow
```

The deprovision command will prompt you for the specific instance to delete and all required parameters to your APB.

## Advanced options

|Variable                   | Default Value            | Description   |
|---------------------------|--------------------------|---------------|
|`user_count`           | 30                           | Number of concurrent sessions allowed for the workshop.  |
|`idle_timeout`         | 900                          | Time in seconds for the session to be idle before it timesout.  |
|`|`max_session_age`    | 3600                         | Maximum time a session will live. In seconds |
|`workshop_image_name`  | quay.io/openshiftlabs/lab-developing-with-odo  | Name of the workshop image to use for this lab  |
|`workshop_image_tag`   | summit-2019                 | Tag of the workshop image to use for this lab  |
|`spawner_template_version` | 3.0.8                   | Version of the spawner template to use when deploying homeroom  |