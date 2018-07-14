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
