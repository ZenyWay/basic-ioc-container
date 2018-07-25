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
import serviceFactory, { Service } from './service'
import dbFactory, { Db } from './db'
import log from './console'
const { version: VERSION } = require('../package.json')
const DB_NAME = 'app-store'

// declare the shape of the IoC container
interface Container {
  version: string
  service: Service
  db: Db
  dbname: string
}

// instantiate a container of the above shape,
// and retrieve a corresponding factory registration function
const use = container<Container>()
// register factories from a map
use({
  version: () => VERSION, // register a constant
  service: serviceFactory
})
// or register factories individually
use('db', dbFactory)
use('dbname', () => DB_NAME)

// each of the above returns the container object, as well as:
const { service } = use() // pull service from container

service.save({ id: 'doc', foo: 'foo' })
.then(log('save:'))

// alternatively, inject directly (without registering):
use(({ version }) => log('version:')(version))
