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
export type IoCFactory<C extends object, K extends keyof C> =
  (deps?: Partial<C>) => C[K]
export type IoCFactoryMap<C extends object> =
  { [K in keyof C]: IoCFactory<C,K> }

export default function <C extends object>(
  container = Object.create(null) as Partial<C>
) {
  return register

  function register (): Partial<C>
  function register <K extends keyof C>(
    key: K,
    factory: IoCFactory<C,K>
  ): Partial<C>
  function register (
    factories: Partial<IoCFactoryMap<C>>
  ): Partial<C>
  function register <T>(
    factory: (deps?: Partial<C>) => T
  ): T
  function register <K extends keyof C>(
    arg?: K | Partial<IoCFactoryMap<C>> | ((deps?: Partial<C>) => any),
    factory?: IoCFactory<C,K>
  ) {
    switch (typeof arg) {
      case 'function':
        return (arg as (deps?: Partial<C>) => any)(container)
      case 'string':
        let instance: C[K]
        Object.defineProperties(container, {
          [arg as string]: {
            configurable: true,
            enumerable: true,
            get(): C[K] {
              instance = instance || factory(container)
              return instance
            }
          }
        })
        break
      case 'object':
        Object.keys(arg).forEach(function (key: keyof C) {
          register(key, (arg as Partial<IoCFactoryMap<C>>)[key])
        })
      default:
    }
    return container
  }
}
