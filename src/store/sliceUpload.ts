import SparkMD5 from 'spark-md5'
import type { chunksType } from '~/type/upload'

export const useSliceUpload = (size?: number) => {
  // 设置上传切片的大小
  const chunkSize = ref(size || 1024 * 1024)
  // 实例化一个spark-md5对象
  const spark = new SparkMD5.ArrayBuffer()
  // 切片数组
  const chunks: chunksType[] = []
  // 文件转换为buffer
  const fileToBuffer = (file: File): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      const fr: FileReader = new FileReader()
      fr.onload = (e) => {
        resolve(e.target!.result)
      }
      fr.readAsArrayBuffer(file)
      fr.onerror = () => {
        reject(new Error('转换文件格式发生错误'))
      }
    })
  }
  // 获取文件的后缀名
  const getSuffix = (file: File): string => {
    return file.name.split('.').pop() || ''
  }
  // 获取文件的md5
  const getSpark = (buffer: ArrayBuffer): string => {
    return spark.append(buffer).end()
  }
  // 获取文件切片数量
  const getChunksNumber = (buffer: ArrayBuffer): number => {
    return Math.ceil(buffer.byteLength / chunkSize.value)
  }

  const getChunks = (buffer: ArrayBuffer, file: File, md5: String, suffix: String) => {
    chunks.length = 0
    for (let i = 0; i < buffer.byteLength; i += chunkSize.value) {
      chunks.push({
        chunk: file.slice(i, i + chunkSize.value),
        name: `${md5}-${i / chunkSize.value}.${suffix}`,
      })
    }
    return chunks
  }

  return {
    fileToBuffer,
    getSuffix,
    getSpark,
    getChunksNumber,
    getChunks,
  }
}
