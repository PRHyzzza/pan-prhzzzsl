import { type UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  // 全局发布（在Vue全局方法中自定义$pub发布方法）
  app.config.globalProperties.$pub = (...args: string[] | any[]) => {
    emitter.emit(args[0], args.slice(1))
  }

  // 全局订阅（在Vue全局方法中自定义$sub订阅方法）
  app.config.globalProperties.$sub = function (...args: ArrayLike<any>[]) {
    Reflect.apply(emitter.on, emitter, args)
  }

  // 取消订阅
  app.config.globalProperties.$unsub = function (...args: ArrayLike<any>[]) {
    Reflect.apply(emitter.off, emitter, args)
  }
}
