#!/usr/bin/env node
import { ChimeStack } from '../lib/chime-stack'
import { App } from '@aws-cdk/core'
import 'source-map-support/register'

const app = new App()
new ChimeStack(app, 'cdk-chime')
