### Deployment

##### Setup

Island Instagram runs in production on [AWS Elastic Beanstalk](http://aws.amazon.com/elasticbeanstalk/).

1. Install the [command line interface](http://aws.amazon.com/code/6752709412171743) for EBS. You may also need to install python's boto (``` pip install boto```)
2. Install ruby (```apt-get install ruby``` on Linux)
3. Run ```eb init``` to initialize the Amazon file structure and supply the correct Git commands
4. Modify the file structure at the top-level of your local repo.

```
.aws
  aws_credential_file
  island.pem
.elasticbeanstalk
  config
  optionsettings.worker
```

```.aws/aws_credential_file``` : (_Get these values from Sander or Eyal_)

```
AWSAccessKeyId=<YOUR_IAM_ACCESS_KEY_ID>
AWSSecretKey=<YOUR_IAM_SECRET_KEY>
AWSRegion=us-east-1
```

```.aws/island.pem``` : (_Used to ```tail``` logs... get this from Sander or Eyal_)

```.elasticbeanstalk/config``` : (_\<PATH\> must be absolute_)

```
[global]
ApplicationName=island-pubsub
AwsCredentialFile=<PATH>/.aws/aws_credential_file
DevToolsEndpoint=git.elasticbeanstalk.us-east-1.amazonaws.com
EnvironmentName=island-pubsub-env
InstanceProfileName=aws-elasticbeanstalk-ec2-role
OptionSettingFile=<PATH>/.elasticbeanstalk/optionsettings.worker
RdsEnabled=No
Region=us-east-1
ServiceEndpoint=https://elasticbeanstalk.us-east-1.amazonaws.com
SolutionStack=64bit Amazon Linux 2014.09 v1.0.9 running Node.js
```

```.elasticbeanstalk/optionsettings.worker``` :

```
[aws:autoscaling:asg]
MinSize=1
MaxSize=1

[aws:autoscaling:launchconfiguration]
EC2KeyName=island
InstanceType=t2.micro
IamInstanceProfile=aws-elasticbeanstalk-ec2-role

[aws:elasticbeanstalk:application:environment]
AWS_ACCESS_KEY_ID=<YOUR_IAM_ACCESS_KEY_ID>
AWS_SECRET_KEY=<YOUR_IAM_SECRET_KEY>
AWS_REGION=us-east-1
NODE_ENV=production
PUB_SOCKET_PORT=<PUB_SOCKET_PORT>
SUB_SOCKET_PORT=<SUB_SOCKET_PORT>

[aws:elasticbeanstalk:container:nodejs]
GzipCompression=false
NodeCommand=node start.js
NodeVersion=0.10.31
ProxyServer=none

[aws:elasticbeanstalk:hostmanager]
LogPublicationControl=true

[aws:elasticbeanstalk:monitoring]
Automatically Terminate Unhealthy Instances=true
```

##### Shipping

1. Depending on how the EBS Environment was created, it may need to be updated with ```eb update```.
2. Deploy with ```eb push```.
