import * as cdk from 'aws-cdk-lib'
import * as connect from 'aws-cdk-lib/aws-connect'
import { Construct } from 'constructs'

export class AmazonConnectPlaygroundStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const instance = new connect.CfnInstance(this, 'ConnectInstance', {
      attributes: {
        inboundCalls: true,
        outboundCalls: true,
      },
      identityManagementType: 'CONNECT_MANAGED',
      instanceAlias: 'aws-connect-playground',
    })

    new connect.CfnPhoneNumber(this, 'ConnectPhoneNumber', {
      countryCode: 'US',
      targetArn: instance.attrArn,
      type: 'DID',
    })
  }
}
