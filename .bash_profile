# Enable kubectl bash completion.

source <(kubectl completion bash)

# Enable oc bash completion.

source <(oc completion bash)

# Add Kafka bind directory to path.

PATH=/opt/app-root/kafka/bin:$PATH
