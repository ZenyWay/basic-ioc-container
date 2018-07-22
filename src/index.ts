/**
 * @license Apache-2.0
 * Copyright 2018 ZenyWay S.A.S.
 * @author Stéphane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http: *www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
;
export default function <C>(container = Object.create(null) as Partial<C>) {
  return register

  function register (): Partial<C>
  function register (
    factories: { [key: string]: (deps: Partial<C>) => any }
  ): Partial<C>
  function register <S>(key: string, factory: (deps: Partial<C>) => S): Partial<C>
  function register <S>(factory: (deps: Partial<C>) => S): S
  function register <S>(
    arg?: string|((deps: Partial<C>) => S)|{ [key: string]: (deps: Partial<C>) => any },
    factory?: (deps: Partial<C>) => S
  ) {
    switch (typeof arg) {
      case 'function':
        return (arg as (deps: Partial<C>) => S)(container)
      case 'string':
        let instance: S
        Object.defineProperties(container, {
          [arg as string]: {
            get(): S {
              instance = instance || factory(container)
              return instance
            }
          }
        })
        break
      case 'object':
        Object.keys(arg).forEach(function (key) {
          register(key, arg[key])
        })
      default:
    }
    return container
  }
}
