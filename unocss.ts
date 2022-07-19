import type { UserShortcuts } from 'unocss/dist'

const btn: UserShortcuts<any> = [
  ['btn', 'px-5 py-2 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
]

const input: UserShortcuts<any> = [
  ['input', ' bg-transparent focus:shadow border-1 border-rounded border-gray-200 dark:border-gray-700 focus:border-teal-600 outline-none active:outline-none transition-all'],
]

const shortcuts: UserShortcuts<any> = [...btn, ...input]

export default shortcuts
