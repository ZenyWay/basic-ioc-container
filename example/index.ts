/**
 * @license
 * Copyright 2018 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
;
import container from '../src'
import serviceFactory, { Service, Db } from './service'
import dbFactory from './db'
import log from './console'
const { version } = require('../package.json')
const DB_NAME = 'app-store'

interface Container {
  version: string
  service: Service
  db: Db
  dbname: string
}

// instantiate a container
// and retrieve a corresponding factory registration function
const use = container<Container>()
// register factories from a map
use({
  version: () => version,
  service: serviceFactory
})
// or register factories individually
use('db', dbFactory)
use('dbname', () => DB_NAME)

// register the entry point without a key:
// it is called immediately with the container,
// a plain javascript object from which it can deconstruct its dependencies
use(function app({ version, service }) {
  log('version:')(version)

  service.save({ id: 'doc', foo: 'foo' })
  .then(log('save:'))
})
