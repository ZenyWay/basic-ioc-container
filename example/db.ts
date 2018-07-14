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
