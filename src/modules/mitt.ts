import mitt from 'mitt'
import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  // do something
  const _emitter = mitt()

  // 全局发布（在Vue全局方法中自定义$pub发布方法）
  app.config.globalProperties.$pub = (...args: string[] | any[]) => {
    _emitter.emit(args[0], args.slice(1))
  }

  // 全局订阅（在Vue全局方法中自定义$sub订阅方法）
  app.config.globalProperties.$sub = function (...args: ArrayLike<any>[]) {
    Reflect.apply(_emitter.on, _emitter, args)
  }

  // 取消订阅
  app.config.globalProperties.$unsub = function (...args: ArrayLike<any>[]) {
    Reflect.apply(_emitter.off, _emitter, args)
  }
}
