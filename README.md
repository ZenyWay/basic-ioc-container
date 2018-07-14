# tiny unobtrusive IoC container (240 bytes gzip)
[![NPM](https://nodei.co/npm/basic-ioc-container.png?compact=true)](https://nodei.co/npm/basic-ioc-container/)

a tiny (240 bytes gzip), unobtrusive IoC container that lazily instantiates
any type from standard factories.

# features
* unobtrusive: leaves no footprint on the code of the modules that are wired together.
instances are created by standard factories that deconstruct their dependencies
from a plain javascript object they receive as argument.
supports the ["program to an interface, not an implementation" (Gang of Four 1995:18)](https://en.wikipedia.org/wiki/Design_Patterns) design paradigm.
* lazy: instantiates dependencies only when required.
* fully compatible with any form of module import. does not monkeypatch `require`.
* fully compatible with minification.
does not stringify factories to extract dependency names.
* simply mock dependencies in tests, regardless of test framework,
without any additional tools.
* typescript support.
* tiny: 240 bytes gzip.

# <a name="example"></a> Example
see the full [example](./example/index.tsx) in this directory.<br/>
run the example in your browser locally with `npm run example`
or [online here](https://cdn.rawgit.com/ZenyWay/basic-ioc-container/v0.1.0/example/index.html).

`index.ts`:
```tsx
import container from 'basic-ioc-container'
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
```

`service.ts`:<br/>
the code for the service factory is not tainted by the DI container implementation:
it merely implements IoC by deconstructing its dependencies
from the plain javascript object it receives as argument.
```tsx
export interface Service {
  save <D extends { id: string }>(obj: D): Promise<DocRef>
}

export interface ServiceSpec {
  version: string
  db: Db
}

export interface Db {
  insert <D extends { id: string }, R extends DocRef>(obj: D): Promise<R>
}

export interface DocRef {
  dbname: string
  id: string
  rev: string
}

export default function ({ version, db }: ServiceSpec): Service {
  return {
    save <D extends { id: string }>(obj: D): Promise<DocRef> {
      return db.insert(obj)
      .then(({ dbname, id, rev }) => ({ dbname, id, rev }))
    }
  }
}
```

`db.ts`:<br/>
likewise, the db factory deconstructs its single dependency from its argument.
it is completely unaware that the instances it creates will be
injected into the service by the DI container.
```tsx
export interface Db {
  insert <D extends { id: string }>(doc: D): Promise<DbResult>
}

export interface DbResult {
  dbname: string
  id: string
  rev: string
  status: number
}

export default function ({ dbname }): Db {
  return {
    insert <D extends { id: string }>(doc: D): Promise<DbResult> {
      return new Promise<DbResult>(function (res) {
        setTimeout(res, 1000, {
          dbname,
          id: doc.id,
          rev: '1-0123456789ABCDEF',
          status: 200
        })
      })
    }
  }
}
```
# <a name="API"></a>API

```ts
export default function <C>(container?: Partial<C>): {
  (factories: { [key: string]: (deps: Partial<C>) => any }): void
  <S>(key: string, factory: (deps: Partial<C>) => S): void
  <S>(factory: (deps: Partial<C>) => S): void
}
```

# TypeScript
although this library is written in [TypeScript](https://www.typescriptlang.org),
it may also be imported into plain JavaScript code:
modern code editors will still benefit from the available type definition,
e.g. for helpful code completion.

# License
Copyright 2018 Stéphane M. Catala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the [License](./LICENSE) for the specific language governing permissions and
Limitations under the License.

