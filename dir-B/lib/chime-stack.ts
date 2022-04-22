import {
  HttpApi,
  HttpMethod,
  LambdaProxyIntegration,
} from '@aws-cdk/aws-apigatewayv2'
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs'
import {
  Stack,
  Construct,
  StackProps,
  Duration,
  CfnOutput,
} from '@aws-cdk/core'

export class ChimeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const handler = new NodejsFunction(this, 'chime-func', {
      entry: 'src/lambda/handlers/chime.ts',
    })
    const api = new HttpApi(this, 'api', {
      apiName: 'chime',
      description: 'sample chime api',
      corsPreflight: {
        allowHeaders: ['Authorization'],
        allowMethods: [
          HttpMethod.GET,
          HttpMethod.HEAD,
          HttpMethod.OPTIONS,
          HttpMethod.POST,
          HttpMethod.DELETE,
          HttpMethod.PATCH,
          HttpMethod.PUT,
        ],
        allowOrigins: ['*'],
        maxAge: Duration.days(10),
      },
    })
    api.addRoutes({
      path: '/join',
      methods: [HttpMethod.POST],
      integration: new LambdaProxyIntegration({ handler }),
    })

    new CfnOutput(this, 'ApiDnsName', {
      value: api.url!,
    })
  }
}
