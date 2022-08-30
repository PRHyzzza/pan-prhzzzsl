import SparkMD5 from 'spark-md5'

export const useSliceUpload = (size?: number) => {
  // 设置上传切片的大小
  const chunkSize = ref(size || 1024 * 1024)

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

  const getHash = (buffer: ArrayBuffer): string => {
    return SparkMD5.ArrayBuffer.hash(buffer)
  }

  const getChunks = (buffer: ArrayBuffer, file: File) => {
    const chunks: Blob[] = []
    for (let i = 0; i < buffer.byteLength; i += chunkSize.value)
      chunks.push(file.slice(i, i + chunkSize.value))
    return chunks
  }

  return {
    fileToBuffer,
    getHash,
    getChunks,
  }
}
