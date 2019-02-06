var config = {
    site_title: 'Using the Kafka operator',

    variables: [
        {
            name: 'jupyterhub_namespace',
            content: process.env.JUPYTERHUB_NAMESPACE
        },
        {
            name: 'jupyterhub_application',
            content: process.env.JUPYTERHUB_APPLICATION
        }
    ]
};

module.exports = config;
